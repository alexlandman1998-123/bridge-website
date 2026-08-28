# Bridge Website

Standalone marketing site for `Bridge`, rebuilt to match the stronger landing-page direction from the original app project without carrying over app-shell complexity.

## Stack

- `React`
- `Vite`
- `Tailwind CSS v4`
- `framer-motion`
- `lucide-react`

## Local development

```bash
npm run dev
```

Optional app handoff:

```bash
VITE_BRIDGE_APP_URL=https://your-app-domain.com
```

## Build

```bash
npm run build
```

## Notes

- The homepage is now a focused standalone marketing experience in `src/pages/Home.jsx`.
- The visual system in `src/index.css` mirrors the premium neutral styling used in the original Bridge landing page.
