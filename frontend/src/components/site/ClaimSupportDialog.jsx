import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api, formatApiError } from "@/lib/rp";

const claimTypes = [
    "Health / Hospitalisation",
    "Motor accident",
    "Life claim (death claim)",
    "Critical illness",
    "Travel emergency",
    "Personal accident",
    "Business Package / Property",
    "Other",
];

export default function ClaimSupportDialog({ open, onOpenChange }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        insurer: "",
        policy_number: "",
        claim_type: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            toast.error("Please share name, email, and phone so we can reach you.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/claim-support", form);
            toast.success(
                "We've received your request. We'll get back to you within one business day."
            );
            setForm({
                name: "",
                email: "",
                phone: "",
                insurer: "",
                policy_number: "",
                claim_type: "",
                message: "",
            });
            onOpenChange(false);
        } catch (err) {
            toast.error(formatApiError(err, "Submission failed."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid="claim-dialog"
                className="sm:max-w-lg bg-white border-[#E2E8F0]"
            >
                <DialogHeader>
                    <DialogTitle className="font-display text-xl sm:text-2xl text-[#0F172A]">
                        Get Claim Support
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-[#475569]">
                        Share a few details and we&rsquo;ll help you understand the next
                        step.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <Label htmlFor="cl-name">Full name</Label>
                            <Input
                                id="cl-name"
                                data-testid="claim-form-name"
                                value={form.name}
                                onChange={update("name")}
                                required
                                placeholder="Your name"
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="cl-phone">Phone</Label>
                            <Input
                                id="cl-phone"
                                data-testid="claim-form-phone"
                                value={form.phone}
                                onChange={update("phone")}
                                required
                                placeholder="+91 ..."
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="cl-email">Email</Label>
                        <Input
                            id="cl-email"
                            data-testid="claim-form-email"
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            required
                            placeholder="you@example.com"
                            className="mt-1 sm:mt-1.5"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <Label htmlFor="cl-insurer">Insurer</Label>
                            <Input
                                id="cl-insurer"
                                data-testid="claim-form-insurer"
                                value={form.insurer}
                                onChange={update("insurer")}
                                placeholder="HDFC Ergo, Star, etc."
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="cl-policy">Policy number</Label>
                            <Input
                                id="cl-policy"
                                data-testid="claim-form-policy"
                                value={form.policy_number}
                                onChange={update("policy_number")}
                                placeholder="Optional"
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="cl-type">Claim type</Label>
                        <select
                            id="cl-type"
                            data-testid="claim-form-type"
                            value={form.claim_type}
                            onChange={update("claim_type")}
                            className="mt-1.5 w-full bg-white border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] focus:ring-2 focus:ring-[#C8322A]/40 focus:border-[#C8322A] outline-none"
                        >
                            <option value="">Select (optional)</option>
                            {claimTypes.map((o) => (
                                <option key={o} value={o}>
                                    {o}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="cl-msg">What&rsquo;s happening?</Label>
                        <Textarea
                            id="cl-msg"
                            data-testid="claim-form-message"
                            value={form.message}
                            onChange={update("message")}
                            placeholder="Briefly describe the situation, dates, hospital name (if any)..."
                            rows={3}
                            className="mt-1 sm:mt-1.5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="claim-form-submit"
                        className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] disabled:opacity-70 text-white font-semibold px-6 py-2.5 transition-colors sm:py-3"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Sending..." : "Request claim support"}
                    </button>
                    <p className="text-xs text-center text-[#475569]">
                        Your details are confidential. An advisor will respond.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
