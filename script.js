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
   CART STATE
================================================= */
let cart = [];

/* =================================================
   CART DRAWER UI
================================================= */
const cartDrawer = document.createElement("div");
cartDrawer.className = "cart-drawer";
cartDrawer.innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <h3>Your Cart</h3>
    <button id="cartCloseBtn" style="font-size:1.5rem;background:none;border:none;cursor:pointer;">×</button>
  </div>

  <div id="cartItems" style="margin-top:16px;"></div>

  <p id="cartEmpty" style="margin-top:16px;color:#6b6b6b;">
    Your cart is empty.
  </p>

  <button class="btn-primary" id="checkoutBtn" style="margin-top:24px;width:100%;">
    Checkout
  </button>
`;
document.body.appendChild(cartDrawer);

const cartCloseBtn = document.getElementById("cartCloseBtn");

cartCloseBtn.addEventListener("click", e => {
  e.stopPropagation();
  cartDrawer.classList.remove("active");
});

const cartItemsEl = document.getElementById("cartItems");
const cartEmptyEl = document.getElementById("cartEmpty");

/* =================================================
   CART FUNCTIONS
================================================= */
function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartEmptyEl.style.display = "block";
    return;
  }

  cartEmptyEl.style.display = "none";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "14px";
    div.innerHTML = `
      <strong>${item.title}</strong><br>
      <small>
        ${item.size ? "Size: " + item.size + " · " : ""}
        ${item.color ? "Color: " + item.color + " · " : ""}
        Qty: ${item.qty}
      </small><br>
      <span>${item.price}</span><br>
      <button data-index="${index}" style="margin-top:6px;">Remove</button>
    `;
    cartItemsEl.appendChild(div);
  });

  document.querySelectorAll("#cartItems button").forEach(btn => {
    btn.onclick = () => {
      cart.splice(btn.dataset.index, 1);
      renderCart();
    };
  });
}

function addToCart(product) {
  cart.push({
    title: product.title,
    price: product.price,
    size: product.size,
    color: product.color,
    qty: 1
  });

  renderCart();
  cartDrawer.classList.add("active");
}

/* =================================================
   CART TOGGLE (IMPORTANT FIX)
================================================= */
const cartBtn = document.getElementById("cartBtn");

cartBtn.addEventListener("click", e => {
  e.stopPropagation();
  cartDrawer.classList.toggle("active");
});

/* Prevent clicks inside cart from closing it */
cartDrawer.addEventListener("click", e => {
  e.stopPropagation();
});

/* Close cart only via ESC */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    cartDrawer.classList.remove("active");
  }
});

/* =================================================
   PDP ELEMENTS
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

const pdpAddBtn = document.querySelector(".pdp-cta");
const pdpHint = document.getElementById("pdpHint");

/* PDP STATE */
let selectedSize = null;
let selectedColor = null;
let sizeRequired = false;
let colorRequired = false;
let activeProduct = null;

/* =================================================
   PDP HELPERS
================================================= */
function resetPDP() {
  selectedSize = null;
  selectedColor = null;

  pdpAddBtn.disabled = true;
  pdpHint.textContent = "Select required options";

  document.querySelectorAll(".size-grid button").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".color-grid button").forEach(b => b.classList.remove("active"));
}

function validatePDP() {
  if (sizeRequired && !selectedSize) {
    pdpAddBtn.disabled = true;
    pdpHint.textContent = "Please select a size";
    return;
  }

  if (colorRequired && !selectedColor) {
    pdpAddBtn.disabled = true;
    pdpHint.textContent = "Please select a color";
    return;
  }

  pdpAddBtn.disabled = false;
  pdpHint.textContent = "Ready to add to cart";
}

/* =================================================
   OPEN PDP
================================================= */
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") return;

    activeProduct = {
      title: card.dataset.title,
      price: card.dataset.price
    };

    pdpTitle.textContent = activeProduct.title;
    pdpPrice.textContent = activeProduct.price;
    pdpImg.src = card.dataset.img;

    resetPDP();

    /* ---------- SIZE LOGIC ---------- */
    sizeGrid.innerHTML = "";
    pdpSizes.style.display = "none";
    sizeRequired = card.dataset.sizeType === "numeric" || card.dataset.sizeType === "alpha";

    if (card.dataset.sizeType === "numeric") {
      pdpSizes.style.display = "block";
      [6,7,8,9,10,11].forEach(size => {
        const btn = document.createElement("button");
        btn.textContent = size;
        btn.onclick = () => {
          document.querySelectorAll(".size-grid button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedSize = size;
          validatePDP();
        };
        sizeGrid.appendChild(btn);
      });
    }

    if (card.dataset.sizeType === "alpha") {
      pdpSizes.style.display = "block";
      ["S","M","L","XL","XXL"].forEach(size => {
        const btn = document.createElement("button");
        btn.textContent = size;
        btn.onclick = () => {
          document.querySelectorAll(".size-grid button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedSize = size;
          validatePDP();
        };
        sizeGrid.appendChild(btn);
      });
    }

    /* ---------- COLOR LOGIC ---------- */
    colorGrid.innerHTML = "";
    pdpColors.style.display = "none";
    colorRequired = card.dataset.colors && card.dataset.colors.length > 0;

    if (colorRequired) {
      pdpColors.style.display = "block";
      card.dataset.colors.split(",").forEach(color => {
        const btn = document.createElement("button");
        btn.style.background = color.toLowerCase();
        btn.onclick = () => {
          document.querySelectorAll(".color-grid button").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedColor = color;
          validatePDP();
        };
        colorGrid.appendChild(btn);
      });
    }

    validatePDP();
    pdpOverlay.classList.add("active");
  });
});

/* =================================================
   PDP ACTIONS
================================================= */
pdpAddBtn.addEventListener("click", e => {
  e.stopPropagation();

  addToCart({
    title: activeProduct.title,
    price: activeProduct.price,
    size: selectedSize,
    color: selectedColor
  });
});

/* Close PDP */
pdpClose.addEventListener("click", e => {
  e.stopPropagation();
  pdpOverlay.classList.remove("active");
});

pdpOverlay.addEventListener("click", e => {
  if (e.target === pdpOverlay) {
    pdpOverlay.classList.remove("active");
  }
});


const shopBtn = document.getElementById("shopBtn");
const shopDropdown = document.getElementById("shopDropdown");

shopBtn.addEventListener("click", e => {
  e.stopPropagation();
  shopDropdown.style.display =
    shopDropdown.style.display === "block" ? "none" : "block";
});

/* Close dropdown when clicking outside */
document.addEventListener("click", () => {
  shopDropdown.style.display = "none";
});
/* =================================================
   MOBILE NAV LOGIC
================================================= */
const mobileMenu = document.getElementById("mobileMenu");
const mobileNav = document.getElementById("mobileBottomNav");

mobileNav.addEventListener("click", e => {
  const action = e.target.closest("button")?.dataset.action;
  if (!action) return;

  if (action === "menu") {
    mobileMenu.classList.toggle("active");
  }

  if (action === "cart") {
    cartDrawer.classList.add("active");
  }

  if (action === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (action === "account") {
    alert("Account page (future)");
  }
});

/* Close mobile menu when clicking link */
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});
