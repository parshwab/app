import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/rp";

const DEFAULT_MSG =
    "Hi RightPolicy, I'd like to speak with an expert advisor about insurance.";

export default function WhatsAppFloat({ message = DEFAULT_MSG }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setShow(true), 600);
        return () => clearTimeout(t);
    }, []);

    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-float"
            aria-label="Chat on WhatsApp"
            className={`fixed bottom-6 right-6 z-40 group transition-all duration-500 ${
                show
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
            }`}
        >
            <span className="relative inline-flex items-center gap-3 rounded-full bg-[#0F172A] text-white pl-3 pr-5 py-3 shadow-[0_15px_35px_-12px_rgba(15,23,42,0.45)] hover:bg-[#0B1325] transition-colors">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0F172A]">
                    <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold tracking-tight">
                    Chat with our Expert
                </span>
                <span className="absolute -top-1 -right-1 inline-flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#C8322A] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[#C8322A]" />
                </span>
            </span>
        </a>
    );
}
