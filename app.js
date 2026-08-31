document.addEventListener('DOMContentLoaded', () => {



        // =================================
    // DARK / LIGHT MODE
    // =================================

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Cek tema yang tersimpan
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fa-solid fa-sun';

        themeToggle.setAttribute(
            'aria-label',
            'Aktifkan light mode'
        );

        themeToggle.setAttribute(
            'title',
            'Light Mode'
        );
    }

    // Tombol theme
    themeToggle.addEventListener('click', () => {

        document.body.classList.toggle('dark-mode');

        const isDarkMode =
            document.body.classList.contains('dark-mode');

        if (isDarkMode) {

            // Dark Mode
            themeIcon.className = 'fa-solid fa-sun';

            themeToggle.setAttribute(
                'aria-label',
                'Aktifkan light mode'
            );

            themeToggle.setAttribute(
                'title',
                'Light Mode'
            );

            localStorage.setItem('theme', 'dark');

        } else {

            // Light Mode
            themeIcon.className = 'fa-solid fa-moon';

            themeToggle.setAttribute(
                'aria-label',
                'Aktifkan dark mode'
            );

            themeToggle.setAttribute(
                'title',
                'Dark Mode'
            );

            localStorage.setItem('theme', 'light');
        }
    });

    // Sticky Header & Active Nav on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileNavToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Portfolio Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                item.classList.remove('show');
                
                // Force browser reflow to restart transition
                void item.offsetWidth; 

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form Submit Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            formStatus.textContent = 'Mengirim pesan...';

            setTimeout(() => {
                formStatus.textContent = 'Pesan Anda berhasil terkirim!';
                formStatus.style.color = '#2ecc71';
                contactForm.reset();
            }, 1000);
        });
    }

    // Scroll Reveal Animation
    const revealElements = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.about-text'),
        ...document.querySelectorAll('.skill-card'),
        ...document.querySelectorAll('.timeline-item'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form-wrapper')
    ];

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));
});