import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    AlertTriangle,
    LifeBuoy,
    Upload,
    Phone,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICE_BY_SLUG, SERVICES } from "@/data/services";
import { openDialog } from "@/lib/rp";

const SUBLINE = "We'll get back to you within one business day.";

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const service = SERVICE_BY_SLUG[slug];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [slug]);

    if (!service) return <Navigate to="/" replace />;

    return (
        <article data-testid={`service-page-${service.slug}`} className="bg-[#FAF9F6]">
            {/* Hero */}
            <section className="border-b border-[#E2E8F0]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <Link
                        to="/#services"
                        data-testid="service-back-link"
                        className="inline-flex items-center gap-1.5 text-sm text-[#475569] hover:text-[#0F172A]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        All services
                    </Link>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#C8322A]">
                        {service.name}
                    </p>
                    <h1 className="font-display mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.05] max-w-4xl">
                        {service.tagline}
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-3xl">
                        {service.intro}
                    </p>
                    <div className="mt-9 flex flex-wrap gap-3">
                        <button
                            data-testid="service-book-consult"
                            onClick={() => openDialog("advisor")}
                            className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 transition-colors shadow-sm"
                        >
                            Book a Free Consultation
                            <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            data-testid="service-upload-policy"
                            onClick={() => openDialog("upload")}
                            className="inline-flex items-center gap-2 rounded-full bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F3F4F6] font-semibold px-6 py-3.5 transition-colors"
                        >
                            <Upload className="h-4 w-4" />
                            Upload Existing Policy
                        </button>
                    </div>
                    <p className="mt-4 text-sm text-[#475569]">{SUBLINE}</p>
                </div>
            </section>

            {/* Coverage + Mistakes (editorial 2-col) */}
            <section className="py-16 sm:py-20 border-b border-[#E2E8F0]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0F172A]">
                            What it covers
                        </p>
                        <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Coverage, explained.
                        </h2>
                        <ul className="mt-7 space-y-4">
                            {service.coverage.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-[#0F172A]"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            What to watch for
                        </p>
                        <h2 className="font-display mt-3 text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Common mistakes we help you avoid.
                        </h2>
                        <ul className="mt-7 space-y-4">
                            {service.mistakes.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-[#0F172A]"
                                >
                                    <AlertTriangle className="h-5 w-5 text-[#C8322A] flex-shrink-0 mt-0.5" />
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Claim Guidance */}
            <section className="py-16 sm:py-20 border-b border-[#E2E8F0]">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8322A]/8 text-[#C8322A] flex-shrink-0">
                                <LifeBuoy className="h-7 w-7" strokeWidth={1.7} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                    Claim Guidance
                                </p>
                                <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#0F172A]">
                                    If you need to claim, we can help with the process.
                                </h2>
                                <p className="mt-4 text-[#475569] leading-relaxed text-lg">
                                    {service.claimGuidance}
                                </p>
                                <button
                                    data-testid="service-claim-cta"
                                    onClick={() => openDialog("claim")}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F172A] hover:bg-[#0B1325] text-white font-semibold px-5 py-3 transition-colors"
                                >
                                    Get Claim Support
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 sm:py-20 border-b border-[#E2E8F0]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            FAQs
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                            Common questions.
                        </h2>
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white shadow-sm divide-y divide-[#E2E8F0] overflow-hidden"
                    >
                        {service.faqs.map((f, i) => (
                            <AccordionItem
                                key={f.q}
                                value={`item-${i}`}
                                className="border-0 px-6"
                                data-testid={`service-faq-${i}`}
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

            {/* Closing CTA */}
            <section className="py-16 sm:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-[#0F172A] text-white p-10 sm:p-14 text-center relative overflow-hidden">
                        <div
                            aria-hidden
                            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#C8322A]/15 blur-3xl"
                        />
                        <h2 className="font-display relative text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-[1.1]">
                            Talk through the options before you decide.
                        </h2>
                        <p className="relative mt-4 text-white/75 max-w-xl mx-auto">
                            {SUBLINE}
                        </p>
                        <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
                            <button
                                data-testid="service-bottom-cta-book"
                                onClick={() => openDialog("advisor")}
                                className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5"
                            >
                                Book a Free Consultation
                                <ArrowRight className="h-4 w-4" />
                            </button>
                            <button
                                data-testid="service-bottom-cta-claim"
                                onClick={() => openDialog("claim")}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold px-6 py-3.5"
                            >
                                <Phone className="h-4 w-4" />
                                Get Claim Support
                            </button>
                        </div>
                    </div>

                    {/* Other services */}
                    <div className="mt-16">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            Explore other services
                        </p>
                        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
                                <Link
                                    key={s.slug}
                                    to={`/services/${s.slug}`}
                                    data-testid={`other-service-${s.slug}`}
                                    className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 hover:border-[#C8322A]/30 hover:shadow-sm transition-all"
                                >
                                    <div className="font-display font-semibold text-[#0F172A]">
                                        {s.name}
                                    </div>
                                    <div className="text-sm text-[#475569] mt-1 line-clamp-2">
                                        {s.tagline}
                                    </div>
                                    <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#C8322A]">
                                        Learn more
                                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
