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

'use strict';

// Portfolio filtering
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");
const selectBox = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-select-value]");

// Filter function
const filterProjects = (filterValue) => {
  filterItems.forEach(item => {
    const category = item.dataset.category;
    const shouldShow = filterValue === "all" || category === filterValue;
    item.style.display = shouldShow ? "block" : "none";
  });
};

// Filter button click handler
filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    // Update active state
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    this.classList.add("active");

    // Get filter value and filter
    const filterValue = this.dataset.filterBtn;
    filterProjects(filterValue);

    // Update select box text
    if (this.closest(".select-list")) {
      selectValue.textContent = this.textContent;
    }
  });
});

// Select box functionality
selectBox.addEventListener("click", () => {
  document.querySelector(".select-list").classList.toggle("active");
  selectBox.classList.toggle("active");
});

// Close select box when clicking outside
document.addEventListener("click", (e) => {
  if (!selectBox.contains(e.target)) {
    document.querySelector(".select-list").classList.remove("active");
    selectBox.classList.remove("active");
  }
});

// Initialize with "All" filter
filterProjects("all");

// Rest of your existing JS code for sidebar and navigation...