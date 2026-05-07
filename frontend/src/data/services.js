// Shared service catalogue used by homepage cards, service detail pages, and dialogs.

export const SERVICES = [
    {
        slug: "health",
        name: "Health Insurance",
        tagline: "Protect your family from the rising cost of healthcare in India.",
        intro:
            "Hospitalisation costs in India are rising faster than most household incomes. The right health policy is less about premium and more about what it actually covers — sub-limits, room rent caps, waiting periods, and how the insurer handles claims.",
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
            "Ignoring the pre-existing disease (PED) waiting period — usually 2-4 years.",
            "Choosing low sum insured. ₹5L is no longer enough in metros.",
            "Skipping declaration of existing health conditions — voids future claims.",
            "Not adding parents under a family floater when their age makes it disproportionately expensive.",
        ],
        claimGuidance:
            "When hospitalisation is planned, request cashless pre-authorisation 3-4 days in advance. For emergencies, intimate the insurer within 24 hours and keep all bills, prescriptions, and discharge summaries. We help you with paperwork and follow-ups so a denied claim doesn't become your problem alone.",
        faqs: [
            {
                q: "How much sum insured is enough for a family?",
                a: "For metro cities, a base ₹10–15L floater for a family of four is a sensible starting point, paired with a top-up plan for higher coverage at lower premium.",
            },
            {
                q: "Will my pre-existing conditions be covered?",
                a: "Yes, but typically after a waiting period of 2–4 years. Always declare honestly — undisclosed PEDs are the #1 reason claims get rejected.",
            },
            {
                q: "What is a sub-limit and why does it matter?",
                a: "Sub-limits cap how much the insurer will pay for specific items (room rent, surgeries). A low room-rent sub-limit can quietly reduce your entire claim — we help you avoid such policies.",
            },
            {
                q: "Cashless or reimbursement — which is better?",
                a: "Cashless is far less stressful. Always check if your preferred hospitals are in the insurer's network before committing.",
            },
        ],
    },
    {
        slug: "motor",
        name: "Motor Insurance",
        tagline: "Comprehensive protection for your car or two-wheeler.",
        intro:
            "Third-party motor insurance is mandatory in India, but it covers very little. Comprehensive cover protects you against accidents, theft, natural disasters, and third-party liability — and most importantly, against insurer behaviour at claim time.",
        coverage: [
            "Third-party liability (mandatory)",
            "Own damage from accidents, fire, vandalism",
            "Theft and total loss",
            "Natural calamities (flood, earthquake, cyclone)",
            "Personal accident cover for owner-driver",
            "Optional add-ons: zero depreciation, engine protect, return-to-invoice, roadside assistance",
        ],
        mistakes: [
            "Letting cover lapse — you lose accumulated No Claim Bonus instantly.",
            "Skipping zero-depreciation cover on cars under 5 years old.",
            "Under-declaring IDV to lower premium — directly reduces your claim payout.",
            "Forgetting roadside assistance, especially in monsoon-prone cities.",
            "Filing small claims that erode No Claim Bonus — sometimes paying out of pocket is smarter.",
        ],
        claimGuidance:
            "Inform your insurer within 24 hours of any incident. For accidents, take dated photos before moving the vehicle and get a police FIR for theft or third-party injury. We help you decide whether to claim or self-pay (to protect your NCB), and we coordinate with surveyors so estimates are fair.",
        faqs: [
            {
                q: "Is third-party insurance enough?",
                a: "Legally yes, practically no. Third-party only pays for damage you cause to others — you bear all repair, theft, and disaster costs yourself.",
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
            "Life insurance is for one purpose — protecting your family's lifestyle if your income disappears. Mixing it with investment usually means inadequate protection and disappointing returns. We help separate the two cleanly.",
        coverage: [
            "Pure-term cover (highest cover, lowest premium)",
            "Whole-life and traditional endowment plans",
            "Unit-Linked Insurance Plans (ULIPs)",
            "Riders: critical illness, accidental death, waiver of premium",
            "Return-of-premium term plans",
        ],
        mistakes: [
            "Buying ULIPs or endowment for protection — they leave you under-insured.",
            "Choosing a sum-assured smaller than 10–15× annual income.",
            "Stopping premiums early — voids the entire policy.",
            "Hiding lifestyle facts (smoking, medical conditions) — claims get rejected.",
            "Not nominating, or naming a minor without an appointee.",
        ],
        claimGuidance:
            "On a death claim, the nominee should inform the insurer within 30 days. Documents required: original policy, death certificate, claim form, ID proof of nominee, and bank details. We sit with families through the process — including hospital records, post-mortem reports, and insurer questions — so the family doesn't have to face this alone.",
        faqs: [
            {
                q: "How much life cover do I need?",
                a: "A practical rule: 10–15× your annual income, plus outstanding loans, minus existing savings. We compute this for you in one conversation.",
            },
            {
                q: "Term vs traditional plan — which is better?",
                a: "For protection, pure term is almost always better. For investment, mutual funds typically outperform traditional plans. We help separate the two.",
            },
            {
                q: "Until what age should I take cover?",
                a: "Until your dependents become financially independent — typically your retirement age, often 60–65.",
            },
        ],
    },
    {
        slug: "business",
        name: "Business Insurance",
        tagline: "Cover that protects what you've built — and the people who built it with you.",
        intro:
            "Business insurance is rarely about one big risk — it's about a portfolio of small ones that compound. Property, liability, employee benefits, cyber exposure, and key-person cover all need to be sized to your specific business model, not bought off-the-shelf.",
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
            "Skipping group health for small teams — you lose negotiating leverage at renewal.",
            "Ignoring cyber liability when you handle customer data or run e-commerce.",
            "Under-insuring stock and equipment — fire claims often pay out a fraction of replacement cost.",
            "Treating insurance as compliance instead of risk management.",
        ],
        claimGuidance:
            "Business claims are won or lost in the first 72 hours — preserve evidence, file FIRs where applicable, and intimate insurers immediately. We work with your finance and ops teams to assemble documentation, manage surveyor visits, and escalate when claim handling slows down.",
        faqs: [
            {
                q: "Do I need business insurance for a small startup?",
                a: "Yes — even early-stage businesses face property, liability, and employee-related risks. Cover is usually inexpensive and prevents single events from ending the business.",
            },
            {
                q: "What is D&O insurance?",
                a: "Directors & Officers insurance protects company leadership against personal liability arising from management decisions. Critical for funded startups and growing companies.",
            },
            {
                q: "How is group health priced?",
                a: "By age mix, family size, and prior claim experience. We help structure the plan and negotiate with insurers — sometimes the best plan isn't the cheapest one.",
            },
        ],
    },
    {
        slug: "travel",
        name: "Travel Insurance",
        tagline: "Reliable cover for domestic and international travel.",
        intro:
            "Travel insurance feels invisible until you actually need it — a missed connection at 2 AM, a hospitalisation in a foreign country, a lost passport. The right policy is one you can call from anywhere in the world and get help in minutes.",
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
            "Buying the cheapest cover bundled with the airline — usually inadequate for medical claims.",
            "Skipping declaration of pre-existing conditions.",
            "Choosing low medical sum insured for US/Europe — costs are 5–10× of India.",
            "Missing the trip-cancellation window because of a non-covered reason.",
            "Forgetting the 24/7 helpline number — keep it on phone and on paper.",
        ],
        claimGuidance:
            "For medical emergencies abroad, call the insurer's 24/7 helpline first — many hospitals require pre-authorisation for cashless treatment. Keep all bills, prescriptions, police reports (for theft) and boarding passes. We help with claim filing and follow-ups in the local time zone.",
        faqs: [
            {
                q: "Is travel insurance really necessary for short trips?",
                a: "Yes — even a 3-day medical hospitalisation in the US can cost ₹15–20L. Premium for adequate cover is typically a fraction of one day's hotel stay.",
            },
            {
                q: "Does it cover trip cancellation due to illness?",
                a: "Most policies do, with documentation. Some specifically exclude cancellations due to pre-existing conditions unless declared.",
            },
            {
                q: "What about adventure activities?",
                a: "Standard policies often exclude trekking above 4,000m, scuba diving, skiing. Declare planned activities upfront — we'll find a policy that covers them.",
            },
        ],
    },
    {
        slug: "personal-accident",
        name: "Personal Accident Insurance",
        tagline: "Income protection if an accident changes everything.",
        intro:
            "Personal accident cover is one of the most under-bought insurances in India. It pays a lumpsum and weekly income on accidental death, disability, or temporary disablement — exactly when health insurance and life insurance both fall short.",
        coverage: [
            "Accidental death benefit",
            "Permanent total / partial disability",
            "Temporary total disability with weekly income",
            "Education benefit for dependent children",
            "Hospital cash benefit",
            "Worldwide cover, 24x7",
        ],
        mistakes: [
            "Assuming life insurance covers disability — it usually doesn't.",
            "Choosing a low sum insured. Aim for at least 10–15× annual income.",
            "Skipping coverage for self-employed individuals where income depends on physical work.",
            "Not declaring high-risk occupations — voids the cover.",
            "Forgetting to add it to a family floater for spouse and adult children.",
        ],
        claimGuidance:
            "Inform the insurer within 24–48 hours of the accident. Preserve FIRs, medical reports, and disability certificates from a government hospital. We help compile the disability declaration and follow up with the insurer's medical board so payouts aren't delayed by paperwork gaps.",
        faqs: [
            {
                q: "Isn't personal accident cover already in my motor policy?",
                a: "Motor policies include limited owner-driver PA cover. A standalone PA policy provides much higher cover, applies anywhere, and includes disability income — a different and stronger product.",
            },
            {
                q: "What is the difference between disability and death benefit?",
                a: "Death benefit is a one-time lumpsum to your nominee. Disability benefit pays you a sum (and sometimes weekly income) while you can't earn — often more financially relevant during your working years.",
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
