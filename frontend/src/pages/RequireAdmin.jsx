import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/rp";

export default function RequireAdmin({ children }) {
    const [state, setState] = useState("checking"); // checking | ok | fail
    useEffect(() => {
        const tok = localStorage.getItem("rp_admin_token");
        if (!tok) {
            setState("fail");
            return;
        }
        api
            .get("/admin/me")
            .then(() => setState("ok"))
            .catch(() => {
                localStorage.removeItem("rp_admin_token");
                setState("fail");
            });
    }, []);

    if (state === "checking") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#475569]">
                Checking session…
            </div>
        );
    }
    if (state === "fail") return <Navigate to="/admin/login" replace />;
    return children;
}
