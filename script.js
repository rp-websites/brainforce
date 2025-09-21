// BRAINFORCE Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    setupEmailForm();
    setupAccessibility();
    setupAnimatedCounters();
}

// Email form handling
function setupEmailForm() {
    const form = document.querySelector('.early-access-form');
    if (form) {
        form.addEventListener('submit', handleEmailSubmit);
    }
}

function handleEmailSubmit(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('.email-input');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
        showEmailSuccess();
        emailInput.value = '';
    } else {
        showEmailError();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showEmailSuccess() {
    const form = document.querySelector('.early-access-form');
    if (form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'email-success';
        successMessage.textContent = 'Thank you! We\'ll notify you when ready.';
        successMessage.setAttribute('aria-live', 'polite');
        
        form.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
}

function showEmailError() {
    const form = document.querySelector('.early-access-form');
    if (form) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'email-error';
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.setAttribute('aria-live', 'polite');
        
        form.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }
}

// Accessibility setup
function setupAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .game-card, .testimonial-card, .problem-card, .impact-card, .vision-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Animated counters
function setupAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(current);
        const originalText = element.textContent;
        const suffix = originalText.replace(/[\d,]/g, '');
        element.textContent = displayValue.toLocaleString() + suffix;
    }, 16);
}

// Button click handlers
function handleButtonClick(element) {
    // Track interaction for analytics
    console.log('Button clicked:', element.textContent);
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Button clicked: ${element.textContent}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Platform button handlers
function handlePlatformButton(platform) {
    const message = platform === 'ios' ? 'Coming Soon!' : 'Download Available!';
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'platform-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-purple);
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Request button handler
function handleRequestButton() {
    const message = 'Thank you for your interest! We\'ll add this game soon.';
    
    const notification = document.createElement('div');
    notification.className = 'request-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gold);
        color: var(--dark-navy);
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);