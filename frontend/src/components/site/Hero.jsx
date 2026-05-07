import {
    ArrowRight,
    Upload,
    LifeBuoy,
    ShieldCheck,
    Phone,
    CheckCircle2,
} from "lucide-react";
import { openDialog } from "@/lib/rp";

const ADVISORY_POINTS = [
    "Personalised recommendations",
    "Transparent guidance",
    "Long-term support",
];

const CLAIM_POINTS = [
    "Documentation help",
    "Insurer coordination",
    "Calm guidance during emergencies",
];

export default function Hero() {
    return (
        <section
            id="top"
            data-testid="hero-section"
            className="relative overflow-hidden border-b border-[#E2E8F0]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 lg:pb-24">
                <div className="max-w-4xl">
                    <div
                        data-testid="hero-eyebrow"
                        className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-medium text-[#475569] shadow-sm"
                    >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C8322A]" />
                        Insurance Advisory &amp; Claim Support
                    </div>
                    <h1
                        data-testid="hero-headline"
                        className="font-display mt-6 text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.05] font-bold tracking-tight text-[#0F172A]"
                    >
                        Two ways to feel{" "}
                        <span className="text-[#C8322A]">truly insured.</span>
                    </h1>
                    <p
                        data-testid="hero-subheadline"
                        className="mt-5 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-3xl"
                    >
                        RightPolicy helps you choose insurance wisely, and supports
                        you when you need help during claims. Choose the path you need
                        today.
                    </p>
                </div>

                <div className="mt-12 grid lg:grid-cols-2 gap-5 lg:gap-7">
                    {/* OPTION 1: Insurance Advisory */}
                    <article
                        data-testid="hero-card-advisory"
                        className="group relative rounded-3xl bg-white border border-[#E2E8F0] p-7 sm:p-9 shadow-sm hover:shadow-[0_25px_55px_-22px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:border-[#C8322A]/25 transition-all duration-300 flex flex-col"
                    >
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C8322A]/8 text-[#C8322A]">
                                <ShieldCheck className="h-6 w-6" strokeWidth={1.7} />
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[#FAF9F6] border border-[#E2E8F0] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F172A]">
                                Option 1
                            </span>
                        </div>
                        <h2 className="font-display mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                            Insurance Advisory
                        </h2>
                        <p className="mt-3 text-[#475569] leading-relaxed">
                            Trusted guidance for choosing new insurance, or reviewing
                            an existing policy with experienced advisors.
                        </p>
                        <ul className="mt-5 space-y-2.5">
                            {ADVISORY_POINTS.map((p) => (
                                <li
                                    key={p}
                                    className="flex items-start gap-2.5 text-sm text-[#0F172A]"
                                >
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#16A34A]" />
                                    {p}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-7 flex flex-wrap gap-2.5 pt-6 border-t border-[#E2E8F0]">
                            <button
                                data-testid="hero-talk-advisor-button"
                                onClick={() => openDialog("advisor")}
                                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 text-sm transition-colors shadow-sm"
                            >
                                Book a Free Consultation
                                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                data-testid="hero-upload-policy-button"
                                onClick={() => openDialog("upload")}
                                className="inline-flex items-center gap-2 rounded-full bg-[#FAF9F6] text-[#0F172A] border border-[#E2E8F0] hover:bg-white font-semibold px-5 py-3 text-sm transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Existing Policy
                            </button>
                        </div>
                        <p className="mt-3 text-xs text-[#475569]">
                            A real insurance advisor will connect with you within 24
                            hours.
                        </p>
                    </article>

                    {/* OPTION 2: Claim Support */}
                    <article
                        data-testid="hero-card-claim"
                        className="group relative rounded-3xl bg-[#0F172A] text-white p-7 sm:p-9 shadow-[0_25px_55px_-22px_rgba(15,23,42,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden"
                    >
                        <div
                            aria-hidden
                            className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#C8322A]/12 blur-3xl"
                        />
                        <div className="relative flex items-center gap-3">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#F1A39E]">
                                <LifeBuoy className="h-6 w-6" strokeWidth={1.7} />
                            </span>
                            <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                                Option 2
                            </span>
                        </div>
                        <h2 className="relative font-display mt-5 text-2xl sm:text-3xl font-bold tracking-tight">
                            Claim Support &amp; Assistance
                        </h2>
                        <p className="relative mt-3 text-white/75 leading-relaxed">
                            Support for claim queries, documentation, insurer
                            coordination, and stressful claim situations.
                        </p>
                        <ul className="relative mt-5 space-y-2.5">
                            {CLAIM_POINTS.map((p) => (
                                <li
                                    key={p}
                                    className="flex items-start gap-2.5 text-sm text-white/90"
                                >
                                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[#F1A39E]" />
                                    {p}
                                </li>
                            ))}
                        </ul>

                        <div className="relative mt-7 flex flex-wrap gap-2.5 pt-6 border-t border-white/12">
                            <button
                                data-testid="hero-claim-support-button"
                                onClick={() => openDialog("claim")}
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 text-sm transition-colors shadow-sm"
                            >
                                Get Claim Support
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <a
                                href="/claim-support"
                                data-testid="hero-claim-learn"
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold px-5 py-3 text-sm transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                How we help
                            </a>
                        </div>
                        <p className="relative mt-3 text-xs text-white/70">
                            We respond within one business day, faster on WhatsApp.
                        </p>
                    </article>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#475569]">
                    <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#16A34A]" />
                        IRDAI aligned guidance
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4 text-[#C8322A]" />
                        Experienced advisors on call
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <LifeBuoy className="h-4 w-4 text-[#C8322A]" />
                        Hands on claim assistance
                    </span>
                </div>
            </div>
        </section>
    );
}
