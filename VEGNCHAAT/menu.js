document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.category-nav-link');
    const sections = document.querySelectorAll('.menu-section');
    const categoryNavWrapper = document.querySelector('.category-nav-wrapper');
    const footerWrapperEl = document.querySelector('.footer-wrapper');
    const appetizersSection = document.querySelector('#appetizers');
    const headerHeight = 65;

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active state + show/hide nav based on scroll position
    window.addEventListener('scroll', () => {
        updateActiveLink();
        updateCategoryNavVisibility();
    });

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    function updateCategoryNavVisibility() {
        if (!categoryNavWrapper) return;

        const scrollBottom = window.scrollY + window.innerHeight;
        const footerHeight = footerWrapperEl ? footerWrapperEl.offsetHeight : 0;
        const bodyHeight = document.body.scrollHeight;

        // Show nav only when appetizers section is reached
        const appetizersStart = appetizersSection
            ? appetizersSection.offsetTop - headerHeight - 20
            : 0;

        // Hide when footer starts to become visible
        const footerRevealPoint = bodyHeight - footerHeight + 60;

        if (window.scrollY >= appetizersStart && scrollBottom < footerRevealPoint) {
            categoryNavWrapper.classList.remove('nav-hidden');
        } else {
            categoryNavWrapper.classList.add('nav-hidden');
        }
    }

    // Run on load
    updateCategoryNavVisibility();
});
