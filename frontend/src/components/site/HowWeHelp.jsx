import { Ear, Lightbulb, HeartHandshake } from "lucide-react";

const cards = [
    {
        icon: Ear,
        title: "Understand",
        body: "We start by listening — your family, your finances, your concerns. No forms, no pressure.",
    },
    {
        icon: Lightbulb,
        title: "Recommend",
        body: "We translate the fine print into plain English and recommend cover that fits your real life.",
    },
    {
        icon: HeartHandshake,
        title: "Support",
        body: "We stay with you — at renewal, when life changes, and most importantly, when you need to claim.",
    },
];

export default function HowWeHelp() {
    return (
        <section
            id="about"
            data-testid="how-we-help"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                        How we help
                    </p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                        Three calm steps. Real human guidance throughout.
                    </h2>
                    <p className="mt-5 text-lg text-[#475569] leading-relaxed">
                        Our advisors aren&rsquo;t paid to push policies. They&rsquo;re
                        here to help you choose what&rsquo;s right — and to be there
                        long after you&rsquo;ve signed.
                    </p>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
                    {cards.map((c, i) => (
                        <article
                            key={c.title}
                            data-testid={`how-we-help-card-${c.title.toLowerCase()}`}
                            className="group relative rounded-2xl bg-white border border-[#E2E8F0] p-8 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#C8322A]/25 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-[#475569]">
                                    Step 0{i + 1}
                                </span>
                                <span className="h-px flex-1 bg-[#E2E8F0]" />
                            </div>
                            <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                <c.icon className="h-6 w-6" strokeWidth={1.8} />
                            </div>
                            <h3 className="font-display mt-5 text-2xl font-semibold text-[#0F172A]">
                                {c.title}
                            </h3>
                            <p className="mt-3 text-[#475569] leading-relaxed">
                                {c.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
