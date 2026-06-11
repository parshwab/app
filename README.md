# RightPolicy — Premium Insurance Advisory & Claim Support

RightPolicy is a premium, client-first insurance advisory and claim assistance platform for India. Designed with a warm, modern aesthetic and high-security standards, RightPolicy assists families and small businesses in making confident insurance choices and navigating complex claim coordinates.

---

## 🚀 Getting Started

### 1. Local Environment Setup

Ensure you have **MongoDB** installed and running locally on your system:
* **Mac (Homebrew)**: `brew services start mongodb-community`
* **Default URL**: `mongodb://localhost:27017`

### 2. Backend Installation & Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Create your local configuration file `.env`:
   ```bash
   cp .env.example .env
   ```

### 3. Required Environment Variables

Set the following variables inside `backend/.env`:
* `MONGO_URL`: Connection string (e.g. `mongodb://localhost:27017`)
* `DB_NAME`: Database name (e.g. `rightpolicy`)
* `ADMIN_EMAIL`: Administrator account email (e.g. `admin@rightpolicy.in`)
* `ADMIN_USERNAME`: Administrator username (default: `rightadmin`)
* `ADMIN_PASSWORD`: **(Required)** A strong, secure admin password.
* `JWT_SECRET`: **(Required)** A secure, random token signing key.
* `ALLOW_INSECURE_DEFAULTS`: Set to `true` **ONLY** in exceptional local developer environments if you wish to bypass required passwords on startup and use defaults (`admin123` / `dev-secret-change-me`). Must be `false` in staging/production.
* `RESEND_API_KEY`: API token from Resend. Fallback defaults to log-only console emails if empty.
* `CORS_ORIGINS`: Exact allowed domains separated by commas (e.g. `http://localhost:3000`).

### 4. Running the Backend Service

To start the FastAPI backend service with live reloading, run:
```bash
cd backend && uvicorn server:app --port 8000 --reload
```

---

## 💻 Frontend Installation & Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000` and automatically proxy request APIs to the backend service.

---

## 🧪 Running Automated Tests

Pytest matches a localhost target by default:
1. Ensure the local backend server is running on port `8000`.
2. Execute the test suite from the root folder:
   ```bash
   TEST_ADMIN_EMAIL=admin@rightpolicy.in TEST_ADMIN_USERNAME=rightadmin TEST_ADMIN_PASSWORD=yourStrongLocalPassword pytest backend/tests
   ```

*Note: Pytest automatically connects to your local MongoDB instance to prune `TEST_`-prefixed database records and deletes specific test spooled upload files upon session teardown.*

---

## 🚢 Emergent Deployment Checklist

Before publishing the production preview, set these values in Emergent's environment/settings area.

Backend environment:
* `APP_ENV=production`
* `MONGO_URL`: Emergent's MongoDB connection value
* `DB_NAME=rightpolicy`
* `ADMIN_EMAIL=admin@rightpolicy.in`
* `ADMIN_USERNAME=rightadmin`
* `ADMIN_PASSWORD`: set this inside Emergent only; do not commit it to Git
* `JWT_SECRET`: a long random secret value
* `ALLOW_INSECURE_DEFAULTS=false`
* `CORS_ORIGINS`: the exact Emergent frontend URL
* `RESEND_API_KEY`, `SENDER_EMAIL`, `ADVISOR_ALERT_EMAIL`: required only when live email alerts should send

Frontend environment:
* `REACT_APP_BACKEND_URL`: the Emergent backend base URL, without `/api` at the end

The admin screen accepts either the configured email or the configured username. For this project, the username is `rightadmin`.

## 🔒 Security & Deployment Hardening

> [!WARNING]
> **Production password safety**:
> Keep the admin password only in Emergent environment variables. Never commit the real value to Git, README files, test files, or screenshots.

* **Production Secrets Enforced**: Default credentials have been fully disabled. If `ADMIN_PASSWORD` or `JWT_SECRET` are not set, the server will crash on startup rather than falling back to weak passwords, unless `ALLOW_INSECURE_DEFAULTS=true` is set.
* **CORS Wildcard Security**: The backend enforces that `allow_credentials` is never paired with wildcard origin `*` parameters, keeping communication between frontend and backend spec-compliant and secure.
* **Non-Blocking Threadpool Writes**: Disk writes for uploads are offloaded to an asynchronous worker thread using `anyio.to_thread.run_sync`, keeping the main thread responsive.
