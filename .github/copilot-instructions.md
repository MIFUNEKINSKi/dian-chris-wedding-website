# Wedding Website - AI Agent Instructions

## Project Overview
Static HTML/CSS/JS wedding website with multi-channel email invitation system. No build tools, no frameworks—pure vanilla web technologies optimized for simplicity and Vercel deployment.

**Philosophy**: Zero dependencies beyond browser APIs and EmailJS CDN. All animations, lightbox, form validation, and UI interactions built from scratch for maximum control and minimal bundle size.

## Architecture & Key Components

### 1. User Journey (3-Page Flow)
- `email-invitation*.html` → Guest receives personalized email invitation
- `invitation.html` → Landing page with elegant full-screen invitation card (parallax hero)
- `index.html` → Main wedding website with luxury preloader, gallery lightbox, and RSVP form

### 2. Email Delivery Systems (3 Options)
The project supports three email delivery methods—all using the same visual template:

**a) EmailJS (Browser-based, Active)** - `script.js`
- Service: `service_1hg45ft` (configured)
- Templates: `template_0jc1zvm` (to owner), `template_guest_confirm` (guest confirmation)
- User ID: `eFHAzQYQmpvprp7lb` (verified)
- Dual-send pattern: notification to owner + auto-reply confirmation to guest
- See `EMAILJS_SETUP.md` for configuration details

**b) Python SMTP** - `send_wedding_invitations.py`
- Direct Gmail SMTP with app password (`cmjehopyagttxgnf`)
- CSV-driven bulk sending (`guest-list-template.csv`)
- Auto-delay between sends (5s default) to avoid spam detection
- Interactive CLI: test email → bulk send → logging to `wedding_email_log.txt`
- Template: `email-invitation-python.html`

**c) Mailchimp** - `email-invitation-mailchimp.html`
- Template with Mailchimp merge tags (`*|FNAME|*`, etc.)
- See `MAILCHIMP_SETUP_GUIDE.md`

### 3. Core Files Structure
```
index.html          → Main website (RSVP, gallery, story, registry)
styles.css          → Single stylesheet (no preprocessors, 1500+ lines)
script.js           → Vanilla JS (EmailJS, animations, form validation, 800+ lines)
invitation.html     → Standalone full-screen invitation landing page
```

## Design System & Styling Conventions

### Color Palette (CSS Variables in `:root`)
- `--accent-mauve: #a67c8a` (primary brand color)
- `--accent-sage: #8b9a7e` (secondary/nature accent)
- `--accent-cream: #f4f0e8` (backgrounds)
- Gradient overlays use `rgba()` variants of these colors

### Typography Hierarchy
- **Headings**: `'Playfair Display'` (formal sections), `'Dancing Script'` (romantic script)
- **Body**: `'Lato'`, `'Open Sans'` (readability)
- **Special**: `'Cormorant Garamond'` (uppercase labels), `'Cinzel'` (preloader)
- Script images in `images/Font headings/` replace text for key section titles

### Animation Patterns
All animations use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for consistent easing:
- Gallery items: Staggered delays (`.1s`, `.2s`, `.3s`...) with `galleryReveal` keyframe
- Scroll reveals: `opacity` + `translateY` combo via IntersectionObserver
- Hover states: `transform: translateY(-8px)` with shadow amplification
- Preloader: 4.5s luxury sequence with progress bar fill animation
- Micro-interactions: Magnetic button effects, ripple on click, floating particles

### Component Conventions
1. **Sections**: Always `.info-section` base class + specific modifier (e.g., `.celebrate-section`)
2. **Script Headings**: Use `<img>` inside `.script-heading` for fancy fonts (2.5x larger than original template)
   - Images stored in `images/Font headings/` as transparent PNGs
   - `mix-blend-mode: multiply` + `filter: contrast(1.1)` for clean rendering
3. **Responsive breakpoints**: `768px` (tablet), `480px` (mobile)
4. **Fixed Banner**: 60px tall, transparent on hero (`.hero-mode`), opaque with blur on scroll
5. **Z-index layers**: Menu overlay=998, Navigation=999/1000, Lightbox=2000, Preloader=10000

### JavaScript Architecture
**No modules/bundlers** - all functionality in single `script.js`:
- **Event-driven initialization**: `DOMContentLoaded` triggers all setup functions
- **Function naming**: Prefix with action verb (`init`, `handle`, `show`, `create`)
- **State management**: DOM class toggles (`.open`, `.show`, `.active`) + inline styles
- **Custom implementations**:
  - Gallery lightbox with keyboard (←/→/Esc) + touch swipe support
  - Form validation with real-time error display
  - Smooth scroll with section-specific behaviors (RSVP reveals hidden form)
  - Parallax effects using `requestAnimationFrame` + `window.pageYOffset`
- **EmailJS integration**: Dual-send pattern (owner notification + guest confirmation)

## Development Workflows

### Local Testing
```bash
# Open in browser (VS Code task configured)
open index.html

# Test Python email sender
python send_wedding_invitations.py
# Choose option 1 for test email

# View email templates
open test-email-preview.html  # Preview without sending
```

### Email Testing Protocol
1. **EmailJS**: Update IDs in `script.js` → Test via RSVP form
2. **Python**: Run `python test_email_sender.py` → Sends to `test-guest-list.csv`
3. **Mailchimp**: Import `email-invitation-mailchimp.html` as template

