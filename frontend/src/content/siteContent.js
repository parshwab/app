export const defaultSiteContent = {
    home: {
        hero: {
            eyebrow: "Pune-based Insurance Advisory & Claim Support",
            headlinePrefix: "Insurance advice from",
            headlineHighlight: "real people, not bots.",
            body: "Built over 25+ years in Pune, RightPolicy gives families and businesses advisor-led guidance before they buy, renew, or file a claim. For something this personal, you should be able to speak to a person.",
            promises: [
                "Right Policy",
                "Right People",
                "Right Advice",
                "Right Assistance",
            ],
            advisoryTitle: "Insurance Advisory",
            advisoryBody: "Choose a new policy or review an existing one with someone who can explain the details properly.",
            advisoryPoints: [
                "Policy options explained clearly",
                "Help comparing trade-offs",
                "Support at renewal and claim time",
            ],
            claimTitle: "Claim Support & Assistance",
            claimBody: "Help with claim questions, paperwork, insurer follow-ups, and situations where the process has slowed down.",
            claimPoints: [
                "Documentation help",
                "Insurer coordination",
                "Support during urgent situations",
            ],
        },
        why: {
            eyebrow: "Why RightPolicy",
            title: "The honest way to choose insurance.",
            body: "We help with policy selection, purchase assistance, renewals, claim support, and remedial guidance if an insurer dispute needs to be escalated.",
            rows: [
                "Advisor you can speak to",
                "Recommendations based on your needs",
                "Policy purchase assistance",
                "Backup of policy documents",
                "Claim paperwork support",
                "Help at renewal time",
            ],
        },
        stats: [
            { value: "25+", label: "Years in insurance, finance, and claims" },
            { value: "2,000+", label: "Families and businesses covered" },
            { value: "5,000+", label: "General insurance claims handled" },
            { value: "1:1", label: "Personal support, not bot replies" },
        ],
    },
    about: {
        eyebrow: "About RightPolicy",
        title: "Insurance advice shaped by claim experience.",
        body: "RightPolicy helps families and businesses choose insurance with a clearer view of what is covered, what is excluded, and what may matter during a claim.",
        founderLabel: "Founder & CEO",
        founderName: "Bhupendra Bhandari",
        founderSummary: "CA and general insurance claims professional based in Pune.",
        founderNoteEyebrow: "Founder note",
        founderNoteTitle: "Built around practical claim knowledge.",
        founderNoteParagraphs: [
            "Bhupendra Bhandari has worked as an Insurance Surveyor and Loss Assessor since 2000, with experience in property insurance claims and documentation-heavy claim situations.",
            "That background shapes how RightPolicy advises clients. The focus is not only on buying a policy, but on whether the policy can be understood, used, renewed, and supported when a claim is filed.",
        ],
    },
    contact: {
        eyebrow: "Contact",
        title: "Tell us what you need help with.",
        body: "Whether you are buying, renewing, reviewing a policy, or dealing with a claim, share the details and we will guide you to the next step.",
        locationTitle: "RightPolicy Advisory",
        locationLine1: "FC Road, Pune",
        locationLine2: "Serving clients across India by phone, WhatsApp, and email.",
    },
};

const isObject = (value) =>
    value && typeof value === "object" && !Array.isArray(value);

export function mergeSiteContent(base, override) {
    if (!isObject(override)) return base;
    const merged = { ...base };
    Object.entries(override).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            merged[key] = value;
        } else if (isObject(value) && isObject(base[key])) {
            merged[key] = mergeSiteContent(base[key], value);
        } else if (value !== undefined && value !== null) {
            merged[key] = value;
        }
    });
    return merged;
}
