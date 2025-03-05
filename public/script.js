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
    const bgDiv = document.querySelector(".animate-bg-slider");
  
    function updateBackground() {
      bgDiv.classList.remove("fade-in", "scale-105"); // Remove animations before changing
  
      setTimeout(() => {
        bgDiv.style.backgroundImage = `url(${images[currentIndex]})`;
        bgDiv.classList.add("fade-in");
      }, 300); // Fade-out before image change
  
      // Add the scale effect AFTER image loads
    }
  
    document.getElementById("prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateBackground();
    });
  
    document.getElementById("next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateBackground();
    });
  
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateBackground();
    }, 5000); // Auto-change every 20 seconds
  
    updateBackground();
// //Intersection Observer
// document.addEventListener("DOMContentLoaded", function () {
//   const leftCol = document.querySelector(".about-left");
//   const rightCol = document.querySelector(".about-right");
//   const navbar = document.getElementById("navbar");
//   const mobileMenu = document.getElementById("mobile-menu");
//   const hamburger = document.getElementById("hamburger");
//   let lastScrollTop = 0;

//   const observer = new IntersectionObserver(
//       (entries) => {
//           entries.forEach((entry) => {
//               if (entry.isIntersecting) {
//                   entry.target.classList.remove("opacity-0", "-translate-x-20", "translate-x-20");
//                   entry.target.classList.add("opacity-100", "translate-x-0");
//               }
//           });
//       },
//       { threshold: 0.3 }
//   );
//   observer.observe(leftCol);
//   observer.observe(rightCol);
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//       anchor.addEventListener("click", function (e) {
//           e.preventDefault();
//           const targetId = this.getAttribute("href").substring(1);
//           const targetElement = document.getElementById(targetId);
//           if (targetElement) {
//               const offset = navbar.offsetHeight;
//               const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              
//               window.scrollTo({
//                   top: targetPosition - offset,
//                   behavior: "smooth",
//               });
//           }
          
//           mobileMenu.classList.add("hidden");
//       });
//   });

//   window.addEventListener("scroll", function () {
//       let scrollTop = window.scrollY;
//       if (scrollTop > lastScrollTop) {
//           navbar.style.transform = "translateY(-100%)";
//       } else {
//           navbar.style.transform = "translateY(0)";
//       }
//       lastScrollTop = scrollTop;
//   });

//   hamburger.addEventListener("click", function () {
//       mobileMenu.classList.toggle("hidden");
//   });

//   document.addEventListener("click", function (event) {
//       if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
//           mobileMenu.classList.add("hidden");
//       }
//   });
// });

