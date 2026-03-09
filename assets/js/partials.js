/* =========================================
   partials.js
   - Inject header/footer
   - Init menu / active nav / footer year
   - Safe for template reuse
========================================= */

const PARTIALS = {
    header: "/partials/header.html",
    footer: "/partials/footer.html",
};

async function inject(id, url) {
    const el = document.getElementById(id);
    if (!el) return false;

    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status} ${url}`);
        }

        let html = await res.text();

        // 移除 live-server 注入內容，避免污染 partial DOM
        html = html
            .replace(/<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>\s*/gi, "")
            .replace(/<script\b[^>]*>[\s\S]*?<\/script>\s*/gi, (match) => {
                return /live-server|WebSocket|localhost:\d+|127\.0\.0\.1:\d+/i.test(match)
                    ? ""
                    : match;
            });

        el.innerHTML = html;
        return true;
    } catch (err) {
        console.error(`[partials] Failed to inject "${id}" from "${url}"`, err);
        return false;
    }
}

function setFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) {
        el.textContent = String(new Date().getFullYear());
    }
}

async function initPartials() {
    const headerReady = await inject("site-header", PARTIALS.header);
    const footerReady = await inject("site-footer", PARTIALS.footer);

    if (headerReady) {
        window.initHeaderMenu?.();
        window.setActiveNav?.();
    }

    if (footerReady) {
        setFooterYear();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPartials);
} else {
    initPartials();
}