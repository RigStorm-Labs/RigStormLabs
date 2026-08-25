# RigStormLabs

RigStorm Labs – Custom PC builds, repairs, and gaming hardware solutions.

## JAMstack site

A fast, static-first RigStorm Labs marketing site built with:

- Vite for the local development and production build pipeline
- Semantic HTML, responsive CSS, and progressive-enhancement JavaScript
- Static JSON content in `public/data/builds.json` for the featured builds collection
- No runtime server or database required; the generated `dist/` directory can be deployed to Netlify, Vercel, GitHub Pages, or any CDN

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The provided RigStorm mark lives at `public/rigstorm-mark.svg` and is used for the favicon and site wordmark. The original repository did not contain a supplied logo or txt brief, so this mark is a custom fallback derived from the RigStorm Labs name.
