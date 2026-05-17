(function () {
  const WHATSAPP_NUMBER = "447496349619";

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCurrentSlug() {
    const parts = location.pathname.split("/").filter(Boolean);
    const productsIndex = parts.indexOf("products");
    if (productsIndex !== -1 && parts[productsIndex + 1]) {
      return parts[productsIndex + 1];
    }

    const last = parts[parts.length - 1] || "";
    if (last && last !== "index.html") return last.replace(".html", "");

    const parent = parts[parts.length - 2] || "";
    return parent;
  }

  function normalizeImages(product) {
    const images = product.images || product.gallery || product.photos || product.image || [];
    return Array.isArray(images) ? images : [images];
  }

  function findProduct(products, slug) {
    return products.find((product) => {
      const possible = [
        product.slug,
        product.id,
        product.handle,
        product.url,
        product.name,
        product.title
      ].filter(Boolean).map(slugify);

      return possible.includes(slugify(slug));
    });
  }

  function imagePath(src) {
    if (!src) return "";
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/") || src.startsWith("../")) return src;
    return "../../" + src.replace(/^\.\//, "");
  }

  function whatsapp(product) {
    const name = product.name || product.title || "KILLY6 product";
    const sizes = Array.isArray(product.sizes) ? product.sizes.join(", ") : (product.sizes || "Please send available sizes");
    const message = `I want to buy ${name}. Available sizes: ${sizes}.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function renderProduct(product) {
    const name = product.name || product.title || "KILLY6 Product";
    const price = product.price || "Ask on WhatsApp";
    const color = product.color || product.colour || "";
    const category = product.category || "";
    const sizes = Array.isArray(product.sizes) ? product.sizes : String(product.sizes || "").split(",").map(s => s.trim()).filter(Boolean);
    const images = normalizeImages(product).filter(Boolean);
    const firstImage = imagePath(images[0] || "");

    document.title = name + " | KILLY6";

    const root = document.querySelector("main") || document.body;

    root.innerHTML = `
      <section class="k6-product-detail-fixed">
        <a class="k6-back-link" href="../../index.html#products">← Back to products</a>

        <div class="k6-product-detail-grid">
          <div class="k6-product-main-image">
            <img id="k6ProductMainImage" src="${firstImage}" alt="${name}">
            <div class="k6-photo-count">${images.length} photo${images.length === 1 ? "" : "s"}</div>
          </div>

          <div class="k6-product-info-fixed">
            <p class="k6-product-pill">${category || "KILLY6"}</p>
            <h1>${name}</h1>
            <p class="k6-product-meta">${[color, price].filter(Boolean).join(" · ")}</p>

            <div class="k6-size-row">
              ${sizes.length ? sizes.map(size => `<span>${size}</span>`).join("") : "<span>Ask sizes</span>"}
            </div>

            <p class="k6-product-note">
              Tap buy now to open WhatsApp with this exact product already written in the message.
            </p>

            <a class="k6-buy-fixed" href="${whatsapp(product)}" target="_blank" rel="noopener noreferrer">
              Buy now on WhatsApp
            </a>
          </div>
        </div>

        <div class="k6-product-gallery-fixed">
          <div class="k6-gallery-top">
            <h2>Product gallery</h2>
            <p>Only photos for this product are shown here.</p>
          </div>

          <div class="k6-thumb-grid">
            ${images.map((img, index) => `
              <button class="k6-thumb ${index === 0 ? "active" : ""}" type="button" data-img="${imagePath(img)}">
                <img src="${imagePath(img)}" alt="${name} photo ${index + 1}">
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    const mainImage = document.getElementById("k6ProductMainImage");
    document.querySelectorAll(".k6-thumb").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".k6-thumb").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        mainImage.src = button.dataset.img;
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function addCss() {
    if (document.getElementById("k6-product-gallery-fix-css")) return;

    const style = document.createElement("style");
    style.id = "k6-product-gallery-fix-css";
    style.textContent = `
      .k6-product-detail-fixed {
        width: min(1120px, calc(100% - 32px));
        margin: 34px auto 80px;
      }

      .k6-back-link {
        display: inline-flex;
        margin-bottom: 20px;
        color: #050505;
        font-weight: 1000;
        text-transform: uppercase;
        font-size: 12px;
        text-decoration: none;
      }

      .k6-product-detail-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
        gap: 26px;
        align-items: stretch;
      }

      .k6-product-main-image {
        position: relative;
        overflow: hidden;
        border: 3px solid #050505;
        border-radius: 28px;
        background: #f4f4f4;
        box-shadow: 8px 8px 0 #ff2d9a;
      }

      .k6-product-main-image img {
        width: 100%;
        height: 720px;
        object-fit: cover;
        display: block;
      }

      .k6-photo-count {
        position: absolute;
        top: 14px;
        left: 14px;
        border: 2px solid #050505;
        border-radius: 999px;
        padding: 7px 11px;
        background: #fff;
        font-size: 11px;
        font-weight: 1000;
        text-transform: uppercase;
      }

      .k6-product-info-fixed {
        border: 3px solid #050505;
        border-radius: 28px;
        padding: 28px;
        background: #fff;
        box-shadow: 8px 8px 0 #d7ff2f;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .k6-product-pill {
        width: max-content;
        margin: 0 0 14px;
        border-radius: 999px;
        background: #d7ff2f;
        color: #050505;
        padding: 8px 12px;
        font-size: 11px;
        font-weight: 1000;
        text-transform: uppercase;
      }

      .k6-product-info-fixed h1 {
        margin: 0;
        font-size: clamp(48px, 7vw, 96px);
        line-height: .82;
        letter-spacing: -.08em;
        text-transform: uppercase;
      }

      .k6-product-meta {
        margin: 20px 0;
        font-size: 18px;
        font-weight: 1000;
      }

      .k6-size-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 6px 0 22px;
      }

      .k6-size-row span {
        display: inline-flex;
        border: 2px solid #050505;
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: 1000;
        background: #fff;
      }

      .k6-product-note {
        max-width: 440px;
        margin: 0 0 24px;
        font-size: 14px;
        line-height: 1.45;
        font-weight: 800;
        color: rgba(0,0,0,.68);
      }

      .k6-buy-fixed {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: max-content;
        border-radius: 999px;
        padding: 16px 22px;
        background: #050505;
        color: #fff;
        text-decoration: none;
        font-size: 13px;
        font-weight: 1000;
        text-transform: uppercase;
        box-shadow: 5px 5px 0 #ff2d9a;
      }

      .k6-product-gallery-fixed {
        margin-top: 48px;
      }

      .k6-gallery-top {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: end;
        margin-bottom: 18px;
      }

      .k6-gallery-top h2 {
        margin: 0;
        font-size: clamp(34px, 5vw, 64px);
        line-height: .9;
        letter-spacing: -.07em;
        text-transform: uppercase;
      }

      .k6-gallery-top p {
        margin: 0;
        max-width: 280px;
        font-size: 12px;
        font-weight: 900;
        color: rgba(0,0,0,.58);
      }

      .k6-thumb-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 14px;
      }

      .k6-thumb {
        cursor: pointer;
        padding: 0;
        border: 2px solid #050505;
        border-radius: 18px;
        overflow: hidden;
        background: #fff;
        box-shadow: 4px 4px 0 #050505;
        transition: .15s ease;
      }

      .k6-thumb.active,
      .k6-thumb:hover {
        transform: translateY(-3px);
        box-shadow: 5px 5px 0 #ff2d9a;
      }

      .k6-thumb img {
        width: 100%;
        aspect-ratio: 1 / 1.2;
        object-fit: cover;
        display: block;
      }

      @media (max-width: 820px) {
        .k6-product-detail-grid {
          grid-template-columns: 1fr;
        }

        .k6-product-main-image img {
          height: auto;
          max-height: 680px;
        }

        .k6-gallery-top {
          align-items: start;
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function run() {
    const slug = getCurrentSlug();
    if (!slug || !location.pathname.includes("/products/")) return;

    const products = window.KILLY_PRODUCTS || window.products || window.PRODUCTS || [];
    if (!Array.isArray(products) || !products.length) return;

    const product = findProduct(products, slug);
    if (!product) return;

    addCss();
    renderProduct(product);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();