### Deployment (Vercel)
- Repository: `MIFUNEKINSKi/dian-chris-wedding-website` (private)
- Live URL: `https://dian-chris-wedding-website.vercel.app/`
- Auto-deploys on push to `main`
- No build config needed (static site)

## Critical Implementation Details

### RSVP Form Behavior (`script.js`)
- Hidden by default (`.rsvp-section { display: none }`)
- Revealed via `scrollToRSVP()` when clicking `.clickable-rsvp-section`
  - Sets `display: block` → adds `.show` class (opacity/transform transition) → scrolls into view
- Shows/hides guest count + dietary fields based on attendance selection
  - "no" = hides fields, removes `required` attributes
  - "yes" = shows fields, adds `required` attributes
- Validation: Red borders + error messages below fields (`showError()`, `clearFormErrors()`)
- Success: Custom modal (`showRSVPConfirmation()`) with fade-in, 8s auto-close
- Dual EmailJS sends: owner notification (template_0jc1zvm) → guest confirmation (template_guest_confirm)

### Navigation Menu (Mobile-First)
- Fixed sidebar slides from right: `-320px` → `0` on toggle
- Hamburger icon (3 spans) animates to X when `.active`
- Overlay (`.menu-overlay`) at `z-index: 998` dims background
- Smooth scrolling to sections, special handling for `#rsvp` → calls `scrollToRSVP()`

### Gallery Lightbox
- Custom implementation (no libraries)
- Click any `.gallery-item` → opens `.lightbox` at `z-index: 2000`
- Keyboard: `Esc` closes, `←/→` navigate
- Touch: Swipe left/right (50px threshold)
- Counter shows `currentImageIndex + 1 / total`

### Preloader Sequence
1. Body gets `.preloader-active` (hides content via `opacity: 0` + `visibility: hidden`)
2. Names reveal with `luxuryFadeIn` animation (staggered 0.5s, 1s delays)
3. Ampersand (&) fades in at 1.5s
4. Progress bar fills over 3s (cubic-bezier easing)
5. Date appears at 2.5s
6. At 4.5s: `.hidden` class added → fades out → removes from DOM
7. Body overflow restored, `.preloader-active` removed → main content visible

**Critical**: Preloader prevents scrolling (`overflow: hidden`) until removed

## File Naming & Content Patterns

### Email Templates
All variations share identical visual design, differ only in personalization method:
- `{guest_name}` / `{{firstName}}` / `*|FNAME|*` depending on system
- Website URL: Always `https://dian-chris-wedding-website.vercel.app/`
- Venue image: Either base64 embedded or public URL

### Image Assets
- Engagement photos: `images/Meneer Kodak - Engagement - Dian & Chris-*.jpg`
- Venue images: Used in `.hero-bg`, `.rehearsal-image`, `.registry-section` backgrounds
- Script headings: `images/Font headings/*.png` (transparent PNGs, 2.5x larger than original)

### Python Scripts
- `send_wedding_invitations.py`: Full-featured CLI with logging
- `test_email_sender.py`: Simple test harness
- Guest data: CSV with columns `First Name`, `Last Name`, `Email Address`, `Plus One`
- App password stored in script (Gmail-specific, 16 chars)

## Common Modifications

### Updating Couple Information
Search/replace across all files:
- Names: "DIAN WULANDARI", "CHRISTOPHER MOORE"
- Date: "SEPTEMBER 21, 2026", "6 in the evening"
- Venue: "Sanur Hyatt Bali"

### Adding New Section to `index.html`
1. Create `<section id="new-section" class="info-section">...</section>`
2. Add `.new-section` styles to `styles.css` (background, padding)
3. Add nav link: `<li><a href="#new-section" class="nav-link">Title</a></li>`
4. Consider parallax/animation in `script.js` if needed

### Changing Color Scheme
Update CSS variables in `:root`, then check:
- Button gradients: `.submit-btn`, `.registry-item:hover`
- Text highlights: `h2::after`, `.nav-link::after`
- Background overlays: `.hero-bg::before`, `.registry-section`

## Troubleshooting

### EmailJS Not Sending
1. Check browser console for error codes
2. Verify `EMAILJS_CONFIG` IDs in `script.js`
3. Confirm template exists at dashboard.emailjs.com
4. Check spam folder for received emails

### Python Script Fails
- Gmail: Use app-specific password (not account password)
- SMTP blocked: Check firewall/network restrictions
- CSV errors: Verify column headers match expected names
- Image not found: Ensure `images/sanur-bali-hyatt.jpg` exists

### Styling Issues
- Always test in responsive mode (`768px`, `480px`)
- Script images: Check `max-height` in `.script-heading img` media queries
- Overlay transparency: Look for `rgba()` opacity values
- Z-index conflicts: Menu=999/1000, Lightbox=2000, Preloader=10000

## External Dependencies
- **EmailJS CDN**: `@emailjs/browser@3` (loaded in `index.html`)
- **Fonts**: Google Fonts (multiple families, see CSS imports)
- **Icons**: Bootstrap Icons CDN (for potential UI elements)
- **Python**: `pandas`, `smtplib` (standard library), `ssl`

## Project Conventions
- **No build system**: Direct file editing, no webpack/vite/etc
- **Single-file architecture**: One CSS, one JS (no modules/splitting)
- **Inline comments**: Minimal, prefer self-documenting code
- **Git workflow**: Direct commits to `main`, Vercel auto-deploys
- **Versioning**: None (static site, date-based "releases" via git tags if needed)
