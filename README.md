# Fooping portfolio

Hand-written static site. No build step: open `index.html` in a browser and it works.

## Files

```
index.html                 home page: hero, about, projects, accomplishments, contact
css/theme.css              ALL colors, fonts, spacing, effects (design tokens). Re-theme here.
css/main.css               layout + components. Only uses var(--...) from theme.css.
js/main.js                 mobile menu toggle + footer year. Site works without it.
assets/img/                images. placeholder.svg is the stand-in for everything.
projects/project-template.html   copy this for each new project page
projects/wormhole.html     Wormhole mod page
.nojekyll                  tells GitHub Pages not to run Jekyll (see below)
```

## Finding placeholders

Every placeholder has `class="todo"`, which draws a dashed magenta box around it in the browser.
Search the HTML for `todo` to find them all; delete the class once the content is real.

## Adding a project

1. Copy `projects/project-template.html` to `projects/my-thing.html` and fill it in.
2. In `index.html`, copy one `<li>` card block in the Projects section and point its links at the new page.

## Switching themes

Add `data-theme="pixel"` to the `<html>` tag. The pixel block at the bottom of `css/theme.css` swaps the
heading font to Silkscreen, kills rounded corners, and replaces soft glows with hard offset shadows.
It's a starter, not a finished theme.

## Images & GIFs

- Keep project images 16:9 so the cards line up (they're cropped to 16:9 anyway).
- Big GIFs are a trap: a 10-second gameplay GIF can easily be 10-20 MB. For anything animated over a
  couple MB, export an MP4/WebM and use
  `<video autoplay muted loop playsinline src="..."></video>` instead. Same look, ~10x smaller.
- For pixel art, export at native size and let `image-rendering: pixelated` scale it up crisply.

## GitHub Pages notes

- `.nojekyll` matters: without it, GitHub Pages runs Jekyll, which silently ignores any file or folder
  starting with `_`.
- This repo (`fooping`) publishes to `https://xfooping.github.io/fooping/` once Pages is turned on
  (Settings → Pages → Deploy from a branch → `main` / root). All paths are relative, so it works there.

## Privacy rule

No personal info on this site beyond the name Brayden Reed: no email, phone, address, or anything else
that traces back directly. GitHub is the only contact link.
