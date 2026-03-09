/* =========================================
   main.js
   - Header burger menu init (for injected header)
   - Active nav highlight (by URL)
========================================= */

/**
 * Header 漢堡選單初始化
 * - 由 partials.js 在 header 注入完成後呼叫
 */
window.initHeaderMenu = function initHeaderMenu() {
    const btn = document.querySelector(".c-menuBtn");
    const drawer = document.getElementById("mobileMenu");
    const overlay = document.querySelector(".c-overlay");
    const closeBtns = document.querySelectorAll("[data-menu-close]");

    // header 尚未注入完成時直接略過
    if (!btn || !drawer || !overlay) return;

    // 防止重複綁定
    if (drawer.dataset.menuBound === "1") return;
    drawer.dataset.menuBound = "1";

    let lastFocusedElement = null;

    const openMenu = () => {
        lastFocusedElement = document.activeElement;

        document.documentElement.classList.add("menu-open");
        overlay.hidden = false;
        drawer.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";

        // 將焦點移入抽屜
        drawer.focus();
    };

    const closeMenu = () => {
        document.documentElement.classList.remove("menu-open");
        overlay.hidden = true;
        drawer.setAttribute("aria-hidden", "true");
        btn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";

        // 還原焦點
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
            lastFocusedElement.focus();
        } else {
            btn.focus();
        }
    };

    btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    closeBtns.forEach((el) => {
        el.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (e) => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        if (isOpen && e.key === "Escape") {
            closeMenu();
        }
    });

    drawer.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link) closeMenu();
    });
};

/**
 * 依路徑自動高亮 nav
 * - 不強制加 data-nav，直接用 href 判斷
 */
window.setActiveNav = function setActiveNav() {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    const isMatch = (href) => {
        if (!href) return false;

        // 只處理站內相對路徑
        if (/^(https?:|mailto:|tel:|#)/i.test(href)) return false;

        const clean = href.replace(/\/+$/, "") || "/";
        if (clean === "/") return path === "/";

        return path === clean || path.startsWith(clean + "/");
    };

    const links = document.querySelectorAll(".c-menu a, .c-drawer a");

    links.forEach((link) => {
        const active = isMatch(link.getAttribute("href"));
        link.classList.toggle("is-active", active);

        if (active) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
};