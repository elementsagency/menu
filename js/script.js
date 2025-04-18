const menuLinks = document.querySelectorAll(".menu a");
const productsContainer = document.getElementById("products");

// Initialize language and category
let currentLanguage = 'en'; // Default language
let currentCategory = 'salads'; // Default category

// Function to load products based on selected language and category
function loadProducts(language, category) {
  fetch(`./productsData_${language}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      showProducts(data, category); // Show products in the selected category
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
}

// Function to display products
function showProducts(data, category) {
  productsContainer.innerHTML = ""; // Clear the existing products
  // Check if the category exists in the data before attempting to display products
  if (data[category]) {
    data[category].forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${product.img}" alt="">
        <div class="card-description">
          <p class="title">${product.title}</p>
          <p class="description">${product.description}</p>
          <p class="price">${product.price}</p>
        </div>
      `;
      productsContainer.appendChild(card); // Add the card to the container
    });
  } else {
    productsContainer.innerHTML = "<p>No products available in this category.</p>";
  }
}

// Handle language switch using dropdown
const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener("change", (e) => {
  currentLanguage = e.target.value; // Get the selected language
  loadProducts(currentLanguage, currentCategory); // Reload products with the new language
});

// Handle category switch
menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    menuLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    currentCategory = link.getAttribute("data-category"); // Get the category selected
    loadProducts(currentLanguage, currentCategory); // Reload products with the new category
  });
});

// Show default language (English) and category (salads) on initial load
window.addEventListener("load", () => {
  loadProducts(currentLanguage, currentCategory); // Ensure products are loaded on initial page load
});




// Store language in localStorage
localStorage.setItem('language', currentLanguage);

// Retrieve language from localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  currentLanguage = savedLanguage;
  loadProducts(currentLanguage);
}
