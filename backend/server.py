from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import resend
from fastapi import (
    FastAPI,
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
    Depends,
    Request,
)
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr

# ---------- Config ----------
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTS = {".pdf", ".png", ".jpg", ".jpeg"}
MAX_UPLOAD_BYTES = 15 * 1024 * 1024  # 15 MB

JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 12

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@rightpolicy.in")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")
ADVISOR_ALERT_EMAIL = os.environ.get("ADVISOR_ALERT_EMAIL", "contact@rightpolicy.in")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-me")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# ---------- Logging ----------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("rightpolicy")

# ---------- DB ----------
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

# ---------- App ----------
app = FastAPI(title="RightPolicy API")
api = APIRouter(prefix="/api")


# ---------- Helpers ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_admin_token(admin_id: str, email: str) -> str:
    payload = {
        "sub": admin_id,
        "email": email,
        "role": "admin",
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:].strip()
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("role") != "admin" or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.admins.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Admin not found")
    return user


async def send_email_async(to: str, subject: str, html: str) -> Optional[str]:
    """Send email via Resend if configured; otherwise log only. Never raises."""
    if not RESEND_API_KEY:
        logger.info("[email-skipped] to=%s subject=%s (RESEND_API_KEY not set)", to, subject)
        return None
    try:
        params = {"from": SENDER_EMAIL, "to": [to], "subject": subject, "html": html}
        result = await asyncio.to_thread(resend.Emails.send, params)
        eid = result.get("id") if isinstance(result, dict) else None
        logger.info("[email-sent] to=%s id=%s", to, eid)
        return eid
    except Exception as e:
        logger.error("[email-failed] to=%s err=%s", to, e)
        return None


def _wrap_email(title: str, body_html: str) -> str:
    return f"""
<!doctype html>
<html><body style="margin:0;padding:0;background:#FAF9F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0F172A;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAF9F6;padding:32px 0;">
  <tr><td align="center">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:28px 32px;border-bottom:1px solid #E2E8F0;">
        <div style="font-size:18px;font-weight:700;color:#0F172A;">Right<span style="color:#C8322A;">Policy</span></div>
      </td></tr>
      <tr><td style="padding:28px 32px;">
        <h1 style="margin:0 0 16px 0;font-size:22px;color:#0F172A;font-weight:700;">{title}</h1>
        <div style="font-size:15px;line-height:1.6;color:#475569;">{body_html}</div>
      </td></tr>
      <tr><td style="padding:20px 32px;border-top:1px solid #E2E8F0;font-size:12px;color:#64748B;">
        RightPolicy · Human-first insurance advisory · India
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>
"""


# ---------- Models ----------
class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=25)
    insurance_type: Optional[str] = None
    message: Optional[str] = Field(default="", max_length=2000)


