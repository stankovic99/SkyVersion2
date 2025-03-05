document.addEventListener("DOMContentLoaded", () => {
    const selectedCategory = localStorage.getItem("selectedCategory");
  
    fetch("menu.json")
      .then(response => response.json())
      .then(data => {
        displaySubcategories(data[selectedCategory]);
      });
  });
  
  function displaySubcategories(categoryData) {
    const container = document.getElementById("subcategory-container");
  
    Object.keys(categoryData).forEach(subcategory => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${subcategory.toUpperCase()}</h3>`;
      div.addEventListener("click", () => {
        localStorage.setItem("selectedSubcategory", subcategory);
        window.location.href = "products.html";
      });
      container.appendChild(div);
    });
  }
  