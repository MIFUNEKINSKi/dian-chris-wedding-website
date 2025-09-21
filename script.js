// Fiona Wedding Website JavaScript

// Scroll to RSVP form section
function scrollToRSVP() {
    const rsvpSection = document.getElementById('rsvp-form-section');
    if (rsvpSection) {
        // Show the RSVP form with elegant reveal
        rsvpSection.style.display = 'block';
        
        // Trigger the animation after a brief moment to ensure display is set
        setTimeout(() => {
            rsvpSection.classList.add('show');
        }, 50);
        
        // Scroll to it smoothly after the animation starts
        setTimeout(() => {
            rsvpSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 400);
    }
}

// EmailJS Configuration
// TO SET UP: 
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace the values below with your actual EmailJS credentials
// 5. See EMAILJS_SETUP.md for detailed instructions

const EMAILJS_CONFIG = {
    serviceID: 'service_1hg45ft',     // Your EmailJS service ID (confirmed)
    templateID: 'template_0jc1zvm',  // Your EmailJS template ID - NEEDS SETUP!
    userID: 'eFHAzQYQmpvprp7lb'       // Your EmailJS user ID (public key - confirmed)
};

// Check if EmailJS is properly configured
function isEmailJSConfigured() {
    // Check if values look like real EmailJS IDs
    const hasValidServiceID = EMAILJS_CONFIG.serviceID && EMAILJS_CONFIG.serviceID.startsWith('service_');
    const hasValidTemplateID = EMAILJS_CONFIG.templateID && EMAILJS_CONFIG.templateID.startsWith('template_');
    const hasValidUserID = EMAILJS_CONFIG.userID && EMAILJS_CONFIG.userID.length > 15;
    
    return hasValidServiceID && hasValidTemplateID && hasValidUserID;
}

// Initialize EmailJS only if properly configured
(function() {
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.userID) {
        emailjs.init(EMAILJS_CONFIG.userID);
    }
})();

// RSVP Form Handler
function handleRSVP(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Check if EmailJS is properly configured
    if (!isEmailJSConfigured()) {
        alert('RSVP form is not yet configured. Please contact us directly at [your-email@example.com] to RSVP.\n\nFor website owners: Please follow the setup instructions in EMAILJS_SETUP.md to configure the email service.');
        return;
    }
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        alert('Email service is not available. Please try again later or contact us directly.');
        console.error('EmailJS library not loaded');
        return;
    }
    
    // Disable submit button during processing
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    
    const formData = new FormData(form);
    const attendance = formData.get('attendance');
    
    const rsvpData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        attendance: attendance,
        guests: attendance === 'yes' ? formData.get('guests') : 'N/A',
        dietary: attendance === 'yes' ? formData.get('dietary') : 'N/A',
        message: formData.get('message'),
        fullName: `${formData.get('firstName')} ${formData.get('lastName')}`,
        attendanceText: attendance === 'yes' ? 'Yes, will attend' : 'Cannot attend',
        submissionDate: new Date().toLocaleDateString()
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, rsvpData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            const fullName = rsvpData.fullName;
            alert(`Thank you for your RSVP, ${fullName}! We've received your response and will be in touch soon.`);
            
            // Reset the form
            form.reset();
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND RSVP';
            
        }, function(error) {
            console.log('FAILED...', error);
            
            let errorMessage = 'Sorry, there was an error sending your RSVP. ';
            
            // Provide more specific error messages based on the error type
            if (error.status === 404) {
                errorMessage += 'Email service not found. Please contact us directly.';
            } else if (error.status === 400) {
                errorMessage += 'Invalid request. Please check your information and try again.';
            } else if (error.status === 401 || error.status === 403) {
                errorMessage += 'Email service configuration error. Please contact us directly.';
            } else if (error.status === 0) {
                errorMessage += 'Network error. Please check your internet connection and try again.';
            } else {
                errorMessage += 'Please try again or contact us directly.';
            }
            
            alert(errorMessage);
            
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND RSVP';
        });
    
    // For development/testing - you can remove this console.log later
    console.log('RSVP Data:', rsvpData);
}

