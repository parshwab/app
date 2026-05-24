import { useRef, useState } from "react";
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
import { Loader2, UploadCloud, FileText, X, ShieldCheck } from "lucide-react";
import { API } from "@/lib/rp";

const ACCEPT = ".pdf,.png,.jpg,.jpeg";
const MAX_BYTES = 15 * 1024 * 1024;

export default function UploadDialog({ open, onOpenChange }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const onFile = (f) => {
        if (!f) return;
        if (f.size > MAX_BYTES) {
            toast.error("File is larger than 15 MB.");
            return;
        }
        setFile(f);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
            toast.error("Please fill name, email and phone.");
            return;
        }
        if (!file) {
            toast.error("Please attach your existing policy (PDF or image).");
            return;
        }
        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("name", form.name);
            fd.append("email", form.email);
            fd.append("phone", form.phone);
            fd.append("notes", form.notes);
            fd.append("file", file);

            const res = await fetch(`${API}/policy-uploads`, {
                method: "POST",
                body: fd,
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || "Upload failed");
            }
            toast.success("Policy received. Our advisors will review and reach out.");
            setForm({ name: "", email: "", phone: "", notes: "" });
            setFile(null);
            onOpenChange(false);
        } catch (err) {
            toast.error(err.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid="upload-dialog"
                className="sm:max-w-lg bg-white border-[#E2E8F0]"
            >
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-[#0F172A]">
                        Upload Existing Policy
                    </DialogTitle>
                    <DialogDescription className="text-[#475569]">
                        Confidential, free, no obligation. We&rsquo;ll review for
                        coverage gaps and claim risks.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 mt-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="up-name">Full name</Label>
                            <Input
                                id="up-name"
                                data-testid="upload-form-name"
                                value={form.name}
                                onChange={update("name")}
                                required
                                placeholder="Your name"
                                className="mt-1.5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="up-phone">Phone</Label>
                            <Input
                                id="up-phone"
                                data-testid="upload-form-phone"
                                value={form.phone}
                                onChange={update("phone")}
                                required
                                placeholder="+91 ..."
                                className="mt-1.5"
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="up-email">Email</Label>
                        <Input
                            id="up-email"
                            data-testid="upload-form-email"
                            type="email"
                            value={form.email}
                            onChange={update("email")}
                            required
                            placeholder="you@example.com"
                            className="mt-1.5"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-baseline">
                            <Label>Policy file (PDF, PNG or JPG · max 15 MB)</Label>
                            <span className="text-[11px] text-[#C8322A] font-semibold tracking-wide uppercase">
                                Documents validated before review
                            </span>
                        </div>
                        <div
                            onClick={() => inputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                onFile(e.dataTransfer.files?.[0]);
                            }}
                            data-testid="upload-dropzone"
                            className="mt-1.5 cursor-pointer rounded-xl border-2 border-dashed border-[#E2E8F0] hover:border-[#C8322A]/40 bg-[#FAF9F6] p-6 text-center transition-colors"
                        >
                            {!file ? (
                                <div className="flex flex-col items-center gap-2 text-[#475569]">
                                    <UploadCloud className="h-7 w-7 text-[#C8322A]" />
                                    <p className="text-sm">
                                        <span className="font-semibold text-[#0F172A]">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs">
                                        PDF / PNG / JPG up to 15 MB · securely checked
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between gap-3 text-left">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-[#E2E8F0] text-[#C8322A]">
                                            <FileText className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <div className="text-sm font-semibold text-[#0F172A] truncate max-w-[220px]">
                                                {file.name}
                                            </div>
                                            <div className="text-xs text-[#475569]">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFile(null);
                                        }}
                                        data-testid="upload-remove-file"
                                        className="text-[#475569] hover:text-[#0F172A]"
                                        aria-label="Remove file"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                            <input
                                ref={inputRef}
                                type="file"
                                accept={ACCEPT}
                                className="hidden"
                                data-testid="upload-form-file"
                                onChange={(e) => onFile(e.target.files?.[0])}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="up-notes">Anything we should know? (optional)</Label>
                        <Textarea
                            id="up-notes"
                            data-testid="upload-form-notes"
                            value={form.notes}
                            onChange={update("notes")}
                            placeholder="Concerns, claim history, renewal date..."
                            rows={3}
                            className="mt-1.5"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        data-testid="upload-form-submit"
                        className="w-full inline-flex justify-center items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] disabled:opacity-70 text-white font-semibold px-6 py-3 transition-colors"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {loading ? "Uploading..." : "Submit for review"}
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#16A34A] font-semibold mt-1">
                        <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                        Secure upload verification enabled
                    </div>
                    <p className="text-xs text-center text-[#475569]">
                        Your document is handled confidentially by experienced advisors.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
