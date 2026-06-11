import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Logo from "@/components/site/Logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { api, formatApiError } from "@/lib/rp";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post("/admin/login", { email, password });
            localStorage.setItem("rp_admin_token", data.token);
            toast.success("Welcome back.");
            navigate("/admin", { replace: true });
        } catch (err) {
            toast.error(formatApiError(err, "Login failed."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
            <Toaster position="top-center" richColors />
            <div className="w-full max-w-md">
                <Link to="/" className="flex items-center justify-center">
                    <Logo asLink={false} className="h-14" />
                </Link>
                <div className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm p-8">
                    <h1 className="font-display text-2xl font-bold text-[#0F172A]">
                        Admin sign in
                    </h1>
                    <p className="mt-2 text-sm text-[#475569]">
                        Internal access only.
                    </p>
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <div>
                            <Label htmlFor="al-email">Email</Label>
                            <Input
                                id="al-email"
                                data-testid="admin-login-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@rightpolicy.in"
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="al-pass">Password</Label>
                            <Input
                                id="al-pass"
                                data-testid="admin-login-password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1.5"
                            />
                        </div>
                        <button
                            type="submit"
                            data-testid="admin-login-submit"
                            disabled={loading}
                            className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] disabled:opacity-70 text-white font-semibold px-6 py-3 transition-colors"
                        >
                            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>
                <p className="mt-6 text-xs text-center text-[#475569]">
                    <Link to="/" className="hover:text-[#0F172A]">
                        ← Back to site
                    </Link>
                </p>
            </div>
        </div>
    );
}
