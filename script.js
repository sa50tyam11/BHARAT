// SEARCH FILTER
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    product.style.display = name.includes(value) ? "block" : "none";
  });
});

// ADD TO CART (DEMO)
document.querySelectorAll(".product button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Item added to cart");
  });
});
