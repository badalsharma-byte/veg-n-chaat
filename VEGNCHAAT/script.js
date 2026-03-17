document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        autoRaf: true,
        smoothTouch: false
    });

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Header Scroll Animation (Hide on Down, Show on Up)
    const header = document.querySelector('.site-header');

    // Add shadow class based on scroll position using Lenis
    lenis.on('scroll', (e) => {
        if (e.animatedScroll > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Sticky Header Hide on Scroll Down / Show on Scroll Up
    const showAnim = gsap.from(header, {
        yPercent: -100,
        paused: true,
        duration: 0.3, // Faster hide/show animation
        ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            // Hide header if scrolling down, show if scrolling up
            self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
    });

    // 5. Megamenu Hover Interactions
    const navItems = document.querySelectorAll('.has-dropdown');

    navItems.forEach(item => {
        const dropdownId = item.getAttribute('data-dropdown');
        const menu = document.getElementById(`${dropdownId}-menu`);

        if (!menu) return;

        // Create a paused GSAP timeline for each menu
        const tl = gsap.timeline({ paused: true });

        // Phase 1: The main menu container animation sequence
        tl.fromTo(menu,
            { y: -15, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", pointerEvents: "auto" }
        );

        // Phase 2: Internal element stagger animations
        if (dropdownId === 'shop') {
            const categoryLinks = menu.querySelectorAll('.category-link');
            const customCard = menu.querySelector('.shop-custom-card');
            const promoCards = menu.querySelectorAll('.promo-card');

            if (categoryLinks.length) {
                tl.fromTo(categoryLinks,
                    { y: -15, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" },
                    "-=0.4"
                );
            }
            if (customCard) {
                tl.fromTo(customCard, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.3");
                const cardImage = customCard.querySelector('.custom-card-image-box');
                if (cardImage) {
                    tl.fromTo(cardImage, { scale: 0.95 }, { scale: 1, duration: 0.6, ease: "power2.out" }, "<");
                }
            }
            if (promoCards.length) {
                tl.fromTo(promoCards,
                    { y: -15, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                    "-=0.2"
                );
            }
        } else if (dropdownId === 'packaging') {
            const packCards = menu.querySelectorAll('.pack-card');
            if (packCards.length) {
                tl.fromTo(packCards,
                    { y: -20, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
                    "-=0.4"
                );
            }
        } else if (dropdownId === 'resources') {
            const links = menu.querySelectorAll('.dropdown-list a');
            if (links.length) {
                tl.fromTo(links,
                    { x: -10, autoAlpha: 0 },
                    { x: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
                    "-=0.3"
                );
            }
        }

        let hoverIntentTimeout;

        item.addEventListener('mouseenter', () => {
            clearTimeout(hoverIntentTimeout);

            // Close other open menus quickly
            navItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    if (otherItem._gsapTimeline) {
                        otherItem._gsapTimeline.reverse();
                    }
                }
            });

            // Mark current item active (triggers the rolling text via CSS)
            item.classList.add('active');

            // Play the timeline forward
            tl.play();
        });

        item.addEventListener('mouseleave', () => {
            // Slight delay so the user can move their mouse into the menu
            hoverIntentTimeout = setTimeout(() => {
                item.classList.remove('active');
                tl.reverse();
            }, 50);
        });

        // Store tl on the element so we can reverse it globally when hovering other items
        item._gsapTimeline = tl;
    });

    // The account dropdown inside utilities needs similar handling
    const accountWrapper = document.querySelector('.account-wrapper');
    const accountMenu = document.getElementById('account-menu');

    if (accountWrapper && accountMenu) {
        const accTl = gsap.timeline({ paused: true });
        accTl.fromTo(accountMenu,
            { y: 10, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }
        );

        let accTimeout;
        accountWrapper.addEventListener('mouseenter', () => {
            clearTimeout(accTimeout);
            accountWrapper.classList.add('active');
            accTl.play();
        });
        accountWrapper.addEventListener('mouseleave', () => {
            accTimeout = setTimeout(() => {
                accountWrapper.classList.remove('active');
                accTl.reverse();
            }, 50);
        });
    }

    // 6. Onyx Style Scrolly-telling Animation for "La Brasserie" (Experience Section)
    const experienceSection = document.querySelector('.section-experience');
    const experienceBg = document.querySelector('.experience-bg');
    const experienceText = document.querySelector('.experience-text');

    if (experienceSection && experienceBg) {
        // Background expansion animation
        gsap.fromTo(experienceBg,
            {
                scale: 0.75, // Start as a small card
                borderRadius: "60px"
            },
            {
                scale: 1, // Expand to full screen width
                borderRadius: "0px",
                ease: "none",
                scrollTrigger: {
                    trigger: experienceSection,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            }
        );

        // Text "go center" animation
        if (experienceText) {
            gsap.fromTo(experienceText,
                {
                    y: 150, // Start lower
                    autoAlpha: 0.5, // Start partially transparent
                    scale: 0.8 // Start slightly smaller
                },
                {
                    y: 0, // Move to original center position
                    autoAlpha: 1,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: experienceSection,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                }
            );
        }
    }

    // 7. Text Reveal Animations
    const revealScrollElements = document.querySelectorAll('[data-reveal="scroll"]');
    revealScrollElements.forEach(el => {
        gsap.fromTo(el,
            { y: 40, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Reveal Blend animation for image sticky containers
    const revealBlendElements = document.querySelectorAll('[data-reveal="blend"]');
    revealBlendElements.forEach(el => {
        // Fade and slide the outer container up
        gsap.fromTo(el,
            { autoAlpha: 0, y: 30 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        
        // Scale the inner images inside the fixed frame (Zoom out slowly)
        const innerImages = el.querySelectorAll('img');
        innerImages.forEach(img => {
            gsap.fromTo(img,
                { scale: 1.15 }, /* Start zoomed in */
                {
                    scale: 1, /* Zoom out to fit */
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el, /* Triggered when the parent frame enters */
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    });

    const revealTextElements = document.querySelectorAll('[data-reveal="text"]');
    revealTextElements.forEach(el => {
        gsap.fromTo(el,
            { y: 50, autoAlpha: 0, rotationX: -15 },
            {
                y: 0,
                autoAlpha: 1,
                rotationX: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // 8. Yucca Solutions Hover Background Logic
    const ysCards = document.querySelectorAll('.ys-card-trigger');
    const ysBgLayers = document.querySelectorAll('.ys-bg-layer');

    ysCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const index = card.getAttribute('data-bg-index');

            // Remove active from all cards and layers
            ysCards.forEach(c => c.classList.remove('active'));
            ysBgLayers.forEach(layer => layer.classList.remove('active'));

            // Add active to current card and corresponding layer
            card.classList.add('active');
            const targetLayer = document.querySelector(`.ys-bg-layer[data-bg-index="${index}"]`);
            if (targetLayer) {
                targetLayer.classList.add('active');
            }
        });
    });

    // 9. Global Media Parallax Zoom Effect
    // Select all images and videos within the <main> tag (to exclude header/footer logos)
    const mediaElements = document.querySelectorAll('main img, main video');

    mediaElements.forEach(media => {
        // Skip Section 4 and Hero background layers to preserve their custom styling and animations
        if (media.closest('.ys-background') || media.closest('.s-background')) return;

        // Find the closest parent wrapper to apply overflow: hidden
        // This ensures the scaling image doesn't break layout or overlap siblings
        const wrapper = media.parentElement;
        if (wrapper) {
            wrapper.style.overflow = 'hidden';
            wrapper.style.position = 'relative'; // Ensure positioning context
        }

        // Apply GSAP animation
        // from scale 1.15 to scale 1
        // as the element enters the viewport and scrolls upwards
        gsap.fromTo(media,
            {
                scale: 1.15
            },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper || media, // Trigger based on the wrapper if it exists
                    start: "top bottom",       // Animation starts when top of element hits bottom of viewport
                    end: "bottom top",         // Animation ends when bottom of element hits top of viewport
                    scrub: true,               // Links animation to scroll progress
                }
            }
        );
    });

    // 10. Menu Tab Switching Logic
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Update active states for buttons
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active states for content containers
            menuContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            // Refresh ScrollTrigger because the page height has changed
            setTimeout(() => {
                ScrollTrigger.refresh();
                setFooterSpacer(); // Re-calculate footer spacer
            }, 100);
        });
    });

    // 11. Footer Reveal Effect: Dynamic Margin Calculation and Parallax
    const footerWrapper = document.querySelector('.footer-wrapper');
    const mainContent = document.querySelector('.dummy-main');

    function setFooterSpacer() {
        if (footerWrapper && mainContent) {
            const footerHeight = footerWrapper.offsetHeight;
            mainContent.style.marginBottom = `${footerHeight}px`;
        }
    }

    // Run on initial load and resize
    setFooterSpacer();
    window.addEventListener('resize', setFooterSpacer);

    // Parallax Reveal Animation
    if (footerWrapper && mainContent) {
        gsap.fromTo(footerWrapper,
            { y: 100 }, // Start lower "behind" content
            {
                y: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: mainContent,
                    start: "bottom bottom",
                    end: () => `+=${footerWrapper.offsetHeight}`,
                    scrub: true,
                    invalidateOnRefresh: true
                }
            }
        );
    }
});



// Onyx Menu Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs-nav__link');
    const contents = document.querySelectorAll('.tabs-content__item');
    const imagesContainer = document.querySelector('#tabs-images-carte');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('-active'));
                contents.forEach(c => c.classList.remove('-active'));

                // Add active class to clicked tab
                tab.classList.add('-active');

                // Add active class to corresponding content
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.querySelector(targetId);
                if (targetContent) {
                    targetContent.classList.add('-active');
                }
                
                // Refresh ScrollTrigger to update heights
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            });
        });
    }
});

