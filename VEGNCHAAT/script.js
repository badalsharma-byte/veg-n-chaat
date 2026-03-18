/**
 * script.js
 * All interactive features are wrapped in window.initApp() so they can be
 * called AFTER components.js injects the shared header + footer into the DOM.
 */

window.initApp = function () {
    if (window._appInitialized) return;
    window._appInitialized = true;

    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({ autoRaf: true, smoothTouch: false });
    window.lenis = lenis;

    // 2. GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Header scroll class
    const header = document.querySelector('.site-header');
    if (header) {
        lenis.on('scroll', (e) => {
            e.animatedScroll > 20
                ? header.classList.add('scrolled')
                : header.classList.remove('scrolled');
        });

        // Hide on scroll-down / show on scroll-up
        const showAnim = gsap.from(header, {
            yPercent: -100, paused: true, duration: 0.3, ease: 'power2.out'
        }).progress(1);

        ScrollTrigger.create({
            start: 'top top', end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse();
            }
        });
    }

    // 4. Megamenu Hover
    const navItems = document.querySelectorAll('.has-dropdown');
    navItems.forEach(item => {
        const dropdownId = item.getAttribute('data-dropdown');
        const menu = document.getElementById(`${dropdownId}-menu`);
        if (!menu) return;

        const tl = gsap.timeline({ paused: true });
        tl.fromTo(menu,
            { y: -15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', pointerEvents: 'auto' }
        );

        if (dropdownId === 'shop') {
            const categoryLinks = menu.querySelectorAll('.category-link');
            const customCard = menu.querySelector('.shop-custom-card');
            const promoCards = menu.querySelectorAll('.promo-card');
            if (categoryLinks.length) tl.fromTo(categoryLinks, { y: -15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }, '-=0.4');
            if (customCard) tl.fromTo(customCard, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3');
            if (promoCards.length) tl.fromTo(promoCards, { y: -15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.2');
        } else if (dropdownId === 'packaging') {
            const packCards = menu.querySelectorAll('.pack-card');
            if (packCards.length) tl.fromTo(packCards, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
        }

        let hoverTimeout;
        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            navItems.forEach(other => {
                if (other !== item) { other.classList.remove('active'); if (other._gsapTl) other._gsapTl.reverse(); }
            });
            item.classList.add('active');
            tl.play();
        });
        item.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => { item.classList.remove('active'); tl.reverse(); }, 50);
        });
        item._gsapTl = tl;
    });

    // 5. Experience Section Parallax
    const experienceSection = document.querySelector('.section-experience');
    const experienceBg = document.querySelector('.experience-bg');
    const experienceText = document.querySelector('.experience-text');
    if (experienceSection && experienceBg) {
        gsap.fromTo(experienceBg, { scale: 0.75, borderRadius: '60px' }, {
            scale: 1, borderRadius: '0px', ease: 'none',
            scrollTrigger: { trigger: experienceSection, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true }
        });
        if (experienceText) {
            gsap.fromTo(experienceText, { y: 150, autoAlpha: 0.5, scale: 0.8 }, {
                y: 0, autoAlpha: 1, scale: 1, ease: 'none',
                scrollTrigger: { trigger: experienceSection, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true }
            });
        }
    }

    // 6. Scroll Reveal Animations
    document.querySelectorAll('[data-reveal="scroll"]').forEach(el => {
        gsap.fromTo(el, { y: 40, autoAlpha: 0 }, {
            y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });

    document.querySelectorAll('[data-reveal="blend"]').forEach(el => {
        gsap.fromTo(el, { autoAlpha: 0, y: 30 }, {
            autoAlpha: 1, y: 0, duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        el.querySelectorAll('img').forEach(img => {
            gsap.fromTo(img, { scale: 1.15 }, {
                scale: 1, duration: 1.5, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        });
    });

    document.querySelectorAll('[data-reveal="text"]').forEach(el => {
        gsap.fromTo(el, { y: 50, autoAlpha: 0, rotationX: -15 }, {
            y: 0, autoAlpha: 1, rotationX: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
    });

    // 7. YS Card Hover Backgrounds
    const ysCards = document.querySelectorAll('.ys-card-trigger');
    const ysBgLayers = document.querySelectorAll('.ys-bg-layer');
    ysCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const idx = card.getAttribute('data-bg-index');
            ysCards.forEach(c => c.classList.remove('active'));
            ysBgLayers.forEach(l => l.classList.remove('active'));
            card.classList.add('active');
            document.querySelector(`.ys-bg-layer[data-bg-index="${idx}"]`)?.classList.add('active');
        });
    });

    // 8. Global Media Parallax Zoom
    document.querySelectorAll('main img, main video').forEach(media => {
        if (media.closest('.ys-background') || media.closest('.s-background')) return;
        const wrapper = media.parentElement;
        if (wrapper) { wrapper.style.overflow = 'hidden'; wrapper.style.position = 'relative'; }
        gsap.fromTo(media, { scale: 1.15 }, {
            scale: 1, ease: 'none',
            scrollTrigger: { trigger: wrapper || media, start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    // 9. Menu Tab Switching (index.html Onyx-style menu section)
    document.querySelectorAll('.tabs-nav__link').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tabs-nav__link').forEach(t => t.classList.remove('-active'));
            document.querySelectorAll('.tabs-content__item').forEach(c => c.classList.remove('-active'));
            tab.classList.add('-active');
            const target = document.querySelector(tab.getAttribute('data-target'));
            if (target) { target.classList.add('-active'); }
            setTimeout(() => ScrollTrigger.refresh(), 100);
        });
    });

    // 10. Menu Page Tab Switching
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            menuContents.forEach(c => { c.id === targetTab ? c.classList.add('active') : c.classList.remove('active'); });
            setTimeout(() => ScrollTrigger.refresh(), 100);
        });
    });
};

// Auto-init for any page that already has the header in the DOM (not using components.js)
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.site-header')) {
        window.initApp();
    }
});
