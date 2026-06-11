import { Phone, Compass, BadgeCheck, Infinity as InfinityIcon } from "lucide-react";

const steps = [
    {
        icon: Phone,
        title: "Talk to an Advisor",
        body: "A short call to understand what you need covered and what you already have.",
    },
    {
        icon: Compass,
        title: "Get Personalized Guidance",
        body: "We compare suitable options and explain the practical differences.",
    },
    {
        icon: BadgeCheck,
        title: "Choose with Confidence",
        body: "You decide. We help with forms, KYC, and policy issuance.",
    },
    {
        icon: InfinityIcon,
        title: "Ongoing Support",
        body: "Need help with renewal, changes, or a claim later? You can reach us.",
    },
];

export default function HowItWorks() {
    return (
        <section
            data-testid="how-it-works"
            className="rp-section py-20 sm:py-24 bg-[#F8F6F1] border-y border-[#E2E8F0]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                        How it works
                    </p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                        Four steps. Zero pressure.
                    </h2>
                </div>

                <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {steps.map((s, i) => (
                        <li
                            key={s.title}
                            data-testid={`how-step-${i + 1}`}
                            className="relative rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-display text-sm font-semibold text-[#475569]">
                                    Step {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                    <s.icon className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                            </div>
                            <h3 className="font-display mt-5 text-lg font-semibold text-[#0F172A]">
                                {s.title}
                            </h3>
                            <p
                                className="mt-2 text-sm text-[#475569] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: s.body }}
                            />
                            {i < steps.length - 1 && (
                                <span
                                    aria-hidden
                                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#E2E8F0]"
                                />
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
