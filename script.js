document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');

    // Simulate a minimum load time for effect (1.5s) + actual load
    setTimeout(() => {
        window.onload = () => {
            hideLoader();
        };
        // Fallback if window.onload already fired or fires too fast
        if (document.readyState === 'complete') {
            hideLoader();
        }
    }, 1500);

    function hideLoader() {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const matchElements = document.querySelectorAll('.animate-up, .info-card');

    matchElements.forEach(el => {
        // Add basic animate class to info-cards as well if not present
        if (el.classList.contains('info-card')) {
            el.classList.add('animate-up');
        }
        observer.observe(el);
    });

    // Tagline Animation
    const tagline = document.getElementById('dynamic-tagline');
    if (tagline) {
        // Ensure initial text is set and visible
        tagline.textContent = "QUALITY , QUANTITY , CREDIBILITY";
        tagline.style.opacity = '1';

        function startLoop() {
            // State: Visible
            // Wait 5 seconds, then fade out
            setTimeout(() => {
                tagline.style.opacity = '0';

                // State: Invisible (fading out takes 1s via CSS)
                // Wait for fade out (1s) + vanish time (3s) = 4s total before fading back in
                setTimeout(() => {
                    tagline.style.opacity = '1';

                    // State: Fading in (1s)
                    // Wait for fade in (1s) before restarting the 5s visible count? 
                    // Or just restart loop.
                    // Total cycle: 5s visible -> 1s fade out -> 3s hidden -> 1s fade in = 10s loop
                    startLoop(); // Recursive call
                }, 4000); // 1s fade out + 3s hold hidden
            }, 5000); // 5s hold visible
        }

        // Delay start slightly to sync with other page animations
        setTimeout(startLoop, 1000);
    }
});
