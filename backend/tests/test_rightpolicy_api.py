"""Backend API tests for RightPolicy (health, inquiries, policy-uploads)."""
import os
import io
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://advisor-first-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


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

    # GET list and verify presence
    g = requests.get(f"{API}/inquiries", timeout=30)
    assert g.status_code == 200
    ids = [i["id"] for i in g.json()]
    assert data["id"] in ids


def test_create_inquiry_invalid_email():
    r = requests.post(
        f"{API}/inquiries",
        json={"name": "X", "email": "not-an-email", "phone": "9876543210"},
        timeout=30,
    )
    assert r.status_code == 422


def test_create_inquiry_missing_phone():
    r = requests.post(
        f"{API}/inquiries",
        json={"name": "X", "email": "x@example.com"},
        timeout=30,
    )
    assert r.status_code == 422


def test_list_inquiries():
    r = requests.get(f"{API}/inquiries", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Policy Uploads ----------
def _pdf_bytes(size=2048):
    # Minimal PDF-ish bytes; backend only checks extension and size
    header = b"%PDF-1.4\n%TEST\n"
    return header + b"0" * max(0, size - len(header))


def test_upload_policy_pdf_success():
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
    for k in ("id", "filename", "stored_filename", "size_bytes"):
        assert k in body
    assert body["filename"] == "sample_policy.pdf"
    assert body["stored_filename"].endswith(".pdf")
    assert body["size_bytes"] == 4096


def test_upload_policy_rejects_exe():
    files = {"file": ("malware.exe", b"MZ\x00\x00hello", "application/octet-stream")}
    data = {"name": "X", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 400, r.text


def test_upload_policy_rejects_oversized():
    # 16 MB > 15 MB limit
    big = io.BytesIO(b"0" * (16 * 1024 * 1024))
    files = {"file": ("big.pdf", big, "application/pdf")}
    data = {"name": "X", "email": "x@example.com", "phone": "9876543210"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=120)
    assert r.status_code == 413, r.status_code


def test_list_policy_uploads():
    r = requests.get(f"{API}/policy-uploads", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)
