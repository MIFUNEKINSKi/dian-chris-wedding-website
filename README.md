# Fiona Wedding Website

A beautiful, elegant wedding website inspired by the Fiona template design. This site features a sophisticated layout with warm color tones and classic typography, perfect for couples who want a timeless and romantic presentation.

## Design Features

- **Hero Section**: Full-screen cover image with elegant couple name overlay
- **Warm Color Palette**: Beige and gold tones (#DAC8A4, #F1ECE1) for a romantic feel
- **Classic Typography**: Playfair Display serif font for headings, Open Sans for body text
- **Responsive Design**: Looks beautiful on all devices
- **Smooth Animations**: Subtle scroll animations and transitions
- **Photo Gallery**: Grid layout for showcasing your favorite photos
- **RSVP Form**: Comprehensive form for collecting guest responses

## Sections Included

1. **Hero Cover**: Large background image with couple names
2. **Celebrate With Us**: Wedding ceremony details
3. **Reception**: Reception information and details
4. **Image Section**: Featured venue or couple photo
5. **Our Story**: Share your love story
6. **Photo Gallery**: Showcase multiple photos
7. **Wedding Registry**: Links to your registries
8. **RSVP Form**: Detailed guest response form

## Getting Started

### Quick Setup

1. **Update Your Information**:
   - Open `index.html`
   - Replace "FIONA SHAY" and "GRAYSON MILLS" with your names
   - Update wedding date, time, and venue information
   - Add your love story in the "Our Story" section

2. **Add Your Photos**:
   - Replace the hero background image placeholder
   - Add venue photos to the image section
   - Update gallery with your engagement/couple photos

3. **Customize Colors** (Optional):
   - Edit `styles.css` to change the color scheme
   - Current colors: #DAC8A4 (gold/beige), #F1ECE1 (light beige)
   - Search and replace these color codes with your preferred colors

4. **Set Up RSVP Integration**:
   - The form currently shows an alert
   - Integrate with Netlify Forms, Google Sheets, or EmailJS for real responses

### File Structure

```
wedding-website/
├── index.html          # Main HTML file
├── styles.css          # Fiona-inspired CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── Reference/          # Original design reference files
```

### Color Scheme

The Fiona template uses a warm, romantic color palette:

- **Primary Gold**: `#DAC8A4` - Used for buttons, accents, and hero text
- **Light Beige**: `#F1ECE1` - Used for section backgrounds
- **Text Colors**: 
  - Headers: `#333` (dark gray)
  - Body text: `#666` (medium gray)
  - Light text: `#999` (light gray)

### Typography

- **Headings**: Playfair Display (serif) - elegant and classic
- **Body Text**: Open Sans (sans-serif) - clean and readable
- **Special Features**: Italic styling for "and" in couple names

## Customization Guide

### Changing Your Information

1. **Couple Names** (line 21-25 in index.html):
   ```html
   <span class="name-line">YOUR NAME</span>
   <span class="and-line"><i>and</i></span>
   <span class="name-line">PARTNER NAME</span>
   ```

2. **Wedding Details** (lines 30-50):
   - Update date, time, venue name, and location
   - Modify reception details

3. **Your Story** (lines 70-80):
   - Replace placeholder text with your love story

### Adding Real Photos

1. **Hero Background**: Update the CSS background-image property in `.hero-bg`
2. **Gallery Photos**: Replace the placeholder divs with `<img>` tags
3. **Venue Photo**: Update the `.venue-image` background

### RSVP Form Integration

For real RSVP collection, integrate with:

- **Netlify Forms**: Add `netlify` attribute to form tag
- **EmailJS**: Use their JavaScript SDK
- **Google Sheets**: Via Google Apps Script or Zapier
- **Custom Backend**: Build your own server endpoint

## Browser Support

Works in all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

This is a static website that can be hosted on:

- **Netlify**: Free hosting with form handling
- **Vercel**: Free hosting with easy Git integration
- **GitHub Pages**: Free hosting for GitHub repositories
- **Traditional Web Hosting**: Any provider supporting HTML/CSS/JS

## Customization Tips

1. **Colors**: Search for `#DAC8A4` and `#F1ECE1` in `styles.css` to change the color scheme
2. **Fonts**: Modify the Google Fonts import and CSS font-family declarations
3. **Spacing**: Adjust padding values in the CSS for tighter or looser layouts
4. **Animations**: Modify transition durations in `script.js` and `styles.css`

## Final Checklist

Before going live:

- [ ] Update all placeholder text with your information
- [ ] Add your real photos
- [ ] Test the RSVP form
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Set up form submission handling
- [ ] Share the URL with your guests

## Credits

This template is inspired by the Fiona wedding website design from Bliss & Bone, recreated without any company branding for personal use.

Congratulations on your upcoming wedding! 💕
