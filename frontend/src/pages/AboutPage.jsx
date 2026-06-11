import { useEffect } from "react";
import {
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    FileCheck2,
    MapPin,
    ShieldCheck,
} from "lucide-react";
import { openDialog } from "@/lib/rp";

const experience = [
    {
        role: "Insurance Surveyor & Loss Assessor",
        company: "Bhupendra Bhandari & Co.",
        period: "Jan 2000 - Present",
        location: "Pune / Pimpri-Chinchwad",
        note: "Property insurance claims, survey work, documentation review, and loss assessment.",
    },
    {
        role: "Director",
        company: "DNV Realty",
        period: "2008 - Present",
        location: "Pune / Pimpri-Chinchwad",
        note: "Business leadership and client-facing operations.",
    },
    {
        role: "Partner",
        company: "V A Dudhedia & Co., Chartered Accountants",
        period: "Jan 1999 - Jun 2011",
        location: "Pune / Pimpri-Chinchwad",
        note: "Accounts, audit, finance, and advisory experience.",
    },
    {
        role: "Ex. Accounts & Finance",
        company: "Philips Medical Systems",
        period: "1997 - 1999",
        location: "",
        note: "Early finance and systems exposure in a corporate environment.",
    },
];

const principles = [
    "Explain the policy before recommending it",
    "Check claim conditions, exclusions, and waiting periods",
    "Stay available when paperwork or insurer follow-ups get difficult",
];

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    return (
        <article data-testid="about-page" className="bg-[#FAF9F6]">
            <section className="border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-7">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                About RightPolicy
                            </p>
                            <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.05]">
                                Insurance advice shaped by claim experience.
                            </h1>
                            <p className="mt-6 text-lg sm:text-xl text-[#475569] leading-relaxed max-w-3xl">
                                RightPolicy helps families and businesses choose insurance
                                with a clearer view of what is covered, what is excluded,
                                and what may matter during a claim.
                            </p>
                            <div className="mt-9 flex flex-wrap gap-3">
                                <button
                                    onClick={() => openDialog("advisor")}
                                    data-testid="about-book-consult"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#C8322A] hover:bg-[#A82A23] text-white font-semibold px-6 py-3.5 transition-colors shadow-sm"
                                >
                                    Book a Free Consultation
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => openDialog("upload")}
                                    data-testid="about-upload-policy"
                                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F3F4F6] font-semibold px-6 py-3.5 transition-colors"
                                >
                                    Upload Existing Policy
                                </button>
                            </div>
                        </div>

                        <aside className="lg:col-span-5">
                            <div className="rounded-3xl border border-[#E2E8F0] bg-white p-7 sm:p-8 shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-display text-xl font-bold">
                                        BB
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                            Founder &amp; CEO
                                        </p>
                                        <h2 className="font-display mt-1 text-2xl font-bold text-[#0F172A]">
                                            Bhupendra Bhandari
                                        </h2>
                                        <p className="mt-2 text-[#475569] leading-relaxed">
                                            CA and general insurance claims professional
                                            based in Pune.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-7 grid gap-3">
                                    <div className="flex items-center gap-3 text-sm text-[#0F172A]">
                                        <BadgeCheck className="h-5 w-5 text-[#C8322A]" />
                                        25+ years in insurance, finance, and claims
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#0F172A]">
                                        <FileCheck2 className="h-5 w-5 text-[#C8322A]" />
                                        Survey and loss assessment background
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-[#0F172A]">
                                        <MapPin className="h-5 w-5 text-[#C8322A]" />
                                        Pune / Pimpri-Chinchwad, Maharashtra
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                Founder note
                            </p>
                            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                                Built around practical claim knowledge.
                            </h2>
                        </div>
                        <div className="lg:col-span-7 text-[#475569] text-lg leading-relaxed space-y-5">
                            <p>
                                Bhupendra Bhandari has worked as an Insurance Surveyor
                                and Loss Assessor since 2000, with experience in property
                                insurance claims and documentation-heavy claim situations.
                            </p>
                            <p>
                                That background shapes how RightPolicy advises clients.
                                The focus is not only on buying a policy, but on whether
                                the policy can be understood, used, renewed, and supported
                                when a claim is filed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C8322A]">
                                Experience
                            </p>
                            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
                                Finance, claims, and business experience in one place.
                            </h2>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="rounded-3xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
                                {experience.map((item, index) => (
                                    <div
                                        key={`${item.role}-${item.company}`}
                                        className={`p-6 sm:p-7 ${
                                            index !== experience.length - 1
                                                ? "border-b border-[#E2E8F0]"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="mt-1 h-11 w-11 rounded-xl bg-[#FAF9F6] border border-[#E2E8F0] flex items-center justify-center text-[#C8322A] flex-shrink-0">
                                                {index === 0 ? (
                                                    <ShieldCheck className="h-5 w-5" />
                                                ) : index === 1 ? (
                                                    <Building2 className="h-5 w-5" />
                                                ) : (
                                                    <BriefcaseBusiness className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-display text-xl font-semibold text-[#0F172A]">
                                                    {item.role}
                                                </h3>
                                                <p className="mt-1 font-medium text-[#0F172A]">
                                                    {item.company}
                                                </p>
                                                <p className="mt-1 text-sm text-[#475569]">
                                                    {item.period}
                                                    {item.location ? ` · ${item.location}` : ""}
                                                </p>
                                                <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
                                                    {item.note}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-[#0F172A] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F1A39E]">
                                How we work
                            </p>
                            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                                Advice before paperwork.
                            </h2>
                        </div>
                        <div className="lg:col-span-7 grid gap-4">
                            {principles.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5 flex gap-3"
                                >
                                    <ShieldCheck className="h-5 w-5 text-[#F1A39E] flex-shrink-0 mt-0.5" />
                                    <p className="text-white/85">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
