# Fudail Wasif — Frontend & React Developer

An editorial, monochromatic portfolio built with React 19, Vite 8, Tailwind CSS v4, GSAP, and Locomotive Scroll 5.0.1. The site remains a client-only application with native document anchors and no backend or router.

Current hosting: [fudail-portfolio-mauve.vercel.app](https://fudail-portfolio-mauve.vercel.app/). Local changes do not publish automatically through this project’s scripts.

## Run locally

Use Node 20.19+ or a supported newer release and npm:

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
```

There is no test framework. Run lint and build, then check the browser interactions when changing layout, motion, or navigation.

## Content and components

- `src/data/profile.js`: profile, contact destinations, navigation, and expertise.
- `src/data/projects.js`: the three selected projects, supported claims, optional live/source actions, and screenshot metadata.
- `src/components/ProjectItem.jsx`: editorial project rows with full screenshot bounds, source/live links, and native expandable details.
- `src/components/Preloader.jsx`: short type-led intro with a bounded font wait, scroll handoff, and reduced-motion escape.
- `src/components/CustomCursor.jsx`: fine-pointer cursor states for links, project screenshots, and the email CTA.
- `src/hooks/useScroll.js`: the single scrolling owner, anchor/history behavior, fixed-header offsets, focus, and menu pause/resume.
- `src/hooks/usePageMotion.js`: scoped hero and section entrances, responsive SplitText, and a subtle first-project image transition on smaller screens.
- `src/lib/motion.js`: plugin registration and device capability checks.
- `src/index.css`: typography, layout, responsive states, and focus styles.
- `public/projects/`: actual live-site screenshots in 640, 960, and 1440px WebP variants.
- `public/share.png` and `public/favicon.svg`: social preview and F/W favicon.

## Search and no-JavaScript access

`vite.config.js` injects a static, semantic profile and project summary into the HTML served in development and built for production. React replaces this fallback when JavaScript runs. With JavaScript disabled, the fallback keeps the project descriptions, screenshots, and links usable. It is generated from the same profile and project data as the React page.

The same build step adds JSON-LD for the person, portfolio website, and three projects. `index.html` supplies canonical, description, robots, Open Graph, and Twitter metadata. `public/robots.txt` points to the single-page `public/sitemap.xml`; in-document anchors are part of the one canonical page. The JSON-LD makes only claims reflected in the visible portfolio and does not imply rich-result eligibility or search visibility.

The portfolio uses a locally bundled Roboto Mono variable font throughout. Only the Latin variable font file is loaded, with `font-display: swap`.

## Interaction and accessibility

The page preserves `#work`, `#about`, `#skills`, and `#contact`, with `#skills` labeled Expertise. There is a skip link, one H1, semantic landmarks, and visible keyboard focus. The mobile menu uses a native modal dialog with an explicit Tab loop, Escape handling, focus restoration, and scroll unlocking before anchor navigation.

Locomotive Scroll runs on desktop fine-pointer devices only, with the documented GSAP custom ticker integration and ScrollTrigger updates. Touch devices retain native scrolling. Reduced-motion navigation is immediate. Data-saving and low-resource signals disable heavier motion. Parallax moves images by at most 24px; magnetic movement is limited to the work and email links.

The intro runs once per page load, uses a shorter sequence on repeat visits in the same tab, and releases its scroll lock on completion or cleanup. The hero entrance starts after the curtain exits. The custom cursor appears only on fine-pointer layouts at 768px and above; text selection and editable controls retain the native cursor.

GSAP contexts, SplitText instances, listeners, observers, ticker callbacks, and scroll instances are cleaned up on unmount. The scroll hook accounts for Locomotive 5.0.1’s deferred initialization during development remounts. Fonts, images, and expanded project details trigger layout refreshes.

## Project evidence

- [High Grade Inspection](https://highgradeinspection.vercel.app/): visible service information, navigation, responsive presentation, and contact paths. No implementation stack or business outcome is claimed without source evidence.
- [GitScout source](https://github.com/fudailwasif/GitScout): React, Tailwind, Axios, GitHub REST API, parallel requests, request cancellation, and loading/error/missing-data handling. [Live demo](https://gitscout-nu.vercel.app/).
- [Rick Owens recreation source](https://github.com/fudailwasif/RickOwens-Frontend-Recreation): React, routing, shared cart/wishlist state, and browser persistence. An unofficial educational recreation with frontend-only account/checkout screens. [Live demo](https://rick-owens-frontend-recreation.vercel.app/home).

Project screenshots were captured directly from those live sites on 18 October 2026 at 1440 × 1000, then resized and converted to grayscale WebP. GitScout shows a real search for `fudailwasif`. No project interface was fabricated. Completion years and unverified career details are omitted.

The existing canonical Vercel URL is preserved. The 2026 footer credit is intentional. No résumé action is included because no résumé asset is available.
