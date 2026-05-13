function setupHeader() {
  const button = document.querySelector("[data-menu-button]");
  const panel = document.querySelector("[data-mobile-panel]");
  if (!button || !panel) return;
  button.addEventListener("click", () => {
    panel.classList.toggle("open");
    button.textContent = panel.classList.contains("open") ? "×" : "☰";
  });
}

function renderProductPage() {
  const root = document.querySelector("[data-product-page]");
  if (!root) return;

  const slug = root.dataset.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    root.innerHTML = `
      <div class="not-found">
        <div>
          <p class="kicker">Not found</p>
          <h1 class="section-title">Product missing</h1>
          <p class="hero-copy">Go back to the shop and choose another item.</p>
          <div class="hero-actions"><a class="btn dark" href="/">Back home</a></div>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${product.name} ${product.color} | KILLY Clothing`;

  root.innerHTML = `
    <a class="breadcrumb" href="/">← Back to shop</a>
    <section class="product-detail">
      <div class="gallery">
        <div class="main-image">
          <img data-main-image src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="thumbs">
          ${product.images.map((src, index) => `
            <button class="thumb ${index === 0 ? "active" : ""}" data-thumb="${src}" aria-label="View product image ${index + 1}">
              <img src="${src}" alt="${product.name} image ${index + 1}">
            </button>
          `).join("")}
        </div>
      </div>

      <aside class="detail-panel">
        <p class="kicker">${product.category}</p>
        <h1 class="detail-title">${product.name}</h1>
        <div class="detail-meta">
          <span class="pill product-tag">${product.color}</span>
          <span class="pill">${product.category}</span>
        </div>
        <div class="detail-price">${product.price}</div>
        <p class="detail-copy">${product.description}</p>

        <div class="detail-actions">
          <a class="btn dark" href="${whatsappUrl(product)}" target="_blank" rel="noreferrer">Purchase on WhatsApp ☏</a>
          <a class="btn" href="/">View all products</a>
        </div>

        <div class="upload-note">
          To add more photos for this item, upload them to:<br>
          <strong>/assets/products/${product.slug}/</strong><br>
          Then add the file path to this product's <strong>images</strong> list inside <strong>data.js</strong>.
        </div>
      </aside>
    </section>
  `;

  const mainImage = root.querySelector("[data-main-image]");
  root.querySelectorAll("[data-thumb]").forEach((button) => {
    button.addEventListener("click", () => {
      root.querySelectorAll("[data-thumb]").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      mainImage.src = button.dataset.thumb;
    });
  });
}

function setupWhatsappLinks() {
  document.querySelectorAll("[data-general-whatsapp]").forEach((link) => {
    link.href = generalWhatsappUrl();
  });
}

setupHeader();
renderProductPage();
setupWhatsappLinks();
