"""Backend tests for RightPolicy admin auth, claim-support, admin list/patch/stats/download."""
import os
import io
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.environ.get("TEST_ADMIN_EMAIL", "admin@rightpolicy.in")
ADMIN_PASSWORD = os.environ.get("TEST_ADMIN_PASSWORD", "disposableLocalPassword123!")


# ---------- Auth helpers ----------
def _login(email=ADMIN_EMAIL, password=ADMIN_PASSWORD):
    return requests.post(f"{API}/admin/login", json={"email": email, "password": password}, timeout=30)


def _token():
    r = _login()
    assert r.status_code == 200, r.text
    return r.json()["token"]


def _hdr():
    return {"Authorization": f"Bearer {_token()}"}


# ---------- Admin Auth ----------
def test_admin_login_success():
    r = _login()
    assert r.status_code == 200, r.text
    body = r.json()
    assert isinstance(body.get("token"), str) and len(body["token"]) > 20
    assert body["user"]["email"] == ADMIN_EMAIL
    assert body["user"].get("role") == "admin"
    assert "password_hash" not in body["user"]
    assert "_id" not in body["user"]


def test_admin_login_wrong_password():
    r = _login(password="wrong-pass")
    assert r.status_code == 401


def test_admin_me_with_token():
    r = requests.get(f"{API}/admin/me", headers=_hdr(), timeout=30)
    assert r.status_code == 200
    me = r.json()
    assert me["email"] == ADMIN_EMAIL
    assert me["role"] == "admin"
    assert "password_hash" not in me


def test_admin_me_without_token():
    r = requests.get(f"{API}/admin/me", timeout=30)
    assert r.status_code == 401


def test_admin_me_invalid_token():
    r = requests.get(f"{API}/admin/me", headers={"Authorization": "Bearer not.a.jwt"}, timeout=30)
    assert r.status_code == 401


# ---------- Claim Support (public) ----------
def test_claim_support_create_valid():
    payload = {
        "name": "TEST_Claim User",
        "email": "test_claim@example.com",
        "phone": "+919898989898",
        "insurer": "TEST_Insurer",
        "policy_number": "POL-TEST-1",
        "claim_type": "health",
        "message": "TEST_claim please help",
    }
    r = requests.post(f"{API}/claim-support", json=payload, timeout=30)
    assert r.status_code == 201, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str)
    assert data["email"] == payload["email"]
    assert data["status"] == "new"


def test_claim_support_invalid_email():
    r = requests.post(
        f"{API}/claim-support",
        json={"name": "X", "email": "not-an-email", "phone": "9876543210"},
        timeout=30,
    )
    assert r.status_code == 422


# ---------- Admin Lists require auth ----------
def test_admin_inquiries_requires_auth():
    r = requests.get(f"{API}/admin/inquiries", timeout=30)
    assert r.status_code == 401


def test_admin_uploads_requires_auth():
    r = requests.get(f"{API}/admin/policy-uploads", timeout=30)
    assert r.status_code == 401


def test_admin_claims_requires_auth():
    r = requests.get(f"{API}/admin/claim-requests", timeout=30)
    assert r.status_code == 401


def test_admin_inquiries_list_with_filter():
    r = requests.get(f"{API}/admin/inquiries?status=new&limit=10", headers=_hdr(), timeout=30)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    for item in data:
        assert item["status"] == "new"


def test_admin_inquiries_search_q():
    r = requests.get(f"{API}/admin/inquiries?q=TEST_", headers=_hdr(), timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json(), list)


# ---------- Admin Stats ----------
def test_admin_stats():
    r = requests.get(f"{API}/admin/stats", headers=_hdr(), timeout=30)
    assert r.status_code == 200
    s = r.json()
    for key in ("inquiries", "policy_uploads", "claim_requests"):
        assert key in s
        assert "total" in s[key] and "new" in s[key]
        assert isinstance(s[key]["total"], int)
        assert isinstance(s[key]["new"], int)


# ---------- Admin PATCH inquiries ----------
def test_admin_patch_inquiry_flow():
    # Seed a public inquiry first
    r = requests.post(f"{API}/inquiries", json={
        "name": "TEST_PatchInq", "email": "test_patchinq@example.com",
        "phone": "9876501234", "insurance_type": "health", "message": "TEST",
    }, timeout=30)
    assert r.status_code == 201
    inq_id = r.json()["id"]

    # Patch valid status + notes
    p = requests.patch(f"{API}/admin/inquiries/{inq_id}",
                      json={"status": "in_progress", "notes": "TEST_admin_note"},
                      headers=_hdr(), timeout=30)
    assert p.status_code == 200, p.text
    body = p.json()
    assert body["status"] == "in_progress"
    assert body["notes"] == "TEST_admin_note"

    # Invalid status
    p2 = requests.patch(f"{API}/admin/inquiries/{inq_id}",
                       json={"status": "garbage"}, headers=_hdr(), timeout=30)
    assert p2.status_code == 400

    # Nonexistent id
    p3 = requests.patch(f"{API}/admin/inquiries/does-not-exist",
                       json={"status": "resolved"}, headers=_hdr(), timeout=30)
    assert p3.status_code == 404


