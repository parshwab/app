import { ArrowRight, Upload, ShieldCheck, Phone } from "lucide-react";
import { openDialog } from "@/lib/rp";

export default function Hero() {
    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div className="lg:col-span-7 rp-fade-up">
                        <div
                            data-testid="hero-eyebrow"
                            className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-medium text-[#475569] shadow-sm"
                        >
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C8322A]" />
                            Human-first insurance advisory · India
                        </div>

                        <h1
                            data-testid="hero-headline"
                            className="font-display mt-6 text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.05] font-bold tracking-tight text-[#0F172A]"
                        >
                            Insurance advice from{" "}
                            <span className="text-[#C8322A]">real people</span> who
                            care.
                        </h1>

                        <p
                            data-testid="hero-subheadline"
                            className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl"
                        >
                            No bots. No automated recommendations. Just experienced
                            advisors helping you make confident insurance decisions —
                            for your family, your health, and your business.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                data-testid="hero-talk-advisor-button"
                                onClick={() => openDialog("advisor")}
                                className="group inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 text-base transition-colors shadow-sm"
                            >
                                Book a Free Consultation
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                data-testid="hero-upload-policy-button"
                                onClick={() => openDialog("upload")}
                                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F3F4F6] font-semibold px-6 py-3.5 text-base transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Existing Policy
                            </button>
                        </div>
                        <p className="mt-3 text-sm text-[#475569]">
                            A real insurance advisor will connect with you within 24 hours.
                        </p>

                        <div className="mt-8 flex items-center gap-6 text-sm text-[#475569]">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                                IRDAI-aligned guidance
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#C8322A]" />
                                Real humans on call
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 rp-fade-up" style={{ animationDelay: "120ms" }}>
                        <div className="relative">
                            <div className="absolute -inset-3 rounded-[2rem] bg-[#C8322A]/5 blur-2xl" />
                            <div className="relative rounded-[2rem] overflow-hidden border border-[#E2E8F0] shadow-[0_30px_60px_-25px_rgba(15,23,42,0.18)] bg-white">
                                <img
                                    src="https://images.unsplash.com/photo-1659352786973-82ae3af461a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmYW1pbHklMjBpbnN1cmFuY2UlMjBoYXBweXxlbnwwfHx8fDE3NzgxMzE3MDB8MA&ixlib=rb-4.1.0&q=85"
                                    alt="An Indian family being guided through their insurance decisions"
                                    className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover"
                                    loading="eager"
                                />
                            </div>

                            <div
                                data-testid="hero-floating-card"
                                className="absolute -bottom-6 -left-4 sm:-left-8 max-w-[260px] rounded-2xl bg-white border border-[#E2E8F0] shadow-lg p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#C8322A]/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-[#C8322A]" />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-wider text-[#475569]">
                                            Speak with
                                        </div>
                                        <div className="font-semibold text-[#0F172A]">
                                            A real advisor
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs text-[#475569] leading-relaxed">
                                    No hold queues. No call centers. Just calm, expert
                                    conversations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
