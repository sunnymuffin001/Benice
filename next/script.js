document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const scrollPercent = (window.scrollY / totalScroll);
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        }
    });

    // 3. 3D Card Hover / Mousemove Tilt Animation (Delight Feature)
    const card3d = document.getElementById('interactiveCard');
    const glow = card3d ? card3d.querySelector('.card3d-glow') : null;

    if (card3d) {
        card3d.addEventListener('mousemove', (e) => {
            const rect = card3d.getBoundingClientRect();
            
            // Mouse position relative to card (coordinates ranging from -0.5 to 0.5)
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Rotational values (max 20 degrees rotation)
            const rotateX = -y * 20;
            const rotateY = x * 20;
            
            // Set 3D transform
            card3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Set specular glare overlay coords
            if (glow) {
                const glowX = (e.clientX - rect.left) / rect.width * 100;
                const glowY = (e.clientY - rect.top) / rect.height * 100;
                glow.style.setProperty('--glow-x', `${glowX}%`);
                glow.style.setProperty('--glow-y', `${glowY}%`);
            }
        });

        card3d.addEventListener('mouseleave', () => {
            // Reset to default flat position
            card3d.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // 4. Sticky Phone Screen Switcher on Scroll (Intersection Observer approach)
    const showcaseBlocks = document.querySelectorAll('.showcase-block');
    const screenTabs = document.querySelectorAll('.screen-tab');

    if (showcaseBlocks.length > 0 && screenTabs.length > 0) {
        // Option 1: Using Intersection Observer to find which block occupies the screen center
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -30% 0px', // focused area in the middle of screen
            threshold: 0.2
        };

        const showcaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const featureName = entry.target.getAttribute('data-feature');
                    
                    // Switch phone screen tabs
                    screenTabs.forEach(tab => {
                        if (tab.id === `tab-${featureName}`) {
                            tab.classList.add('active');
                        } else {
                            tab.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        showcaseBlocks.forEach(block => {
            showcaseObserver.observe(block);
        });

        // Option 2: Fallback Scroll position listener to guarantee accuracy
        window.addEventListener('scroll', () => {
            let activeBlock = showcaseBlocks[0];
            let minDistance = Infinity;
            const centerY = window.innerHeight / 2;

            showcaseBlocks.forEach(block => {
                const rect = block.getBoundingClientRect();
                const blockCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - blockCenterY);

                if (distance < minDistance) {
                    minDistance = distance;
                    activeBlock = block;
                }
            });

            if (activeBlock) {
                const featureName = activeBlock.getAttribute('data-feature');
                screenTabs.forEach(tab => {
                    if (tab.id === `tab-${featureName}`) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
            }
        });
    }

    // 5. Scroll Reveal Elements Observer
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 6. Signup Form Submit Handler
    const signupForm = document.getElementById('signupForm');
    const successMsg = document.getElementById('ctaSuccessMsg');

    if (signupForm && successMsg) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mute form and show success banner
            signupForm.style.display = 'none';
            successMsg.style.display = 'flex';
        });
    }

    // 7. Welcoming Splash Screen dismiss & mouse tracking
    const splashScreen = document.getElementById('welcoming-splash');
    const splashHeading = document.getElementById('splashHeading');
    const enterBtn = document.getElementById('enter-space-btn');

    if (splashScreen) {
        // Track mouse coordinates on splash screen
        splashScreen.addEventListener('mousemove', (e) => {
            const rect = splashScreen.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            splashScreen.style.setProperty('--mouse-x', `${percentX}%`);
            splashScreen.style.setProperty('--mouse-y', `${percentY}%`);
            
            if (splashHeading) {
                const headingRect = splashHeading.getBoundingClientRect();
                const textX = e.clientX - headingRect.left;
                const textY = e.clientY - headingRect.top;
                splashHeading.style.setProperty('--text-x', `${textX}px`);
                splashHeading.style.setProperty('--text-y', `${textY}px`);
            }
        });

        // Dismiss action
        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                splashScreen.classList.add('dismissed');
                setTimeout(() => {
                    document.body.classList.remove('splash-active');
                }, 1200); // Wait for transition animation (1.2s)
            });
        }
    }

    // 8. Hero Section Mouse Tracking Spotlight effect (for desktop)
    const heroSection = document.getElementById('hero');
    const desktopHeading = document.querySelector('.hero-content .hero_heading.desktoponly');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set mouse coordinates on section wrapper
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            heroSection.style.setProperty('--mouse-x', `${percentX}%`);
            heroSection.style.setProperty('--mouse-y', `${percentY}%`);
            
            // Set text coordinates relative to heading
            if (desktopHeading) {
                const headingRect = desktopHeading.getBoundingClientRect();
                const textX = e.clientX - headingRect.left;
                const textY = e.clientY - headingRect.top;
                desktopHeading.style.setProperty('--text-x', `${textX}px`);
                desktopHeading.style.setProperty('--text-y', `${textY}px`);
            }
        });
    }

    // 9. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('open');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.height = '0px';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            if (!isOpen) {
                item.classList.add('open');
                // Calculate natural height of content
                const inner = answer.querySelector('.faq-answer-inner');
                if (inner) {
                    answer.style.height = `${inner.scrollHeight}px`;
                    answer.style.opacity = '1';
                }
            }
    });
    });

    // 10. Interactive Card Customizer Theme Switcher
    const themeButtons = document.querySelectorAll('.theme-select-btn');
    const demoCard = document.getElementById('demoCard');

    if (themeButtons.length > 0 && demoCard) {
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                themeButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get selected theme name
                const theme = btn.getAttribute('data-theme');
                
                // Reset card themes classes
                demoCard.className = 'demo-card';
                
                // Add selected theme class
                demoCard.classList.add(`theme-${theme}`);
            });
        });
    }
});
