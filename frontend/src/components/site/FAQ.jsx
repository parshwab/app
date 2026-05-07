import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: "Why use an advisor instead of buying online?",
        a: "Online platforms optimise for price comparison; we optimise for the right outcome. Premiums matter, but exclusions, sub-limits, and claim history matter more — and that requires a human conversation.",
    },
    {
        q: "Can you review my existing policy?",
        a: "Yes. Upload your current policy and we'll review it for coverage gaps, claim risks, and unnecessary costs. The review is free, confidential, and obligation-free.",
    },
    {
        q: "Will you help during claims?",
        a: "Always. Claim assistance is the most important part of what we do — we help with documentation, follow-ups, and escalations so you're not navigating the process alone.",
    },
    {
        q: "Do you charge consultation fees?",
        a: "No. Consultations and policy reviews are free. We're compensated by insurers as IRDAI-licensed intermediaries — but our recommendations are independent, not commission-led.",
    },
    {
        q: "How do I know which insurance is right for me?",
        a: "We start by understanding your family, dependents, income, existing cover, and concerns. Then we shortlist options and walk you through the trade-offs. You decide — we just make the choice clearer.",
    },
    {
        q: "What documents are required?",
        a: "Typically: a valid ID (Aadhaar/PAN), address proof, and your existing policy if you have one. For health and life insurance, basic medical history may be required by the insurer.",
    },
];

export default function FAQ() {
    return (
        <section
            id="contact"
            data-testid="faq-section"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                        Frequently asked
                    </p>
                    <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                        Questions, answered honestly.
                    </h2>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm divide-y divide-[#E2E8F0] overflow-hidden"
                >
                    {faqs.map((f, i) => (
                        <AccordionItem
                            key={f.q}
                            value={`item-${i}`}
                            className="border-0 px-6"
                            data-testid={`faq-item-${i}`}
                        >
                            <AccordionTrigger className="text-left font-display text-base sm:text-lg font-semibold text-[#0F172A] py-5 hover:no-underline">
                                {f.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#475569] leading-relaxed pb-5 text-base">
                                {f.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
