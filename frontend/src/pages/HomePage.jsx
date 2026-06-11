import Hero from "../components/site/Hero";
import TrustStrip from "../components/site/TrustStrip";
import HowWeHelp from "../components/site/HowWeHelp";
import PolicyReview from "../components/site/PolicyReview";
import Services from "../components/site/Services";
import ClaimSupportBanner from "../components/site/ClaimSupportBanner";
import WhyRightPolicy from "../components/site/WhyRightPolicy";
import ClientExperience from "../components/site/ClientExperience";
import ImpactStats from "../components/site/ImpactStats";
import HowItWorks from "../components/site/HowItWorks";
import FAQ from "../components/site/FAQ";
import FinalCTA from "../components/site/FinalCTA";
import useSiteContent from "@/hooks/useSiteContent";

export default function HomePage() {
    const { content } = useSiteContent();

    return (
        <>
            <Hero content={content.home.hero} />
            <TrustStrip />
            <HowWeHelp />
            <PolicyReview />
            <Services />
            <ClaimSupportBanner />
            <WhyRightPolicy content={content.home.why} />
            <ClientExperience />
            <ImpactStats stats={content.home.stats} />
            <HowItWorks />
            <FAQ />
            <FinalCTA />
        </>
    );
}
