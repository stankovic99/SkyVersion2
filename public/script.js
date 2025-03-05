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