class Inquiry(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    insurance_type: Optional[str] = None
    message: Optional[str] = ""
    status: str = "new"
    notes: Optional[str] = ""
    created_at: str


class PolicyUploadRecord(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    filename: str
    stored_filename: str
    size_bytes: int
    notes: Optional[str] = ""
    status: str = "new"
    admin_notes: Optional[str] = ""
    created_at: str


class ClaimSupportCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=25)
    insurer: Optional[str] = ""
    policy_number: Optional[str] = ""
    claim_type: Optional[str] = ""
    message: Optional[str] = Field(default="", max_length=2000)


class ClaimSupportRecord(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    insurer: Optional[str] = ""
    policy_number: Optional[str] = ""
    claim_type: Optional[str] = ""
    message: Optional[str] = ""
    status: str = "new"
    notes: Optional[str] = ""
    created_at: str


class AdminLoginIn(BaseModel):
    email: EmailStr
    password: str


class AdminLoginOut(BaseModel):
    token: str
    user: dict


class StatusUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    admin_notes: Optional[str] = None


VALID_STATUSES = {"new", "in_progress", "contacted", "resolved", "closed"}


# ---------- Public Routes ----------
@api.get("/")
async def root():
    return {"message": "RightPolicy API", "status": "ok"}


@api.get("/health")
async def health():
    return {"status": "healthy", "time": now_iso()}


@api.post("/inquiries", response_model=Inquiry, status_code=201)
async def create_inquiry(payload: InquiryCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "phone": payload.phone.strip(),
        "insurance_type": (payload.insurance_type or "").strip() or None,
        "message": (payload.message or "").strip(),
        "status": "new",
        "notes": "",
        "created_at": now_iso(),
    }
    await db.inquiries.insert_one(doc.copy())

    # Fire-and-forget emails
    asyncio.create_task(send_email_async(
        ADVISOR_ALERT_EMAIL,
        f"New consultation request — {doc['name']}",
        _wrap_email(
            "New consultation request",
            f"""<p>A new advisor inquiry has been received.</p>
<table cellpadding="6" style="font-size:14px;color:#0F172A;">
<tr><td><b>Name</b></td><td>{doc['name']}</td></tr>
<tr><td><b>Email</b></td><td>{doc['email']}</td></tr>
<tr><td><b>Phone</b></td><td>{doc['phone']}</td></tr>
<tr><td><b>Type</b></td><td>{doc['insurance_type'] or '—'}</td></tr>
<tr><td><b>Message</b></td><td>{doc['message'] or '—'}</td></tr>
</table>"""
        ),
    ))
    asyncio.create_task(send_email_async(
        doc["email"],
        "We received your request — RightPolicy",
        _wrap_email(
            f"Hi {doc['name'].split()[0]}, we'll be in touch within 24 hours.",
            "<p>Thank you for reaching out to RightPolicy. A real advisor will connect with you within one business day — calmly, with no pressure.</p>"
            "<p>If it's urgent, you can also reach us on WhatsApp at <a href='https://wa.me/919404908866'>+91 9404 9088 66</a>.</p>",
        ),
    ))
    return Inquiry(**doc)


@api.post("/policy-uploads", response_model=PolicyUploadRecord, status_code=201)
async def upload_policy(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    notes: str = Form(""),
    file: UploadFile = File(...),
):
    original = file.filename or "policy"
    ext = Path(original).suffix.lower()
    if ext not in ALLOWED_EXTS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(sorted(ALLOWED_EXTS))}",
        )

    file_id = str(uuid.uuid4())
    safe_name = f"{file_id}{ext}"
    dest = UPLOAD_DIR / safe_name

    size = 0
    with dest.open("wb") as out:
        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            size += len(chunk)
            if size > MAX_UPLOAD_BYTES:
                out.close()
                dest.unlink(missing_ok=True)
                raise HTTPException(status_code=413, detail="File too large. Max 15 MB.")
            out.write(chunk)

    record = {
        "id": file_id,
        "name": name.strip(),
        "email": email.lower().strip(),
        "phone": phone.strip(),
        "filename": original,
        "stored_filename": safe_name,
        "size_bytes": size,
        "notes": (notes or "").strip(),
        "status": "new",
        "admin_notes": "",
        "created_at": now_iso(),
    }
    await db.policy_uploads.insert_one(record.copy())

    asyncio.create_task(send_email_async(
        ADVISOR_ALERT_EMAIL,
        f"Policy uploaded for review — {record['name']}",
        _wrap_email(
            "New policy upload",
            f"""<p>A client has uploaded their existing policy for review.</p>
<table cellpadding="6" style="font-size:14px;color:#0F172A;">
<tr><td><b>Name</b></td><td>{record['name']}</td></tr>
<tr><td><b>Email</b></td><td>{record['email']}</td></tr>
<tr><td><b>Phone</b></td><td>{record['phone']}</td></tr>
<tr><td><b>File</b></td><td>{record['filename']} ({round(record['size_bytes']/1024)} KB)</td></tr>
<tr><td><b>Notes</b></td><td>{record['notes'] or '—'}</td></tr>
</table>"""
        ),
    ))
    asyncio.create_task(send_email_async(
        record["email"],
        "We received your policy — RightPolicy",
        _wrap_email(
            f"Thanks {record['name'].split()[0]}, your policy is with us.",
            "<p>Our advisors will review your policy for coverage gaps, claim risks, and unnecessary costs. You'll hear back within one business day.</p>"
            "<p>Your document stays confidential and is reviewed by humans, not algorithms.</p>",
        ),
    ))
    return PolicyUploadRecord(**record)


