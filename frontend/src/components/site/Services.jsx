import {
    HeartPulse,
    Car,
    Sparkles,
    Briefcase,
    Plane,
    PersonStanding,
    ArrowUpRight,
} from "lucide-react";
import { openDialog } from "@/lib/rp";

const services = [
    {
        icon: HeartPulse,
        title: "Health Insurance",
        body: "Cover for hospitalisation, critical illness, and family floater plans suited to Indian healthcare.",
    },
    {
        icon: Car,
        title: "Motor Insurance",
        body: "Comprehensive and third-party motor cover with claim guidance you can actually rely on.",
    },
    {
        icon: Sparkles,
        title: "Life Insurance",
        body: "Term, traditional, and ULIP guidance — picked for protection first, not commissions.",
    },
    {
        icon: Briefcase,
        title: "Business Insurance",
        body: "Liability, property, and employee benefits structured around how your business actually works.",
    },
    {
        icon: Plane,
        title: "Travel Insurance",
        body: "Domestic and international travel cover with real claim support across time zones.",
    },
    {
        icon: PersonStanding,
        title: "Personal Accident",
        body: "Income protection and accident cover so a single event doesn&rsquo;t change everything.",
    },
];

export default function Services() {
    return (
        <section
            id="services"
            data-testid="services-section"
            className="rp-section py-20 sm:py-24 bg-white/60 border-y border-[#E2E8F0]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                            What we cover
                        </p>
                        <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A]">
                            Insurance, explained without the jargon.
                        </h2>
                    </div>
                    <p className="text-base text-[#475569] max-w-md">
                        Browse the categories we advise on. Every recommendation is
                        independent, transparent, and rooted in your real needs.
                    </p>
                </div>

                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {services.map((s) => (
                        <article
                            key={s.title}
                            data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className="group rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#C8322A]/25 transition-all duration-300 flex flex-col"
                        >
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#0F172A] group-hover:text-[#C8322A] group-hover:border-[#C8322A]/30 transition-colors">
                                <s.icon className="h-6 w-6" strokeWidth={1.6} />
                            </div>
                            <h3 className="font-display mt-5 text-xl font-semibold text-[#0F172A]">
                                {s.title}
                            </h3>
                            <p
                                className="mt-2 text-[#475569] leading-relaxed text-sm"
                                dangerouslySetInnerHTML={{ __html: s.body }}
                            />
                            <button
                                data-testid={`service-learn-more-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => openDialog("advisor")}
                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8322A] hover:text-[#A82A23] self-start"
                            >
                                Learn more
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
