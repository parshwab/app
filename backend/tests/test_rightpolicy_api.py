"""Backend API tests for RightPolicy (health, inquiries, policy-uploads)."""
import os
import io
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL", "admin@rightpolicy.in")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD", "disposableLocalPassword123!")


# ---------- Health ----------
def test_health():
    r = requests.get(f"{API}/health", timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "healthy"
    assert "time" in data


# ---------- Inquiries ----------
def test_create_inquiry_valid_and_persistence():
    payload = {
        "name": "TEST_Aarav Sharma",
        "email": "test_aarav@example.com",
        "phone": "+919876543210",
        "insurance_type": "health",
        "message": "TEST_inquiry please call",
    }
    r = requests.post(f"{API}/inquiries", json=payload, timeout=30)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert "created_at" in data
    assert data["email"] == payload["email"]
    assert data["name"] == payload["name"]
    assert data["phone"] == payload["phone"]

    # GET list (admin) and verify presence
    login = requests.post(f"{API}/admin/login", json={
        "email": ADMIN_EMAIL, "password": ADMIN_PASSWORD
    }, timeout=30)
    assert login.status_code == 200
    token = login.json()["token"]
    g = requests.get(f"{API}/admin/inquiries", headers={"Authorization": f"Bearer {token}"}, timeout=30)
    assert g.status_code == 200
    ids = [i["id"] for i in g.json()]
    assert data["id"] in ids


def test_create_inquiry_invalid_email():
    r = requests.post(
        f"{API}/inquiries",
        json={"name": "TEST_Invalid", "email": "not-an-email", "phone": "9876543210"},
        timeout=30,
    )
    assert r.status_code == 422


def test_create_inquiry_missing_phone():
    r = requests.post(
        f"{API}/inquiries",
        json={"name": "TEST_MissingPhone", "email": "x@example.com"},
        timeout=30,
    )
    assert r.status_code == 422


def test_list_inquiries_admin():
    login = requests.post(f"{API}/admin/login", json={
        "email": ADMIN_EMAIL, "password": ADMIN_PASSWORD
    }, timeout=30)
    assert login.status_code == 200
    token = login.json()["token"]
    r = requests.get(f"{API}/admin/inquiries", headers={"Authorization": f"Bearer {token}"}, timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Policy Uploads ----------
def _pdf_bytes(size=2048):
    # Minimal PDF-ish bytes; backend checks extension and signature
    header = b"%PDF-1.4\n%TEST\n"
    return header + b"0" * max(0, size - len(header))


def test_upload_policy_pdf_success(upload_tracker):
    files = {"file": ("sample_policy.pdf", _pdf_bytes(4096), "application/pdf")}
    data = {
        "name": "TEST_Upload User",
        "email": "test_upload@example.com",
        "phone": "+919999999999",
        "notes": "TEST upload",
    }
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=60)
    assert r.status_code == 201, r.text
    body = r.json()
    upload_tracker.add(body.get("stored_filename"))
    for k in ("id", "filename", "stored_filename", "size_bytes"):
        assert k in body
    assert body["filename"] == "sample_policy.pdf"
    assert body["stored_filename"].endswith(".pdf")
    assert body["size_bytes"] == 4096


def test_upload_policy_png_success(upload_tracker):
    # Valid PNG starts with \x89PNG\r\n\x1a\n
    png_bytes = b"\x89PNG\r\n\x1a\n" + b"0" * 1024
    files = {"file": ("screenshot.png", png_bytes, "image/png")}
    data = {
        "name": "TEST_PNG Upload",
        "email": "test_png@example.com",
        "phone": "+919999999999",
        "notes": "TEST PNG",
    }
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 201, r.text
    body = r.json()
    upload_tracker.add(body.get("stored_filename"))
    assert body["filename"] == "screenshot.png"
    assert body["stored_filename"].endswith(".png")



def test_upload_policy_rejects_exe():
    files = {"file": ("malware.exe", b"MZ\x00\x00hello", "application/octet-stream")}
    data = {"name": "TEST_Malware", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 400, r.text


def test_upload_policy_rejects_oversized():
    # 16 MB > 15 MB limit. Must begin with %PDF signature to pass type check
    big = io.BytesIO(b"%PDF-1.4\n" + b"0" * (16 * 1024 * 1024))
    files = {"file": ("big.pdf", big, "application/pdf")}
    data = {"name": "TEST_Oversized", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=120)
    assert r.status_code == 413, r.status_code


def test_upload_policy_signature_mismatch():
    # .pdf extension but starting with PE/EXE header
    files = {"file": ("fake.pdf", b"MZ\x00\x00somebinarydata", "application/pdf")}
    data = {"name": "TEST_Mismatch", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 400, r.text
    assert "contents do not match" in r.text


def test_upload_policy_empty_file():
    files = {"file": ("empty.pdf", b"", "application/pdf")}
    data = {"name": "TEST_Empty", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 400, r.text
    assert "empty" in r.text or "match" in r.text


def test_list_policy_uploads_admin():
    login = requests.post(f"{API}/admin/login", json={
        "email": ADMIN_EMAIL, "password": ADMIN_PASSWORD
    }, timeout=30)
    assert login.status_code == 200
    token = login.json()["token"]
    r = requests.get(f"{API}/admin/policy-uploads", headers={"Authorization": f"Bearer {token}"}, timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)
