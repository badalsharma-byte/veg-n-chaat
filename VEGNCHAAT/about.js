/* ===================================================
   about.js — Our Story Page GSAP Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Register ScrollTrigger ──
    gsap.registerPlugin(ScrollTrigger);

    // ── Sync with Lenis (if present from script.js) ──
    // script.js initializes lenis globally; we just tick here if not already done
    if (typeof lenis !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    // ── 1. Hero caption fade in on load ──
    gsap.to('.about-hero-caption', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6,
    });

    // ── 2. Hero image parallax ──
    gsap.to('.about-hero-image-inner', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ── 3. Gallery strip: stagger reveal ──
    gsap.from('.about-gallery-item', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-gallery',
            start: 'top 85%',
        },
    });

    // ── 4. Narrative section ──
    gsap.from('.about-narrative-label', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-narrative-label', start: 'top 85%' },
    });

    // Title split by lines
    gsap.from('.about-narrative-title', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-narrative-title', start: 'top 85%' },
    });

    gsap.from('.about-narrative-body', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-narrative-body', start: 'top 88%' },
    });

    gsap.from('.about-btn-arrow', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-btn-arrow', start: 'top 90%' },
    });

    // Narrative image parallax
    gsap.to('.about-narrative-image img', {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-narrative',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ── 5. Full-width parallax ──
    gsap.to('.about-fullwidth-inner', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-fullwidth',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ── 6. Dark section character reveal ──
    const darkWord = document.querySelector('.about-dark-word');
    if (darkWord) {
        // Split into characters
        const text = darkWord.textContent.trim();
        darkWord.innerHTML = '';
        text.split('').forEach(ch => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            darkWord.appendChild(span);
        });

        gsap.to('.about-dark-word .char', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.about-dark',
                start: 'top 70%',
            },
        });
    }

    // Dark section title + body
    gsap.from('.about-dark-title', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-dark-title', start: 'top 80%' },
    });

    gsap.from('.about-dark-body', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: '.about-dark-body', start: 'top 85%' },
    });

    gsap.from('.about-btn-light', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-btn-light', start: 'top 90%' },
    });

    gsap.from('.about-dark-address', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-dark-address', start: 'top 90%' },
    });

    // ── 7. Spaces section ──
    gsap.from('.about-spaces-header', {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-spaces-header', start: 'top 80%' },
    });

    gsap.from('.about-spaces-col', {
        opacity: 0, y: 60, duration: 1.2, ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.about-spaces-grid', start: 'top 80%' },
    });

    // ── 8. Marquee infinite scroll ──
    const marqueeTrack = document.querySelector('.about-marquee-track');
    if (marqueeTrack) {
        // Clone items to fill space
        const items = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = items + items + items;

        const totalWidth = marqueeTrack.scrollWidth / 3;

        gsap.to(marqueeTrack, {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
            },
        });
    }

    // ── 9. Visit section ──
    gsap.from('.about-visit-word', {
        opacity: 0, x: -60, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-visit-word', start: 'top 80%' },
    });

    gsap.from('.about-visit-address', {
        opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-visit-address', start: 'top 85%' },
    });

    gsap.from('.about-visit-image', {
        opacity: 0, y: 50, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-visit-image', start: 'top 85%' },
    });

    gsap.from('.about-visit-contact-item', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.about-visit-contact', start: 'top 85%' },
    });

    gsap.from('.about-visit-social-link', {
        opacity: 0, y: 15, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.about-visit-socials', start: 'top 90%' },
    });

});
