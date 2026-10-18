
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Smartphone with Premium Camera",
    category: "Electronics",
    price: 12999,
    oldPrice: 17999,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Classic Casual Sneakers",
    category: "Fashion",
    price: 999,
    oldPrice: 1999,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Modern Wrist Watch",
    category: "Fashion",
    price: 1799,
    oldPrice: 3499,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Stylish Travel Backpack",
    category: "Fashion",
    price: 799,
    oldPrice: 1599,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Comfortable Modern Sofa",
    category: "Home",
    price: 8999,
    oldPrice: 13999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Minimal Table Lamp",
    category: "Home",
    price: 699,
    oldPrice: 1299,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "Automatic Coffee Maker",
    category: "Appliances",
    price: 2499,
    oldPrice: 3999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 9,
    name: "Skincare Beauty Essentials",
    category: "Beauty",
    price: 599,
    oldPrice: 999,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 10,
    name: "Football Training Ball",
    category: "Sports",
    price: 499,
    oldPrice: 899,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=500&q=80"
  }
];

// Application state
let cart = [];
let selectedCategory = "All";
let searchTerm = "";

// HTML elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const cartCount = document.getElementById("cartCount");
const drawerCount = document.getElementById("drawerCount");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const emptyMessage = document.getElementById("emptyMessage");
const sectionTitle = document.getElementById("sectionTitle");
const clearSearch = document.getElementById("clearSearch");

// Format numbers as Indian rupees
function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

// Calculate discount percentage
function getDiscount(product) {
  return Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
}

// Display products
function renderProducts() {
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const searchableText =
      `${product.name} ${product.category}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >
      </div>

      <h3 class="product-name">${product.name}</h3>

      <span class="rating">
        ★ ${product.rating} ★
      </span>

      <div class="price-row">
        <span class="price">${formatPrice(product.price)}</span>
        <span class="old-price">${formatPrice(product.oldPrice)}</span>
      </div>

      <p class="discount">${getDiscount(product)}% off</p>

      <p class="delivery">Free delivery</p>

      <button class="add-button" data-add="${product.id}">
        🛒 Add to Cart
      </button>
    </article>
  `).join("");

  emptyMessage.classList.toggle(
    "hidden",
    filteredProducts.length !== 0
  );

  clearSearch.classList.toggle(
    "hidden",
    !searchTerm && selectedCategory === "All"
  );

  sectionTitle.textContent =
    selectedCategory === "All"
      ? "Best Deals For You"
      : `${selectedCategory} Products`;
}

// Search products
searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

// Live search as the user types
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();
});

// Filter by category
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(category => {
      category.classList.toggle("active", category === button);
    });

    renderProducts();
  });
});

// Clear search and category filters
clearSearch.addEventListener("click", () => {
  selectedCategory = "All";
  searchTerm = "";
  searchInput.value = "";

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );
  });

  renderProducts();
});

// Add product to cart
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  renderCart();
}

// Handle add-to-cart buttons
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  addToCart(Number(button.dataset.add));

  // Brief visual confirmation
  const originalText = button.textContent;
  button.textContent = "✓ Added!";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 700);
});

// Update cart contents
function renderCart() {
  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;
  drawerCount.textContent = totalQuantity;

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + product.price * item.quantity;
  }, 0);

  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <p style="font-size: 40px;">🛒</p>
        <h3>Your cart is empty!</h3>
        <p>Add some products to get started.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">

        <div>
          <h3>${product.name}</h3>

          <p class="cart-item-price">
            ${formatPrice(product.price * item.quantity)}
          </p>

          <div class="cart-item-controls">
            <button
              class="quantity-button"
              data-action="decrease"
              data-id="${product.id}"
              aria-label="Decrease quantity"
            >−</button>

            <span>${item.quantity}</span>

            <button
              class="quantity-button"
              data-action="increase"
              data-id="${product.id}"
              aria-label="Increase quantity"
            >+</button>

            <button
              class="remove-button"
              data-action="remove"
              data-id="${product.id}"
            >Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Change quantity or remove items
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find(entry => entry.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity += 1;
  } else if (action === "decrease") {
    item.quantity -= 1;

    if (item.quantity <= 0) {
      cart = cart.filter(entry => entry.id !== id);
    }
  } else if (action === "remove") {
    cart = cart.filter(entry => entry.id !== id);
  }

  renderCart();
});

// Open and close cart
function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("cartButton").focus();
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

// Close cart with Escape key
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) {
    closeCart();
  }
});

// Scroll to products
document.getElementById("shopNowButton").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
});

// Demo login
document.getElementById("loginButton").addEventListener("click", () => {
  alert("Welcome to Flipkart Demo!\n\nLogin and account creation are not connected yet.");
});

// Demo checkout
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add a product before checkout.");
    return;
  }

  alert(
    "Order Summary\n\n" +
    "Items: " + cart.reduce((sum, item) => sum + item.quantity, 0) +
    "\nTotal: " + cartTotal.textContent +
    "\n\nThis is a demo checkout. No order or payment has been made."
  );
});

// Initial page render
renderProducts();
renderCart();
