/* =========================================================================
   منسج — منطق الموقع
   يعتمد بالكامل على مصفوفة PRODUCTS المعرّفة في products.js
   ========================================================================= */

(function () {
  "use strict";

  /* ---------- عناصر DOM ---------- */
  const grid          = document.getElementById("productsGrid");
  const emptyState    = document.getElementById("emptyState");
  const resultsCount  = document.getElementById("resultsCount");

  const categoryFilter = document.getElementById("categoryFilter");
  const sizeFilter      = document.getElementById("sizeFilter");
  const sortFilter       = document.getElementById("sortFilter");

  const hamburger = document.getElementById("hamburger");
  const mainNav    = document.getElementById("mainNav");

  const modalOverlay  = document.getElementById("modalOverlay");
  const modalClose    = document.getElementById("modalClose");
  const modalMainImg  = document.getElementById("modalMainImg");
  const modalThumbs   = document.getElementById("modalThumbs");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle    = document.getElementById("modalTitle");
  const modalPrice    = document.getElementById("modalPrice");
  const modalDesc     = document.getElementById("modalDesc");
  const modalColors   = document.getElementById("modalColors");
  const modalSizes    = document.getElementById("modalSizes");
  const addToCartBtn  = document.getElementById("addToCartBtn");
  const modalNote     = document.getElementById("modalNote");

  const cartBtn     = document.getElementById("cartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer  = document.getElementById("cartDrawer");
  const cartClose   = document.getElementById("cartClose");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const CART_KEY = "mansaj_cart";

  /* ---------- حالة التطبيق ---------- */
  let currentProduct = null;   // المنتج المفتوح حالياً داخل المودال
  let selectedColor  = null;
  let selectedSize   = null;
  let selectedImgIndex = 0;

  /* =========================================================
     1) بناء الفلاتر تلقائياً من بيانات المنتجات
     ========================================================= */
  function buildFilterOptions() {
    const categories = [...new Set(PRODUCTS.map(p => p.category))];
    categories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });

    const sizes = [...new Set(PRODUCTS.flatMap(p => p.sizes))];
    sizes.forEach(size => {
      const opt = document.createElement("option");
      opt.value = size;
      opt.textContent = size;
      sizeFilter.appendChild(opt);
    });
  }

  /* =========================================================
     2) تصفية وترتيب المنتجات ثم رسمها كبطاقات
     ========================================================= */
  function getFilteredProducts() {
    let list = [...PRODUCTS];

    if (categoryFilter.value !== "all") {
      list = list.filter(p => p.category === categoryFilter.value);
    }
    if (sizeFilter.value !== "all") {
      list = list.filter(p => p.sizes.includes(sizeFilter.value));
    }
    if (sortFilter.value === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    return list;
  }

  function renderGrid() {
    const list = getFilteredProducts();
    grid.innerHTML = "";
    resultsCount.textContent = list.length;
    emptyState.hidden = list.length !== 0;

    list.forEach((product, i) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.style.animationDelay = `${Math.min(i, 8) * 0.05}s`;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `عرض تفاصيل ${product.name}`);

      const allOut = product.sizes.every(s => (product.outOfStock || []).includes(s));

      card.innerHTML = `
        <div class="product-card-img">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
          <span class="price-tag">${product.price} $</span>
          ${allOut ? '<span class="stock-badge" style="background:#8a8073;">نفدت الكمية</span>' : ""}
        </div>
        <div class="product-card-body">
          <p class="product-card-category">${product.category}</p>
          <h3 class="product-card-name">${product.name}</h3>
          <div class="product-card-colors">
            ${product.colors.map(c => `<span class="color-dot" style="background:${c.hex}" title="${c.name}"></span>`).join("")}
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(product));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(product); }
      });

      grid.appendChild(card);
    });
  }

  [categoryFilter, sizeFilter, sortFilter].forEach(el =>
    el.addEventListener("change", renderGrid)
  );

  /* =========================================================
     3) مودال تفاصيل المنتج
     ========================================================= */
  function openModal(product) {
    currentProduct = product;
    selectedColor = null;
    selectedSize = null;
    selectedImgIndex = 0;

    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalPrice.textContent = `${product.price} $`;
    modalDesc.textContent = product.description;
    modalNote.textContent = "";

    setMainImage(0);

    modalThumbs.innerHTML = product.images.map((src, i) =>
      `<img src="${src}" alt="${product.name} - صورة ${i + 1}" class="${i === 0 ? "active" : ""}" data-index="${i}">`
    ).join("");
    modalThumbs.querySelectorAll("img").forEach(thumb => {
      thumb.addEventListener("click", () => setMainImage(Number(thumb.dataset.index)));
    });

    modalColors.innerHTML = product.colors.map(c =>
      `<button class="swatch" style="background:${c.hex}" data-name="${c.name}" title="${c.name}" aria-label="اللون ${c.name}"></button>`
    ).join("");
    modalColors.querySelectorAll(".swatch").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedColor = btn.dataset.name;
        modalColors.querySelectorAll(".swatch").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    const outOfStock = product.outOfStock || [];
    modalSizes.innerHTML = product.sizes.map(size => {
      const disabled = outOfStock.includes(size);
      return `<button class="size-btn" data-size="${size}" ${disabled ? "disabled" : ""}>${size}</button>`;
    }).join("");
    modalSizes.querySelectorAll(".size-btn:not(:disabled)").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedSize = btn.dataset.size;
        modalSizes.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      });
    });

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function setMainImage(index) {
    selectedImgIndex = index;
    modalMainImg.src = currentProduct.images[index];
    modalMainImg.alt = currentProduct.name;
    modalThumbs.querySelectorAll("img").forEach((t, i) =>
      t.classList.toggle("active", i === index)
    );
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeModal(); closeCart(); }
  });

  addToCartBtn.addEventListener("click", () => {
    if (!selectedColor || !selectedSize) {
      modalNote.textContent = "الرجاء اختيار اللون والمقاس أولاً.";
      modalNote.style.color = "#5c1a2b";
      return;
    }
    addToCart({
      productId: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.images[0],
      color: selectedColor,
      size: selectedSize
    });
    modalNote.textContent = "تمت الإضافة إلى السلة ✓";
    modalNote.style.color = "#6b7a5e";
  });

  /* =========================================================
     4) سلة التسوق (تُحفظ في localStorage)
     ========================================================= */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function addToCart(item) {
    const cart = getCart();
    const existing = cart.find(
      i => i.productId === item.productId && i.color === item.color && i.size === item.size
    );
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    saveCart(cart);
  }

  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function renderCart() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    cartCountEl.textContent = totalQty;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<p class="cart-empty">سلتك فارغة حالياً.</p>`;
    } else {
      cartItemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p class="cart-item-meta">${item.color} · مقاس ${item.size} · الكمية ${item.qty}</p>
            <p class="cart-item-price">${item.price * item.qty} $</p>
            <button class="cart-item-remove" data-index="${i}">إزالة</button>
          </div>
        </div>
      `).join("");

      cartItemsEl.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.index)));
      });
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    cartTotalEl.textContent = `${total} $`;
  }

  function openCart() {
    cartOverlay.classList.add("open");
    cartDrawer.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartOverlay.classList.remove("open");
    cartDrawer.classList.remove("open");
    document.body.style.overflow = "";
  }

  cartBtn.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);
  checkoutBtn.addEventListener("click", () => {
    alert("هذه واجهة عرض تجريبية — لإتمام الطلب فعلياً يلزم ربط بوابة دفع وخادم خلفي.");
  });

  /* =========================================================
     5) قائمة الجوال
     ========================================================= */
  hamburger.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
  mainNav.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => mainNav.classList.remove("open"))
  );

  /* =========================================================
     تشغيل أولي
     ========================================================= */
  buildFilterOptions();
  renderGrid();
  renderCart();
})();