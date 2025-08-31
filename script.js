/* =============================
   script.js
   =============================
   This file handles interactivity:
   - Fade-in animations when sections scroll into view
   - Mobile menu toggle (hamburger)
   ============================= */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========== FADE-IN ANIMATION ON SCROLL ========== */
    
    // Select all sections with the page-section class
    const sections = document.querySelectorAll(".page-section");
    
    // Add initial hidden state to all sections
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    // Create an IntersectionObserver to detect when sections enter viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When section is in view, trigger the animation
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, 100); // Small delay for staggered effect
                
                // Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Section must be at least 20% visible
        rootMargin: "0px 0px -50px 0px" // Adjust triggering point slightly upward
    });
    
    // Apply observer to each section
    sections.forEach(section => observer.observe(section));
    
    /* ========== MOBILE MENU TOGGLE ========== */
    
    // Get DOM elements
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeIcon = document.querySelector(".close-icon");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");
    
    // Function to open mobile menu
    function openMobileMenu() {
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    
    // Add event listeners
    if (hamburger) {
        hamburger.addEventListener("click", openMobileMenu);
    }
    
    if (closeIcon) {
        closeIcon.addEventListener("click", closeMobileMenu);
    }
    
    // Close menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
    
    // Close menu when clicking outside of it
    document.addEventListener("click", function(event) {
        if (mobileMenu.classList.contains("active") && 
            !mobileMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    /* ========== SMOOTH SCROLLING FOR NAVIGATION ========== */
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add smooth scroll behavior to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate the position to scroll to (accounting for fixed header)
                const headerHeight = document.querySelector(".navbar").offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    /* ========== ADDITIONAL ENHANCEMENT: ACTIVE NAV LINK HIGHLIGHTING ========== */
    
    // Function to update active navigation link
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;
        
        // Check each section to see if it's in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }
    
    // Listen for scroll events to update active link
    window.addEventListener("scroll", updateActiveNavLink);
    
    // Call once on page load to set initial active link
    updateActiveNavLink();
});

// Add a small delay to ensure all resources are loaded before triggering animations
window.addEventListener('load', function() {
    // Trigger a small scroll event to activate any sections already in view
    setTimeout(() => {
        window.scrollBy(0, 1);
    }, 100);
});