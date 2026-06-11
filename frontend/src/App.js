import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/site/Navbar";
import Footer from "./components/site/Footer";
import WhatsAppFloat from "./components/site/WhatsAppFloat";
import AdvisorDialog from "./components/site/AdvisorDialog";
import UploadDialog from "./components/site/UploadDialog";
import ClaimSupportDialog from "./components/site/ClaimSupportDialog";

import HomePage from "./pages/HomePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ClaimSupportPage from "./pages/ClaimSupportPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import RequireAdmin from "./pages/RequireAdmin";

function PublicShell({ children }) {
    return (
        <div className="App">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
}

function GlobalDialogs() {
    const [advisorOpen, setAdvisorOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [claimOpen, setClaimOpen] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            if (e.detail === "advisor") setAdvisorOpen(true);
            if (e.detail === "upload") setUploadOpen(true);
            if (e.detail === "claim") setClaimOpen(true);
        };
        window.addEventListener("rp-open-dialog", handler);
        return () => window.removeEventListener("rp-open-dialog", handler);
    }, []);

    return (
        <>
            <AdvisorDialog open={advisorOpen} onOpenChange={setAdvisorOpen} />
            <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
            <ClaimSupportDialog open={claimOpen} onOpenChange={setClaimOpen} />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicShell>
                            <HomePage />
                        </PublicShell>
                    }
                />
                <Route
                    path="/services/:slug"
                    element={
                        <PublicShell>
                            <ServiceDetailPage />
                        </PublicShell>
                    }
                />
                <Route
                    path="/claim-support"
                    element={
                        <PublicShell>
                            <ClaimSupportPage />
                        </PublicShell>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PublicShell>
                            <AboutPage />
                        </PublicShell>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PublicShell>
                            <ContactPage />
                        </PublicShell>
                    }
                />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                    path="/admin"
                    element={
                        <RequireAdmin>
                            <AdminDashboardPage />
                        </RequireAdmin>
                    }
                />
            </Routes>

            <GlobalDialogs />
            <Toaster
                position="top-center"
                richColors
                closeButton
                toastOptions={{ style: { fontFamily: "Manrope, sans-serif" } }}
            />
        </BrowserRouter>
    );
}

export default App;
