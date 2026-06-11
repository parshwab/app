const stats = [
    { value: "25+", label: "Years in insurance, finance, and claims" },
    { value: "2,000+", label: "Families and businesses covered" },
    { value: "5,000+", label: "General insurance claims handled" },
    { value: "1:1", label: "Personal support, not bot replies" },
];

export default function ImpactStats() {
    return (
        <section
            data-testid="impact-stats"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12 lg:p-14 shadow-sm">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                data-testid={`stat-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                className="min-h-36 border-l border-[#E2E8F0] pl-5 first:border-l-0 first:pl-0 lg:pl-8 lg:first:pl-0"
                            >
                                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-none">
                                    {s.value}
                                </div>
                                <div className="mt-2 text-sm text-[#475569] leading-relaxed max-w-[16rem]">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
