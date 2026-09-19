---
name: templates
description: Converts invitation card images in public/templates to WebP and kebab-case names, then updates catalog paths. Use when the user changes images in public/templates, asks to convert template images to webp, or names this skill.
---

# Templates images

to webp change his names

## When to run

User drops or replaces files in `public/templates`, or asks to convert/rename template card images.

## Workflow

1. List files in `public/templates`.
2. Convert every non-WebP image to WebP (quality 82). Use `sharp` from Next.js (`node_modules/sharp`).
3. Rename outputs to kebab-case: lowercase, hyphens, no spaces. Keep the template slug when replacing a card (`botanical.webp`, `midnight-silk.webp`, `coastal-light.webp`, `heritage-script.webp`, `desert-bloom.webp`, `atelier-rose.webp`).
4. Delete the original jpg/png/jpeg after a successful convert.
5. Set `image` in `src/data/templates.ts` to `/templates/<slug>.webp`.
6. Confirm files exist and the catalog paths match.

## Convert command

```js
const sharp = require("sharp");
await sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
```

Run from the repo root. Do not leave both `.jpg` and `.webp` for the same card.
