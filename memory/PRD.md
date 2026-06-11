# RightPolicy — Product Requirements Document

## Original Problem Statement
Premium human-first insurance advisory platform for India with two equally important verticals — (1) Insurance Advisory and (2) Claim Support & Assistance. UX inspired by Policygenius. NOT a fintech marketplace, NOT aggressive lead-gen.

## Brand
- Palette: warm off-white `#FAF9F6`, deep navy `#0F172A`, refined red `#C8322A`, success `#16A34A`
- Typography: Outfit (display), Manrope (body)
- WhatsApp number: +91 9404 9088 66 (`919404908866`)
- Contact email: contact@rightpolicy.in

## Architecture
- **Backend**: FastAPI + Motor (async MongoDB), bcrypt + PyJWT for admin auth, file uploads to `/app/backend/uploads`, Resend for email (log-only fallback when `RESEND_API_KEY` empty).
- **Frontend**: React 18 + Tailwind + shadcn UI (Dialog, Accordion, Tabs, Input, Label, Textarea) + sonner toasts + lucide-react icons + React Router 7.

## Routes
| Path | Page |
|---|---|
| `/` | Home (12 sections + claim banner) |
| `/services/{health\|motor\|life\|business\|travel\|personal-accident}` | Service detail page |
| `/claim-support` | Claim Support page |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard (protected) |

## API Endpoints (all `/api`-prefixed)
**Public**: `GET /health`, `POST /inquiries`, `POST /policy-uploads`, `POST /claim-support`
**Admin** (Bearer JWT, 12h): `POST /admin/login`, `GET /admin/me`, `GET /admin/stats`, `GET/PATCH /admin/inquiries[/{id}]`, `GET/PATCH /admin/policy-uploads[/{id}]`, `GET /admin/policy-uploads/{id}/download`, `GET/PATCH /admin/claim-requests[/{id}]`. All admin lists support `?q=&status=` filters.

## Implemented (Dec 2025)

### Iteration 1
- 12-section homepage (Navbar, Hero, TrustStrip, HowWeHelp, PolicyReview, Services, WhyRightPolicy, ClientExperience, ImpactStats, HowItWorks, FAQ, FinalCTA, Footer)
- Inquiry + Policy Upload dialogs + endpoints
- 100% testing_agent_v3 pass

### Iteration 2
- Premium WhatsApp floating CTA (bottom-right, navy pill, not neon)
- 6 Service detail pages with editorial layout (intro, coverage, common mistakes, claim guidance, FAQ, related services)
- Dedicated `/claim-support` page (calm reassuring hero, 6 help cards, 4-step process, FAQ, closing CTA)
- ClaimSupportDialog (POST `/api/claim-support`)
- ClaimSupportBanner on homepage
- Navbar: Services dropdown, Claim Support link, dual CTAs ("Get Claim Support" + "Book a Free Consultation")
- All CTAs unified to "Book a Free Consultation" with subline
- Admin auth (JWT 12h, bcrypt, idempotent seed) — credentials must be stored only in deployment environment variables
- Admin dashboard: stat cards, 3 tabs, search/status filter, status select, notes editor, contact icons (mail/phone/whatsapp), policy file download
- Email notifications via Resend (advisor alert + user confirmation) — log-only fallback when key absent
- 100% testing_agent_v3 pass (backend 16/16, frontend 19/19)

## User Personas
1. **Family decision-maker** — needs honest guidance on health/life insurance.
2. **Existing policyholder** — wants free second opinion on coverage gaps.
3. **Small business owner** — needs liability/employee benefits without pressure.
4. **Distressed claimant** — needs human help navigating an active claim.
5. **Internal admin** — needs to triage incoming leads/uploads/claim requests.

### Iteration 3 (Dec 2025)
- Replaced all logos with the official red-umbrella + blue RIGHTPOLICY wordmark (`/app/frontend/public/logo.png`, derived `favicon.png` + `favicon.ico`)
- Centralised `<Logo />` component reused across navbar, footer, admin login, admin dashboard
- Redesigned hero into TWO equally-weighted verticals: Option 1 *Insurance Advisory* (white card, "Book a Free Consultation" + "Upload Existing Policy") and Option 2 *Claim Support & Assistance* (dark navy card, "Get Claim Support" + "How we help")
- New hero headline: "Two ways to feel truly insured."
- Site-wide copy refresh: removed em dashes (—) everywhere (frontend + backend email templates), reduced overuse of "human / human-first / real humans / real people" in favour of "experienced advisors / trusted guidance / calm consultation / long-term support"
- testing_agent_v3 final pass: 100% backend (25/25) + 100% frontend (after fixing the AdminLoginPage Logo import + final `humans` reference in PolicyReview)

### Iteration 4 (Dec 2025) — Polish & Refinement
- Restored emotional hero positioning: new headline **"Insurance guidance you can actually trust."** with the original "no bots, experienced advisors, families and businesses, standing by you when it's time to claim" sub-line. Both verticals stay side-by-side at md+ via `md:grid-cols-2`.
- Trust strip is now a smooth premium **CSS marquee/ticker** (6 items, GPU-accelerated transform, hover-to-pause, soft fade edges, `prefers-reduced-motion` respected).
- Service page copy cleaned: "Insurance, explained without the jargon." → "Insurance, explained." / "Coverage, in plain English." → "Coverage, explained." / HowWeHelp "plain English" → "clear language".
- **Mobile menu nav fixed**: About + Contact now smooth-scroll on the homepage and route + scroll across pages via `useLocation`/`useNavigate` + `scrollIntoView` + `history.replaceState` for URL hash sync. New testids: `mobile-navlink-{about|contact|claim-support}`.
- WhatsApp float copy: **"Chat with our Expert"** (was "Chat with a real advisor").
- testing_agent_v3 final pass: 100% backend (25/25), 100% frontend acceptance.

## Backlog
- P1: Add `RESEND_API_KEY` to `/app/backend/.env` to switch emails from log-only to live
- P1: Hindi (हिंदी) language toggle
- P1: Per-service blog/articles for SEO/educational depth
- P2: Optional dark mode (muted, not gaming-style)
- P2: Slack/Telegram alert webhook for new high-priority claims
- P2: Activity log per inquiry/claim (multiple internal notes with timestamps)
- P2: Export inquiries/claims to CSV
- P2: Two-factor admin auth
- P3: Public reviews/testimonials submission flow

## Files of Note
- `/app/backend/server.py` — single-file FastAPI app
- `/app/backend/.env` — JWT_SECRET, ADMIN_EMAIL/PASSWORD, RESEND_API_KEY, ADVISOR_ALERT_EMAIL, SENDER_EMAIL
- `/app/frontend/src/data/services.js` — single source of truth for the 6 services
- `/app/frontend/src/lib/rp.js` — axios instance, WhatsApp helpers, error formatting
- Deployment environment variables — admin login credentials
