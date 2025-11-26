Diabetescostarica – Monorepo

This monorepo contains both the WordPress headless backend and the Next.js frontend for the Diabetescostarica project.
diabetescostarica/
  backend-wordpress/   → Headless WordPress setup (PHP, theme, plugins)
  frontend-next/       → Next.js application (React)
  readme.md

🚀 Project Overview

This project uses WordPress as a headless CMS, exposing content via the REST API (and optionally WPGraphQL), while all rendering and UI are handled by a modern Next.js frontend.

WordPress manages content, ACF fields, users, SEO metadata, etc.

Next.js consumes the API and renders the public-facing website.

📂 Repository Structure
backend-wordpress/

Contains the WordPress backend environment:

Custom headless theme

ACF configuration (if used)

Custom endpoints or functions

REST API / WPGraphQL support

All PHP logic

This folder should be placed inside a local WordPress installation under:wp-content/themes/your-theme-name

frontend-next/

Contains the Next.js frontend application:

app/ router

Components, templates, utilities

API hooks and WordPress fetch logic

Configuration and environment variables

Runs on Node.js and consumes WordPress as an external API.

🧱 Requirements
Backend (WordPress)

PHP 8+

MySQL / MariaDB

Apache/Nginx (XAMPP, DevKinsta, LocalWP, etc.)

Frontend (Next.js)

Node.js 18+

npm / pnpm

/your-local-wp/wp-content/themes/diabetescostarica-headless
