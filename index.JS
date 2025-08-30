/* ======= Variables ======= */
const cart = [];
const cartCount = document.createElement('div');
cartCount.classList.add('cart-count');
cartCount.innerText = '0';
document.body.appendChild(cartCount);

/* ======= Utility Functions ======= */
function formatPrice(price) {
    return price.toLocaleString('fa-IR') + ' تومان';
}

function updateCartCount() {
    cartCount.innerText = cart.length;
    cartCount.style.animation = 'bounce 0.5s';
    setTimeout(() => cartCount.style.animation = '', 500);
}

/* ======= Product Buy Button ======= */
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        const name = productCard.querySelector('h3').innerText;
        const priceText = productCard.querySelector('.price').innerText.replace(/,/g, '');
        const price = parseInt(priceText, 10) || 0;
        cart.push({ name, price });
        updateCartCount();
        showToast(`${name} به سبد خرید اضافه شد!`);
    });
});

/* ======= Toast Notification ======= */
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.bottom = '30px';
    }, 10);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.bottom = '50px';
        setTimeout(() => document.body.removeChild(toast), 500);
    }, 2500);
}

/* ======= FAQ Toggle ======= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('h3');
    header.addEventListener('click', () => {
        const open = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
    });
});

/* ======= Animation Effects ======= */
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
});

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});

/* ======= Cart Preview ======= */
const cartPreview = document.createElement('div');
cartPreview.classList.add('cart-preview');
document.body.appendChild(cartPreview);

cartCount.addEventListener('click', () => {
    cartPreview.innerHTML = '<h3>سبد خرید شما</h3>';
    if (cart.length === 0) {
        cartPreview.innerHTML += '<p>هیچ محصولی اضافه نشده!</p>';
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.innerText = `${item.name} - ${formatPrice(item.price)}`;
            cartPreview.appendChild(div);
        });
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        const totalDiv = document.createElement('div');
        totalDiv.style.marginTop = '10px';
        totalDiv.innerText = `جمع کل: ${formatPrice(total)}`;
        cartPreview.appendChild(totalDiv);
    }
    cartPreview.classList.toggle('show');
});

/* ======= CSS for JS elements ======= */
const style = document.createElement('style');
style.innerHTML = `
.toast {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff2d95, #00ffff);
    color: #fff;
    padding: 12px 20px;
    border-radius: 12px;
    opacity: 0;
    transition: all 0.5s;
    z-index: 1000;
}
.cart-count {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #ff2d95;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    cursor:pointer;
    color:#fff;
    z-index:1000;
    transition: transform 0.3s;
}
@keyframes bounce {
    0% {transform: scale(1);}
    50% {transform: scale(1.3);}
    100% {transform: scale(1);}
}
.cart-preview {
    position: fixed;
    top: 70px;
    right: 20px;
    background-color: #1c003c;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(255,45,149,0.5);
    max-width: 300px;
    display: none;
    color: #fff;
    z-index: 1000;
}
.cart-preview.show {
    display: block;
}
`;
document.head.appendChild(style);

/* ======= Additional Interactive Features ======= */
// می‌تونی اینجا 100 تا ویژگی دیگه اضافه کنی مثل فیلتر محصولات، جستجو، ورود و ثبت نام، و غیره
// جاوااسکریپت برای تغییر بین ورود و ثبت نام
const loginBox = document.querySelector('.auth-box');
const registerBox = document.querySelector('.register-box');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

showRegister.addEventListener('click', () => {
  loginBox.style.display = 'none';
  registerBox.style.display = 'block';
});

showLogin.addEventListener('click', () => {
  registerBox.style.display = 'none';
  loginBox.style.display = 'block';
});
// داده‌های محصولات (نمونه)
const products = [
  {id: 1, name: "محصول 1", price: 120000},
  {id: 2, name: "محصول 2", price: 80000},
  {id: 3, name: "محصول 3", price: 45000}
];

const cartItems = [];
const cartList = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// افزودن محصول به سبد خرید
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cartItems.push(product);
  renderCart();
}

