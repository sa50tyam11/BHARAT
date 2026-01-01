/* =================================================
   MOBILE NAV
================================================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* =================================================
   PDP (PRODUCT DETAIL PAGE)
================================================= */
const pdpOverlay = document.getElementById("pdpOverlay");
const pdpClose = document.getElementById("pdpClose");

const pdpImg = document.getElementById("pdpImg");
const pdpTitle = document.getElementById("pdpTitle");
const pdpPrice = document.getElementById("pdpPrice");

const pdpSizes = document.getElementById("pdpSizes");
const sizeGrid = document.getElementById("sizeGrid");

const pdpColors = document.getElementById("pdpColors");
const colorGrid = document.getElementById("colorGrid");

/* Open PDP from product card */
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", e => {

    /* prevent PDP opening when clicking button */
    if (e.target.tagName === "BUTTON") return;

    /* BASIC DATA */
    pdpTitle.textContent = card.dataset.title;
    pdpPrice.textContent = card.dataset.price;
    pdpImg.src = card.dataset.img;
    pdpImg.alt = card.dataset.title;

    /* ================= SIZES LOGIC ================= */
    sizeGrid.innerHTML = "";
    pdpSizes.style.display = "none";

    const sizeType = card.dataset.sizeType;

    if (sizeType === "numeric") {
      pdpSizes.style.display = "block";
      [6,7,8,9,10,11].forEach(size => {
        const btn = document.createElement("button");
        btn.textContent = size;
        sizeGrid.appendChild(btn);
      });
    }

    if (sizeType === "alpha") {
      pdpSizes.style.display = "block";
      ["S","M","L","XL","XXL"].forEach(size => {
        const btn = document.createElement("button");
        btn.textContent = size;
        sizeGrid.appendChild(btn);
      });
    }

    /* ================= COLORS LOGIC ================= */
    colorGrid.innerHTML = "";
    pdpColors.style.display = "none";

    const colors = card.dataset.colors;

    if (colors && colors.length > 0) {
      pdpColors.style.display = "block";

      colors.split(",").forEach(color => {
        const btn = document.createElement("button");
        btn.title = color;
        btn.style.background = color.toLowerCase();
        colorGrid.appendChild(btn);
      });
    }

    /* OPEN PDP */
    pdpOverlay.classList.add("active");
  });
});

/* Close PDP */
pdpClose.addEventListener("click", () => {
  pdpOverlay.classList.remove("active");
});

pdpOverlay.addEventListener("click", e => {
  if (e.target === pdpOverlay) {
    pdpOverlay.classList.remove("active");
  }
});

/* =================================================
   CART DRAWER (SIMPLE & SAFE)
================================================= */
const cartDrawer = document.createElement("div");
cartDrawer.className = "cart-drawer";
cartDrawer.innerHTML = `
  <h3>Your Cart</h3>
  <p id="cartMsg" style="margin-top:16px;color:#6b6b6b;">
    Your cart is empty.
  </p>
  <button class="btn-primary" style="margin-top:24px;width:100%;">
    Checkout
  </button>
`;
document.body.appendChild(cartDrawer);

/* Add to Cart from product cards */
document.querySelectorAll(".product-card .btn-primary").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    cartDrawer.classList.add("active");
    document.getElementById("cartMsg").textContent =
      "Item added to cart.";
  });
});

/* Add to Cart from PDP */
const pdpAddBtn = document.querySelector(".pdp-cta");
if (pdpAddBtn) {
  pdpAddBtn.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    document.getElementById("cartMsg").textContent =
      "Item added to cart.";
  });
}

/* Close cart when clicking outside */
document.addEventListener("click", e => {
  if (
    cartDrawer.classList.contains("active") &&
    !cartDrawer.contains(e.target) &&
    !e.target.closest(".btn-primary")
  ) {
    cartDrawer.classList.remove("active");
  }
});
