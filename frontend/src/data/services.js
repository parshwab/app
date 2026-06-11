// Shared service catalogue used by homepage cards, service detail pages, and dialogs.

export const SERVICES = [
    {
        slug: "health",
        name: "Health Insurance",
        tagline: "Protect your family from the rising cost of healthcare in India.",
        intro:
            "Hospitalisation costs in India are rising quickly. A good health policy is not just about premium. It is about sub-limits, room rent caps, waiting periods, hospital network, and claim handling.",
        coverage: [
            "Hospitalisation expenses (room, ICU, surgery, doctor fees)",
            "Pre and post-hospitalisation care",
            "Day-care procedures and OPD where applicable",
            "Maternity and newborn cover (with waiting periods)",
            "Critical illness rider for cancer, heart, kidney conditions",
            "Cashless network of hospitals across India",
        ],
        mistakes: [
            "Buying purely on lowest premium without checking sub-limits and room rent caps.",
            "Ignoring the pre-existing disease (PED) waiting period, usually 2-4 years.",
            "Choosing low sum insured. ₹5L is no longer enough in metros.",
            "Not declaring existing health conditions, which can affect future claims.",
            "Not adding parents under a family floater when their age makes it disproportionately expensive.",
        ],
        claimGuidance:
            "When hospitalisation is planned, request cashless pre-authorisation 3-4 days in advance. For emergencies, intimate the insurer within 24 hours and keep bills, prescriptions, and discharge summaries. We help with paperwork and follow-ups if the claim gets delayed or questioned.",
        faqs: [
            {
                q: "How much sum insured is enough for a family?",
                a: "For metro cities, a base ₹10–15L floater for a family of four is a sensible starting point, paired with a top-up plan for higher coverage at lower premium.",
            },
            {
                q: "Will my pre-existing conditions be covered?",
                a: "Yes, but typically after a waiting period of 2–4 years. Always declare medical history correctly. Undisclosed pre-existing diseases are a common reason for claim rejection.",
            },
            {
                q: "What is a sub-limit and why does it matter?",
                a: "Sub-limits cap how much the insurer will pay for specific items such as room rent or surgeries. A low room-rent cap can reduce the final claim amount.",
            },
            {
                q: "Cashless or reimbursement, which is better?",
                a: "Cashless is far less stressful. Always check if your preferred hospitals are in the insurer's network before committing.",
            },
        ],
    },
    {
        slug: "motor",
        name: "Motor Insurance",
        tagline: "Comprehensive protection for your car or two-wheeler.",
        intro:
            "Third-party motor insurance is mandatory in India, but it covers limited situations. Comprehensive cover adds protection for accidents, theft, natural disasters, own damage, and claim-related support.",
        coverage: [
            "Third-party liability (mandatory)",
            "Own damage from accidents, fire, vandalism",
            "Theft and total loss",
            "Natural calamities (flood, earthquake, cyclone)",
            "Personal accident cover for owner-driver",
            "Optional add-ons: zero depreciation, engine protect, return-to-invoice, roadside assistance",
        ],
        mistakes: [
            "Letting cover lapse, you lose accumulated No Claim Bonus instantly.",
            "Skipping zero-depreciation cover on cars under 5 years old.",
            "Under-declaring IDV to lower premium, which directly reduces your claim payout.",
            "Forgetting roadside assistance, especially in monsoon-prone cities.",
            "Filing very small claims without considering the impact on No Claim Bonus.",
        ],
        claimGuidance:
            "Inform your insurer within 24 hours of any incident. For accidents, take dated photos before moving the vehicle and get a police FIR for theft or third-party injury. We help you decide whether a claim makes sense and assist with surveyor coordination.",
        faqs: [
            {
                q: "Is third-party insurance enough?",
                a: "Legally yes, but it is limited. Third-party cover pays for damage you cause to others. Repair, theft, and own-damage costs remain your responsibility.",
            },
            {
                q: "What is IDV and why is it important?",
                a: "IDV is the maximum amount your insurer will pay if your vehicle is stolen or written off. A low IDV means lower premium today and a smaller cheque tomorrow.",
            },
            {
                q: "Should I add zero-depreciation cover?",
                a: "Yes for cars under 5 years old. It ensures full part replacement without depreciation deductions during a claim.",
            },
        ],
    },
    {
        slug: "life",
        name: "Life Insurance",
        tagline: "Protection for the people who depend on your income.",
        intro:
            "Life insurance should first protect the people who depend on your income. Mixing protection and investment often leaves families under-insured. We help you separate the two clearly.",
        coverage: [
            "Pure-term cover (highest cover, lowest premium)",
            "Whole-life and traditional endowment plans",
            "Unit-Linked Insurance Plans (ULIPs)",
            "Riders: critical illness, accidental death, waiver of premium",
            "Return-of-premium term plans",
        ],
        mistakes: [
            "Buying ULIPs or endowment plans mainly for protection.",
            "Choosing a sum-assured smaller than 10–15× annual income.",
            "Stopping premiums early and losing the benefit of the policy.",
            "Not declaring lifestyle facts such as smoking or medical conditions.",
            "Not nominating, or naming a minor without an appointee.",
        ],
        claimGuidance:
            "On a death claim, the nominee should inform the insurer as early as possible. Common documents include the original policy, death certificate, claim form, nominee ID proof, and bank details. We help families organise records and respond to insurer questions.",
        faqs: [
            {
                q: "How much life cover do I need?",
                a: "A practical starting point is 10–15× annual income, plus outstanding loans, minus existing savings. We can calculate this with you.",
            },
            {
                q: "Term vs traditional plan, which is better?",
                a: "For protection, pure term is usually the cleaner option. Investment should be considered separately based on your goals and risk appetite.",
            },
            {
                q: "Until what age should I take cover?",
                a: "Until your dependents become financially independent, typically your retirement age, often 60–65.",
            },
        ],
    },
    {
        slug: "business",
        name: "Business Insurance",
        tagline: "Cover that protects what you've built, and the people who built it with you.",
        intro:
            "Business insurance should match how your business actually operates. Property, liability, employee benefits, cyber exposure, and key-person cover need to be sized to your risk, not bought as a generic package.",
        coverage: [
            "Property (fire, burglary, equipment breakdown)",
            "Public, product, and professional liability",
            "Group health and group personal accident for employees",
            "Directors & Officers (D&O) liability",
            "Cyber liability and data-breach response",
            "Marine, transit, and stock insurance",
            "Key-person and business-interruption cover",
        ],
        mistakes: [
            "Buying generic SME packages that don't reflect your actual risk profile.",
            "Skipping group health for small teams, you lose negotiating leverage at renewal.",
            "Ignoring cyber liability when you handle customer data or run e-commerce.",
            "Under-insuring stock and equipment, fire claims often pay out a fraction of replacement cost.",
            "Treating insurance as compliance instead of risk management.",
        ],
        claimGuidance:
            "For business claims, the first few days matter. Preserve evidence, file FIRs where applicable, and intimate insurers quickly. We help assemble documents, manage surveyor visits, and escalate when claim handling slows down.",
        faqs: [
            {
                q: "Do I need business insurance for a small startup?",
                a: "Yes, even early-stage businesses face property, liability, and employee-related risks. Cover is usually inexpensive and prevents single events from ending the business.",
            },
            {
                q: "What is D&O insurance?",
                a: "Directors & Officers insurance protects company leadership against personal liability arising from management decisions. It is important for funded startups and growing companies.",
            },
            {
                q: "How is group health priced?",
                a: "Pricing depends on age mix, family size, and prior claim experience. We help structure the plan and compare insurer terms.",
            },
        ],
    },
    {
        slug: "travel",
        name: "Travel Insurance",
        tagline: "Reliable cover for domestic and international travel.",
        intro:
            "Travel insurance matters when something interrupts the trip: illness abroad, baggage delay, passport loss, or cancellation. The right policy should be easy to use when you are away from home.",
        coverage: [
            "Medical emergencies and hospitalisation abroad",
            "Trip cancellation, delay, and interruption",
            "Lost or delayed baggage",
            "Passport loss assistance",
            "Personal liability while travelling",
            "Adventure-sport cover (with declared activities)",
            "Pre-existing condition cover (with declaration)",
        ],
        mistakes: [
            "Buying the cheapest cover bundled with the airline without checking medical limits.",
            "Skipping declaration of pre-existing conditions.",
            "Choosing low medical sum insured for US/Europe, costs are 5–10× of India.",
            "Missing the trip-cancellation window because of a non-covered reason.",
            "Not saving the 24/7 helpline number before travelling.",
        ],
        claimGuidance:
            "For medical emergencies abroad, call the insurer's 24/7 helpline first because many hospitals require pre-authorisation. Keep bills, prescriptions, police reports, and boarding passes. We help with claim filing and follow-ups.",
        faqs: [
            {
                q: "Is travel insurance really necessary for short trips?",
                a: "Yes. A short medical hospitalisation abroad can be expensive. Adequate travel cover is usually a small part of the overall trip cost.",
            },
            {
                q: "Does it cover trip cancellation due to illness?",
                a: "Most policies do, with documentation. Some specifically exclude cancellations due to pre-existing conditions unless declared.",
            },
            {
                q: "What about adventure activities?",
                a: "Standard policies often exclude activities such as high-altitude trekking, scuba diving, or skiing. Declare planned activities upfront so the cover can be checked.",
            },
        ],
    },
    {
        slug: "personal-accident",
        name: "Personal Accident Insurance",
        tagline: "Income protection if an accident changes everything.",
        intro:
            "Personal accident cover helps when an accident affects your ability to earn. It can pay a lump sum or weekly income for accidental death, disability, or temporary disablement.",
        coverage: [
            "Accidental death benefit",
            "Permanent total / partial disability",
            "Temporary total disability with weekly income",
            "Education benefit for dependent children",
            "Hospital cash benefit",
            "Worldwide cover, 24x7",
        ],
        mistakes: [
            "Assuming life insurance covers disability. It usually does not.",
            "Choosing a low sum insured. Aim for at least 10–15× annual income.",
            "Skipping coverage for self-employed individuals where income depends on physical work.",
            "Not declaring high-risk occupations, which can affect the cover.",
            "Forgetting to add it to a family floater for spouse and adult children.",
        ],
        claimGuidance:
            "Inform the insurer within 24–48 hours of the accident. Preserve FIRs, medical reports, and disability certificates from a government hospital. We help compile the documents and follow up so payouts are not delayed by paperwork gaps.",
        faqs: [
            {
                q: "Isn't personal accident cover already in my motor policy?",
                a: "Motor policies include limited owner-driver PA cover. A standalone PA policy can provide higher cover, wider applicability, and disability income.",
            },
            {
                q: "What is the difference between disability and death benefit?",
                a: "Death benefit is a one-time lump sum to your nominee. Disability benefit pays you a sum, and sometimes weekly income, while you cannot earn.",
            },
            {
                q: "Will it cover injuries from sports or two-wheelers?",
                a: "Most policies cover everyday accidents including two-wheelers. High-risk sports usually need a declaration and rider.",
            },
        ],
    },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
    SERVICES.map((s) => [s.slug, s])
);
