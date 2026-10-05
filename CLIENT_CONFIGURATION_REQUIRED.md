# Client Configuration Required — LUXÉ

The following parameters contain client-specific placeholders. Before live production launch on the client's official domain, the client must provide real production values for each item below:

| Placeholder | Description | File(s) Where Required | Client Value |
|-------------|-------------|-------------------------|--------------|
| `[PRODUCTION_DOMAIN]` | Official live HTTPS domain (e.g. `https://brand.com`) | `index.html`, `privacy-policy.html`, `terms-and-conditions.html`, `sitemap.xml`, `robots.txt`, `.env` | To be provided by client |
| `[CLIENT_EMAIL]` | Official contact and support email | `index.html`, `privacy-policy.html`, `terms-and-conditions.html` | To be provided by client |
| `[CLIENT_PHONE]` | Official customer service phone number | `index.html`, `privacy-policy.html`, `terms-and-conditions.html` | To be provided by client |
| `[COMPANY_ADDRESS]` | Registered office or venue physical address | `index.html`, `privacy-policy.html`, `terms-and-conditions.html` | To be provided by client |
| `[CLIENT_JURISDICTION]` | Governing legal jurisdiction (state/country) | `terms-and-conditions.html` | To be provided by client |
| `[ANALYTICS_ID]` | Optional Google Analytics 4 (G-XXXXX) or Plausible ID | `.env`, `index.html` (if analytics desired) | Optional / Client decision |

> **IMPORTANT**: In accordance with Rule #64, no fake company addresses, phone numbers, or emails have been invented. All values remain cleanly organized as placeholders for client onboarding.
