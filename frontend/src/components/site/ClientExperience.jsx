import { MessageSquareQuote, Users, LifeBuoy, Heart } from "lucide-react";

const values = [
    {
        icon: MessageSquareQuote,
        title: "Insurance counselling",
        body: "Unbiased analysis of policy options based on your present and future needs.",
    },
    {
        icon: Users,
        title: "One point of contact",
        body: "You do not have to explain your situation from scratch every renewal.",
    },
    {
        icon: LifeBuoy,
        title: "Claim support",
        body: "We help with paperwork, insurer follow-ups, and escalation routes when needed.",
    },
    {
        icon: Heart,
        title: "Renewal assistance",
        body: "We remind you before due dates and help update policy details when required.",
    },
];

export default function ClientExperience() {
    return (
        <section
            data-testid="client-experience"
            className="rp-section py-20 sm:py-24 bg-[#F8F6F1] border-y border-[#E2E8F0]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-10 items-end">
                    <div className="lg:col-span-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            Client experience
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                        Everything around the policy, not just the purchase.
                        </h2>
                    </div>
                    <p className="lg:col-span-5 text-[#475569] leading-relaxed">
                        Insurance needs do not end after payment. We stay involved
                        through documents, renewals, claims, and practical next steps.
                    </p>
                </div>

                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {values.map((v) => (
                        <article
                            key={v.title}
                            data-testid={`client-value-${v.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#C8322A]/25 transition-all duration-300"
                        >
                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                <v.icon className="h-5 w-5" strokeWidth={1.8} />
                            </div>
                            <h3 className="font-display mt-4 text-lg font-semibold text-[#0F172A]">
                                {v.title}
                            </h3>
                            <p
                                className="mt-2 text-sm text-[#475569] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: v.body }}
                            />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