@api.post("/claim-support", response_model=ClaimSupportRecord, status_code=201)
async def create_claim_request(payload: ClaimSupportCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "phone": payload.phone.strip(),
        "insurer": (payload.insurer or "").strip(),
        "policy_number": (payload.policy_number or "").strip(),
        "claim_type": (payload.claim_type or "").strip(),
        "message": (payload.message or "").strip(),
        "status": "new",
        "notes": "",
        "created_at": now_iso(),
    }
    await db.claim_requests.insert_one(doc.copy())

    asyncio.create_task(send_email_async(
        ADVISOR_ALERT_EMAIL,
        f"Claim support request — {doc['name']}",
        _wrap_email(
            "New claim support request",
            f"""<p>A client needs help with a claim.</p>
<table cellpadding="6" style="font-size:14px;color:#0F172A;">
<tr><td><b>Name</b></td><td>{doc['name']}</td></tr>
<tr><td><b>Email</b></td><td>{doc['email']}</td></tr>
<tr><td><b>Phone</b></td><td>{doc['phone']}</td></tr>
<tr><td><b>Insurer</b></td><td>{doc['insurer'] or '—'}</td></tr>
<tr><td><b>Policy #</b></td><td>{doc['policy_number'] or '—'}</td></tr>
<tr><td><b>Claim type</b></td><td>{doc['claim_type'] or '—'}</td></tr>
<tr><td><b>Message</b></td><td>{doc['message'] or '—'}</td></tr>
</table>"""
        ),
    ))
    asyncio.create_task(send_email_async(
        doc["email"],
        "We're here to help — RightPolicy",
        _wrap_email(
            f"Hi {doc['name'].split()[0]}, we'll reach out shortly.",
            "<p>Claims can feel overwhelming — you don't have to navigate this alone. A RightPolicy advisor will reach out within one business day to help with paperwork, insurer coordination, and the next steps.</p>"
            "<p>If it's urgent, please WhatsApp us at <a href='https://wa.me/919404908866'>+91 9404 9088 66</a>.</p>",
        ),
    ))
    return ClaimSupportRecord(**doc)


# ---------- Admin: Auth ----------
admin_api = APIRouter(prefix="/admin")


@admin_api.post("/login", response_model=AdminLoginOut)
async def admin_login(payload: AdminLoginIn):
    user = await db.admins.find_one({"email": payload.email.lower().strip()}, {"_id": 0})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_admin_token(user["id"], user["email"])
    safe_user = {k: v for k, v in user.items() if k != "password_hash"}
    return {"token": token, "user": safe_user}


@admin_api.get("/me")
async def admin_me(current: dict = Depends(get_current_admin)):
    return current


# ---------- Admin: Lists / Stats ----------
def _build_filter(q: Optional[str], status: Optional[str], fields: List[str]) -> dict:
    flt: dict = {}
    if status and status in VALID_STATUSES:
        flt["status"] = status
    if q:
        flt["$or"] = [{f: {"$regex": q, "$options": "i"}} for f in fields]
    return flt


@admin_api.get("/stats")
async def admin_stats(current: dict = Depends(get_current_admin)):
    inq = await db.inquiries.count_documents({})
    inq_new = await db.inquiries.count_documents({"status": "new"})
    upl = await db.policy_uploads.count_documents({})
    upl_new = await db.policy_uploads.count_documents({"status": "new"})
    cls = await db.claim_requests.count_documents({})
    cls_new = await db.claim_requests.count_documents({"status": "new"})
    return {
        "inquiries": {"total": inq, "new": inq_new},
        "policy_uploads": {"total": upl, "new": upl_new},
        "claim_requests": {"total": cls, "new": cls_new},
    }


