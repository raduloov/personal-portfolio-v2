# "Case File" Visual Redesign (ufburgers.com aesthetic)

## Intent

Re-skin the portfolio in the aesthetic of ufburgers.com: a dark "ink" base with
cream paper sections, a hot yellow accent, hard offset shadows, condensed
all-caps display type, monospace eyebrows, film-grain and paper textures, and
"chapter" headers that split the page into reels. Content (projects, jobs,
certifications, copy) stays the same; only the presentation changes.

## Goals

- The site should read, at a glance, as a sibling of the reference: same
  palette family, same type system, same texture and shadow language.
- Keep the existing scroll-driven hero frame animation and the "Cooking…"
  loader; recolor them into the new palette.
- Keep every section and anchor id (`home`, `about`, `experience`, `projects`,
  `certifications`), add `contact`.
- Responsive to phone width with no horizontal scroll.

## Non-goals

- Copying the reference's content, imagery, UFO illustrations or logo.
- Adding a CMS, i18n, or new data.

## Design system

Tokens (CSS custom properties in `src/index.css`):

| Token | Value | Role |
|---|---|---|
| `--ink` | `#1a1a18` | page base, dark bands, text on paper |
| `--cream` | `#f3e9d2` | paper sections, text on ink |
| `--paper-white` | `#fff8ec` | cards on paper |
| `--yellow` | `#fabf0b` | accent, CTAs, active nav, epilogue |
| `--orange` | `#ce6632` | experience section, hero color-blend |
| `--red` | `#c8311f` | hard button shadow, display accents, pins |

Type (Google Fonts): Oswald 700 (display), Rubik 900 (heavy: buttons, big
numbers), IBM Plex Mono 500 (eyebrows, labels), Golos Text 400/600 (body).

Textures: a fixed film-grain overlay (SVG turbulence, ~7% opacity) over the
whole page; a paper noise texture multiplied onto cream/yellow/orange
sections and cards.

Motion: hard-shadow buttons translate toward their shadow on press; cards
rotate to zero and lift on hover with a spring easing; marquee tape scrolls.

## Page structure

1. **Header**: fixed, transparent over the hero, becomes ink+grain once
   scrolled. "YR" wordmark left, centered pill nav (active item = yellow pill),
   yellow "Get in touch" button right. Mobile: hamburger → full-screen ink
   drawer with large Oswald links.
2. **Hero** (`home`): existing canvas frame animation with an orange
   `mix-blend-mode: color` wash and dark vignette. Left-aligned eyebrow, short
   lede, CTA row, then a giant two-line Oswald title (cream / yellow with red
   offset shadow). A mono "credits" strip along the bottom.
3. **Chapter heads**: reusable ink band with eyebrow "CHAPTER ONE", huge cream
   title, inner hairline frame, and "REEL 1 OF 5 ✦ YR" footer.
4. **About** (`about`, chapter one): cream paper. Polaroid-style profile photo
   with tape and hard shadow, Oswald heading (ink line + red line), body copy,
   mono facts grid.
5. **Tape**: yellow caution-tape marquee of the tech stack, slightly rotated.
6. **Experience** (`experience`, chapter two): orange paper. Jobs as paper
   "tickets" in a 2-column grid: № and dates in mono, Oswald position,
   company ✦ location, bullets, tech chips. Perforated top edge.
7. **Tech pool**: kept; ink background, cream low-opacity logos.
8. **Projects** (`projects`, chapter three): ink. Each project is a cream
   "wanted poster": red pins, ink kicker with case № and date, Oswald title,
   thick-bordered screenshot with a yellow language tag, "Distinguishing
   marks" (description), "Known associates" (tags), "Reward" (links / Play
   badge). Posters alternate slight rotation and straighten on hover.
9. **Certifications** (`certifications`, chapter four): cream paper. Taped
   "exhibit" cards with a rotated "VERIFIED ✦ issuer" stamp; click opens the
   certificate in a paper-framed modal.
10. **Contact** (`contact`, epilogue): yellow paper, giant "LET'S BUILD."
    title, lede, three mono-labelled columns (coordinates, channels, status).
11. **Footer**: ink, wordmark, mono line, credits.

## Builder's calls

- Fonts loaded from Google Fonts rather than self-hosted.
- Textures generated as inline SVG data URIs; no image assets added.
- `TechPool` and the hero loader keep their behavior, recolored.
- The 3D tilt on project cards is replaced by the rotate-to-zero poster hover.
- Hero copy and section labels are placeholders the owner can edit in the
  components.

## Addendum (2026-10-30): plain copy

After review the themed wording was dropped while keeping the look. Chapter
heads became `SectionHead` ("01 / 04", literal title, short note); "wanted
poster", "exhibit", "case №", "reel", "presents/starring" and similar labels
were replaced with plain ones (№ 01, What it is, Built with, Links, Tap to
view, Contact). The spec above describes the original themed copy.
