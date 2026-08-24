# Avant Creative Group

Portfolio and content studio for Avant Creative Group, built with Vinext and React.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide admin credentials to test protected content management. Local D1 and R2-compatible bindings are provided by the Vinext development runtime.

## Production capabilities

- Public photography and film portfolio
- Responsive, accessible hero carousel and navigation
- Persistent project publishing through D1
- Persistent contact enquiries with spam and rate protection
- Protected admin content studio
- R2-backed project image uploads
- Open Graph, X, structured data, sitemap and robots metadata

The hosted bindings are declared in `.openai/hosting.json`. Run `npm run build`, `npx tsc --noEmit`, and `node --test tests/rendered-html.test.mjs` before publishing.
