import { Check, X } from "lucide-react";

const rows = [
    "Advisor you can speak to",
    "Recommendations based on your needs",
    "Policy purchase assistance",
    "Backup of policy documents",
    "Claim paperwork support",
    "Help at renewal time",
];

export default function WhyRightPolicy() {
    return (
        <section
            data-testid="why-rightpolicy"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                        Why RightPolicy
                    </p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                        The honest way to choose insurance.
                    </h2>
                    <p className="mt-5 text-lg text-[#475569] leading-relaxed">
                        We help with policy selection, purchase assistance, renewals,
                        claim support, and remedial guidance if an insurer dispute
                        needs to be escalated.
                    </p>
                </div>

                <div className="mt-12 rounded-3xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
                    <div className="grid grid-cols-3 text-sm sm:text-base">
                        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] bg-[#F3F4F6] font-display font-semibold text-[#0F172A]">
                            What you get
                        </div>
                        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] bg-[#F3F4F6] font-display font-semibold text-[#0F172A]">
                            Typical comparison sites
                        </div>
                        <div className="p-5 sm:p-6 border-b border-[#E2E8F0] bg-[#0F172A] text-white font-display font-semibold flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#C8322A]" />
                            RightPolicy Advisory
                        </div>

                        {rows.map((label, i) => (
                            <div key={label} className="contents">
                                <div
                                    className={`p-5 sm:p-6 ${
                                        i !== rows.length - 1
                                            ? "border-b border-[#E2E8F0]"
                                            : ""
                                    } text-[#0F172A] font-medium`}
                                    data-testid={`compare-row-label-${i}`}
                                >
                                    {label}
                                </div>
                                <div
                                    className={`p-5 sm:p-6 ${
                                        i !== rows.length - 1
                                            ? "border-b border-[#E2E8F0]"
                                            : ""
                                    } text-[#475569]`}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-[#C8322A]">
                                            <X className="h-3.5 w-3.5" strokeWidth={3} />
                                        </span>
                                        Not really
                                    </span>
                                </div>
                                <div
                                    className={`p-5 sm:p-6 ${
                                        i !== rows.length - 1
                                            ? "border-b border-[#E2E8F0]"
                                            : ""
                                    } bg-[#0F172A]/[0.02] text-[#0F172A] font-medium`}
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-[#16A34A]">
                                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                        </span>
                                        Included
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
