import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/site/Navbar";
import Hero from "./components/site/Hero";
import TrustStrip from "./components/site/TrustStrip";
import HowWeHelp from "./components/site/HowWeHelp";
import PolicyReview from "./components/site/PolicyReview";
import Services from "./components/site/Services";
import WhyRightPolicy from "./components/site/WhyRightPolicy";
import ClientExperience from "./components/site/ClientExperience";
import ImpactStats from "./components/site/ImpactStats";
import HowItWorks from "./components/site/HowItWorks";
import FAQ from "./components/site/FAQ";
import FinalCTA from "./components/site/FinalCTA";
import Footer from "./components/site/Footer";
import AdvisorDialog from "./components/site/AdvisorDialog";
import UploadDialog from "./components/site/UploadDialog";

function Home() {
    const [advisorOpen, setAdvisorOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            if (e.detail === "advisor") setAdvisorOpen(true);
            if (e.detail === "upload") setUploadOpen(true);
        };
        window.addEventListener("rp-open-dialog", handler);
        return () => window.removeEventListener("rp-open-dialog", handler);
    }, []);

    return (
        <div className="App" data-testid="rightpolicy-home">
            <Navbar />
            <main>
                <Hero />
                <TrustStrip />
                <HowWeHelp />
                <PolicyReview />
                <Services />
                <WhyRightPolicy />
                <ClientExperience />
                <ImpactStats />
                <HowItWorks />
                <FAQ />
                <FinalCTA />
            </main>
            <Footer />
            <AdvisorDialog open={advisorOpen} onOpenChange={setAdvisorOpen} />
            <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
            <Toaster
                position="top-center"
                richColors
                closeButton
                toastOptions={{
                    style: {
                        fontFamily: "Manrope, sans-serif",
                    },
                }}
            />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
