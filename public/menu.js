// document.addEventListener("DOMContentLoaded", () => {
//     const selectedCategory = localStorage.getItem("selectedCategory");
  
//     fetch("menu.json")
//       .then(response => response.json())
//       .then(data => {
//         displaySubcategories(data[selectedCategory]);
//       });
//   });
  
//   function displaySubcategories(categoryData) {
//     const container = document.getElementById("subcategory-container");
  
//     Object.keys(categoryData).forEach(subcategory => {
//       const div = document.createElement("div");
//       div.innerHTML = `<h3>${subcategory.toUpperCase()}</h3>`;
//       div.addEventListener("click", () => {
//         localStorage.setItem("selectedSubcategory", subcategory);
//         window.location.href = "products.html";
//       });
//       container.appendChild(div);
//     });
//   }
  
$(document).ready(function() {
  const INITIAL_TYPE = 'food';

  // Function to render subcategories
  function renderSubcategories(type, jsonData) {
      const $scrollContainer = $('#subcategoryScroll');
      $scrollContainer.empty();
      const categories = Object.keys(jsonData[type]);
      categories.forEach((category, index) => {
          const $button = $(`
              <button data-category="${category}" class="flex-shrink-0 px-4 py-2 text-darkbrown bg-lightbrown rounded-lg hover:bg-darkbrown hover:text-white transition-colors ${index === 0 ? 'active-subcategory' : ''}">
                  ${category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
          `);
          $scrollContainer.append($button);
      });
  }

  // Function to render products
  function renderProducts(type, category, jsonData) {
      const $grid = $('#productGrid');
      $grid.empty();
      const items = jsonData[type][category];
      items.forEach(item => {
          const $item = $(`
              <div class="flex bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="img/${item.image}" alt="${item.name}" class="w-32 h-32 object-cover flex-shrink-0">
                  <div class="p-4 flex-1">
                      <h3 class="text-lg font-playfair text-darkbrown">${item.name}</h3>
                      <p class="text-sm text-gray-600">${item.description}</p>
                      <p class="text-darkbrown font-semibold mt-2">${item.price} ден.</p>
                  </div>
              </div>
          `);
          $grid.append($item);
      });
  }
  

  // Fetch JSON and initialize
  $.getJSON('menu.json', function(jsonData) {
      // Initial load
      $('#categoryTabs button[data-type="food"]').addClass('active-tab');
      renderSubcategories(INITIAL_TYPE, jsonData);
      renderProducts(INITIAL_TYPE, Object.keys(jsonData[INITIAL_TYPE])[0], jsonData);

      // Tab switching
      $('#categoryTabs button').on('click', function() {
          $('#categoryTabs button').removeClass('active-tab');
          $(this).addClass('active-tab');
          const type = $(this).data('type');
          renderSubcategories(type, jsonData);
          renderProducts(type, Object.keys(jsonData[type])[0], jsonData);
          $('#subcategoryScroll button:first').addClass('active-subcategory');
      });

      // Subcategory switching
      $('#subcategoryScroll').on('click', 'button', function() {
          $('#subcategoryScroll button').removeClass('active-subcategory');
          $(this).addClass('active-subcategory');
          const type = $('#categoryTabs .active-tab').data('type');
          const category = $(this).data('category');
          renderProducts(type, category, jsonData);
      });

      // Scroll buttons
      $('#scrollLeft').on('click', function() {
          $('#subcategoryScroll').scrollLeft($('#subcategoryScroll').scrollLeft() - 200);
      });

      $('#scrollRight').on('click', function() {
          $('#subcategoryScroll').scrollLeft($('#subcategoryScroll').scrollLeft() + 200);
      });
  }).fail(function(jqxhr, textStatus, error) {
      console.error('Error loading menu.json:', textStatus, error);
      $('#productGrid').html('<p class="text-darkbrown text-center">Грешка при вчитување на менито</p>');
  });

  // Hide scrollbar CSS
  const style = document.createElement('style');
  style.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
          display: none;
      }
      .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
      }
      .active-tab {
          background-color: #5c4033;
          color: white;
      }
      .active-subcategory {
          background-color: #5c4033;
          color: white;
      }
  `;
  document.head.appendChild(style);
});