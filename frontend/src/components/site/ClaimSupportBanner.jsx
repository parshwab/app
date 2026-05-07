import { LifeBuoy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { openDialog } from "@/lib/rp";

export default function ClaimSupportBanner() {
    return (
        <section
            id="claims"
            data-testid="claim-support-banner"
            className="rp-section py-16 sm:py-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-10 lg:p-12 shadow-sm">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#C8322A]/8 text-[#C8322A] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
                                <LifeBuoy className="h-4 w-4" />
                                Claim Support
                            </div>
                            <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-[1.1]">
                                We&rsquo;re not just here when you{" "}
                                <span className="text-[#C8322A]">buy</span> — we&rsquo;re
                                here when you actually need help.
                            </h2>
                            <p className="mt-5 text-lg text-[#475569] leading-relaxed max-w-2xl">
                                Claims can feel overwhelming. Our advisors help with
                                paperwork, follow up with insurers, and stand with you
                                through escalations — even if you didn&rsquo;t buy the
                                policy from us.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
                            <button
                                data-testid="claim-banner-cta"
                                onClick={() => openDialog("claim")}
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 transition-colors shadow-sm"
                            >
                                Get Claim Support
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <Link
                                to="/claim-support"
                                data-testid="claim-banner-learn"
                                className="text-sm font-semibold text-[#0F172A] hover:text-[#C8322A] transition-colors"
                            >
                                How we help during claims →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
