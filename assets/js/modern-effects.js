// Modern Interactive Effects for Bakka Secondary School

class ModernEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleBackground();
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.initParallaxEffects();
        this.initLoadingStates();
        this.initFormEnhancements();
        this.initCursorEffects();
        this.initGradeFilter();
    }

    // Create floating particle background
    createParticleBackground() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 4 + 2;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 10 + 10;
            const animationDelay = Math.random() * 15;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-duration: ${animationDuration}s;
                animation-delay: ${animationDelay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize scroll-based animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for cards
                    if (entry.target.classList.contains('card')) {
                        const cards = entry.target.parentElement.querySelectorAll('.card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animation = `fadeInUp 0.6s ease forwards`;
                                card.style.animationDelay = `${index * 0.1}s`;
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in, .card').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize interactive elements
    initInteractiveElements() {
        // Add interactive hover effects to cards
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('interactive-hover');
            
            card.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e, card);
            });
        });

        // Add floating animation to specific elements
        document.querySelectorAll('.facility-icon, .activity-icon').forEach(icon => {
            icon.classList.add('floating-element');
        });
    }

    // Create ripple effect on hover
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Initialize parallax scrolling effects
    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Initialize loading states
    initLoadingStates() {
        // Add loading spinner to buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.type === 'submit') {
                    this.showButtonLoading(button);
                }
            });
        });
    }

    // Show loading state on buttons
    showButtonLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="modern-spinner"></span> Loading...';
        button.disabled = true;
        
        // Simulate loading (replace with actual form submission)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Initialize form enhancements
    initFormEnhancements() {
        // Add floating labels
        document.querySelectorAll('.form-control').forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-20px) scale(0.8)';
                    label.style.color = 'var(--primary)';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.style.transform = 'translateY(0) scale(1)';
                        label.style.color = 'var(--light-text)';
                    }
                });
            }
        });

        // Add form validation with modern styling
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }

    // Validate form with modern feedback
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showFieldError(input, 'Please enter a valid email');
                isValid = false;
            } else {
                this.showFieldSuccess(input);
            }
        });
        
        if (isValid) {
            this.showFormSuccess(form);
        }
    }

    // Show field error
    showFieldError(input, message) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        
        let errorElement = input.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error text-danger mt-1';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Show field success
    showFieldSuccess(input) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
        
        const errorElement = input.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Show form success
    showFormSuccess(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Thank you! Your message has been sent successfully.
        `;
        form.appendChild(successMessage);
        form.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Initialize custom cursor effects
    initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--gradient-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }

    // Initialize grade filter functionality
    initGradeFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseItems = document.querySelectorAll('.course-item');
        const showMoreContainer = document.getElementById('show-more-container');
        
        if (filterButtons.length === 0 || courseItems.length === 0) return;
        
        // Initialize with "All Grades" showing only 4 courses as sample
        this.currentFilter = 'all';
        this.showCoursesByCount(courseItems, 4);
        if (showMoreContainer) {
            showMoreContainer.style.display = 'none'; // Hide show more button
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the grade filter value
                const gradeFilter = button.getAttribute('data-grade');
                this.currentFilter = gradeFilter;
                
                // Filter courses with smooth animation
                this.filterCourses(courseItems, gradeFilter);
            });
        });
    }
    
    // Filter courses based on grade
    filterCourses(courseItems, gradeFilter) {
        const showMoreContainer = document.getElementById('show-more-container');
        
        if (gradeFilter === 'all') {
            // For "All Grades" - show only 4 courses as sample
            this.showCoursesByCount(courseItems, 4);
            if (showMoreContainer) {
                showMoreContainer.style.display = 'none';
            }
        } else {
            // For specific grades - show all available courses for that grade
            courseItems.forEach((item) => {
                const itemGrade = item.getAttribute('data-grade');
                
                if (itemGrade === gradeFilter) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                    item.classList.add('hidden');
                }
            });
            
            if (showMoreContainer) {
                showMoreContainer.style.display = 'none';
            }
        }
        
        // Re-initialize AOS for newly visible items
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }
    
    // Show courses by count (for "All Grades" sample)
    showCoursesByCount(courseItems, count) {
        courseItems.forEach((item, index) => {
            setTimeout(() => {
                if (index < count) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                    item.classList.add('hidden');
                }
            }, index * 30);
        });
        
        // Re-initialize AOS
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 300);
        }
    }
    
    // Get visible courses based on current filter
    getVisibleCourses(courseItems) {
        if (this.currentFilter === 'all') {
            return Array.from(courseItems);
        } else {
            return Array.from(courseItems).filter(item => 
                item.getAttribute('data-grade') === this.currentFilter
            );
        }
    }

    // Utility function to validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .field-error {
        font-size: 0.875rem;
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernEffects();
});

// Initialize AOS with modern settings
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 100
    });
}
