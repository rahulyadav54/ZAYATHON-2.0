# ZAYATHON 2.0 — Build Beyond Boundaries
### Premium Futuristic 3D Hackathon Platform | React + Three.js + Tailwind CSS

Official event website & platform for **ZAYATHON 2.0**, organized by **ZAYA CODE HUB** (2026 Edition).

Includes:
1. **Public Cinematic 3D Hackathon Website**: Interactive Three.js centerpiece, live countdown, authentic ZAYATHON 1.0 memories archive vault, interactive photo/video lightboxes, 3D trophy rewards, and high-performance glassmorphism aesthetics.
2. **Teams, Finalists & Winners Showcase** (`/teams`): Full searchable & filterable directory with squad modals, finalist previews, and a 3-position winners podium.
3. **Automated Participant Portal** (`/participant`): Unique participant ID issuance (`ZAYA26-XXXX`), 3D flippable Digital ID card (front & back), high-res PDF/PNG exports, and certificate downloads.
4. **Public QR Verification System**: Instant validation for ID cards (`/verify/participant/:id`) and accredited certificates (`/verify/certificate/:id`).
5. **Organizer Admin Control Center** (`/admin`): Real-time KPI statistics, participant approval/rejection, automated batch certificate generation, and results publication.
6. **Supabase PostgreSQL Schema & RLS Policies**: Production-grade database migration script included in `supabase/migrations/20261101_init_zayathon.sql`.

---

## ⚡ Live Routes

- **Homepage**: [http://localhost:5173/](http://localhost:5173/)
- **Teams & Winners Showcase**: [http://localhost:5173/teams](http://localhost:5173/teams)
- **Participant Portal**: [http://localhost:5173/participant](http://localhost:5173/participant)
- **Public ID Card Verification**: [http://localhost:5173/verify/participant/ZAYA26-0001](http://localhost:5173/verify/participant/ZAYA26-0001)
- **Public Certificate Verification**: [http://localhost:5173/verify/certificate/ZAYA26-CERT-0101](http://localhost:5173/verify/certificate/ZAYA26-CERT-0101)
- **Organizer Admin Control Center**: [http://localhost:5173/admin](http://localhost:5173/admin) *(Passkey: `zaya2026`)*

---

## 📁 Project Structure

```text
├── public/
│   ├── favicon.svg                  # Futuristic glowing neon Z-glyph favicon
│   ├── images/
│   │   ├── zayathon-1/              # Official ZAYATHON 1.0 authentic archive
│   │   └── teams/                   # Squad logos and architecture demo previews
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx      # Top announcement with live pulse
│   │   ├── Navbar.jsx               # Sticky navbar with active indicator & portal link
│   │   ├── Hero.jsx                 # Cinematic hero with 3D centerpiece & CTAs
│   │   ├── ThreeDScene.jsx          # Interactive 3D gyroscopic crystal with mouse tilt
│   │   ├── Countdown.jsx            # Real-time event countdown timer
│   │   ├── About.jsx                # 4 Pillars of innovation & ZAYA CODE HUB spotlight
│   │   ├── Memories.jsx             # Edition 01 memories retrospective & highlight reel
│   │   ├── PhotoGallery.jsx         # Masonry photo gallery with category filter
│   │   ├── VideoGallery.jsx         # Video archive cards
│   │   ├── MediaLightbox.jsx        # Full-screen image lightbox
│   │   ├── VideoModal.jsx           # Responsive video player modal
│   │   ├── Tracks.jsx               # 4 competition arenas (AI, Web, Open, Cyber/Fin)
│   │   ├── Timeline.jsx             # 6-phase milestone roadmap
│   │   ├── TrophyScene.jsx          # 3D golden chalice trophy
│   │   ├── Prizes.jsx               # Award-worthy podium cards
│   │   ├── Sponsors.jsx             # Ecosystem partners
│   │   ├── WhyParticipate.jsx       # 6 core builder incentives
│   │   ├── Team.jsx                 # Leadership team cards
│   │   ├── FAQ.jsx                  # Smooth interactive FAQ accordion
│   │   ├── Contact.jsx              # Direct communication portal
│   │   ├── Footer.jsx               # Cyberpunk footer
│   │   ├── RegistrationModal.jsx    # VIP notify-me modal with confetti
│   │   ├── SocialIcons.jsx          # Vector SVGs for Instagram, LinkedIn, GitHub
│   │   ├── certificate/
│   │   │   └── OfficialCertificate.jsx # High-res A4 Landscape certificate renderer
│   │   ├── idcard/
│   │   │   └── DigitalIdCard.jsx    # Flippable 3D ID pass with front/back & QR
│   │   └── teams/
│   │       ├── TeamCard.jsx         # Squad card with status & track pills
│   │       ├── TeamDetailsModal.jsx # Detailed squad modal with roster & GitHub/demo
│   │       ├── WinnersPodium.jsx    # 3-position podium with locked/published states
│   │       └── TeamsPreviewSection.jsx # Homepage spotlight preview
│   ├── pages/
│   │   ├── HomePage.jsx             # Main homepage
│   │   ├── TeamsPage.jsx            # Full teams, finalists & winners directory
│   │   ├── ParticipantPortal.jsx    # Participant profile, ID card & cert downloads
│   │   ├── VerifyParticipant.jsx    # Public ID card QR verification
│   │   ├── VerifyCertificate.jsx    # Public Certificate QR verification
│   │   └── AdminDashboard.jsx       # Organizer control center
│   ├── config/
│   │   └── eventConfig.js           # Central event configuration
│   ├── data/
│   │   ├── teams.js                 # Teams registry
│   │   ├── winners.js               # Winners configuration & podium data
│   │   ├── memories.js              # Edition 01 authentic media registry
│   │   ├── tracks.js                # Track details & tags
│   │   ├── timeline.js              # Event timeline milestones
│   │   ├── prizes.js                # Rewards & perk specifications
│   │   ├── sponsors.js              # Partner & sponsor tiers
│   │   ├── faqs.js                  # Knowledgebase answers
│   │   └── team.js                  # Organizing team roster
│   ├── services/
│   │   └── dataService.js           # Reactive storage & Supabase-ready data service
│   ├── utils/
│   │   ├── qrGenerator.js           # Dynamic QR code generator
│   │   └── pdfGenerator.js          # html2canvas + jsPDF high-res export engine
│   ├── App.jsx                      # React Router configuration
│   ├── index.css                    # Design system tokens & utility classes
│   └── main.jsx                     # Vite root entry
├── supabase/
│   └── migrations/
│       └── 20261101_init_zayathon.sql # Supabase PostgreSQL migration script
├── tailwind.config.js               # Theme colors, fonts, shadows, and animations
├── vite.config.js                   # Code-splitting & bundle optimization
└── vercel.json                      # Single-page app routing & static cache headers
```

---

## 🔒 Organizer Admin Credentials

- **Route**: `/admin`
- **Passkey**: `zaya2026` *(or `admin`)*
- **Capabilities**:
  - Approve & assign unique participant IDs (`ZAYA26-XXXX`).
  - Toggle and revoke participant ID card validity.
  - Issue official Certificates of Participation, Finalist, Runner-up, Winner, or Special Awards.
  - Bulk issue participation certificates to all approved participants in one click.
  - Publish or unpublish the official Winners Podium on the public website.
  - Review live KPI metrics calculated from active records.

---

## 🚀 Development Instructions

```bash
# Start development server
npm run dev

# Run production build
npm run build
```
Builds with zero errors in ~2.1s, generating modular chunks for Three.js, PDF generation, UI animations, and app logic.
