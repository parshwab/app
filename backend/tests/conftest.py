import os
from pathlib import Path

import pytest
from dotenv import load_dotenv
from pymongo import MongoClient

BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env")

# Session-wide list to track stored filenames created during this test run.
CREATED_TEST_FILENAMES = []


@pytest.fixture(scope="session", autouse=True)
def cleanup_test_suite():
    yield

    # Remove only upload files created during this test session.
    uploads_dir = BACKEND_DIR / "uploads"
    if uploads_dir.exists():
        for filename in CREATED_TEST_FILENAMES:
            filepath = uploads_dir / filename
            if filepath.exists() and filename != ".gitkeep":
                try:
                    filepath.unlink()
                except OSError:
                    pass

    # Use the same database configuration loaded by backend/server.py.
    mongo_url = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
    db_name = os.environ.get("DB_NAME", "rightpolicy")
    try:
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=2000)
        db = client[db_name]
        db.inquiries.delete_many({"name": {"$regex": "^TEST_"}})
        db.policy_uploads.delete_many({"name": {"$regex": "^TEST_"}})
        db.claim_requests.delete_many({"name": {"$regex": "^TEST_"}})
        client.close()
    except Exception:
        pass


@pytest.fixture(scope="session")
def upload_tracker():
    class Tracker:
        def __init__(self):
            self.filenames = CREATED_TEST_FILENAMES

        def add(self, filename):
            if filename:
                self.filenames.append(filename)

    return Tracker()
