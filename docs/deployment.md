# Deployment Guide

This document explains how to deploy the Cupcats Visual website.

## Option 1 — Cloudflare (Direct Upload)

Recommended for simple client websites.

Steps:

1. Log into Cloudflare
2. Go to Workers & Pages
3. Open an existing project or create a new one
4. Choose Direct Upload
5. Upload the website folder

The root folder should contain:

- `index.html`
- `assets/`
- `services/`
- `booking/`
- `contact/`
- `faq/`
- `privacy/`
- `about/`

After deployment, connect the domain.

Example:

`cupcatsvisual.com`

## Option 2 — GitHub + Cloudflare

Recommended for long-term maintenance.

Workflow:

VS Code  
↓  
Git  
↓  
GitHub  
↓  
Cloudflare  
↓  
Live website

Deployment steps:

1. Push project to GitHub
2. Create a Cloudflare project connected to the repository
3. Use the repository root as the site root
4. Deploy from the main branch

If the Cloudflare UI requires a deploy command for a static site, use:

`echo deploy`

## Domain Configuration

Add your domain in Cloudflare:

Settings → Custom Domains

Example:

`cupcatsvisual.com`

## Verify Deployment

After deployment, verify these URLs:

- `https://cupcatsvisual.com/robots.txt`
- `https://cupcatsvisual.com/sitemap.xml`

## Notes

For this project, Direct Upload is acceptable for demo and handoff use.

GitHub is mainly used for:

- version control
- backup
- template reuse
- future client handoff