# Client Handover Manual — AURORE PARIS

**Project:** AURORE PARIS — Haute Parfumerie & Horlogerie  
**Release Version:** v1.0.0 Production  
**Handover Date:** October 2026  

---

### 1. Source Code Repository
- **Main Branch:** `main`
- **Clean Architecture:** Standard Vanilla HTML5, CSS3, ES6+ JavaScript. No third-party framework dependencies (no React, Angular, Vue or heavy npm bloat).
- **Zero Secrets Guarantee:** Checked and verified. All configurations abstracted to `.env.example` and `CLIENT_CONFIGURATION_REQUIRED.md`.

---

### 2. Hosting & Deployment Options
This website is 100% cloud and host agnostic:
1. **Containerized Hosting (Recommended for Enterprise):**
   - Deploy using the included `Dockerfile` and `docker-compose.yml` to AWS ECS, DigitalOcean App Platform, Google Cloud Run, or any Linux VPS with Docker + Nginx.
2. **Static Web Hosting (Fastest & Simplest):**
   - Deploy `index.html`, `style.css`, `script.js`, `images/`, `favicon.svg`, and legal HTML pages directly to Cloudflare Pages, Vercel, Netlify, or AWS S3 + CloudFront.

---

### 3. Domain & DNS Configuration
1. Point your domain DNS records (`A` / `CNAME`) to your target host.
2. Ensure automated SSL/TLS certificates (Let's Encrypt or Cloudflare Universal SSL) are activated.
3. Replace `[PRODUCTION_DOMAIN]` in `sitemap.xml` and HTML canonical tags with your real domain.

---

### 4. Form Submissions
Current forms feature:
- Front-end validation with real-time accessible error feedback.
- Hidden honeypot fields to filter automated bot spam.
- To connect submissions to an external CRM or inbox, configure a transactional webhook endpoint (e.g. Formspree, Resend, or your proprietary backend API).

---

### 5. Maintenance & Updates
- Static HTML/CSS sites require negligible security patching compared to WordPress or dynamic CMS engines.
- Simply update text, imagery, or menu/product pricing directly in the HTML or via static updates.