# ---------- Admin PATCH + DOWNLOAD policy-uploads ----------
def test_admin_patch_and_download_upload(upload_tracker):
    # Seed an upload
    files = {"file": ("admin_test.pdf", b"%PDF-1.4\nTESTADMIN", "application/pdf")}
    data = {"name": "TEST_AdminUpl", "email": "test_adminupl@example.com",
            "phone": "9876543210", "notes": "TEST"}
    r = requests.post(f"{API}/policy-uploads", files=files, data=data, timeout=30)
    assert r.status_code == 201
    body = r.json()
    upload_tracker.add(body.get("stored_filename"))
    up_id = body["id"]

    # PATCH
    p = requests.patch(f"{API}/admin/policy-uploads/{up_id}",
                      json={"status": "contacted", "admin_notes": "TEST_reviewed"},
                      headers=_hdr(), timeout=30)
    assert p.status_code == 200, p.text
    body = p.json()
    assert body["status"] == "contacted"
    assert body["admin_notes"] == "TEST_reviewed"

    # Download
    d = requests.get(f"{API}/admin/policy-uploads/{up_id}/download",
                    headers=_hdr(), timeout=30)
    assert d.status_code == 200
    cd = d.headers.get("content-disposition", "")
    assert "admin_test.pdf" in cd
    assert b"%PDF" in d.content


# ---------- Admin PATCH claim-requests ----------
def test_admin_patch_claim_flow():
    r = requests.post(f"{API}/claim-support", json={
        "name": "TEST_PatchClaim", "email": "test_patchclm@example.com",
        "phone": "9876509999", "insurer": "TEST", "claim_type": "motor",
    }, timeout=30)
    assert r.status_code == 201
    cid = r.json()["id"]

    p = requests.patch(f"{API}/admin/claim-requests/{cid}",
                      json={"status": "resolved", "notes": "TEST_done"},
                      headers=_hdr(), timeout=30)
    assert p.status_code == 200, p.text
    body = p.json()
    assert body["status"] == "resolved"
    assert body["notes"] == "TEST_done"

    p2 = requests.patch(f"{API}/admin/claim-requests/does-not-exist",
                       json={"status": "resolved"}, headers=_hdr(), timeout=30)
    assert p2.status_code == 404


# ---------- Admin Search Regex Hardening Tests ----------
def test_admin_search_regex_escaped():
    # 1. Seed a known record first
    payload = {
        "name": "TEST_RegexTestTarget",
        "email": "test_regex@example.com",
        "phone": "+919876543210",
        "insurance_type": "health",
        "message": "TEST regex search target",
    }
    r = requests.post(f"{API}/inquiries", json=payload, timeout=30)
    assert r.status_code == 201
    seeded_id = r.json()["id"]

    # 2. Query search with literal '.*' (un-escaped regex matches everything; escaped regex matches nothing)
    r_wildcard = requests.get(f"{API}/admin/inquiries?q=.*", headers=_hdr(), timeout=30)
    assert r_wildcard.status_code == 200
    matched_ids = [item["id"] for item in r_wildcard.json()]
    # If escaping is active, '.*' matches literally, which does not match "TEST_RegexTestTarget"
    assert seeded_id not in matched_ids

    # 3. Query search with literal target name (verifying search still works perfectly for exact terms)
    r_valid = requests.get(f"{API}/admin/inquiries?q=TEST_RegexTestTarget", headers=_hdr(), timeout=30)
    assert r_valid.status_code == 200
    matched_ids_valid = [item["id"] for item in r_valid.json()]
    assert seeded_id in matched_ids_valid

    # 4. Query containing invalid unclosed regex grouping: ( (unescaped throws 500/errors, escaped handles successfully)
    r_invalid = requests.get(f"{API}/admin/inquiries?q=(", headers=_hdr(), timeout=30)
    assert r_invalid.status_code == 200
    assert isinstance(r_invalid.json(), list)

    # 5. Query exceeding 100 characters limit (FastAPI returns 422)
    long_q = "a" * 150
    r_long = requests.get(f"{API}/admin/inquiries?q={long_q}", headers=_hdr(), timeout=30)
    assert r_long.status_code == 422

    # 6. Admin list limit out of bounds (too large, expects 422)
    r_limit_large = requests.get(f"{API}/admin/inquiries?limit=250", headers=_hdr(), timeout=30)
    assert r_limit_large.status_code == 422

    # 7. Admin list limit out of bounds (too small, expects 422)
    r_limit_small = requests.get(f"{API}/admin/inquiries?limit=0", headers=_hdr(), timeout=30)
    assert r_limit_small.status_code == 422
