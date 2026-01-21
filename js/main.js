// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Custom fade animations
    const fadeElements = document.querySelectorAll('.fade-up, .fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Project Modal functionality
    const projectCards = document.querySelectorAll('.clickable-card');
    const projectModal = document.getElementById('projectModal');
    
    if (projectCards.length > 0 && projectModal) {
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                // Get project data from data attributes
                const title = this.getAttribute('data-project-title');
                const image = this.getAttribute('data-project-image');
                const category = this.getAttribute('data-project-category');
                const description = this.getAttribute('data-project-description');
                
                // Update modal content
                document.getElementById('projectModalLabel').textContent = title;
                document.getElementById('modalProjectImage').src = image;
                document.getElementById('modalProjectImage').alt = title;
                document.getElementById('modalCategory').textContent = category;
                document.getElementById('modalDescription').innerHTML = `<p>${description}</p>`;
                
                // Show modal
                const modal = new bootstrap.Modal(projectModal);
                modal.show();
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].hasAttribute('required')) {
                    if (!formElements[i].value.trim()) {
                        isValid = false;
                        formElements[i].classList.add('is-invalid');
                    } else {
                        formElements[i].classList.remove('is-invalid');
                    }
                }
            }
            
            if (isValid) {
                // Show success message (in a real application, you would send the form data to a server)
                const formContainer = document.querySelector('.form-container');
                formContainer.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Message Sent!</h4>
                        <p>Thank you for contacting VAID. We will get back to you shortly.</p>
                    </div>
                `;
            }
        });
    }

    






});