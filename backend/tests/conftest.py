import os
import pytest
from pymongo import MongoClient

# Session-wide list to track spooled/stored filenames created during this test run
CREATED_TEST_FILENAMES = []

@pytest.fixture(scope="session", autouse=True)
def cleanup_test_suite():
    yield
    
    # Teardown: Clean up targeted files that were tracked during this test session
    uploads_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
    if os.path.exists(uploads_dir):
        for filename in CREATED_TEST_FILENAMES:
            filepath = os.path.join(uploads_dir, filename)
            if os.path.exists(filepath) and filename != ".gitkeep":
                try:
                    os.unlink(filepath)
                except Exception:
                    pass

    # Clean up test database records (names starting with TEST_)
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
