/* =====================================================
   GLOBAL STATE
===================================================== */
let cart = [];

/* =====================================================
   SEARCH FUNCTIONALITY
===================================================== */
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".product").forEach(product => {
      const name = product.querySelector("h4")?.innerText.toLowerCase() || "";
      product.style.display = name.includes(value) ? "block" : "none";
    });
  });
}

/* =====================================================
   CART LOGIC
===================================================== */
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

/* Add to cart */
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
}

/* Update cart badge */
function updateCartCount() {
  if (!cartCount) return;
  cartCount.textContent = cart.length;
}

/* Attach add-to-cart handlers */
document.querySelectorAll(".product button").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const product = btn.closest(".product");
    const name = product.querySelector("h4")?.innerText || "Product";
    const price = product.querySelector(".price")?.innerText || "₹0";
    addToCart(name, price);
  });
});

/* Cart icon click */
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
    } else {
      alert(`Cart Items:\n\n${cart.map(
        (item, i) => `${i + 1}. ${item.name} - ${item.price}`
      ).join("\n")}`);
    }
  });
}

/* =====================================================
   MOBILE BOTTOM NAV LOGIC
===================================================== */
document.querySelectorAll(".bottom-nav div").forEach(item => {
  item.addEventListener("click", () => {
    const label = item.innerText.toLowerCase();

    if (label.includes("home")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (label.includes("cart")) {
      if (cart.length === 0) {
        alert("Your cart is empty");
      } else {
        alert(`Cart Items:\n\n${cart.map(
          (item, i) => `${i + 1}. ${item.name} - ${item.price}`
        ).join("\n")}`);
      }
    }

    if (label.includes("profile")) {
      alert("Profile page coming soon");
    }

    if (label.includes("wishlist")) {
      alert("Wishlist feature coming soon");
    }
  });
});

/* =====================================================
   CATEGORY PILL SCROLL
===================================================== */
document.querySelectorAll(".mobile-categories button").forEach(btn => {
  btn.addEventListener("click", () => {
    const text = btn.innerText.toLowerCase();
    const section = document.querySelector(`[data-category="${text}"]`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =====================================================
   STICKY HEADER SHADOW (UX POLISH)
===================================================== */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (!header) return;
  header.style.boxShadow =
    window.scrollY > 10
      ? "0 2px 6px rgba(0,0,0,0.15)"
      : "none";
});

/* =====================================================
   DEBUG (REMOVE LATER IF YOU WANT)
===================================================== */
console.log("BHARAT JS loaded successfully");
