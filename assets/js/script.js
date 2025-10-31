
'use strict';

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Set default page to About
document.addEventListener('DOMContentLoaded', () => {
  // Remove active class from all links and pages
  navigationLinks.forEach(navLink => navLink.classList.remove("active"));
  pages.forEach(page => page.classList.remove("active"));
  
  // Add active class to About link and page
  document.querySelector('[data-nav-link]:first-child').classList.add("active");
  document.querySelector('[data-page="about"]').classList.add("active");
});

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove active class from all links and pages
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Add active class to clicked link and corresponding page
    const targetPage = this.textContent.toLowerCase();
    this.classList.add("active");
    document.querySelector(`[data-page="${targetPage}"]`).classList.add("active");

    window.scrollTo(0, 0);
  });
});

// Removed portfolio filtering code

// Add subtle animations to elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service items for animation
document.querySelectorAll('.service-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});

// Project details horizontal toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const detailsSection = document.getElementById(`${projectId}-details`);
            const projectItem = this.closest('.project-item');
            const icon = this.querySelector('ion-icon');
            
            // Check if this project is already active
            const isActive = this.classList.contains('active');
            
            // Close all other project details first
            viewDetailsButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherProject = otherButton.getAttribute('data-project');
                    const otherDetails = document.getElementById(`${otherProject}-details`);
                    const otherProjectItem = otherButton.closest('.project-item');
                    const otherSpan = otherButton.querySelector('span');
                    
                    otherButton.classList.remove('active');
                    otherDetails.classList.remove('active');
                    otherProjectItem.classList.remove('expanded');
                    otherSpan.textContent = 'View Details';
                }
            });
            
            // Toggle current project
            if (!isActive) {
                // Open this project
                this.classList.add('active');
                detailsSection.classList.add('active');
                projectItem.classList.add('expanded');
                const span = this.querySelector('span');
                span.textContent = 'Hide Details';
                
                // Scroll to the project if it's not fully in view
                projectItem.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest',
                    inline: 'nearest'
                });
            } else {
                // Close this project
                this.classList.remove('active');
                detailsSection.classList.remove('active');
                projectItem.classList.remove('expanded');
                const span = this.querySelector('span');
                span.textContent = 'View Details';
            }
        });
    });
    
    // Close project details when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.project-item') && !event.target.closest('.view-details-btn')) {
            viewDetailsButtons.forEach(button => {
                const projectId = button.getAttribute('data-project');
                const detailsSection = document.getElementById(`${projectId}-details`);
                const projectItem = button.closest('.project-item');
                const span = button.querySelector('span');
                
                button.classList.remove('active');
                detailsSection.classList.remove('active');
                projectItem.classList.remove('expanded');
                span.textContent = 'View Details';
            });
        }
    });
});


// Experience certificate modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const certificateModal = document.getElementById('certificate-modal');
    const certificateImage = document.getElementById('certificate-image');
    const modalClose = document.querySelector('.modal-close');
    
    // Certificate data - update these with your actual image paths
    const certificates = {
        'quba-offer': {
            image: './assets/images/quba-offer-image.jpg' // Make sure this image exists
        },
        'hulkhire-completion': {
            image: './assets/images/hulkhire-completion-image.jpeg' // Make sure this image exists
        }
    };
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certificateId = this.getAttribute('data-certificate');
            const certificate = certificates[certificateId];
            
            if (certificate) {
                certificateImage.src = certificate.image;
                certificateImage.alt = 'Certificate';
                certificateModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        certificateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
