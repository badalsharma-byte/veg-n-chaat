/* ===================================================
   about.js — Our Story Page GSAP Animations
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Register ScrollTrigger ──
    gsap.registerPlugin(ScrollTrigger);

    // ── Sync with Lenis (if present from script.js) ──
    if (typeof lenis !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    // ── 1. Hero caption fade in on load ──
    gsap.fromTo('.about-hero-caption',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.8 }
    );

    // ── 2. Hero letter groups slide in from sides ──
    gsap.fromTo('.about-hero-letter-group.left',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.about-hero-letter-group.right',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out', delay: 0.2 }
    );

    // ── 3. Gallery mosaic items stagger in ──
    gsap.from('.gmosaic-item, .gmosaic-center', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-gallery-mosaic',
            start: 'top 85%',
        },
    });

    // ── 4. Narrative: reveal elements ──
    document.querySelectorAll('.about-reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                },
            }
        );
    });

    // ── 5. Narrative sticky image parallax ──
    gsap.to('.about-narrative-img-col img', {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.about-narrative',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });

    // ── 6. Expanding image section ──
    // Text fades in first
    gsap.fromTo('.about-expand-text',
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-expand-text', start: 'top 80%' },
        }
    );

    // Image expands from padded (narrow) to full width as user scrolls
    gsap.fromTo('.about-expand-image-wrap',
        { paddingLeft: '8%', paddingRight: '8%' },
        {
            paddingLeft: '0%',
            paddingRight: '0%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-expand-section',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1,
            },
        }
    );

    // Subtle counter-zoom on expanding image for parallax feel
    gsap.fromTo('.about-expand-image-inner img',
        { scale: 1.15 },
        {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-expand-section',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 1,
            },
        }
    );

    // ── 7. Dark section — Design Lovers ──
    gsap.from('.about-dl-image', {
        opacity: 0,
        x: -60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-design-lovers', start: 'top 75%' },
    });

    // ── 8. Four images row — alternating left/right slide-in ──
    const fourImgs = document.querySelectorAll('.about-four-img');
    fourImgs.forEach((img, i) => {
        const fromX = i % 2 === 0 ? -50 : 50;
        gsap.fromTo(img,
            { opacity: 0, x: fromX },
            {
                opacity: 1, x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-four-row',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                delay: i * 0.12,
            }
        );
    });

});
