import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { openDialog } from "@/lib/rp";
import { SERVICES } from "@/data/services";
import Logo from "./Logo";

const links = [
    { to: "/#services", label: "Services" },
    { to: "/claim-support", label: "Claim Support" },
    { to: "/#about", label: "About" },
    { to: "/#contact", label: "Contact" },
];

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
    }
    return false;
}

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // When the URL has a hash (e.g. /#about) and user is on home, scroll to it.
    useEffect(() => {
        if (location.pathname === "/" && location.hash) {
            const id = location.hash.replace("#", "");
            // Small timeout to wait for DOM
            const t = setTimeout(() => scrollToId(id), 60);
            return () => clearTimeout(t);
        }
    }, [location]);

    const goToHashLink = (to) => (e) => {
        if (!to.startsWith("/#")) return; // only handle home anchors
        e.preventDefault();
        const id = to.slice(2); // strip "/#"
        setOpen(false);
        if (location.pathname !== "/") {
            navigate(`/#${id}`);
        } else {
            // Already on home: scroll, and reflect the section in URL.
            scrollToId(id);
            window.history.replaceState(null, "", `/#${id}`);
        }
    };

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
                <div className="flex h-16 lg:h-[72px] items-center justify-between gap-4">
                    <Link
                        to="/"
                        data-testid="navbar-logo"
                        className="flex items-center gap-2 group flex-shrink-0"
                    >
                        <Logo asLink={false} className="h-7 sm:h-9" testid="navbar-logo-img" />
                    </Link>

                    <nav
                        className="hidden lg:flex items-center gap-8 flex-1 justify-center"
                        data-testid="navbar-links"
                    >
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                data-testid="navlink-services"
                                className="flex items-center gap-1 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
                            >
                                Services
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {servicesOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                                    <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-xl p-2 w-72">
                                        {SERVICES.map((s) => (
                                            <Link
                                                key={s.slug}
                                                to={`/services/${s.slug}`}
                                                data-testid={`navmenu-service-${s.slug}`}
                                                className="block px-3 py-2.5 rounded-lg text-sm text-[#0F172A] hover:bg-[#FAF9F6]"
                                            >
                                                <div className="font-medium">{s.name}</div>
                                                <div className="text-xs text-[#475569] mt-0.5">
                                                    {s.tagline}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <NavLink
                            to="/claim-support"
                            data-testid="navlink-claim-support"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${
                                    isActive
                                        ? "text-[#C8322A]"
                                        : "text-[#475569] hover:text-[#0F172A]"
                                }`
                            }
                        >
                            Claim Support
                        </NavLink>

                        <a
                            href="/#about"
                            onClick={goToHashLink("/#about")}
                            data-testid="navlink-about"
                            className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="/#contact"
                            onClick={goToHashLink("/#contact")}
                            data-testid="navlink-contact"
                            className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                        <button
                            data-testid="navbar-claim-support-button"
                            onClick={() => openDialog("claim")}
                            className="rounded-full text-sm font-semibold px-4 py-2.5 text-[#0F172A] hover:bg-white border border-[#E2E8F0] transition-colors"
                        >
                            Get Claim Support
                        </button>
                        <button
                            data-testid="navbar-talk-advisor-button"
                            onClick={() => openDialog("advisor")}
                            className="rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white text-sm font-semibold px-5 py-2.5 transition-colors shadow-sm"
                        >
                            Book a Free Consultation
                        </button>
                    </div>

                    <button
                        data-testid="navbar-mobile-toggle"
                        onClick={() => setOpen((v) => !v)}
                        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A]"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div
                    className="lg:hidden border-t border-[#E2E8F0] bg-[#FAF9F6]/95 backdrop-blur-xl"
                    data-testid="navbar-mobile-menu"
                >
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                        <div className="px-3 py-2 text-xs uppercase tracking-wider text-[#475569]">
                            Services
                        </div>
                        {SERVICES.map((s) => (
                            <Link
                                key={s.slug}
                                to={`/services/${s.slug}`}
                                onClick={() => setOpen(false)}
                                className="px-3 py-2 rounded-lg text-[#0F172A] hover:bg-white text-sm"
                            >
                                {s.name}
                            </Link>
                        ))}
                        <div className="h-px bg-[#E2E8F0] my-2" />
                        {links.slice(1).map((l) => {
                            const isHash = l.to.startsWith("/#");
                            const handle = (e) => {
                                if (isHash) {
                                    goToHashLink(l.to)(e);
                                } else {
                                    setOpen(false);
                                }
                            };
                            const common = {
                                "data-testid": `mobile-navlink-${l.label
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`,
                                className:
                                    "px-3 py-3 rounded-lg text-[#0F172A] font-medium hover:bg-white",
                                onClick: handle,
                            };
                            return isHash ? (
                                <a key={l.to} href={l.to} {...common}>
                                    {l.label}
                                </a>
                            ) : (
                                <Link key={l.to} to={l.to} {...common}>
                                    {l.label}
                                </Link>
                            );
                        })}
                        <button
                            data-testid="navbar-mobile-claim-button"
                            onClick={() => {
                                setOpen(false);
                                openDialog("claim");
                            }}
                            className="mt-2 rounded-full bg-white border border-[#E2E8F0] text-[#0F172A] font-semibold px-5 py-3"
                        >
                            Get Claim Support
                        </button>
                        <button
                            data-testid="navbar-mobile-talk-advisor-button"
                            onClick={() => {
                                setOpen(false);
                                openDialog("advisor");
                            }}
                            className="rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-5 py-3 transition-colors"
                        >
                            Book a Free Consultation
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
