import { useEffect } from "react";
import {
    ArrowRight,
    Clock,
    FileText,
    LifeBuoy,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";
import {
    CONTACT_EMAIL,
    WHATSAPP_DISPLAY,
    waLink,
    openDialog,
} from "@/lib/rp";

const contactOptions = [
    {
        icon: MessageCircle,
        title: "WhatsApp",
        body: "Best for quick questions, claim urgency, and sending basic details.",
        action: "Chat on WhatsApp",
        href: waLink("Hi RightPolicy, I need help with insurance."),
    },
    {
        icon: Mail,
        title: "Email",
        body: "Useful when you want to share documents or explain the issue in detail.",
        action: CONTACT_EMAIL,
        href: `mailto:${CONTACT_EMAIL}`,
    },
    {
        icon: Phone,
        title: "Phone",
        body: "Request a callback and we will get back within one business day.",
        action: WHATSAPP_DISPLAY,
        href: waLink("Hi RightPolicy, please call me back."),
    },
];

const reasons = [
    {
        icon: FileText,
        title: "Review an existing policy",
        body: "Upload the policy and we will check cover, exclusions, and claim-related risks.",
        button: "Upload Policy",
        dialog: "upload",
    },
    {
        icon: LifeBuoy,
        title: "Need help with a claim",
        body: "Share the insurer, policy number, claim type, and what has happened so far.",
        button: "Get Claim Support",
        dialog: "claim",
    },
    {
        icon: Clock,
        title: "Buying or renewing soon",
        body: "Tell us what you are considering and we will help compare the practical differences.",
        button: "Book Consultation",
        dialog: "advisor",
    },
];

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    return (
        <article data-testid="contact-page" className="bg-[#FAF9F6]">
            <section className="border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
                        <div className="lg:col-span-7">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                Contact
                            </p>
                            <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.05]">
                                Tell us what you need help with.
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-3xl">
                                Whether you are buying, renewing, reviewing a policy, or
                                dealing with a claim, share the details and we will guide
                                you to the next step.
                            </p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-[#C8322A] mt-0.5" />
                                    <div>
                                        <h2 className="font-display text-xl font-semibold text-[#0F172A]">
                                            RightPolicy Advisory
                                        </h2>
                                        <p className="mt-2 text-[#475569] leading-relaxed">
                                            Pune / Pimpri-Chinchwad, Maharashtra
                                        </p>
                                        <p className="mt-1 text-[#475569]">
                                            Serving clients across India by phone,
                                            WhatsApp, and email.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                        {contactOptions.map(({ icon: Icon, title, body, action, href }) => (
                            <a
                                key={title}
                                href={href}
                                target={title === "WhatsApp" || title === "Phone" ? "_blank" : undefined}
                                rel={title === "WhatsApp" || title === "Phone" ? "noopener noreferrer" : undefined}
                                className="rounded-3xl border border-[#E2E8F0] bg-[#FAF9F6] p-7 hover:bg-white hover:shadow-sm transition-all"
                            >
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[#E2E8F0] text-[#C8322A]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h2 className="font-display mt-5 text-xl font-semibold text-[#0F172A]">
                                    {title}
                                </h2>
                                <p className="mt-2 text-sm text-[#475569] leading-relaxed">
                                    {body}
                                </p>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#C8322A]">
                                    {action}
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            Start here
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                            Choose the closest option.
                        </h2>
                    </div>

                    <div className="mt-10 grid lg:grid-cols-3 gap-5 lg:gap-6">
                        {reasons.map(({ icon: Icon, title, body, button, dialog }) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-[#E2E8F0] bg-white p-7 shadow-sm"
                            >
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8322A]/8 text-[#C8322A]">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display mt-5 text-xl font-semibold text-[#0F172A]">
                                    {title}
                                </h3>
                                <p className="mt-2 text-[#475569] leading-relaxed">
                                    {body}
                                </p>
                                <button
                                    onClick={() => openDialog(dialog)}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 transition-colors"
                                >
                                    {button}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