function validateForm() {
    let isValid = true;
    
    // Validate first name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        showError('firstName', 'First name is required');
        isValid = false;
    }
    
    // Validate last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        showError('lastName', 'Last name is required');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError('email', 'Email address is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate attendance
    const attendance = document.getElementById('attendance');
    if (!attendance.value) {
        showError('attendance', 'Please let us know if you will be attending');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.textContent = '');
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation links (if you add navigation)
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Add scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach((section, index) => {
        // Skip hero section from animation
        if (!section.classList.contains('hero-cover')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        }
    });
}

// Gallery functionality
function initPhotoGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // You can implement a lightbox or modal here
            console.log(`Gallery photo ${index + 1} clicked`);
            // Example: open in a lightbox modal
            // openLightbox(item.querySelector('.image-placeholder'));
        });
    });
}

// Form validation enhancements
function enhanceFormValidation() {
    const form = document.getElementById('rsvpForm');
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    const dietaryGroup = document.getElementById('dietaryGroup');
    
    // Show/hide guest count based on attendance
    if (attendanceSelect) {
        attendanceSelect.addEventListener('change', function() {
            if (this.value === 'no') {
                guestsGroup.style.display = 'none';
                dietaryGroup.style.display = 'none';
                document.getElementById('guests').value = '1';
                document.getElementById('dietary').value = '';
                // Remove required attribute when not attending
                document.getElementById('guests').removeAttribute('required');
                document.getElementById('dietary').removeAttribute('required');
            } else if (this.value === 'yes') {
                guestsGroup.style.display = 'block';
                dietaryGroup.style.display = 'block';
                // Add required attribute when attending
                document.getElementById('guests').setAttribute('required', 'required');
            }
        });
        
        // Set initial state
        if (attendanceSelect.value === 'no') {
            guestsGroup.style.display = 'none';
            dietaryGroup.style.display = 'none';
        }
    }
    
    // Add better form validation feedback
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
            } else {
                this.style.borderColor = '#DAC8A4';
                this.style.boxShadow = '0 0 0 2px rgba(218, 200, 164, 0.2)';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#ddd';
                this.style.boxShadow = 'none';
                // Clear error message
                const errorElement = document.getElementById(this.id + '-error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
    });
}

// Parallax effect for hero background (optional enhancement)
function initParallax() {
    const heroSection = document.querySelector('.hero-cover');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;
            const speed = 0.5;
            
            if (scrolled <= heroHeight) {
                heroBg.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add RSVP form handler
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVP);
    }
    
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Initialize photo gallery
    initPhotoGallery();
    
    // Enhance form validation
    enhanceFormValidation();
    
    // Initialize names banner scroll behavior
    initNamesBanner();
    
    // Initialize parallax effect (optional)
    // initParallax();
    
    console.log('Fiona Wedding Website loaded successfully!');
});

// Names Banner Scroll Behavior
function initNamesBanner() {
    const namesBanner = document.querySelector('.names-banner');
    const heroSection = document.querySelector('.hero-cover');
    
    if (namesBanner && heroSection) {
        console.log('Banner initialized'); // Debug log
        
        // Initially hide names on hero section
        namesBanner.classList.add('hero-mode');
        
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            console.log('Scroll position:', scrollPosition, 'Hero height:', heroHeight); // Debug log
            
            // When we scroll past the hero section, show the names
            if (scrollPosition > heroHeight - 100) {
                namesBanner.classList.remove('hero-mode');
                namesBanner.style.display = 'flex'; // Ensure banner is visible
                console.log('Showing banner with names'); // Debug log
            } else {
                namesBanner.classList.add('hero-mode');
                namesBanner.style.display = 'flex'; // Keep banner visible but in hero mode
                console.log('Banner in hero mode'); // Debug log
            }
        });
        
        // Ensure banner is always visible
        namesBanner.style.display = 'flex';
    } else {
        console.log('Banner or hero section not found'); // Debug log
    }
}

