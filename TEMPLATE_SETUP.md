# Website Template Setup Guide

This project is a static website template built with pure HTML + CSS.

Structure is designed for easy reuse across different clients.

---

# 1. Replace Brand Information

Search and replace the following values across the project:

Brand Name
example@email.com
+886 900 000 000
https://example.com

Logo:

/assets/img/logo.svg

---

# 2. Update SEO

Each page should update:

<title>
<meta name="description">

canonical

Open Graph tags

Twitter tags

JSON-LD schema

---

# 3. Header Navigation

Edit:

/partials/header.html

Desktop menu:

.c-menu

Mobile menu:

.c-drawer__nav

---

# 4. Footer Content

Edit:

/partials/footer.html

Sections:

Brand name
Description
Contact info
Social links

---

# 5. Sitemap

Edit:

/sitemap.xml

Add or remove pages depending on the site.

---

# 6. Robots

Edit:

/robots.txt

Change sitemap domain if necessary.

---

# 7. Assets

Images:

/assets/img/

CSS system:

/assets/css/

JS:

/assets/js/

---

# 8. Partial System

Header and footer are injected dynamically.
