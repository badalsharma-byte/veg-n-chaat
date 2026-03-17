document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link, .bottom-nav-link');
    const sections = document.querySelectorAll('.menu-section, .featured-section');
    const navWrapper = document.querySelector('.category-nav-wrapper');
    const menuFab = document.getElementById('menuFab');
    const bottomNavMenu = document.getElementById('bottomNavMenu');

    // Toggle Floating Menu
    if (menuFab) {
        menuFab.addEventListener('click', (e) => {
            e.stopPropagation();
            bottomNavMenu.classList.toggle('active');
        });
    }

    // Close floating menu when clicking outside
    document.addEventListener('click', () => {
        if (bottomNavMenu) bottomNavMenu.classList.remove('active');
    });

    // Prevent closing when clicking inside the menu
    if (bottomNavMenu) {
        bottomNavMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Smooth scroll to sections
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (bottomNavMenu) bottomNavMenu.classList.remove('active');

            if (targetSection) {
                const headerHeight = 65; 
                const navHeight = navWrapper ? navWrapper.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 65;
        const navHeight = navWrapper ? navWrapper.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - navHeight - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                
                // If it's a top nav link, scroll it into view
                if (link.classList.contains('category-link')) {
                    link.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }
        });
    });
});