// Registry link tracking (optional analytics)
function trackRegistryClick(registryName) {
    console.log(`Registry clicked: ${registryName}`);
    
    // Handle cash registry click
    if (registryName === 'Cash Registry') {
        // You can customize this message and add your preferred payment methods
        const cashMessage = `Thank you for wanting to contribute to our special day!\n\n` +
                           `Cash gifts can be given:\n` +
                           `• At the wedding reception\n` +
                           `• Via Venmo: @YourVenmoHandle\n` +
                           `• Via Zelle: your-email@example.com\n` +
                           `• Via PayPal: your-email@example.com\n\n` +
                           `Your love and presence mean the world to us!`;
        
        alert(cashMessage);
        return false; // Prevent navigation
    }
    
    // For other registries, allow normal navigation
    return true;
}

// Utility function for responsive image loading
function loadHighResImages() {
    const imageContainers = document.querySelectorAll('.image-placeholder');
    
    imageContainers.forEach(container => {
        // Check if high-res image should be loaded based on viewport
        if (window.innerWidth > 768) {
            // Load high-res version
            console.log('Loading high-res images for desktop');
        }
    });
}

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Debounce resize events
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        loadHighResImages();
    }, 100);
});

// Add smooth reveal animation for hero text
function animateHeroText() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Call hero animation after page loads
window.addEventListener('load', animateHeroText);

// Navigation Menu Functionality
function initNavigationMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navigationMenu = document.querySelector('.navigation-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Toggle menu function
    function toggleMenu() {
        const isOpen = navigationMenu.classList.contains('open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        navigationMenu.classList.add('open');
        menuOverlay.classList.add('open');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeMenu() {
        navigationMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's an anchor link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetId === 'rsvp') {
                    // Special handling for RSVP
                    scrollToRSVP();
                } else if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                closeMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navigationMenu.classList.contains('open')) {
            closeMenu();
        }
    });
}

// Initialize navigation menu when DOM is ready
document.addEventListener('DOMContentLoaded', initNavigationMenu);

// Gallery Lightbox Functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryImages = Array.from(galleryItems).map(item => item.querySelector('img'));
    
    // Create lightbox HTML
    const lightboxHTML = `
        <div class="lightbox" id="lightbox">
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
                <img class="lightbox-image" src="" alt="">
                <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `;
    
    // Add lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    
    let currentImageIndex = 0;
    
    // Open lightbox function
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    // Update lightbox image
    function updateLightboxImage() {
        if (galleryImages[currentImageIndex]) {
            lightboxImage.src = galleryImages[currentImageIndex].src;
            lightboxImage.alt = galleryImages[currentImageIndex].alt;
            lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
        }
    }
    
    // Navigate to previous image
    function prevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        updateLightboxImage();
    }
    
    // Navigate to next image
    function nextImage() {
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        updateLightboxImage();
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    });
}

// Initialize gallery lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// ULTRA-PREMIUM PARALLAX EFFECTS
function initLuxuryParallax() {
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (!heroBg || !heroContent) return;
    
    // Smooth parallax scrolling
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        const rotateSpeed = 0.02;
        
        // Multi-layer parallax effect
        heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        
        // Add floating particles effect
        const orb = heroBg.querySelector('::after');
        if (orb) {
            orb.style.transform = `translate(-50%, -50%) translateY(${Math.sin(scrolled * 0.01) * 20}px)`;
        }
    }
    
    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// CINEMATIC HERO ENTRANCE ANIMATION
