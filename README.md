# New Bazar Medicals - Medical Store Website

A modern, clean, and professional medical store website for "New Bazar Medicals", a trusted local pharmacy.

## Features

### Core Pages
- **Home**: Store name, tagline, hero section, quick info cards, CTA buttons, health tips
- **About**: Information about trust, quality, and licensed medicines
- **Services**: Comprehensive service listings including:
  - Prescription medicines
  - OTC (Over-the-Counter) medicines
  - Health supplements
  - Medical devices & equipment
  - Baby & child care products
  - Diabetic care products
- **Store Info**: Full address, working hours, Google Maps embed, directions
- **Reviews**: Star rating system (1-5), review form, review display, average rating, admin approval option
- **Contact**: Contact form, click-to-call functionality, WhatsApp integration

### Optional Features
- ✅ Upload prescription functionality
- ✅ Online medicine enquiry form
- ✅ Home delivery information
- ✅ Health tips section

## Design Features

- **Medical Theme**: White + Light Green/Blue color scheme
- **Simple UI**: Easy-to-use interface for all age groups
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **SEO-Friendly**: Proper meta tags, semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript
- **Accessibility-Friendly**: Semantic HTML, ARIA labels, keyboard navigation support
- **Custom SVG Icons**: Unique, scalable, pharmacy-themed icons (no external icon libraries)

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript for interactivity
- **LocalStorage**: For storing reviews (in production, use a backend)

## File Structure

```
/
├── index.html          # Home page
├── about.html          # About us page
├── services.html       # Services page
├── store-info.html     # Store information page
├── reviews.html        # Customer reviews page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── icons.js        # Custom SVG icons system
│   └── main.js         # Main JavaScript functionality
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone or Download** the project files
2. **No Build Process Required** - This is a static website
3. **Open** `index.html` in a web browser
4. **For Production**:
   - Update contact information (phone numbers, email, address) in all HTML files
   - Update Google Maps embed URL in `store-info.html` with your actual location
   - Configure WhatsApp link with your phone number in `contact.html`
   - Replace placeholder content with actual store information

## Customization Guide

### Updating Contact Information

Search and replace the following across all HTML files:
- Phone: `+91 1234567890` → Your phone number
- Email: `info@newbazarmedicals.com` → Your email
- Address: Update in `store-info.html` and footer sections

### Updating Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Find your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in `store-info.html`

### Customizing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-green: #4CAF50;    /* Main green color */
    --light-green: #81C784;      /* Light green */
    --primary-blue: #03A9F4;     /* Main blue color */
    --light-blue: #4FC3F7;       /* Light blue */
    /* ... more variables */
}
```

### Adding Custom Icons

Icons are defined in `js/icons.js`. To add new icons:

1. Create SVG markup
2. Add to `Icons` object with a unique name
3. Use `getIcon('iconName')` in HTML or JavaScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes for Production

### Backend Integration

Currently, forms use `localStorage` for demo purposes. For production:

1. **Review Form**: Connect to a backend API to store reviews
2. **Contact Form**: Set up email service (e.g., EmailJS, Formspree, or custom backend)
3. **Prescription Upload**: Implement file upload to server storage
4. **Medicine Enquiry**: Connect to database/API for availability checking

### Admin Approval for Reviews

The review system includes an `approved` flag. In production:
- Create an admin panel to review and approve submissions
- Filter reviews by `approved: true` before display

### SEO Optimization

Already includes:
- Semantic HTML5 elements
- Meta descriptions and keywords
- Proper heading hierarchy
- Alt text for images (add when using images)

Consider adding:
- Sitemap.xml
- robots.txt
- Open Graph tags for social sharing
- Structured data (JSON-LD) for local business

## License

This project is created for New Bazar Medicals. Customize as needed for your pharmacy.

## Support

For questions or customization help, refer to the code comments or contact the development team.

---

**Built with ❤️ for New Bazar Medicals**



A modern, clean, and professional medical store website for "New Bazar Medicals", a trusted local pharmacy.

