// Centralised brand + helper module for RightPolicy frontend
import axios from "axios";

const configuredBackendUrl = process.env.REACT_APP_BACKEND_URL?.trim().replace(/\/$/, "");
export const BACKEND_URL = configuredBackendUrl || "";
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "";

export const WHATSAPP_NUMBER = "919404908866"; // +91 9404 9088 66
export const WHATSAPP_DISPLAY = "+91 9404 9088 66";
export const CONTACT_EMAIL = "contact@rightpolicy.in";

export const waLink = (msg = "Hi RightPolicy, I'd like to talk to an advisor.") =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const api = axios.create({
    baseURL: API,
    headers: { "Content-Type": "application/json" },
});

export const requireApiUrl = (path = "") => {
    if (!API) {
        throw new Error("Backend URL is not configured. Set REACT_APP_BACKEND_URL in Emergent.");
    }
    return `${API}${path}`;
};

// Attach admin token for admin endpoints
api.interceptors.request.use((config) => {
    if (!API) {
        return Promise.reject(
            new Error("Backend URL is not configured. Set REACT_APP_BACKEND_URL in Emergent.")
        );
    }
    if (config.url?.startsWith("/admin")) {
        const tok = localStorage.getItem("rp_admin_token");
        if (tok) config.headers.Authorization = `Bearer ${tok}`;
    }
    return config;
});

export const openDialog = (which) => {
    window.dispatchEvent(new CustomEvent("rp-open-dialog", { detail: which }));
};

export const formatApiError = (err, fallback = "Something went wrong.") => {
    const detail = err?.response?.data?.detail;
    if (!detail) return err?.message || fallback;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
        return detail
            .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
            .filter(Boolean)
            .join(" · ");
    }
    if (typeof detail?.msg === "string") return detail.msg;
    return fallback;
};
