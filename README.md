# Manthan Bhatt — Case File

This repository contains the source code for my personal portfolio, built with React and Vite. The design language is modeled after a **security case file / evidence report**, utilizing a brutalist and editorial aesthetic to reflect my work in offensive security.

## Features

- **Thematic Design**: Brutalist "paper and ink" styling using plain CSS and design tokens.
- **Dark Mode**: `[LIGHT / DARK]` toggle mimicking an original document vs. a night-shift photocopy, with `localStorage` persistence.
- **Redaction Interactivity**: Hover/focus effects on redacted text phrases in the Hero section.
- **Dynamic Routing (SPA)**: Custom 404 page ("Exhibit Not Found").
- **Security Context**: Contains a `.well-known/security.txt` per RFC 9116.
- **Optimized SEO**: Fully configured Open Graph and Twitter meta tags with custom static preview cards.

## Local Development

To run this project locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Architecture

- Built using **React + Vite** for fast HMR and optimized production builds.
- CSS Modules / Custom Properties for scoped, themeable styling without heavy CSS frameworks.
- Static assets (images, PDFs) served directly from the `public/` directory.

---
*REF// AS-2028-CSE-NIRMA — STATUS: ACTIVE*