// نمایش محصولات در سبد خرید
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} تومان`;
    // دکمه حذف محصول
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.onclick = () => {
      cartItems.splice(index, 1);
      renderCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
  totalPriceEl.textContent = total;
}

// دکمه‌های خرید هر محصول
products.forEach(p => {
  const btn = document.getElementById(`buy-${p.id}`);
  if(btn) {
    btn.addEventListener('click', () => addToCart(p.id));
  }
});

// تسویه حساب ساده
document.getElementById('checkout').addEventListener('click', () => {
  if(cartItems.length === 0){
    alert('سبد خرید شما خالی است!');
  } else {
    alert(`تسویه شد! جمع کل: ${totalPriceEl.textContent} تومان`);
    cartItems.length = 0;
    renderCart();
  }
});
// افزودن نظر جدید
function addReview(productId) {
  const input = document.getElementById(`review-input-${productId}`);
  const value = input.value.trim();
  if(value !== "") {
    const ul = document.getElementById(`reviews-list-${productId}`);
    const li = document.createElement('li');
    li.textContent = value;
    ul.appendChild(li);
    input.value = "";
  } else {
    alert("لطفاً نظر خود را وارد کنید!");
  }
}
// شبیه‌سازی ورود و ثبت نام ساده
const users = {};

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("auth-msg");

  if(username && password) {
    if(users[username]) {
      msg.textContent = "این نام کاربری قبلاً ثبت شده!";
      msg.style.color = "red";
    } else {
      users[username] = password;
      msg.textContent = "ثبت نام با موفقیت انجام شد!";
      msg.style.color = "#00ffea";
    }
  } else {
    msg.textContent = "لطفاً همه فیلدها را پر کنید!";
    msg.style.color = "red";
  }
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("auth-msg");

  if(users[username] && users[username] === password) {
    msg.textContent = "ورود موفق!";
    msg.style.color = "#00ffea";
  } else {
    msg.textContent = "نام کاربری یا رمز عبور اشتباه است!";
    msg.style.color = "red";
  }
}
// افزودن به سبد خرید
const cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  alert(`${name} به سبد خرید اضافه شد!`);
  console.log(cart);
}
// =========================
// Shopping Cart Functionality
// =========================
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const buyButtons = document.querySelectorAll(".buy-btn");

let totalPrice = 0;

buyButtons.forEach(button => {
  button.addEventListener("click", function() {
    const product = this.parentElement;
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector(".price").innerText);

    // اضافه کردن به سبد خرید
    const li = document.createElement("li");
    li.innerText = `${name} - ${price} تومان`;
    cartItems.appendChild(li);

    // جمع کردن قیمت
    totalPrice += price;
    totalPriceEl.innerText = totalPrice;

    // افکت کوچک روی دکمه
    this.style.transform = "scale(1.2)";
    setTimeout(() => this.style.transform = "scale(1)", 200);
  });
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert(`مجموع پرداختی: ${totalPrice} تومان`);
});
// =========================
// Add Review Functionality
// =========================
const addReviewButtons = document.querySelectorAll(".add-review-btn");

addReviewButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const container = btn.parentElement;
    const input = container.querySelector(".review-input");
    const reviewText = input.value.trim();
    if(reviewText !== "") {
      const li = document.createElement("li");
      li.innerText = reviewText;
      container.querySelector(".review-list").appendChild(li);
      input.value = "";
    }
  });
});
// =========================
// Auth Form Toggle
// =========================
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginBtn.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  loginBtn.classList.remove("active");
  registerBtn.classList.add("active");
});

// =========================
// Register Validation
// =========================
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const pass = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  if(pass !== confirm) {
    alert("رمز عبور و تکرار آن یکسان نیست!");
  } else {
    alert("ثبت‌نام موفقیت‌آمیز بود!");
    registerForm.reset();
  }
});

// =========================
// Login Dummy
// =========================
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("ورود موفقیت‌آمیز بود!");
  loginForm.reset();
});
// =========================
// Shopping Cart Logic
// =========================
let cart = [];
let total = 0;

// Dummy Products
const products = [
  {id:1, name:"محصول 1", price:50000},
  {id:2, name:"محصول 2", price:75000},
  {id:3, name:"محصول 3", price:120000},
];

// Add to Cart Function
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if(product) {
    cart.push(product);
    total += product.price;
    renderCart();
  }
}

// Render Cart Items
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  if(cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>سبد خرید خالی است.</p>";
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price.toLocaleString()}</span>
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItemsDiv.appendChild(div);
    });
  }
  document.getElementById("total-price").innerText = total.toLocaleString();
}

// Remove from Cart
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  renderCart();
}

// Checkout Dummy
document.getElementById("checkout-btn").addEventListener("click", () => {
  if(cart.length === 0){
    alert("سبد خرید خالی است!");
  } else {
    alert(`پرداخت موفق! جمع کل: ${total.toLocaleString()} تومان`);
    cart = [];
    total = 0;
    renderCart();
  }
});
// =========================
// Cart Functionality
// =========================
const cartItems = [];
const cartList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const notification = document.getElementById("notification");

// تابع اضافه کردن محصول
function addToCart(productName, productPrice) {
  cartItems.push({ name: productName, price: productPrice });
  updateCart();
  showNotification();
}

// به‌روزرسانی نمایش سبد خرید
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} تومان`;
    cartList.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `جمع کل: ${total} تومان`;
}

// نمایش نوتیفیکیشن
function showNotification() {
  notification.style.opacity = "1";
  setTimeout(() => {
    notification.style.opacity = "0";
  }, 2000);
}

// مثال اتصال دکمه خرید
document.querySelectorAll(".buy-btn").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const productName = btn.getAttribute("data-name");
    const productPrice = parseInt(btn.getAttribute("data-price"));
    addToCart(productName, productPrice);
  });
});
