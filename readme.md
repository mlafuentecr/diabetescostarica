# Diabetescostarica Monorepo

Headless WordPress backend + Next.js frontend in a single repo.

## Stack
- WordPress (PHP 8+, MySQL/MariaDB) with a minimal headless theme (`backend-wordpress/wp-content/themes/headless-wp-master`)
- Next.js 16 + React 19 + Tailwind 4 (Node.js 18+) in `frontend-next`

## Repository Layout
- `backend-wordpress/` – full WordPress install; activate the “Minimal Theme” for headless output. Keep custom plugins/ACF here.
- `frontend-next/` – Next.js app consuming the WP REST API; contains UI, templates, and utility code.
- `readme.md` – project notes (this file).

## Prerequisites
- PHP 8+, MySQL/MariaDB, Apache/Nginx (XAMPP/LocalWP/DevKinsta are fine)
- Node.js 18+ with npm (or pnpm/yarn/bun if you prefer)

## Local Setup

### Backend (WordPress)
1) Create a database (e.g., `diabetescostarica`) and user with full privileges.  
2) Copy `backend-wordpress` into your web root (e.g., `/Applications/XAMPP/xamppfiles/htdocs/diabetescostarica`).  
3) Configure `backend-wordpress/wp-config.php` (DB name/user/pass, salts, site URL).  
4) Visit the site domain to finish install/login.  
5) In WP Admin: Appearance → Themes → activate “Minimal Theme” (from `headless-wp-master`).  
6) Settings → Permalinks → set to “Post name”.  
7) Install/enable any needed plugins (ACF, WPGraphQL, CORS headers, etc.) and expose content through REST (or GraphQL if you add it).

API base (for reference): `http(s)://<your-wp-host>/wp-json/`

### Frontend (Next.js)
```bash
cd frontend-next
npm install
```

Create `.env.local` (recommended) to avoid hardcoded URLs:
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/diabetescostarica/backend-wordpress/wp-json
```

Run the dev server:
```bash
npm run dev
```
Open `http://localhost:3000`. Edit `app/page.tsx` or the components in `src/` and the page auto-updates.

Build/serve production:
```bash
npm run build
npm start
```

## Development Notes
- The frontend is currently the default Next.js template plus legacy components in `src/`; wire those up to WP data as needed.
- Tailwind 4 is available via the new `@tailwindcss/postcss` pipeline.
- Add tests/linters via `npm run lint` (ESLint config is included).

## Deployment
- Host WordPress on any PHP/MySQL stack; ensure REST/API endpoints are publicly reachable.
- Deploy the Next.js build to your Node host or static host (if you adapt it), pointing it at the live WordPress API.
- Set the production API URL via environment variables on your hosting platform.

## Troubleshooting
- If REST requests fail, confirm CORS headers on WordPress and permalinks are enabled.
- Mismatched content: check `NEXT_PUBLIC_WORDPRESS_API_URL` and WordPress `Settings → General` (Site URL/Home URL).
- Clear caches (plugins/CDN) if API changes don’t show up in the frontend.
