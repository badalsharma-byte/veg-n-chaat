/**
 * components.js
 * Loads shared header + footer into every page, then calls window.initApp().
 * This removes redundant HTML across all pages.
 */
(async function () {
    async function loadHTML(path) {
        try {
            const r = await fetch(path);
            return r.ok ? r.text() : '';
        } catch { return ''; }
    }

    // Load header and footer in parallel
    const [headerHTML, footerHTML] = await Promise.all([
        loadHTML('components/header.html'),
        loadHTML('components/footer.html')
    ]);

    // Inject header
    const hp = document.getElementById('header-placeholder');
    if (hp && headerHTML) hp.outerHTML = headerHTML;

    // Inject footer
    const fp = document.getElementById('footer-placeholder');
    if (fp && footerHTML) fp.outerHTML = footerHTML;

    // On pages without a hero image, keep the header background solid
    const header = document.querySelector('.site-header');
    if (header && !document.querySelector('.section-hero')) {
        header.classList.add('scrolled');
    }

    // Set active nav item based on current page filename
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-list .nav-item').forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === page) {
            item.classList.add('active');
        }
    });

    // Initialize app (GSAP, Lenis, megamenu, etc.)
    if (typeof window.initApp === 'function') {
        window.initApp();
    }
})();
