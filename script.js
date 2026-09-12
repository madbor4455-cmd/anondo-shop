const products = [
  { id: 1, name: "পাঞ্জাবি", category: "পুরুষ", price: 1290 },
  { id: 2, name: "থ্রি-পিস", category: "নারী", price: 1890 },
  { id: 3, name: "শিশুদের পোশাক", category: "শিশু", price: 890 },
  { id: 4, name: "কটন শার্ট", category: "পুরুষ", price: 990 },
  { id: 5, name: "লেডিস কুর্তি", category: "নারী", price: 1190 },
  { id: 6, name: "শিশুদের পাঞ্জাবি", category: "শিশু", price: 690 }
];

let cart = [];

function renderProducts(list = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = list.length
    ? list.map(p => `
      <div class="card">
        <div class="card-body">
          <small>${p.category}</small>
          <h3>${p.name}</h3>
          <strong>৳${p.price}</strong>
          <br><br>
          <button class="add" onclick="addToCart(${p.id})">
            কার্টে যোগ করুন
          </button>
        </div>
      </div>
    `).join("")
    : "<p>কোনো পণ্য পাওয়া যায়নি।</p>";
}

function filterCategory(category) {
  if (category === "সব") {
    renderProducts(products);
  } else {
    renderProducts(
      products.filter(p => p.category === category)
    );
  }

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth"
  });
}

function searchProducts() {
  const input = document.getElementById("searchInput");

  if (!input) return;

  const search = input.value.trim().toLowerCase();

  const result = products.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.category.toLowerCase().includes(search)
  );

  renderProducts(result);

  document.getElementById("products")?.scrollIntoView({
    behavior: "smooth"
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  if (!product) return;

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
  toggleCart(true);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    updateCart();
  }
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = count;
  }

  if (cartTotal) {
    cartTotal.textContent = total;
  }

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>আপনার কার্ট এখন খালি।</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <b>${item.name}</b>
        <br>
        <small>৳${item.price} × ${item.quantity}</small>
      </div>

      <div>
        <button onclick="changeQuantity(${item.id}, -1)">−</button>
        ${item.quantity}
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
        <button onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join("");
}

function toggleCart(forceOpen = null) {
  const cartBox = document.getElementById("cart");

  if (!cartBox) return;

  if (forceOpen === true) {
    cartBox.classList.add("open");
  } else if (forceOpen === false) {
    cartBox.classList.remove("open");
  } else {
    cartBox.classList.toggle("open");
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("আগে কার্টে কিছু পণ্য যোগ করুন।");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  alert(
    "অর্ডার প্রস্তুত হয়েছে।\n\nমোট: ৳" + total +
    "\n\nচেকআউট সিস্টেম পরের ধাপে যোগ করা হবে।"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  updateCart();

  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        searchProducts();
      }
    });
  }
});
