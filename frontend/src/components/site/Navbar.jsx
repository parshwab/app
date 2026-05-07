import { useEffect, useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { openDialog } from "@/lib/rp";

const links = [
    { href: "#services", label: "Services" },
    { href: "#claims", label: "Claims Support" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            data-testid="site-navbar"
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                scrolled
                    ? "bg-[#FAF9F6]/85 backdrop-blur-xl border-b border-[#E2E8F0]"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 lg:h-20 items-center justify-between">
                    <a
                        href="#top"
                        data-testid="navbar-logo"
                        className="flex items-center gap-2 group"
                    >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#C8322A] text-white">
                            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
                        </span>
                        <span className="font-display text-[1.15rem] sm:text-xl font-bold tracking-tight text-[#0F172A]">
                            Right<span className="text-[#C8322A]">Policy</span>
                        </span>
                    </a>

                    <nav
                        className="hidden md:flex items-center gap-9"
                        data-testid="navbar-links"
                    >
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                data-testid={`navlink-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-3">
                        <button
                            data-testid="navbar-talk-advisor-button"
                            onClick={() => openDialog("advisor")}
                            className="rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white text-sm font-semibold px-5 py-2.5 transition-colors shadow-sm"
                        >
                            Talk to an Advisor
                        </button>
                    </div>

                    <button
                        data-testid="navbar-mobile-toggle"
                        onClick={() => setOpen((v) => !v)}
                        className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A]"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div
                    className="md:hidden border-t border-[#E2E8F0] bg-[#FAF9F6]/95 backdrop-blur-xl"
                    data-testid="navbar-mobile-menu"
                >
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                        {links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="px-3 py-3 rounded-lg text-[#0F172A] font-medium hover:bg-white"
                            >
                                {l.label}
                            </a>
                        ))}
                        <button
                            data-testid="navbar-mobile-talk-advisor-button"
                            onClick={() => {
                                setOpen(false);
                                openDialog("advisor");
                            }}
                            className="mt-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 transition-colors"
                        >
                            Talk to an Advisor
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
