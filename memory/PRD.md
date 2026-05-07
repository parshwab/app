# RightPolicy — Product Requirements Document

## Original Problem Statement
Redesign and refine the RIGHTPOLICY homepage inspired by Policygenius UX/structure while keeping a unique premium, calm, human-first insurance advisory identity for India. NOT a fintech marketplace, NOT aggressive lead-gen. Visual: warm off-white, deep navy, refined red, premium spacing, mobile-first.

## User Choices (Dec 2025)
- Frontend + backend (inquiries + PDF policy uploads stored)
- India-specific tone (₹/IRDAI references)
- Stock photo human imagery (Unsplash)
- Real PDF upload to backend
- Reasonable design defaults: Outfit (display) + Manrope (body), #FAF9F6 / #0F172A / #C8322A

## User Personas
1. **Family decision-maker** — needs honest guidance on health/life insurance, dislikes call-center scripts.
2. **Existing policyholder** — wants a free second opinion on coverage gaps.
3. **Small business owner** — needs liability/employee benefits without sales pressure.

## Architecture
- Backend: FastAPI + Motor (async MongoDB), file uploads to `/app/backend/uploads`.
- Endpoints (all `/api`-prefixed):
  - `GET /health`
  - `POST/GET /inquiries` — advisor request form
  - `POST/GET /policy-uploads` — multipart PDF/image upload (max 15 MB; .pdf/.png/.jpg/.jpeg)
- Frontend: React 19 + Tailwind + shadcn UI (Dialog, Accordion, Input, Label, Textarea) + sonner toasts + lucide-react icons.

## Implemented (2025-12)
- 12-section homepage: Navbar (sticky w/ scroll-blur), Hero (split, two CTAs, floating card), TrustStrip (5 items), HowWeHelp (3-step cards), PolicyReview (dark navy band w/ image + upload CTA), Services (6 cards), WhyRightPolicy (3-col comparison table w/ red X / green ✓), ClientExperience (4 value cards, no fake names), ImpactStats (4 numbers), HowItWorks (4-step timeline), FAQ (shadcn accordion, 6 Qs), FinalCTA, Footer.
- AdvisorDialog (form → POST /api/inquiries) + UploadDialog (multipart → POST /api/policy-uploads).
- Custom event bus `rp-open-dialog` for cross-section CTAs.
- All interactive elements have `data-testid` attributes.
- Backend validation: EmailStr, phone min length, file extension allowlist, 15 MB hard limit, ObjectId excluded from responses.
- 100% backend + 100% frontend test pass (testing_agent_v3 iter 1).

## Backlog
- P1: Admin view of inquiries / policy uploads (table + download link).
- P1: Email/SMS notification on new inquiry (SendGrid / Twilio).
- P1: Per-service detail pages (Health, Motor, Life, Business, Travel, Personal Accident).
- P2: Multi-language (Hindi) toggle for India market.
- P2: Insurance learning blog/articles.
- P2: WhatsApp click-to-chat advisor handoff.
