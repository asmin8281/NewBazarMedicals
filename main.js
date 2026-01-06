/**
 * Main JavaScript for New Bazar Medicals
 * Handles navigation, forms, reviews, and interactivity
 */

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Initialize star rating system
    initStarRating();
    
    // Initialize review form
    initReviewForm();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize prescription upload
    initPrescriptionUpload();
    
    // Initialize medicine enquiry
    initMedicineEnquiry();
    
    // Initialize scroll animations
    initScrollAnimations();
});

/**
 * Star Rating System
 */
function initStarRating() {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const hiddenInput = container.querySelector('.star-rating-input');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = index + 1;
                
                // Update visual stars
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        const svg = s.querySelector('svg');
                        if (svg) svg.style.fill = '#FFD700';
                    } else {
                        s.classList.remove('active');
                        const svg = s.querySelector('svg');
                        if (svg) svg.style.fill = '';
                    }
                });
                
                // Update hidden input
                if (hiddenInput) {
                    hiddenInput.value = rating;
                }
            });
            
            star.addEventListener('mouseenter', function() {
                const hoverIndex = Array.from(stars).indexOf(star);
                stars.forEach((s, i) => {
                    const svg = s.querySelector('svg');
                    if (svg) {
                        if (i <= hoverIndex && !s.classList.contains('active')) {
                            svg.style.fill = '#FFD700';
                        }
                    }
                });
            });
        });
        
        container.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                const svg = s.querySelector('svg');
                if (svg && !s.classList.contains('active')) {
                    svg.style.fill = '';
                }
            });
        });
    });
}

/**
 * Review Form Handler + WhatsApp Send
 */
function initReviewForm() {
    const reviewForm = document.getElementById('reviewForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const starRatingInput = reviewForm.querySelector('.star-rating-input');

            const formData = {
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                rating: starRatingInput?.value || 0,
                review: document.getElementById('reviewText').value,
                date: new Date().toLocaleDateString()
            };

            // ✅ Validate form
            if (!formData.name || !formData.email || !formData.rating || !formData.review) {
                alert('Please fill in all fields and provide a rating.');
                return;
            }

            // ✅ Store review (Admin approval)
            let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            reviews.push({
                ...formData,
                id: Date.now(),
                approved: false
            });
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // ✅ WhatsApp Integration
            const phoneNumber = "919895955934"; // Your WhatsApp number
            const message = 
`🛍️ New Customer Review

👤 Name: ${formData.name}
📧 Email: ${formData.email}
⭐ Rating: ${formData.rating}/5
📝 Review: ${formData.review}
📅 Date: ${formData.date}`;

            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank");

            // ✅ Success message
            alert('Thank you for your review! It has been sent to WhatsApp and will be published after admin approval.');

            // ✅ Reset form
            reviewForm.reset();

            const starContainer = reviewForm.querySelector('.star-rating');
            if (starContainer) {
                const stars = starContainer.querySelectorAll('.star');
                const hiddenInput = starContainer.querySelector('.star-rating-input');

                stars.forEach(star => {
                    star.classList.remove('active');
                    const svg = star.querySelector('svg')

    
    // Display existing reviews
    displayReviews();
}

/**
 * Display Reviews
 */
function displayReviews() {
    const reviewsContainer = document.querySelector('.reviews-display');
    const averageRatingEl = document.querySelector('.average-rating .rating-number');
    
    if (!reviewsContainer) return;
    
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    // Filter only approved reviews (in real app, admin would approve)
    // For demo, show all reviews
    const approvedReviews = reviews.filter(r => r.approved !== false);
    
    // Calculate average rating
    if (approvedReviews.length > 0 && averageRatingEl) {
        const totalRating = approvedReviews.reduce((sum, r) => sum + parseInt(r.rating), 0);
        const average = (totalRating / approvedReviews.length).toFixed(1);
        averageRatingEl.textContent = average;
    }
    
    // Clear existing reviews
    const existingReviews = reviewsContainer.querySelectorAll('.review-card:not(.average-rating)');
    existingReviews.forEach(review => review.remove());
    
    // Display reviews
    if (approvedReviews.length === 0) {
        reviewsContainer.insertAdjacentHTML('afterbegin', 
            '<div class="review-card"><p>No reviews yet. Be the first to review!</p></div>'
        );
    } else {
        approvedReviews.reverse().forEach(review => {
            const starsHTML = Array.from({length: 5}, (_, i) => {
                const filled = i < parseInt(review.rating);
                return filled 
                    ? getIcon('star', 'review-star')
                    : getIcon('starOutline', 'review-star');
            }).join('');
            
            const reviewHTML = `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${escapeHtml(review.name)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-stars">${starsHTML}</div>
                    <p class="review-text">${escapeHtml(review.review)}</p>
                </div>
            `;
            reviewsContainer.insertAdjacentHTML('afterbegin', reviewHTML);
        });
    }
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            console.log('Contact form submission:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Prescription Upload Handler
 */
function initPrescriptionUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('prescriptionFile');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }
}

function handleFileUpload(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a JPEG, PNG, or PDF file.');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
    }
    
    // In a real application, this would upload to a server
    console.log('File uploaded:', file.name);
    alert(`Prescription "${file.name}" uploaded successfully! We will process it soon.`);
}

/**
 * Medicine Enquiry Handler
 */
function initMedicineEnquiry() {
    const enquiryForm = document.getElementById('medicineEnquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('enquiryName').value,
                phone: document.getElementById('enquiryPhone').value,
                medicine: document.getElementById('medicineName').value,
                message: document.getElementById('enquiryMessage').value
            };
            
            // Validate form
            if (!formData.name || !formData.phone || !formData.medicine) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            console.log('Medicine enquiry:', formData);
            alert('Thank you for your enquiry! We will check availability and contact you soon.');
            
            // Reset form
            enquiryForm.reset();
        });
    }
}

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Utility: Get Icon (requires icons.js to be loaded)
 */
