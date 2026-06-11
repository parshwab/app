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
    "Policy options explained clearly",
    "Help comparing trade-offs",
    "Support at renewal and claim time",
];

const CLAIM_POINTS = [
    "Documentation help",
    "Insurer coordination",
    "Support during urgent situations",
];

const BRAND_PROMISE = [
    "Right Policy",
    "Right People",
    "Right Advice",
    "Right Assistance",
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
                        Pune-based Insurance Advisory &amp; Claim Support
                    </div>
                    <h1
                        data-testid="hero-headline"
                        className="font-display mt-6 text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.05] font-bold tracking-tight text-[#0F172A]"
                    >
                        Insurance advice from{" "}
                        <span className="text-[#C8322A]">real people, not bots.</span>
                    </h1>
                    <p
                        data-testid="hero-subheadline"
                        className="mt-5 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-3xl"
                    >
                        Built over 25+ years in Pune, RightPolicy gives families and
                        businesses advisor-led guidance before they buy, renew, or file
                        a claim. For something this personal, you should be able to
                        speak to a person.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2.5" aria-label="RightPolicy promise">
                        {BRAND_PROMISE.map((item) => (
                            <span
                                key={item}
                                className="inline-flex rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#0F172A] shadow-sm"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-5 lg:gap-7 items-stretch">
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
                            Choose a new policy or review an existing one with someone
                            who can explain the details properly.
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

                        <div className="mt-auto pt-7">
                            <div className="flex flex-wrap gap-2.5 pt-6 border-t border-[#E2E8F0]">
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
                                We&rsquo;ll get back to you within one business day.
                            </p>
                        </div>
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
                            Help with claim questions, paperwork, insurer follow-ups,
                            and situations where the process has slowed down.
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

                        <div className="relative mt-auto pt-7">
                            <div className="flex flex-wrap gap-2.5 pt-6 border-t border-white/12">
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
                            <p className="mt-3 text-xs text-white/70">
                                We respond within one business day, faster on
                                WhatsApp.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
