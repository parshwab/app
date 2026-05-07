import { ArrowRight, Upload } from "lucide-react";
import { openDialog } from "@/lib/rp";

export default function FinalCTA() {
    return (
        <section
            data-testid="final-cta"
            className="rp-section py-20 sm:py-24"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white shadow-sm">
                    <div
                        aria-hidden
                        className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#C8322A]/8 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#0F172A]/5 blur-3xl"
                    />
                    <div className="relative p-10 sm:p-16 lg:p-20 text-center">
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0F172A] max-w-3xl mx-auto leading-[1.05]">
                            Insurance decisions deserve{" "}
                            <span className="text-[#C8322A]">human conversations</span>.
                        </h2>
                        <p className="mt-6 text-lg text-[#475569] max-w-xl mx-auto leading-relaxed">
                            No bots. No pressure. Just a calm conversation with someone
                            who&rsquo;s done this for 15+ years.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3 justify-center">
                            <button
                                data-testid="final-cta-talk-button"
                                onClick={() => openDialog("advisor")}
                                className="group inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-7 py-4 transition-colors shadow-sm"
                            >
                                Talk to an Advisor
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button
                                data-testid="final-cta-upload-button"
                                onClick={() => openDialog("upload")}
                                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F3F4F6] font-semibold px-7 py-4 transition-colors"
                            >
                                <Upload className="h-4 w-4" />
                                Upload Existing Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
