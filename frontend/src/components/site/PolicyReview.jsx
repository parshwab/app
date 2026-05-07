import { FileSearch, ShieldCheck, Lock } from "lucide-react";
import { openDialog } from "@/lib/rp";

export default function PolicyReview() {
    return (
        <section
            id="policy-review"
            data-testid="policy-review-section"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-[#0F172A] text-white">
                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(1200px 400px at 80% -10%, #C8322A 0%, transparent 60%)",
                        }}
                    />
                    <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-12 p-8 sm:p-12 lg:p-16">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F1A39E]">
                                Policy Review · Free
                            </p>
                            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                                Get a second opinion on your insurance.
                            </h2>
                            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-2xl">
                                Upload your existing policy and our advisors will review
                                it for hidden gaps, claim risks, and unnecessary costs —
                                confidentially, and with no obligation.
                            </p>

                            <ul className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl">
                                {[
                                    { icon: FileSearch, t: "Coverage gap analysis" },
                                    { icon: ShieldCheck, t: "Claim-readiness check" },
                                    { icon: Lock, t: "Confidential handling" },
                                    { icon: ShieldCheck, t: "Plain-English summary" },
                                ].map(({ icon: Icon, t }) => (
                                    <li
                                        key={t}
                                        className="flex items-start gap-3 text-white/90"
                                    >
                                        <Icon className="h-5 w-5 mt-0.5 text-[#F1A39E]" />
                                        <span className="text-sm">{t}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-9 flex flex-wrap gap-3">
                                <button
                                    data-testid="policy-review-upload-button"
                                    onClick={() => openDialog("upload")}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 transition-colors"
                                >
                                    Upload Existing Policy
                                </button>
                                <button
                                    data-testid="policy-review-talk-button"
                                    onClick={() => openDialog("advisor")}
                                    className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold px-6 py-3.5 transition-colors"
                                >
                                    Or talk to an advisor first
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxmaW5hbmNpYWwlMjBhZHZpc29yJTIwbWVldGluZyUyMGluZGlhbnxlbnwwfHx8fDE3NzgxMzE3MDB8MA&ixlib=rb-4.1.0&q=85"
                                    alt="Advisor reviewing a client's policy"
                                    className="w-full h-[360px] lg:h-[440px] object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-white/70">
                                <Lock className="h-4 w-4" /> Your documents stay
                                private. Reviewed by humans, not algorithms.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
