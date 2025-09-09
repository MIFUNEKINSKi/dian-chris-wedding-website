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
