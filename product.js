const slug = window.KILLY_PRODUCT_SLUG;
const product = window.KILLY_PRODUCTS.find(item => item.slug === slug) || window.KILLY_PRODUCTS[0];
const rel = (path) => '../../' + path;
let currentIndex = 0;

function setMain(index) {
  currentIndex = index;
  const mainImage = document.getElementById('mainImage');
  mainImage.src = rel(product.images[index]);
  mainImage.alt = `${product.name} image ${index + 1}`;
  document.getElementById('imageCounter').textContent = `${index + 1} / ${product.images.length}`;
  document.querySelectorAll('.thumb').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
}

function nextImage(direction) {
  const next = (currentIndex + direction + product.images.length) % product.images.length;
  setMain(next);
}

function render() {
  document.title = `${product.name} | KILLY6`;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productColor').textContent = product.color;
  document.getElementById('productCategory').textContent = product.category;
  document.getElementById('productPrice').textContent = product.price;
  document.getElementById('stockNote').textContent = product.stockNote;
  document.getElementById('sizes').innerHTML = product.sizes.map(size => `<span class="size">${size}</span>`).join('');
  document.getElementById('buyBtn').href = window.killyWhatsappLink(product, 'I am on the product page.');
  document.getElementById('navBuy').href = window.killyWhatsappLink(product, 'I am on the product page.');
  document.getElementById('thumbs').innerHTML = product.images.map((image, index) => `
    <button class="thumb ${index === 0 ? 'active' : ''}" onclick="setMain(${index})" aria-label="Show image ${index + 1}">
      <img src="${rel(image)}" alt="${product.name} thumbnail ${index + 1}">
    </button>`).join('');
  setMain(0);
}

render();
