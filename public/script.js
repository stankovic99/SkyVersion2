const images = ["img/bg1.webp", "img/bg2.webp", "img/bg3.webp"];
let currentIndex = 0;
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
const homeSection = document.getElementById("home");
const loader = document.querySelector(".loader");

// Preload images
function preloadImages(imageArray, callback) {
  let loadedCount = 0;
  imageArray.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === imageArray.length) callback();
    };
    img.onerror = () => {
      loadedCount++; // Count even if error to avoid hanging
      if (loadedCount === imageArray.length) callback();
    };
  });
}

// Update background function
function updateBackground() {
  let nextIndex = (currentIndex + 1) % images.length;

  bg2.style.backgroundImage = `url(${images[nextIndex]})`;
  bg2.classList.add("opacity-100");
  bg1.classList.remove("opacity-100");

  setTimeout(() => {
    bg1.style.backgroundImage = `url(${images[nextIndex]})`;
    bg1.classList.add("opacity-100");
    bg2.classList.remove("opacity-100");
    currentIndex = nextIndex;
  }, 1500); // Matches fade duration
}

// Initialize
preloadImages(images, () => {
  // Hide loader and show section
  loader.style.display = "none";
  homeSection.classList.add("loaded");
  // Set initial image and start slideshow
  bg1.style.backgroundImage = `url(${images[currentIndex]})`;
  bg1.classList.add("opacity-100");
  setInterval(updateBackground, 3000);
});
// Auto-change every 5s
setInterval(updateBackground, 3000);

// Initialize first image
bg1.style.backgroundImage = `url(${images[currentIndex]})`;
bg1.classList.add("opacity-100");


//DOM
document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("galleryContainer");
  const toggleGalleryBtn = document.getElementById("toggleGallery");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const prevImage = document.getElementById("prevImage");
  const nextImage = document.getElementById("nextImage");
  const closeModal = document.getElementById("closeModal");
  const INITIAL_VISIBLE = 8;

  async function loadImages() {
    try {
      const response = await fetch('images.json');
      const data = await response.json();
      const images = data.images;

      // Create gallery items
      images.forEach((src, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${index >= INITIAL_VISIBLE ? 'hidden' : ''}`;
        galleryItem.dataset.initial = index < INITIAL_VISIBLE ? 'true' : 'false';
        galleryItem.dataset.index = index; // Add index for navigation

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Gallery Image ${index + 1}`;
        img.className = 'w-full h-auto hover:opacity-80 transition-opacity';

        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
      });

      // Gallery functionality
      const galleryItems = document.querySelectorAll('.gallery-item');
      const hiddenItems = document.querySelectorAll('.gallery-item[data-initial="false"]');
      let isExpanded = false;
      let currentIndex = 0;

      galleryItems.forEach(item => {
        item.addEventListener('click', () => {
          currentIndex = parseInt(item.dataset.index);
          updateModalImage();
          modal.classList.remove('hidden');
        });
      });

      // Modal navigation
      function updateModalImage() {
        modalImage.src = images[currentIndex];
        prevImage.style.display = currentIndex === 0 ? 'none' : 'block';
        nextImage.style.display = currentIndex === images.length - 1 ? 'none' : 'block';
      }

      prevImage.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateModalImage();
        }
      });

      nextImage.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
          currentIndex++;
          updateModalImage();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('hidden')) return;

        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          currentIndex--;
          updateModalImage();
        }
        if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
          currentIndex++;
          updateModalImage();
        }
        if (e.key === 'Escape') {
          modal.classList.add('hidden');
        }
      });

      // Modal close functionality
      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });

      // Show More/Less functionality
      if (images.length > INITIAL_VISIBLE) {
        toggleGalleryBtn.classList.remove('hidden');

        toggleGalleryBtn.addEventListener('click', () => {
          isExpanded = !isExpanded;
          hiddenItems.forEach(item => {
            item.classList.toggle('hidden', !isExpanded);
          });
          toggleGalleryBtn.textContent = isExpanded ? 'Прикажи помалку' : 'Прикажи повеќе';
        });
      }

    } catch (error) {
      console.error('Error loading images:', error);
      galleryContainer.innerHTML = '<p class="text-darkbrown">Error loading gallery images</p>';
    }
  }

  loadImages();

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

function toggleText() {
  const moreText = document.getElementById('more-text');
  const button = document.getElementById('toggle-button');

  const isHidden = moreText.classList.contains('hidden');

  if (isHidden) {
    moreText.classList.remove('hidden');
    button.textContent = 'Прикажи помалку';
  } else {
    moreText.classList.add('hidden');
    button.textContent = 'Прикажи повеќе';
  }
}
