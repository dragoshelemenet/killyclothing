const products = window.KILLY_PRODUCTS;
const $ = (selector) => document.querySelector(selector);
const hero = products[0];

function productUrl(product) {
  return `products/${product.slug}/`;
}

function productCard(product) {
  return `
    <article class="card">
      <a class="card-img" href="${productUrl(product)}" aria-label="Open ${product.name}">
        <img src="${product.images[0]}" alt="${product.name} ${product.color}">
        <span class="photo-count">${product.images.length} photo${product.images.length === 1 ? '' : 's'}</span>
      </a>
      <div class="card-body">
        <div class="meta"><span class="pill">${product.category}</span><span class="price">${product.price}</span></div>
        <h3>${product.name}</h3>
        <p class="card-text">${product.color}</p>
        <div class="sizes">${product.sizes.map(size => `<span class="size">${size}</span>`).join('')}</div>
        <div class="card-actions">
          <a class="btn" href="${productUrl(product)}">View gallery</a>
          <a class="btn black" target="_blank" rel="noreferrer" href="${window.killyWhatsappLink(product, 'I came from the product card.')}">Buy now</a>
        </div>
      </div>
    </article>`;
}

function carouselSlide(product, image, index) {
  return `
    <a class="slide ${index === 0 ? 'wide' : ''}" href="${productUrl(product)}">
      <img src="${image}" alt="${product.name}">
      <div class="slide-caption"><span>${product.name}</span><b>${product.images.length} photos</b></div>
    </a>`;
}

const carouselImages = products.flatMap(product => product.images.slice(0, product.slug === 'killy-long-hooded-coat' ? 8 : 3).map(image => ({ product, image })));

$('#heroImage').src = hero.images[0];
$('#heroTitle').textContent = hero.name;
$('#heroMeta').textContent = `${hero.price} · ${hero.sizes.join(', ')}`;
$('#heroView').href = productUrl(hero);
$('#heroBuy').href = window.killyWhatsappLink(hero, 'I came from the homepage feature.');
$('#carousel').innerHTML = carouselImages.map((item, index) => carouselSlide(item.product, item.image, index)).join('');
$('#productGrid').innerHTML = products.map(productCard).join('');

if (document.getElementById('heroTitleSmall')) document.getElementById('heroTitleSmall').textContent = hero.name;
if (document.getElementById('heroViewImage')) document.getElementById('heroViewImage').href = productUrl(hero);


// K6 CAROUSEL ARROWS START
const carouselEl = document.getElementById('carousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (carouselEl && carouselPrev && carouselNext) {
  const scrollGallery = (direction) => {
    const amount = Math.max(280, Math.floor(carouselEl.clientWidth * 0.82));
    carouselEl.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  carouselPrev.addEventListener('click', () => scrollGallery(-1));
  carouselNext.addEventListener('click', () => scrollGallery(1));
}
// K6 CAROUSEL ARROWS END
