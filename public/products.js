document.addEventListener("DOMContentLoaded", () => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    const selectedSubcategory = localStorage.getItem("selectedSubcategory");
  
    fetch("menu.json")
      .then(response => response.json())
      .then(data => {
        displayProducts(data[selectedCategory][selectedSubcategory]);
      });
  });
  
  function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
  
    products.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p class="text-4xl">${item.description}</p>
        <p>${item.price} ден.</p>
      `;
      container.appendChild(div);
    });
  }
  