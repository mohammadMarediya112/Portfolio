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
  navigationLinks.forEach(navLink => navLink.classList.remove("active"));
  pages.forEach(page => page.classList.remove("active"));

  const aboutLink = document.querySelector('[data-nav-link="about"]');
  if (aboutLink) aboutLink.classList.add("active");

  const aboutPage = document.querySelector('[data-page="about"]');
  if (aboutPage) aboutPage.classList.add("active");
});

// Navigation click handler
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    navigationLinks.forEach(navLink => navLink.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    const targetPage = this.getAttribute('data-nav-link');
    this.classList.add("active");

    const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetPageElement) targetPageElement.classList.add("active");

    window.scrollTo(0, 0);
  });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const submitBtn = this.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon> Message Sent!';
      submitBtn.style.background = 'var(--bg-gradient-yellow-1)';
      submitBtn.style.color = 'var(--smoky-black)';
      this.reset();
      
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

document.addEventListener('DOMContentLoaded', function() {
  const skillsSection = document.querySelector('.skills-content');
  if (skillsSection) skillsObserver.observe(skillsSection);
});

// Scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.service-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});

// Project details toggle
document.addEventListener('DOMContentLoaded', function() {
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
  
  viewDetailsButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const detailsSection = document.getElementById(`${projectId}-details`);
      const projectItem = this.closest('.project-item');
      const isActive = this.classList.contains('active');
      
      viewDetailsButtons.forEach(otherButton => {
        const otherProject = otherButton.getAttribute('data-project');
        const otherDetails = document.getElementById(`${otherProject}-details`);
        const otherItem = otherButton.closest('.project-item');
        const otherSpan = otherButton.querySelector('span');
        
        otherButton.classList.remove('active');
        if (otherDetails) otherDetails.classList.remove('active');
        if (otherItem) otherItem.classList.remove('expanded');
        if (otherSpan) otherSpan.textContent = 'View Details';
      });

      if (!isActive) {
        this.classList.add('active');
        if (detailsSection) detailsSection.classList.add('active');
        if (projectItem) projectItem.classList.add('expanded');
        const span = this.querySelector('span');
        if (span) span.textContent = 'Hide Details';
        if (projectItem) projectItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        this.classList.remove('active');
        if (detailsSection) detailsSection.classList.remove('active');
        if (projectItem) projectItem.classList.remove('expanded');
        const span = this.querySelector('span');
        if (span) span.textContent = 'View Details';
      }
    });
  });

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


//  FIXED CERTIFICATE MODAL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  const certificates = {
    'quba-offer': { image: './assets/images/Quba-infotech-offer.jpeg' },
    'hulkhire-completion': { image: './assets/images/hulkhire-completion-image.jpeg' },
    'java-infosys': { image: './assets/images/java-infosys.png' },
    'java-hackerRank': { image: './assets/images/java-hackerRank.png' }
  };

  const certificateModal = document.getElementById('certificate-modal');
  const certificateImage = document.getElementById('certificate-image');
  const modalClose = certificateModal.querySelector('.modal-close');

  // Open certificate modal
  function openCertificateModal(id) {
    const certificate = certificates[id];
    if (certificate) {
      certificateImage.src = certificate.image;
      certificateModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      console.warn('Certificate not found:', id);
    }
  }

  // Close certificate modal
  function closeCertificateModal() {
    certificateModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    certificateImage.src = '';
  }

  // Attach event listeners
  document.querySelectorAll('.view-btn[data-certificate]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.getAttribute('data-certificate');
      openCertificateModal(id);
    });
  });

  modalClose.addEventListener('click', closeCertificateModal);

  certificateModal.addEventListener('click', e => {
    if (e.target === certificateModal) closeCertificateModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && certificateModal.classList.contains('active')) {
      closeCertificateModal();
    }
  });
});


// Fix for email links
document.addEventListener('DOMContentLoaded', function() {
  const emailLinks = document.querySelectorAll('.method-link[href^="mailto:"], .contact-link[href^="mailto:"]');
  emailLinks.forEach(link => link.addEventListener('click', e => e.stopPropagation()));
});

// Fix for phone links
document.addEventListener('DOMContentLoaded', function() {
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => link.addEventListener('click', e => e.stopPropagation()));
});

// Fix for WhatsApp links
document.addEventListener('DOMContentLoaded', function() {
  const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
  whatsappLinks.forEach(link => link.addEventListener('click', e => e.stopPropagation()));
});
