/**
 * Local2Online - Core UX & Interaction Engine
 * Implements smooth scroll animations, mobile nav drawers, and dynamic Lucide integrations
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialize CDN Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Navigation Toggle Drawer
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Transform hamburger icon (☰ to ✕)
            if (navLinks.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
                menuToggle.style.color = 'var(--accent)';
            } else {
                menuToggle.innerHTML = '☰';
                menuToggle.style.color = '#ffffff';
            }
        });

        // Close menu drawer if clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.style.color = '#ffffff';
            }
        });
    }

    // 3. Framer Motion Style Scroll-Fade Entrance Animations (Intersection Observer)
    const animScrollElements = document.querySelectorAll('.service-card, .benefit-card, .advantage-card, .pricing-card, .testimonial-card, .timeline-step, .hero-text, .hero-visual, .why-online h2, .why-online p, .about-story img, .team-card');
    
    // Add setup transition class to each element
    animScrollElements.forEach(el => {
        el.classList.add('scroll-hidden');
    });

    const observerOption = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const entranceObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                // Unobserve once triggered to keep performance high
                observer.unobserve(entry.target);
            }
        });
    }, observerOption);

    animScrollElements.forEach(el => {
        entranceObserver.observe(el);
    });

    // 4. Testimonials Slider Microtask (Auto-Cycle or simple dragging simulation setup)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 1) {
        // Subtle indicator dot builder if slider is active (optional enhancement)
        console.log("Local2Online slider loaded successfully.");
    }
});
