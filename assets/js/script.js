'use strict';

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Page navigation - FIXED VERSION
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Set default page to About
document.addEventListener('DOMContentLoaded', () => {
  // Remove active class from all links and pages
  navigationLinks.forEach(navLink => navLink.classList.remove("active"));
  pages.forEach(page => page.classList.remove("active"));
  
  // Add active class to About link and page
  const aboutLink = document.querySelector('[data-nav-link="about"]');
  if (aboutLink) {
    aboutLink.classList.add("active");
  }
  document.querySelector('[data-page="about"]').classList.add("active");
});

// Navigation click handler
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove active class from all links and pages
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Get the target page from data-nav-link attribute
    const targetPage = this.getAttribute('data-nav-link');
    
    // Add active class to clicked link
    this.classList.add("active");
    
    // Find and activate the corresponding page
    const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetPageElement) {
      targetPageElement.classList.add("active");
    }

    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      const submitBtn = this.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Message Sent!';
      submitBtn.style.background = 'var(--bg-gradient-yellow-1)';
      submitBtn.style.color = 'var(--smoky-black)';
      
      // Reset form
      this.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 3000);
    });
  }
});

// Skills animation on scroll
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-progress-bar');
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }
  });
}, { threshold: 0.3 });

// Observe skills section for animation
document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.querySelector('.skills-content');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});

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
                    if (otherDetails) otherDetails.classList.remove('active');
                    if (otherProjectItem) otherProjectItem.classList.remove('expanded');
                    if (otherSpan) otherSpan.textContent = 'View Details';
                }
            });
            
            // Toggle current project
            if (!isActive) {
                // Open this project
                this.classList.add('active');
                if (detailsSection) detailsSection.classList.add('active');
                if (projectItem) projectItem.classList.add('expanded');
                const span = this.querySelector('span');
                if (span) span.textContent = 'Hide Details';
                
                // Scroll to the project if it's not fully in view
                if (projectItem) {
                    projectItem.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest'
                    });
                }
            } else {
                // Close this project
                this.classList.remove('active');
                if (detailsSection) detailsSection.classList.remove('active');
                if (projectItem) projectItem.classList.remove('expanded');
                const span = this.querySelector('span');
                if (span) span.textContent = 'View Details';
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
                if (detailsSection) detailsSection.classList.remove('active');
                if (projectItem) projectItem.classList.remove('expanded');
                if (span) span.textContent = 'View Details';
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
            image: './assets/images/quba-offer-image.jpg'
        },
        'hulkhire-completion': {
            image: './assets/images/hulkhire-completion-image.jpeg'
        },
        'java-backend': {
            image: './assets/images/java-backend-certificate.jpg'
        },
        'spring-fundamentals': {
            image: './assets/images/spring-certificate.jpg'
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

// Fix for email links not working
document.addEventListener('DOMContentLoaded', function() {
  // Fix contact method email links
  const emailLinks = document.querySelectorAll('.method-link[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      const email = this.getAttribute('href').replace('mailto:', '');
      window.location.href = 'mailto:' + email;
    });
  });

  // Fix sidebar email links
  const sidebarEmailLinks = document.querySelectorAll('.contact-link[href^="mailto:"]');
  
  sidebarEmailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      const email = this.getAttribute('href').replace('mailto:', '');
      window.location.href = 'mailto:' + email;
    });
  });
});