## Features

### Core Pages
- **Home**: Store name, tagline, hero section, quick info cards, CTA buttons, health tips
- **About**: Information about trust, quality, and licensed medicines
- **Services**: Comprehensive service listings including:
  - Prescription medicines
  - OTC (Over-the-Counter) medicines
  - Health supplements
  - Medical devices & equipment
  - Baby & child care products
  - Diabetic care products
- **Store Info**: Full address, working hours, Google Maps embed, directions
- **Reviews**: Star rating system (1-5), review form, review display, average rating, admin approval option
- **Contact**: Contact form, click-to-call functionality, WhatsApp integration

### Optional Features
- ✅ Upload prescription functionality
- ✅ Online medicine enquiry form
- ✅ Home delivery information
- ✅ Health tips section

## Design Features

- **Medical Theme**: White + Light Green/Blue color scheme
- **Simple UI**: Easy-to-use interface for all age groups
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **SEO-Friendly**: Proper meta tags, semantic HTML structure
- **Fast Loading**: Optimized CSS and JavaScript
- **Accessibility-Friendly**: Semantic HTML, ARIA labels, keyboard navigation support
- **Custom SVG Icons**: Unique, scalable, pharmacy-themed icons (no external icon libraries)

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables, flexbox, grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript for interactivity
- **LocalStorage**: For storing reviews (in production, use a backend)

## File Structure

```
/
├── index.html          # Home page
├── about.html          # About us page
├── services.html       # Services page
├── store-info.html     # Store information page
├── reviews.html        # Customer reviews page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── icons.js        # Custom SVG icons system
│   └── main.js         # Main JavaScript functionality
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone or Download** the project files
2. **No Build Process Required** - This is a static website
3. **Open** `index.html` in a web browser
4. **For Production**:
   - Update contact information (phone numbers, email, address) in all HTML files
   - Update Google Maps embed URL in `store-info.html` with your actual location
   - Configure WhatsApp link with your phone number in `contact.html`
   - Replace placeholder content with actual store information

## Customization Guide

### Updating Contact Information

Search and replace the following across all HTML files:
- Phone: `+91 1234567890` → Your phone number
- Email: `info@newbazarmedicals.com` → Your email
- Address: Update in `store-info.html` and footer sections

### Updating Google Maps

1. Go to [Google Maps](https://www.google.com/maps)
2. Find your location
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the iframe in `store-info.html`

### Customizing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-green: #4CAF50;    /* Main green color */
    --light-green: #81C784;      /* Light green */
    --primary-blue: #03A9F4;     /* Main blue color */
    --light-blue: #4FC3F7;       /* Light blue */
    /* ... more variables */
}
```

### Adding Custom Icons

Icons are defined in `js/icons.js`. To add new icons:

1. Create SVG markup
2. Add to `Icons` object with a unique name
3. Use `getIcon('iconName')` in HTML or JavaScript

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes for Production

### Backend Integration

Currently, forms use `localStorage` for demo purposes. For production:

1. **Review Form**: Connect to a backend API to store reviews
2. **Contact Form**: Set up email service (e.g., EmailJS, Formspree, or custom backend)
3. **Prescription Upload**: Implement file upload to server storage
4. **Medicine Enquiry**: Connect to database/API for availability checking

### Admin Approval for Reviews

The review system includes an `approved` flag. In production:
- Create an admin panel to review and approve submissions
- Filter reviews by `approved: true` before display

### SEO Optimization

Already includes:
- Semantic HTML5 elements
- Meta descriptions and keywords
- Proper heading hierarchy
- Alt text for images (add when using images)

Consider adding:
- Sitemap.xml
- robots.txt
- Open Graph tags for social sharing
- Structured data (JSON-LD) for local business

## License

This project is created for New Bazar Medicals. Customize as needed for your pharmacy.

## Support

For questions or customization help, refer to the code comments or contact the development team.

---

**Built with ❤️ for New Bazar Medicals**



