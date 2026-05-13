function setupHeader() {
  const button = document.querySelector("[data-menu-button]");
  const panel = document.querySelector("[data-mobile-panel]");
  if (!button || !panel) return;

  button.addEventListener("click", () => {
    panel.classList.toggle("open");
    button.textContent = panel.classList.contains("open") ? "×" : "☰";
  });
}

function renderProducts() {
  const grid = document.querySelector("[data-product-grid]");
  const filters = document.querySelector("[data-filters]");
  if (!grid) return;

  function productCard(product) {
    return `
      <article class="product-card" data-category="${product.category}">
        <a class="product-card-image" href="${productUrl(product.slug)}" aria-label="View ${product.name}">
          <img src="${product.images[0]}" alt="${product.name}">
          <span class="pill image-pill">${product.color}</span>
        </a>
        <div class="product-card-body">
          <div class="product-row">
            <span class="pill product-tag">${product.category}</span>
            <span class="price">${product.price}</span>
          </div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-copy">${product.short}</p>
          <div class="card-actions">
            <a class="btn" href="${productUrl(product.slug)}">View</a>
            <a class="btn dark" href="${whatsappUrl(product)}" target="_blank" rel="noreferrer">Purchase</a>
          </div>
        </div>
      </article>
    `;
  }

  function paint(category = "All") {
    const list = category === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);
    grid.innerHTML = list.map(productCard).join("");
  }

  paint();

  if (filters) {
    filters.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      document.querySelectorAll("[data-filter]").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      paint(button.dataset.filter);
    });
  }
}

function setupWhatsappLinks() {
  document.querySelectorAll("[data-general-whatsapp]").forEach((link) => {
    link.href = generalWhatsappUrl();
  });
}

setupHeader();
renderProducts();
setupWhatsappLinks();
