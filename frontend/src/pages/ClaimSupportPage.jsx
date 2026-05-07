import { useEffect } from "react";
import {
    LifeBuoy,
    ArrowRight,
    FileCheck,
    Phone,
    Scale,
    HeartHandshake,
    AlertCircle,
    ClipboardList,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { openDialog, waLink, WHATSAPP_DISPLAY } from "@/lib/rp";

const HELP = [
    {
        icon: ClipboardList,
        title: "Documentation guidance",
        body: "We tell you exactly which forms, bills, and reports to collect — and in what order. No paperwork loops.",
    },
    {
        icon: HeartHandshake,
        title: "Insurer coordination",
        body: "We speak insurer language, follow up on your behalf, and keep you out of long call queues.",
    },
    {
        icon: AlertCircle,
        title: "Claim query support",
        body: "When the insurer asks for clarifications, we help you respond clearly and within deadlines.",
    },
    {
        icon: Scale,
        title: "Escalation support",
        body: "If a fair claim gets unfairly rejected, we help you escalate — internally, to the Ombudsman, or further.",
    },
    {
        icon: Phone,
        title: "Emergency guidance",
        body: "Hospital admission at 2 AM? We help you with cashless authorisation and the next 24 hours.",
    },
    {
        icon: FileCheck,
        title: "Settlement review",
        body: "We review the final settlement so you don&rsquo;t accept less than you&rsquo;re entitled to.",
    },
];

const STEPS = [
    {
        n: "01",
        t: "Tell us what's happening",
        b: "Share basics — insurer, policy number, claim type. We respond within hours, not days.",
    },
    {
        n: "02",
        t: "We map the next steps",
        b: "Documentation, intimation timelines, hospital coordination — laid out clearly.",
    },
    {
        n: "03",
        t: "We handle the back-and-forth",
        b: "Phone calls, emails, surveyor visits — we coordinate so you can focus on what matters.",
    },
    {
        n: "04",
        t: "We stay until it's resolved",
        b: "Through approval, settlement, and (if needed) escalation. Quietly, calmly.",
    },
];

const FAQS = [
    {
        q: "Can you help with a claim if I didn't buy the policy from RightPolicy?",
        a: "Yes. Claim support is a separate vertical. We've helped families with policies from almost every Indian insurer.",
    },
    {
        q: "Is claim support free?",
        a: "Initial consultation and basic guidance are always free. For complex claim escalations, we'll be upfront about scope and effort before you commit.",
    },
    {
        q: "What if my claim has already been rejected?",
        a: "Don't accept it as final. Many rejections are reversed on appeal. Send us the rejection letter and policy — we'll review the grounds.",
    },
    {
        q: "How fast can you respond in an emergency?",
        a: "WhatsApp us — we typically respond within an hour during waking hours, faster in true emergencies.",
    },
    {
        q: "Will you talk to the hospital and insurer directly?",
        a: "Yes — with your written authorisation, we coordinate directly with both, especially for cashless approvals and surveyor visits.",
    },
];

export default function ClaimSupportPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    return (
        <article data-testid="claim-support-page" className="bg-[#FAF9F6]">
            {/* Hero — calm, reassuring */}
            <section className="border-b border-[#E2E8F0]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-3.5 py-1.5 text-xs font-medium text-[#475569]">
                        <LifeBuoy className="h-3.5 w-3.5 text-[#C8322A]" />
                        Claim Support &amp; Assistance
                    </div>
                    <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.05] max-w-4xl mx-auto">
                        You don&rsquo;t have to face a{" "}
                        <span className="text-[#C8322A]">claim alone.</span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-2xl mx-auto">
                        A real human will help you understand your policy, organise
                        documents, coordinate with insurers, and stay with you until
                        your claim is resolved — calmly and without judgement.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3 justify-center">
                        <button
                            data-testid="claim-page-cta"
                            onClick={() => openDialog("claim")}
                            className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 transition-colors shadow-sm"
                        >
                            Get Claim Support
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <a
                            href={waLink("Hi RightPolicy, I need help with a claim.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="claim-page-whatsapp"
                            className="inline-flex items-center gap-2 rounded-full bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F3F4F6] font-semibold px-6 py-3.5 transition-colors"
                        >
                            <Phone className="h-4 w-4" />
                            WhatsApp {WHATSAPP_DISPLAY}
                        </a>
                    </div>
                </div>
            </section>

            {/* How we help */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            How RightPolicy helps during claims
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                            Real human help, end to end.
                        </h2>
                        <p className="mt-5 text-lg text-[#475569] leading-relaxed">
                            Insurance is sold easily. Claims are where it gets hard. We
                            stand on your side — quietly, persistently, and with the
                            insurers&rsquo; processes already mapped out.
                        </p>
                    </div>

                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                        {HELP.map(({ icon: Icon, title, body }) => (
                            <article
                                key={title}
                                data-testid={`claim-help-${title.toLowerCase().replace(/\s+/g, "-")}`}
                                className="rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                                </div>
                                <h3 className="font-display mt-4 text-lg font-semibold text-[#0F172A]">
                                    {title}
                                </h3>
                                <p
                                    className="mt-2 text-sm text-[#475569] leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: body }}
                                />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works (4 step) */}
            <section className="py-16 sm:py-24 bg-white border-y border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            What happens after you reach out
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                            Four calm steps.
                        </h2>
                    </div>
                    <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                        {STEPS.map((s) => (
                            <li
                                key={s.n}
                                className="rounded-2xl bg-[#FAF9F6] border border-[#E2E8F0] p-7"
                            >
                                <div className="font-display text-3xl font-bold text-[#C8322A]">
                                    {s.n}
                                </div>
                                <h3 className="font-display mt-3 text-lg font-semibold text-[#0F172A]">
                                    {s.t}
                                </h3>
                                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                                    {s.b}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Reassurance band */}
            <section className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-[1.1]">
                        &ldquo;RightPolicy isn&rsquo;t only there when you buy
                        insurance — they&rsquo;re there when you actually need help.&rdquo;
                    </h2>
                    <p className="mt-5 text-[#475569]">
                        That&rsquo;s the promise. Quietly kept, again and again.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-24 bg-white border-y border-[#E2E8F0]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            Claim FAQs
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                            Common questions, answered.
                        </h2>
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="mt-10 rounded-2xl border border-[#E2E8F0] bg-[#FAF9F6] shadow-sm divide-y divide-[#E2E8F0] overflow-hidden"
                    >
                        {FAQS.map((f, i) => (
                            <AccordionItem
                                key={f.q}
                                value={`citem-${i}`}
                                className="border-0 px-6"
                                data-testid={`claim-faq-${i}`}
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

            {/* Closing */}
            <section className="py-16 sm:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-[#0F172A] text-white p-10 sm:p-14 text-center relative overflow-hidden">
                        <div
                            aria-hidden
                            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#C8322A]/15 blur-3xl"
                        />
                        <h2 className="font-display relative text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-[1.1]">
                            Whatever your claim situation — start the conversation.
                        </h2>
                        <p className="relative mt-4 text-white/75 max-w-xl mx-auto">
                            A real advisor will respond within one business day.
                        </p>
                        <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
                            <button
                                data-testid="claim-page-bottom-cta"
                                onClick={() => openDialog("claim")}
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5"
                            >
                                Get Claim Support
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
