from fastapi import FastAPI, APIRouter, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import shutil
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTS = {".pdf", ".png", ".jpg", ".jpeg"}
MAX_UPLOAD_BYTES = 15 * 1024 * 1024  # 15 MB

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="RightPolicy API")
api_router = APIRouter(prefix="/api")


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
    created_at: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "RightPolicy API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/inquiries", response_model=Inquiry, status_code=201)
async def create_inquiry(payload: InquiryCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "phone": payload.phone.strip(),
        "insurance_type": (payload.insurance_type or "").strip() or None,
        "message": (payload.message or "").strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc.copy())
    return Inquiry(**doc)


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(limit: int = 100):
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [Inquiry(**i) for i in items]


@api_router.post("/policy-uploads", response_model=PolicyUploadRecord, status_code=201)
async def upload_policy(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    notes: str = Form(""),
    file: UploadFile = File(...),
):
    # Validate extension
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

    # Write to disk while enforcing max size
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
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.policy_uploads.insert_one(record.copy())
    return PolicyUploadRecord(**record)


@api_router.get("/policy-uploads", response_model=List[PolicyUploadRecord])
async def list_policy_uploads(limit: int = 100):
    items = await db.policy_uploads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return [PolicyUploadRecord(**i) for i in items]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