function getIcon(iconName, className = '') {
    if (typeof Icons !== 'undefined' && Icons[iconName]) {
        let svg = Icons[iconName];
        if (className) {
            svg = svg.replace('<svg', `<svg class="${className}"`);
        }
        return svg;
    }
    return '';
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Scroll Animation Observer
 */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.info-card, .service-card, .review-card, .contact-item, .health-tips').forEach(el => {
        observer.observe(el);
    });
}


 * Handles navigation, forms, reviews, and interactivity
 */

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Initialize star rating system
    initStarRating();
    
    // Initialize review form
    initReviewForm();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize prescription upload
    initPrescriptionUpload();
    
    // Initialize medicine enquiry
    initMedicineEnquiry();
    
    // Initialize scroll animations
    initScrollAnimations();
});

/**
 * Star Rating System
 */
function initStarRating() {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const hiddenInput = container.querySelector('.star-rating-input');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const rating = index + 1;
                
                // Update visual stars
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        const svg = s.querySelector('svg');
                        if (svg) svg.style.fill = '#FFD700';
                    } else {
                        s.classList.remove('active');
                        const svg = s.querySelector('svg');
                        if (svg) svg.style.fill = '';
                    }
                });
                
                // Update hidden input
                if (hiddenInput) {
                    hiddenInput.value = rating;
                }
            });
            
            star.addEventListener('mouseenter', function() {
                const hoverIndex = Array.from(stars).indexOf(star);
                stars.forEach((s, i) => {
                    const svg = s.querySelector('svg');
                    if (svg) {
                        if (i <= hoverIndex && !s.classList.contains('active')) {
                            svg.style.fill = '#FFD700';
                        }
                    }
                });
            });
        });
        
        container.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                const svg = s.querySelector('svg');
                if (svg && !s.classList.contains('active')) {
                    svg.style.fill = '';
                }
            });
        });
    });
}

/**
 * Review Form Handler
 */
function initReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const starRatingInput = reviewForm.querySelector('.star-rating-input');
            const formData = {
                name: document.getElementById('reviewerName').value,
                email: document.getElementById('reviewerEmail').value,
                rating: starRatingInput?.value || 0,
                review: document.getElementById('reviewText').value,
                date: new Date().toLocaleDateString()
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.rating || !formData.review) {
                alert('Please fill in all fields and provide a rating.');
                return;
            }
            
            // In a real application, this would send data to a server
            // For now, we'll store it in localStorage
            let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            reviews.push({
                ...formData,
                id: Date.now(),
                approved: false // Admin approval required
            });
            localStorage.setItem('reviews', JSON.stringify(reviews));
            
            // Show success message
            alert('Thank you for your review! It will be published after admin approval.');
            
            // Reset form
            reviewForm.reset();
            const starContainer = reviewForm.querySelector('.star-rating');
            if (starContainer) {
                const stars = starContainer.querySelectorAll('.star');
                const hiddenInput = starContainer.querySelector('.star-rating-input');
                stars.forEach(star => {
                    star.classList.remove('active');
                    const svg = star.querySelector('svg');
                    if (svg) svg.style.fill = '';
                });
                if (hiddenInput) hiddenInput.value = 0;
            }
            
            // Reload reviews if on reviews page
            if (window.location.pathname.includes('reviews.html')) {
                displayReviews();
            }
        });
    }
    
    // Display existing reviews
    displayReviews();
}

/**
 * Display Reviews
 */
function displayReviews() {
    const reviewsContainer = document.querySelector('.reviews-display');
    const averageRatingEl = document.querySelector('.average-rating .rating-number');
    
    if (!reviewsContainer) return;
    
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    
    // Filter only approved reviews (in real app, admin would approve)
    // For demo, show all reviews
    const approvedReviews = reviews.filter(r => r.approved !== false);
    
    // Calculate average rating
    if (approvedReviews.length > 0 && averageRatingEl) {
        const totalRating = approvedReviews.reduce((sum, r) => sum + parseInt(r.rating), 0);
        const average = (totalRating / approvedReviews.length).toFixed(1);
        averageRatingEl.textContent = average;
    }
    
    // Clear existing reviews
    const existingReviews = reviewsContainer.querySelectorAll('.review-card:not(.average-rating)');
    existingReviews.forEach(review => review.remove());
    
    // Display reviews
    if (approvedReviews.length === 0) {
        reviewsContainer.insertAdjacentHTML('afterbegin', 
            '<div class="review-card"><p>No reviews yet. Be the first to review!</p></div>'
        );
    } else {
        approvedReviews.reverse().forEach(review => {
            const starsHTML = Array.from({length: 5}, (_, i) => {
                const filled = i < parseInt(review.rating);
                return filled 
                    ? getIcon('star', 'review-star')
                    : getIcon('starOutline', 'review-star');
            }).join('');
            
            const reviewHTML = `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${escapeHtml(review.name)}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <div class="review-stars">${starsHTML}</div>
                    <p class="review-text">${escapeHtml(review.review)}</p>
                </div>
            `;
            reviewsContainer.insertAdjacentHTML('afterbegin', reviewHTML);
        });
    }
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            console.log('Contact form submission:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Prescription Upload Handler
 */
function initPrescriptionUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('prescriptionFile');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }
}

function handleFileUpload(file) {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a JPEG, PNG, or PDF file.');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB.');
        return;
    }
    
    // In a real application, this would upload to a server
    console.log('File uploaded:', file.name);
    alert(`Prescription "${file.name}" uploaded successfully! We will process it soon.`);
}

/**
 * Medicine Enquiry Handler
 */
function initMedicineEnquiry() {
    const enquiryForm = document.getElementById('medicineEnquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('enquiryName').value,
                phone: document.getElementById('enquiryPhone').value,
                medicine: document.getElementById('medicineName').value,
                message: document.getElementById('enquiryMessage').value
            };
            
            // Validate form
            if (!formData.name || !formData.phone || !formData.medicine) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            console.log('Medicine enquiry:', formData);
            alert('Thank you for your enquiry! We will check availability and contact you soon.');
            
            // Reset form
            enquiryForm.reset();
        });
    }
}

/**
 * Utility: Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Utility: Get Icon (requires icons.js to be loaded)
 */
function getIcon(iconName, className = '') {
    if (typeof Icons !== 'undefined' && Icons[iconName]) {
        let svg = Icons[iconName];
        if (className) {
            svg = svg.replace('<svg', `<svg class="${className}"`);
        }
        return svg;
    }
    return '';
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Scroll Animation Observer
 */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.info-card, .service-card, .review-card, .contact-item, .health-tips').forEach(el => {
        observer.observe(el);
    });
}

