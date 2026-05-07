import {
    HeartPulse,
    Car,
    Sparkles,
    Briefcase,
    Plane,
    PersonStanding,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const ICONS = {
    health: HeartPulse,
    motor: Car,
    life: Sparkles,
    business: Briefcase,
    travel: Plane,
    "personal-accident": PersonStanding,
};

import { SERVICES as DATA } from "@/data/services";
const services = DATA.map((s) => ({
    slug: s.slug,
    icon: ICONS[s.slug] || HeartPulse,
    title: s.name,
    body: s.tagline,
}));

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
                        <Link
                            to={`/services/${s.slug}`}
                            key={s.slug}
                            data-testid={`service-card-${s.slug}`}
                            className="group rounded-2xl bg-white border border-[#E2E8F0] p-7 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#C8322A]/25 transition-all duration-300 flex flex-col"
                        >
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#0F172A] group-hover:text-[#C8322A] group-hover:border-[#C8322A]/30 transition-colors">
                                <s.icon className="h-6 w-6" strokeWidth={1.6} />
                            </div>
                            <h3 className="font-display mt-5 text-xl font-semibold text-[#0F172A]">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-[#475569] leading-relaxed text-sm">
                                {s.body}
                            </p>
                            <span
                                data-testid={`service-learn-more-${s.slug}`}
                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8322A] hover:text-[#A82A23] self-start"
                            >
                                Learn more
                                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
