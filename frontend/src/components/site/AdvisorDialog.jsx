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

const insuranceOptions = [
    "Health",
    "Motor",
    "Life",
    "Business Package",
    "Travel",
    "Personal Accident",
    "Not sure yet",
];

export default function AdvisorDialog({ open, onOpenChange }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        insurance_type: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            toast.error("Please fill name, email and phone.");
            return;
        }
        setLoading(true);
        try {
            await api.post("/inquiries", form);
            toast.success("Thanks. We'll get back to you shortly.");
            setForm({
                name: "",
                email: "",
                phone: "",
                insurance_type: "",
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
                data-testid="advisor-dialog"
                className="sm:max-w-lg bg-white border-[#E2E8F0]"
            >
                <DialogHeader>
                    <DialogTitle className="font-display text-xl sm:text-2xl text-[#0F172A]">
                        Book a Free Consultation
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-[#475569]">
                        Share your details and we&rsquo;ll get back to you within one
                        business day.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-3 sm:space-y-4 mt-1 sm:mt-2">
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <Label htmlFor="adv-name">Full name</Label>
                            <Input
                                id="adv-name"
                                data-testid="advisor-form-name"
                                value={form.name}
                                onChange={update("name")}
                                required
                                placeholder="Your name"
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="adv-phone">Phone</Label>
                            <Input
                                id="adv-phone"
                                data-testid="advisor-form-phone"
                                value={form.phone}
                                onChange={update("phone")}
                                required
                                placeholder="+91 ..."
                                className="mt-1 sm:mt-1.5"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="adv-email">Email</Label>
                        <Input
                            id="adv-email"
                            data-testid="advisor-form-email"
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            required
                            placeholder="you@example.com"
                            className="mt-1 sm:mt-1.5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="adv-type">Insurance type</Label>
                        <select
                            id="adv-type"
                            data-testid="advisor-form-type"
                            value={form.insurance_type}
                            onChange={update("insurance_type")}
                            className="mt-1.5 w-full bg-white border border-[#E2E8F0] rounded-md px-3 py-2 text-sm text-[#0F172A] focus:ring-2 focus:ring-[#C8322A]/40 focus:border-[#C8322A] outline-none"
                        >
                            <option value="">Select (optional)</option>
                            {insuranceOptions.map((o) => (
                                <option key={o} value={o}>
                                    {o}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="adv-msg">How can we help?</Label>
                        <Textarea
                            id="adv-msg"
                            data-testid="advisor-form-message"
                            value={form.message}
                            onChange={update("message")}
                            placeholder="Tell us briefly about your situation..."
                            rows={3}
                            className="mt-1 sm:mt-1.5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="advisor-form-submit"
                        className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] disabled:opacity-70 text-white font-semibold px-6 py-2.5 transition-colors sm:py-3"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Sending..." : "Request a callback"}
                    </button>
                    <p className="text-xs text-center text-[#475569]">
                        We respond within one business day. Your details stay private.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
