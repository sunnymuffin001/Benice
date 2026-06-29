document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Interactive Arena Widget Logic (Delight Feature)
    const voteLeftBtn = document.getElementById('voteLeftBtn');
    const voteRightBtn = document.getElementById('voteRightBtn');
    const voteSuccessToast = document.getElementById('voteSuccessToast');
    const voteActionText = document.querySelector('.arena-vote-action');

    if (voteLeftBtn && voteRightBtn && voteSuccessToast) {
        const handleVote = (selectedOption) => {
            // Disable further voting
            voteLeftBtn.disabled = true;
            voteRightBtn.disabled = true;
            
            // Apply visual styles
            if (selectedOption === 'left') {
                voteLeftBtn.style.borderColor = 'var(--accent-teal)';
                voteLeftBtn.style.background = 'var(--bg-white)';
                voteLeftBtn.style.boxShadow = '0 4px 15px var(--accent-glow)';
                voteRightBtn.style.opacity = '0.5';
            } else {
                voteRightBtn.style.borderColor = 'var(--accent-teal)';
                voteRightBtn.style.background = 'var(--bg-white)';
                voteRightBtn.style.boxShadow = '0 4px 15px var(--accent-glow)';
                voteLeftBtn.style.opacity = '0.5';
            }

            // Hide action text
            if (voteActionText) {
                voteActionText.style.opacity = '0';
                setTimeout(() => {
                    voteActionText.style.display = 'none';
                }, 200);
            }

            // Show Toast with simulated Arena statistics
            setTimeout(() => {
                const stats = selectedOption === 'left' 
                    ? 'Option A preferred by 73% of creative experts.' 
                    : 'Option B preferred by 68% of creative experts.';
                
                voteSuccessToast.innerHTML = `<i data-lucide="check-circle"></i> Vote registered! ${stats}`;
                lucide.createIcons(); // refresh icons inside toast
                voteSuccessToast.classList.add('show');
            }, 300);
        };

        voteLeftBtn.addEventListener('click', () => handleVote('left'));
        voteRightBtn.addEventListener('click', () => handleVote('right'));
    }

    // 3. Scroll Progress Bar Fallback (Progressive Enhancement)
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar && !CSS.supports('animation-timeline', 'scroll()')) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight));
            progressBar.style.transform = `scaleX(${scrollPercent})`;
        });
    }

    // 4. Scroll Reveal Observer Fallback (for older browsers without CSS SDA support)
    if (!CSS.supports('animation-timeline', 'view()')) {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 5. Sticky Scroll Narrative Animation (Typographic Story)
    const storyWrapper = document.querySelector('.story-scroll-wrapper');
    const storyItems = [
        document.getElementById('story-text-1'),
        document.getElementById('story-text-2'),
        document.getElementById('story-text-3')
    ];

    if (storyWrapper && storyItems[0] && storyItems[1] && storyItems[2]) {
        const updateStoryScroll = () => {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            if (mediaQuery.matches) {
                // Return to clean vertical flow for accessibility
                storyItems.forEach(item => {
                    item.style.position = 'relative';
                    item.style.top = 'unset';
                    item.style.left = 'unset';
                    item.style.transform = 'none';
                    item.style.opacity = '1';
                    item.style.margin = '2rem 0';
                });
                const textFrame = document.querySelector('.story-text-frame');
                if (textFrame) textFrame.style.height = 'auto';
                const stickyContainer = document.querySelector('.story-sticky-container');
                if (stickyContainer) stickyContainer.style.height = 'auto';
                const scrollWrapper = document.querySelector('.story-scroll-wrapper');
                if (scrollWrapper) scrollWrapper.style.height = 'auto';
                return;
            }

            const rect = storyWrapper.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const scrollDistance = rect.height - viewHeight;
            
            let progress = -rect.top / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            // Item 1: Active in progress range 0.0 to 0.35. Peak at 0.15.
            let opacity1 = 0;
            let scale1 = 0.7;
            if (progress <= 0.15) {
                opacity1 = 1;
                scale1 = 1;
            } else if (progress > 0.15 && progress <= 0.35) {
                const t = (progress - 0.15) / (0.35 - 0.15);
                opacity1 = 1 - t;
                scale1 = 1 + t * 0.3;
            } else {
                opacity1 = 0;
                scale1 = 1.3;
            }

            // Item 2: Active in progress range 0.25 to 0.7. Peak at 0.48.
            let opacity2 = 0;
            let scale2 = 0.7;
            if (progress > 0.25 && progress <= 0.45) {
                const t = (progress - 0.25) / (0.45 - 0.25);
                opacity2 = t;
                scale2 = 0.7 + t * 0.3;
            } else if (progress > 0.45 && progress <= 0.55) {
                opacity2 = 1;
                scale2 = 1;
            } else if (progress > 0.55 && progress <= 0.7) {
                const t = (progress - 0.55) / (0.7 - 0.55);
                opacity2 = 1 - t;
                scale2 = 1 + t * 0.3;
            } else if (progress > 0.7) {
                opacity2 = 0;
                scale2 = 1.3;
            }

            // Item 3: Active in progress range 0.6 to 1.0. Peak at 0.8.
            let opacity3 = 0;
            let scale3 = 0.7;
            if (progress > 0.6 && progress <= 0.8) {
                const t = (progress - 0.6) / (0.8 - 0.6);
                opacity3 = t;
                scale3 = 0.7 + t * 0.3;
            } else if (progress > 0.8) {
                opacity3 = 1;
                scale3 = 1;
            }

            // Apply styles
            storyItems[0].style.opacity = opacity1;
            storyItems[0].style.transform = `translate(-50%, -50%) scale(${scale1})`;

            storyItems[1].style.opacity = opacity2;
            storyItems[1].style.transform = `translate(-50%, -50%) scale(${scale2})`;

            storyItems[2].style.opacity = opacity3;
            storyItems[2].style.transform = `translate(-50%, -50%) scale(${scale3})`;
        };

        window.addEventListener('scroll', updateStoryScroll);
        window.addEventListener('resize', updateStoryScroll);
        updateStoryScroll();
    }
});
