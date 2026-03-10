# Cupcats Visual

A clean, calm, and minimal static website template designed for service-based brands.

This project serves two purposes:

1. A real brand website
2. A reusable website template

---

## Live Preview

https://cupcatsvisual.com

---

## Features

- Clean service-business layout
- Pure static website (no framework)
- Modular partial system
- Booking form with Google Sheets integration
- SEO-ready structure
- Lightweight and fast loading

---

## Tech Stack

Pure static stack.

- HTML
- CSS
- Vanilla JavaScript

No framework  
No build step  
No bundler

---

## Project Structure

assets/
  css/
  js/
  img/

partials/
  header.html
  footer.html

services/
booking/
contact/
faq/
privacy/
about/

index.html  
robots.txt  
sitemap.xml  

---

## Design Philosophy

The UI follows a calm and minimal style:

- relaxed
- simple
- quiet
- spacious

The brand voice avoids aggressive sales language.

---

## CSS Architecture

The CSS follows a layered design system.

tokens  
base  
layout  
components  
sections  
utilities  
responsive  

Naming convention:

s-  section  
l-  layout  
c-  component  
u-  utility  

Examples:

s-section  
l-container  
c-button  
u-mt-md  

---

## Booking Form

The booking system uses:

- JavaScript validation
- Google Apps Script
- Google Sheets

Main script:

assets/js/booking-form.js

The form sends booking data to a Google Apps Script endpoint and stores it in Google Sheets.

---

## Deployment

This project can be deployed on any static hosting platform.

Recommended options:

- Cloudflare
- Cloudflare Pages
- Netlify
- GitHub Pages

Since there is no build step, deployment only requires uploading the project files.

---

## Template Usage

To reuse this template:

1. Replace logo
2. Update brand name
3. Update contact information
4. Replace images
5. Update SEO metadata

The core layout and CSS system can remain unchanged.

---

## License

This template is intended for personal projects or client websites.