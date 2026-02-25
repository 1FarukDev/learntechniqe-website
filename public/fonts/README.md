# Nohemi font (headings)

Headings use **Nohemi** by Rajesh Rajput.

## Setup (after downloading the zip)

1. **Extract the zip** you downloaded (from Befonts, Google Fonts, or elsewhere).

2. **Copy font files** into this folder (`public/fonts/`). You need at least:
   - **Regular** (400): `Nohemi-Regular.woff2`, `Nohemi-Regular.woff`, `Nohemi-Regular.otf`, or `Nohemi-Regular.ttf`
   - **Bold** (700): `Nohemi-Bold.woff2`, `Nohemi-Bold.woff`, `Nohemi-Bold.otf`, or `Nohemi-Bold.ttf`

3. **Rename files if needed.** If your zip has different names (e.g. `Nohemi-Regular-BF6438cc4d0e493.ttf`), rename to:
   - `Nohemi-Regular.ttf` (or `.woff2` / `.woff` / `.otf`)
   - `Nohemi-Bold.ttf` (or `.woff2` / `.woff` / `.otf`)

4. **Restart the dev server** if it’s running (`npm run dev`).

## Where to get Nohemi

- **Befonts**: https://befonts.com/nohemi-font-family.html
- **Google Fonts**: Nohemi is not on Google Fonts. If you downloaded a similar font from Google, check the zip for the actual font name and file names.

## Verify

After adding the files, headings (h1–h6) should use Nohemi. If not, check:

- Files are in `public/fonts/` (not in a subfolder)
- File names match exactly (case-sensitive)
- Dev server was restarted
