import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, waLink } from "@/lib/rp";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer
            data-testid="site-footer"
            className="border-t border-[#E2E8F0] bg-[#F8F6F1]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-5">
                        <Link to="/" className="inline-flex items-center">
                            <Logo asLink={false} className="h-12" />
                        </Link>
                        <p className="mt-4 text-sm text-[#475569] leading-relaxed max-w-md">
                            Insurance advisory for Indian families and businesses,
                            with help before purchase and during claims.
                        </p>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-display font-semibold text-[#0F172A]">
                            Services
                        </h4>
                        <ul className="mt-4 space-y-2 text-sm text-[#475569]">
                            {SERVICES.map((s) => (
                                <li key={s.slug}>
                                    <Link
                                        to={`/services/${s.slug}`}
                                        className="hover:text-[#0F172A]"
                                    >
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-2 border-t border-[#E2E8F0] mt-3">
                                <Link
                                    to="/claim-support"
                                    className="text-[#C8322A] hover:text-[#A82A23] font-medium"
                                >
                                    Claim Support →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-4">
                        <h4 className="font-display font-semibold text-[#0F172A]">
                            Reach us
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm text-[#475569]">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[#C8322A]" /> {WHATSAPP_DISPLAY}
                            </li>
                            <li>
                                <a
                                    href={waLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="footer-whatsapp"
                                    className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                                >
                                    <MessageCircle className="h-4 w-4 text-[#C8322A]" />
                                    Chat on WhatsApp
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[#C8322A]" />
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="hover:text-[#0F172A]"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-[#C8322A] mt-0.5" />
                                FC Road, Pune
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-wrap gap-4 text-sm text-[#475569]">
                    <Link to="/about" className="hover:text-[#0F172A]">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-[#0F172A]">
                        Contact
                    </Link>
                    <Link to="/claim-support" className="hover:text-[#0F172A]">
                        Claim Support
                    </Link>
                </div>

                <div className="mt-12 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-[#475569]">
                    <p>
                        © {new Date().getFullYear()} RightPolicy Advisory. IRDAI aligned
                        intermediary services.
                    </p>
                    <p>Advisory and claim support for Indian policyholders.</p>
                </div>
            </div>
        </footer>
    );
}
