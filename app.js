document.addEventListener('DOMContentLoaded', () => {


    // =================================
    // DARK / LIGHT MODE
    // =================================

    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {

        const themeIcon = themeToggle.querySelector('i');

        // Cek tema yang tersimpan
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {

            document.body.classList.add('dark-mode');

            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-sun';
            }

            themeToggle.setAttribute(
                'aria-label',
                'Aktifkan light mode'
            );

            themeToggle.setAttribute(
                'title',
                'Light Mode'
            );

        } else {

            if (themeIcon) {
                themeIcon.className = 'fa-solid fa-moon';
            }

        }


        // Tombol theme
        themeToggle.addEventListener('click', () => {

            document.body.classList.toggle('dark-mode');

            const isDarkMode =
                document.body.classList.contains('dark-mode');


            if (isDarkMode) {

                // Dark Mode
                if (themeIcon) {
                    themeIcon.className = 'fa-solid fa-sun';
                }

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
                if (themeIcon) {
                    themeIcon.className = 'fa-solid fa-moon';
                }

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

    }



    // =================================
    // STICKY HEADER & ACTIVE NAV
    // =================================

    const header =
        document.querySelector('.header');

    const sections =
        document.querySelectorAll('section');

    const navLinks =
        document.querySelectorAll('.nav-link');


    window.addEventListener('scroll', () => {

        if (header) {

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

        }


        let currentSectionId = '';


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.clientHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSectionId =
                    section.getAttribute('id');

            }

        });


        navLinks.forEach(link => {

            link.classList.remove('active');


            if (
                link.getAttribute('href') ===
                `#${currentSectionId}`
            ) {

                link.classList.add('active');

            }

        });

    });



    // =================================
    // MOBILE NAVIGATION
    // =================================

    const mobileNavToggle =
        document.querySelector('.mobile-nav-toggle');

    const navMenu =
        document.querySelector('.nav-menu');


    if (mobileNavToggle && navMenu) {

        mobileNavToggle.addEventListener('click', () => {

            // Gunakan "active" agar sesuai dengan CSS
            navMenu.classList.toggle('active');


            const icon =
                mobileNavToggle.querySelector('i');


            if (
                navMenu.classList.contains('active')
            ) {

                if (icon) {
                    icon.className =
                        'fa-solid fa-xmark';
                }

            } else {

                if (icon) {
                    icon.className =
                        'fa-solid fa-bars';
                }

            }

        });


        // Tutup menu setelah memilih navbar
        navLinks.forEach(link => {

            link.addEventListener('click', () => {

                navMenu.classList.remove('active');


                const icon =
                    mobileNavToggle.querySelector('i');


                if (icon) {
                    icon.className =
                        'fa-solid fa-bars';
                }

            });

        });

    }



    // =================================
    // PORTFOLIO FILTER SYSTEM
    // =================================

    const filterButtons =
        document.querySelectorAll('.filter-btn');

    const portfolioItems =
        document.querySelectorAll('.portfolio-item');


    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            filterButtons.forEach(btn =>
                btn.classList.remove('active')
            );


            button.classList.add('active');


            const filterValue =
                button.getAttribute('data-filter');


            portfolioItems.forEach(item => {

                const category =
                    item.getAttribute('data-category');


                item.classList.remove('show');


                // Force browser reflow
                void item.offsetWidth;


                if (
                    filterValue === 'all' ||
                    category === filterValue
                ) {

                    item.style.display = 'block';


                    setTimeout(() => {

                        item.classList.add('show');

                    }, 10);


                } else {

                    item.style.display = 'none';

                }

            });

        });

    });



    // =================================
    // FORM SUBMIT HANDLER
    // =================================

    const contactForm =
        document.getElementById('contact-form');

    const formStatus =
        document.getElementById('form-status');


    if (contactForm && formStatus) {

        contactForm.addEventListener('submit', (e) => {

            e.preventDefault();


            formStatus.className =
                'form-status';

            formStatus.style.display =
                'block';

            formStatus.textContent =
                'Mengirim pesan...';


            setTimeout(() => {

                formStatus.textContent =
                    'Pesan Anda berhasil terkirim!';

                formStatus.style.color =
                    '#2ecc71';

                contactForm.reset();

            }, 1000);

        });

    }



    // =================================
    // SCROLL REVEAL ANIMATION
    // =================================

    const revealElements = [

        ...document.querySelectorAll(
            '.section-header'
        ),

        ...document.querySelectorAll(
            '.about-text'
        ),

        ...document.querySelectorAll(
            '.skill-card'
        ),

        ...document.querySelectorAll(
            '.timeline-item'
        ),

        ...document.querySelectorAll(
            '.project-card'
        ),

        ...document.querySelectorAll(
            '.contact-info'
        ),

        ...document.querySelectorAll(
            '.contact-form-wrapper'
        )

    ];


    revealElements.forEach(el => {

        el.style.opacity = '0';

        el.style.transform =
            'translateY(30px)';

        el.style.transition =
            'opacity 0.8s ease, transform 0.8s ease';

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity =
                            '1';

                        entry.target.style.transform =
                            'translateY(0)';

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

});



// =========================================
// CERTIFICATE VERTICAL SWIPE
// =========================================

const certificateGrid =
    document.querySelector(
        '.certificate-grid'
    );


if (certificateGrid) {

    let isDown = false;

    let startY;

    let scrollTop;


    certificateGrid.addEventListener(
        'touchstart',
        (e) => {

            isDown = true;

            startY =
                e.touches[0].pageY;

            scrollTop =
                certificateGrid.scrollTop;

        },
        {
            passive: true
        }
    );


    certificateGrid.addEventListener(
        'touchmove',
        (e) => {

            if (!isDown) return;


            const currentY =
                e.touches[0].pageY;


            const distance =
                startY - currentY;


            certificateGrid.scrollTop =
                scrollTop + distance;

        },
        {
            passive: true
        }
    );


    certificateGrid.addEventListener(
        'touchend',
        () => {

            isDown = false;

        }
    );

}