function initCinematicEntrance() {
    const heroContent = document.querySelector('.hero-content');
    const coupleNames = document.querySelector('.couple-names');
    
    if (!heroContent || !coupleNames) return;
    
    // Split text into individual letters for staggered animation
    const nameSpans = coupleNames.querySelectorAll('.name-line');
    
    nameSpans.forEach((span, index) => {
        const text = span.textContent;
        span.innerHTML = '';
        
        [...text].forEach((letter, letterIndex) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter === ' ' ? '\u00A0' : letter;
            letterSpan.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(100px) rotateX(90deg);
                animation: letterReveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                animation-delay: ${(index * 0.3) + (letterIndex * 0.05)}s;
            `;
            span.appendChild(letterSpan);
        });
    });
    
    // Add the keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterReveal {
            0% {
                opacity: 0;
                transform: translateY(100px) rotateX(90deg);
            }
            50% {
                opacity: 0.7;
                transform: translateY(-10px) rotateX(45deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// LUXURY MICRO-INTERACTIONS
function initLuxuryMicroInteractions() {
    // Magnetic button effects
    const buttons = document.querySelectorAll('button, .registry-item, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            this.style.cssText += `
                transform: translateY(-8px) scale(1.05);
                box-shadow: 0 20px 40px rgba(139, 90, 107, 0.3);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
        });
        
        button.addEventListener('mouseleave', function(e) {
            this.style.cssText += `
                transform: translateY(0) scale(1);
                box-shadow: 0 4px 15px rgba(139, 90, 107, 0.1);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
        });
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(218, 200, 164, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Initialize all luxury effects
document.addEventListener('DOMContentLoaded', () => {
    initLuxuryPreloader();
    initLuxuryParallax();
    initCinematicEntrance();
    initLuxuryMicroInteractions();
    initDynamicBackgrounds();
});

// DYNAMIC BACKGROUND EFFECTS
function initDynamicBackgrounds() {
    // Create floating particles system
    createFloatingParticles();
    
    // Add mouse-following gradient
    createMouseGradient();
    
    // Add subtle geometric patterns
    createGeometricPatterns();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(213, 158, 168, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

function createMouseGradient() {
    const gradient = document.createElement('div');
    gradient.className = 'mouse-gradient';
    gradient.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(218, 200, 164, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(gradient);
    
    let mouseX = 0, mouseY = 0;
    let gradientX = 0, gradientY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gradient.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        gradient.style.opacity = '0';
    });
    
    // Smooth gradient following
    function updateGradient() {
        gradientX += (mouseX - gradientX) * 0.1;
        gradientY += (mouseY - gradientY) * 0.1;
        
        gradient.style.left = gradientX + 'px';
        gradient.style.top = gradientY + 'px';
        
        requestAnimationFrame(updateGradient);
    }
    updateGradient();
}

function createGeometricPatterns() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) return; // Only add to odd sections
        
        const pattern = document.createElement('div');
        pattern.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                linear-gradient(45deg, transparent 49%, rgba(213, 158, 168, 0.03) 50%, transparent 51%),
                linear-gradient(-45deg, transparent 49%, rgba(213, 158, 168, 0.03) 50%, transparent 51%);
            background-size: 60px 60px;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            animation: patternFade ${Math.random() * 10 + 15}s ease-in-out infinite alternate;
        `;
        
        section.style.position = 'relative';
        section.appendChild(pattern);
    });
    
    // Add pattern animation
    const patternStyle = document.createElement('style');
    patternStyle.textContent = `
        @keyframes patternFade {
            0% { opacity: 0; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.05); }
            100% { opacity: 0; transform: scale(1); }
        }
    `;
    document.head.appendChild(patternStyle);
}

// ULTRA-PREMIUM PRELOADER
function initLuxuryPreloader() {
    const preloader = document.getElementById('luxuryPreloader');
    
    // Hide preloader after 5 seconds (enough time to appreciate the luxury)
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            preloader.remove();
        }, 1000);
    }, 5000);
    
    // Prevent scrolling during preloader
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling when preloader is hidden
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 5000);
}