@admin_api.get("/inquiries", response_model=List[Inquiry])
async def admin_list_inquiries(
    q: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 200,
    current: dict = Depends(get_current_admin),
):
    flt = _build_filter(q, status, ["name", "email", "phone", "insurance_type", "message"])
    items = await db.inquiries.find(flt, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [Inquiry(**i) for i in items]


@admin_api.patch("/inquiries/{item_id}", response_model=Inquiry)
async def admin_update_inquiry(
    item_id: str, payload: StatusUpdate, current: dict = Depends(get_current_admin)
):
    update: dict = {}
    if payload.status is not None:
        if payload.status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail="Invalid status")
        update["status"] = payload.status
    if payload.notes is not None:
        update["notes"] = payload.notes
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.inquiries.find_one_and_update(
        {"id": item_id}, {"$set": update}, return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return Inquiry(**res)


@admin_api.get("/policy-uploads", response_model=List[PolicyUploadRecord])
async def admin_list_uploads(
    q: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 200,
    current: dict = Depends(get_current_admin),
):
    flt = _build_filter(q, status, ["name", "email", "phone", "filename", "notes"])
    items = await db.policy_uploads.find(flt, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [PolicyUploadRecord(**i) for i in items]


@admin_api.patch("/policy-uploads/{item_id}", response_model=PolicyUploadRecord)
async def admin_update_upload(
    item_id: str, payload: StatusUpdate, current: dict = Depends(get_current_admin)
):
    update: dict = {}
    if payload.status is not None:
        if payload.status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail="Invalid status")
        update["status"] = payload.status
    if payload.admin_notes is not None:
        update["admin_notes"] = payload.admin_notes
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.policy_uploads.find_one_and_update(
        {"id": item_id}, {"$set": update}, return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return PolicyUploadRecord(**res)


@admin_api.get("/policy-uploads/{item_id}/download")
async def admin_download_upload(item_id: str, current: dict = Depends(get_current_admin)):
    rec = await db.policy_uploads.find_one({"id": item_id}, {"_id": 0})
    if not rec:
        raise HTTPException(status_code=404, detail="Not found")
    file_path = UPLOAD_DIR / rec["stored_filename"]
    if not file_path.exists():
        raise HTTPException(status_code=410, detail="File no longer available")
    return FileResponse(
        path=str(file_path),
        filename=rec["filename"],
        media_type="application/octet-stream",
    )


@admin_api.get("/claim-requests", response_model=List[ClaimSupportRecord])
async def admin_list_claims(
    q: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 200,
    current: dict = Depends(get_current_admin),
):
    flt = _build_filter(
        q,
        status,
        ["name", "email", "phone", "insurer", "policy_number", "claim_type", "message"],
    )
    items = await db.claim_requests.find(flt, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [ClaimSupportRecord(**i) for i in items]


@admin_api.patch("/claim-requests/{item_id}", response_model=ClaimSupportRecord)
async def admin_update_claim(
    item_id: str, payload: StatusUpdate, current: dict = Depends(get_current_admin)
):
    update: dict = {}
    if payload.status is not None:
        if payload.status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail="Invalid status")
        update["status"] = payload.status
    if payload.notes is not None:
        update["notes"] = payload.notes
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    res = await db.claim_requests.find_one_and_update(
        {"id": item_id}, {"$set": update}, return_document=True, projection={"_id": 0}
    )
    if not res:
        raise HTTPException(status_code=404, detail="Not found")
    return ClaimSupportRecord(**res)


api.include_router(admin_api)
app.include_router(api)


# ---------- Startup ----------
@app.on_event("startup")
async def on_startup():
    # Indexes
    await db.admins.create_index("email", unique=True)
    await db.inquiries.create_index("created_at")
    await db.policy_uploads.create_index("created_at")
    await db.claim_requests.create_index("created_at")

    # Seed/refresh admin
    existing = await db.admins.find_one({"email": ADMIN_EMAIL.lower().strip()})
    if existing is None:
        await db.admins.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL.lower().strip(),
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "RightPolicy Admin",
            "role": "admin",
            "created_at": now_iso(),
        })
        logger.info("Admin seeded: %s", ADMIN_EMAIL)
    elif not verify_password(ADMIN_PASSWORD, existing.get("password_hash", "")):
        await db.admins.update_one(
            {"email": ADMIN_EMAIL.lower().strip()},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logger.info("Admin password refreshed: %s", ADMIN_EMAIL)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()


# ---------- Middleware ----------
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)
