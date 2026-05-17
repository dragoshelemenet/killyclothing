
(function () {
  const RIBZ_URL = "https://www.instagram.com/ribzmakesmusic/";
  const ICONS8_INSTAGRAM = "https://img.icons8.com/ios-filled/50/instagram-new.png";

  function first(selectors, root = document) {
    for (const selector of selectors) {
      const el = root.querySelector(selector);
      if (el) return el;
    }
    return null;
  }

  function getProductsSection() {
    return first([
      "#products",
      "#shop",
      ".products-section",
      ".product-section",
      ".products",
      "[data-section='products']",
      "[data-section='shop']"
    ]);
  }

  function getGallerySection() {
    return first([
      "#gallery",
      "#lookbook",
      ".gallery-section",
      ".gallery",
      ".lookbook-section",
      ".lookbook",
      "[data-section='gallery']",
      "[data-section='lookbook']"
    ]);
  }

  function moveGalleryBelowProducts() {
    const products = getProductsSection();
    const gallery = getGallerySection();

    if (!products || !gallery || products === gallery) return;

    const productsComesBeforeGallery =
      !!(products.compareDocumentPosition(gallery) & Node.DOCUMENT_POSITION_FOLLOWING);

    if (!productsComesBeforeGallery) {
      products.insertAdjacentElement("afterend", gallery);
    }
  }

  function findScrollableTrack(carousel) {
    const direct = first([
      ".carousel-track",
      ".slider-track",
      ".gallery-track",
      ".lookbook-track",
      ".slides",
      ".items",
      ".cards",
      ".track"
    ], carousel);

    if (direct) return direct;

    const candidates = [carousel, ...carousel.querySelectorAll("*")];
    return candidates.find((el) => el.scrollWidth > el.clientWidth + 30) || carousel;
  }

  function addCarouselArrows() {
    const gallery = getGallerySection();
    const targets = [];

    document.querySelectorAll(".carousel, .gallery-carousel, .slider, .lookbook-carousel, [data-carousel]").forEach(el => {
      targets.push(el);
    });

    if (gallery) targets.push(gallery);

    const uniqueTargets = [...new Set(targets)].filter(Boolean);

    uniqueTargets.forEach((carousel) => {
      if (carousel.dataset.k6Arrows === "true") return;

      const track = findScrollableTrack(carousel);
      if (!track) return;

      carousel.classList.add("k6-carousel-shell");
      track.classList.add("k6-carousel-track");

      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "k6-carousel-arrow prev";
      prev.setAttribute("aria-label", "Previous image");
      prev.textContent = "<";

      const next = document.createElement("button");
      next.type = "button";
      next.className = "k6-carousel-arrow next";
      next.setAttribute("aria-label", "Next image");
      next.textContent = ">";

      const scrollAmount = () => Math.max(280, Math.floor(track.clientWidth * 0.82));

      prev.addEventListener("click", () => {
        track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
      });

      next.addEventListener("click", () => {
        track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
      });

      carousel.appendChild(prev);
      carousel.appendChild(next);
      carousel.dataset.k6Arrows = "true";
    });
  }

  function updateFounderLinks() {
    const founder = first([
      "#founder",
      "#ribz",
      ".founder",
      ".founder-section",
      ".ribz-section",
      "[data-section='founder']",
      "[data-section='ribz']"
    ]) || document.body;

    const possibleRibzElements = [...founder.querySelectorAll("h1,h2,h3,h4,p,span,strong,b,a,button,div")]
      .filter((el) => /\bRIBZ\b/i.test(el.textContent || ""));

    possibleRibzElements.forEach((el) => {
      if (el.closest("a")) return;
      el.classList.add("k6-ribz-clickable");
      el.setAttribute("title", "Open RIBZ Instagram");
      el.addEventListener("click", () => {
        window.open(RIBZ_URL, "_blank", "noopener,noreferrer");
      });
    });

    const founderContainer = first([
      "#founder",
      "#ribz",
      ".founder",
      ".founder-section",
      ".ribz-section",
      "[data-section='founder']",
      "[data-section='ribz']"
    ]);

    if (founderContainer && !founderContainer.querySelector(".k6-founder-social")) {
      const social = document.createElement("div");
      social.className = "k6-founder-social";
      social.innerHTML = `
        <a href="${RIBZ_URL}" target="_blank" rel="noopener noreferrer" aria-label="RIBZ Instagram">
          <img src="${ICONS8_INSTAGRAM}" alt="Instagram icon from Icons8">
          RIBZ Instagram
        </a>
      `;
      founderContainer.appendChild(social);
    }
  }

  function run() {
    moveGalleryBelowProducts();
    addCarouselArrows();
    updateFounderLinks();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  window.addEventListener("load", run);
})();
