document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Menu Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.add('open');
            document.body.style.overflow = 'hidden'; // Disable scroll when menu is open
        });
    }

    const closeMobileMenu = () => {
        if (mobileNavDrawer) {
            mobileNavDrawer.classList.remove('open');
            document.body.style.overflow = ''; // Re-enable scroll
        }
    };

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 3. Scroll Behavior: Header shrink and Active Nav highlight
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleScroll = () => {
        // Sticky Header shrink
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Scroll Spy: Update active link
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    // 4. Scroll Progress Indicator (Brutalist Bar)
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const scrollPercent = (window.scrollY / totalScroll);
                progressBar.style.transform = `scaleX(${scrollPercent})`;
            }
        });
    }

    // 5. Scroll Reveal Observer (Fade in and slide up)
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Mouse movement tracking for Hero Background Gradient Blur
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroSection.style.setProperty('--mouse-x', `${x}%`);
            heroSection.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // 7. Interactive Hover Effect for Services Table rows
    const serviceRows = document.querySelectorAll('.service-row');
    serviceRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const arrow = row.querySelector('.service-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(8px)';
            }
        });
        row.addEventListener('mouseleave', () => {
            const arrow = row.querySelector('.service-arrow');
            if (arrow) {
                arrow.style.transform = '';
            }
        });
    });

    /* ==========================================================================
       ANNOTATION / GUIDE FOR ADVANCED SCROLL ANIMATIONS (GSAP & ScrollTrigger)
       ==========================================================================
       Jika Anda ingin menambahkan efek Parallax atau Horizontal Scrolling secara nyata
       menggunakan GSAP (GreenSock Animation Platform) di kemudian hari, 
       berikut adalah contoh skrip konfigurasi yang dapat dipasang:

       // 1. GSAP PARALLAX (Pada Kartu Portfolio):
       // gsap.utils.toArray('.portfolio-card').forEach(card => {
       //     const speed = card.getAttribute('data-speed') || 1;
       //     gsap.to(card, {
       //         yPercent: (1 - speed) * 50,
       //         ease: 'none',
       //         scrollTrigger: {
       //             trigger: card,
       //             start: 'top bottom',
       //             end: 'bottom top',
       //             scrub: true
       //         }
       //     });
       // });

       // 2. HORIZONTAL SCROLLING SHOWCASE GRID:
       // const grid = document.querySelector('.portfolio-grid');
       // if (grid) {
       //     gsap.to(grid, {
       //         x: () => -(grid.scrollWidth - window.innerWidth + 100) + 'px',
       //         ease: 'none',
       //         scrollTrigger: {
       //             trigger: '.showcase-section',
       //             start: 'top top',
       //             end: () => '+=' + grid.scrollWidth,
       //             pin: true,
       //             scrub: 1,
       //             invalidateOnRefresh: true
       //         }
       //     });
       // }
        ========================================================================== */

    // 8. Custom Glassmorphic Cursor Follower
    if (window.matchMedia('(min-width: 992px)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        let mouseX = -100;
        let mouseY = -100;
        let cursorX = -100;
        let cursorY = -100;

        const speed = 0.12; // Speed factor of follower (smooth lag)

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const distX = mouseX - cursorX;
            const distY = mouseY - cursorY;
            
            cursorX += distX * speed;
            cursorY += distY * speed;
            
            cursor.style.setProperty('--cursor-x', `${cursorX}px`);
            cursor.style.setProperty('--cursor-y', `${cursorY}px`);
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        window.addEventListener('mousedown', () => {
            cursor.classList.add('clicking');
        });
        
        window.addEventListener('mouseup', () => {
            cursor.classList.remove('clicking');
        });

        const addHoverClass = () => cursor.classList.add('hovering');
        const removeHoverClass = () => cursor.classList.remove('hovering');

        const updateInteractiveListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, .navbar-dd_toggle, .service-row, .portfolio-card, input, textarea');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', addHoverClass);
                el.removeEventListener('mouseleave', removeHoverClass);
                el.addEventListener('mouseenter', addHoverClass);
                el.addEventListener('mouseleave', removeHoverClass);
            });
        };

        // Initialize listeners
        updateInteractiveListeners();

        // Watch for changes in DOM to re-bind events automatically
        const observer = new MutationObserver(updateInteractiveListeners);
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // 9. Viewport Overlay Image Slideshow (Dissolve / Crossfade)
    const slides = document.querySelectorAll('.viewport-overlay .slideshow-img');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // Ganti gambar setiap 4 detik

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, slideInterval);
    }

    // 10. Welcoming Preloader Logic (sui.io style)
    const preloader = document.getElementById('preloader');
    const preloaderProgressBar = document.querySelector('.preloader-progress-bar');
    const percentageText = document.querySelector('.preloader-percentage');

    if (preloader && preloaderProgressBar && percentageText) {
        let width = 0;
        const duration = 2000; // 2 seconds loading duration
        const intervalTime = 20; // Update every 20ms
        const step = (100 / (duration / intervalTime));

        const loadingInterval = setInterval(() => {
            width += step;
            if (width >= 100) {
                width = 100;
                clearInterval(loadingInterval);
                
                percentageText.textContent = "100";
                preloaderProgressBar.style.width = "100%";

                // Delay preloader curtain slide-up for premium look
                setTimeout(() => {
                    preloader.classList.add('slide-up');
                    document.body.classList.add('body-loaded');
                    
                    // Remove from DOM to save browser resources
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 1200);
                }, 400);
            } else {
                const displayVal = Math.floor(width).toString().padStart(2, '0');
                percentageText.textContent = displayVal;
                preloaderProgressBar.style.width = `${width}%`;
            }
        }, intervalTime);
    } else {
        document.body.classList.add('body-loaded');
    }

    // 11. Selected Work Project Carousel (Prev/Next navigation)
    const carouselSlides = document.querySelectorAll('.portfolio-slide');
    const prevBtn = document.querySelector('.carousel-control-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-control-btn.next-btn');
    const currentIndicator = document.querySelector('.current-indicator');

    if (carouselSlides.length > 0 && prevBtn && nextBtn && currentIndicator) {
        let currentIdx = 0;
        const bgGlow = document.querySelector('.showcase-bg-glow');

        function updateBgGlow() {
            if (!bgGlow) return;
            const activeSlide = carouselSlides[currentIdx];
            const activeImg = activeSlide.querySelector('.slide-image');
            if (activeImg) {
                const imgUrl = activeImg.getAttribute('src');
                bgGlow.style.background = ''; // Reset fallback background
                bgGlow.style.backgroundImage = `url('${imgUrl}')`;
            } else {
                // Radial gradients matching brand colors for text-only placeholders
                if (currentIdx === 2) {
                    bgGlow.style.background = 'radial-gradient(circle, rgba(255, 72, 5, 0.25) 0%, transparent 70%)';
                } else if (currentIdx === 3) {
                    bgGlow.style.background = 'radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)';
                }
            }
        }

        // Initialize glow state
        updateBgGlow();

        function updateCarousel(newIdx) {
            // Hilangkan kelas aktif dari slide saat ini
            carouselSlides[currentIdx].classList.remove('active');
            
            // Perbarui indeks slide (mendukung perulangan tanpa batas)
            currentIdx = (newIdx + carouselSlides.length) % carouselSlides.length;
            
            // Tambahkan kelas aktif pada slide baru
            carouselSlides[currentIdx].classList.add('active');
            
            // Perbarui nomor indikator
            currentIndicator.textContent = (currentIdx + 1).toString().padStart(2, '0');
            
            // Perbarui warna glow latar belakang secara dinamis
            updateBgGlow();
            
            // Inisialisasi ikon Lucide baru di dalam slide jika diperlukan
            if (window.lucide) {
                lucide.createIcons();
            }
        }

        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIdx - 1);
        });

        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIdx + 1);
        });
    }

    // 12. Slide 1 (RELX) Image Slideshow (Dissolve / Crossfade)
    const relxSlides = document.querySelectorAll('.slide-slideshow .slide-image');
    if (relxSlides.length > 0) {
        let currentRelxSlide = 0;
        const relxInterval = 3500; // Ganti gambar setiap 3.5 detik

        function nextRelxSlide() {
            relxSlides[currentRelxSlide].classList.remove('active');
            currentRelxSlide = (currentRelxSlide + 1) % relxSlides.length;
            relxSlides[currentRelxSlide].classList.add('active');
        }

        setInterval(nextRelxSlide, relxInterval);
    }
});
