# Setup Guide

This document explains how to run and modify the Cupcats Visual template.

## Tech Stack

This project uses a pure static stack:

- HTML
- CSS
- Vanilla JavaScript

There are no frameworks and no build step.

## Local Development

Recommended workflow:

1. Open the project in VS Code
2. Install the Live Server extension
3. Right-click `index.html`
4. Click `Open with Live Server`

Or use the VS Code `Go Live` button.

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

Each page uses `index.html` inside its folder to create clean URLs.

Example:

- `/services/`
- `/booking/`
- `/contact/`

instead of:

- `services.html`
- `booking.html`

## Partials System

Header and footer are injected using JavaScript.

HTML placeholders:

`<div id="site-header"></div>`
`<div id="site-footer"></div>`

Script:

`/assets/js/partials.js`

This loads:

- `/partials/header.html`
- `/partials/footer.html`

This keeps layout changes centralized.

## CSS Architecture

The CSS follows a layered design system:

- tokens
- base
- layout
- components
- sections
- utilities
- responsive

Naming prefixes:

- `s-` = section
- `l-` = layout
- `c-` = component
- `u-` = utility

Examples:

- `s-section`
- `l-container`
- `c-button`
- `u-mt-md`

## Updating Content

Most projects only require editing:

- text content
- images
- contact information
- services

The CSS and layout should normally remain unchanged.