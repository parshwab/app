import {
    CalendarClock,
    BookOpenCheck,
    LifeBuoy,
    Handshake,
    Users,
    UserCheck,
} from "lucide-react";

const items = [
    { icon: CalendarClock, label: "15+ Years in Insurance" },
    { icon: BookOpenCheck, label: "Policy Terms Explained" },
    { icon: LifeBuoy, label: "Claim Paperwork Help" },
    { icon: Handshake, label: "Renewal Support" },
    { icon: Users, label: "Advisor-Led Reviews" },
    { icon: UserCheck, label: "Phone Consultation" },
];

// Duplicate the items so the marquee loops seamlessly.
const TRACK = [...items, ...items];

export default function TrustStrip() {
    return (
        <section
            data-testid="trust-strip"
            className="border-y border-[#E2E8F0] bg-[#F8F6F1] overflow-hidden"
            aria-label="What clients value about RightPolicy"
        >
            <div className="relative max-w-7xl mx-auto py-5 sm:py-6">
                {/* Soft fade edges to create a premium feel */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-28 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-28 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10"
                />

                <div className="rp-marquee">
                    <ul className="rp-marquee__track flex items-center gap-x-12 sm:gap-x-16">
                        {TRACK.map(({ icon: Icon, label }, i) => (
                            <li
                                key={`${label}-${i}`}
                                className="flex items-center gap-2.5 whitespace-nowrap text-[#0F172A]"
                                data-testid={
                                    i < items.length
                                        ? `trust-item-${label
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")}`
                                        : undefined
                                }
                                aria-hidden={i >= items.length ? "true" : undefined}
                            >
                                <Icon
                                    className="h-4 w-4 text-[#C8322A]"
                                    strokeWidth={2}
                                />
                                <span className="text-sm font-medium">{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
