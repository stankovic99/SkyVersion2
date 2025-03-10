fetch("menu.json")
  .then(response => response.json())
  .then(data => {
    displayCategories(data);
  });

function displayCategories(data) {
  const container = document.getElementById("category-container");

  Object.keys(data).forEach(category => {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${category.toUpperCase()}</h2>`;
    div.addEventListener("click", () => {
      localStorage.setItem("selectedCategory", category);
      window.location.href = "menu.html"; // Redirect to menu page
    });
    container.appendChild(div);
  });
}

const images = ["img/slika1.jpg", "img/slika2.jpg", "img/slika3.jpg"];
let currentIndex = 0;
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

function updateBackground() {
    let nextIndex = (currentIndex + 1) % images.length;
    
    // Set next image on bg2
    bg2.style.backgroundImage = `url(${images[nextIndex]})`;
    bg2.classList.add("opacity-100");
    bg1.classList.remove("opacity-100");

    // Swap bg1 and bg2 after transition
    setTimeout(() => {
        bg1.style.backgroundImage = `url(${images[nextIndex]})`;
        bg1.classList.add("opacity-100");
        bg2.classList.remove("opacity-100");
        currentIndex = nextIndex;
    }, 1500); // Matches fade duration
}

// Auto-change every 5s
setInterval(updateBackground, 5000);

// Initialize first image
bg1.style.backgroundImage = `url(${images[currentIndex]})`;
bg1.classList.add("opacity-100");


//DOM
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburger = document.getElementById("hamburger");

  const menuItem = document.getElementById("menu-item"); 
  const menuButton = document.getElementById("menu-button"); 
  const menuDropdown = document.getElementById("menu-dropdown"); 
  const menuArrow = document.getElementById("menu-arrow");
  let lastScrollTop = 0;

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              const offset = navbar.offsetHeight;
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              
              window.scrollTo({
                  top: targetPosition - offset,
                  behavior: "smooth",
              });
          }
          
          mobileMenu.classList.add("hidden");
      });
  });

  // Hide/show navbar on scroll with smooth transition
  window.addEventListener("scroll", function () {
      let scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop) {
          navbar.style.transition = "transform 0.4s ease-in-out";
          navbar.style.transform = "translateY(-100%)";
      } else {
          navbar.style.transition = "transform 0.4s ease-in-out";
          navbar.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop;
  });

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
      if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
          mobileMenu.classList.add("hidden");
      }
  });

    // Mobile: Show dropdown on click
    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents click from closing it immediately
        const isHidden = menuDropdown.classList.contains("hidden");
        menuDropdown.classList.toggle("hidden");

        // Rotate arrow smoothly
        menuArrow.style.transition = "transform 0.3s ease";
        menuArrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
    });

    // Close dropdown when clicking outside (for mobile)
    document.addEventListener("click", function (event) {
        if (!menuItem.contains(event.target)) {
            menuDropdown.classList.add("hidden");
            menuArrow.style.transform = "rotate(0deg)";
        }
    });
});
