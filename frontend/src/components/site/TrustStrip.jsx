import {
    CalendarClock,
    Users,
    LifeBuoy,
    BookOpenCheck,
    Handshake,
} from "lucide-react";

const items = [
    { icon: CalendarClock, label: "15+ Years Experience" },
    { icon: Users, label: "Human Insurance Advisors" },
    { icon: LifeBuoy, label: "Dedicated Claim Assistance" },
    { icon: BookOpenCheck, label: "Transparent Guidance" },
    { icon: Handshake, label: "Long-Term Support" },
];

export default function TrustStrip() {
    return (
        <section
            data-testid="trust-strip"
            className="border-y border-[#E2E8F0] bg-white/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
                <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
                    {items.map(({ icon: Icon, label }) => (
                        <li
                            key={label}
                            className="flex items-center gap-2.5 text-[#0F172A]"
                            data-testid={`trust-item-${label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                            <Icon className="h-4 w-4 text-[#C8322A]" strokeWidth={2} />
                            <span className="text-sm font-medium">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
