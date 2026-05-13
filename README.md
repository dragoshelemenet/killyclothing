# KILLY static clothing website

## Run in GitHub Codespaces

```bash
npm install
npm run dev
```

Open the forwarded Vite port.

## Folder structure

```txt
assets/
  logo/
    killy-logo.png
  products/
    just-kool-nah-summer-set/
    gfe-killy-workwear-red/
    gfe-killy-workwear-white/
    gfe-killy-workwear-black/
    just-kool-nah-slides/
    killy-essentials-pack/
products/
  just-kool-nah-summer-set/index.html
  gfe-killy-workwear-red/index.html
  gfe-killy-workwear-white/index.html
  gfe-killy-workwear-black/index.html
  just-kool-nah-slides/index.html
  killy-essentials-pack/index.html
```

## Add more images to an item

1. Upload the image into the item's folder, for example:

```txt
assets/products/gfe-killy-workwear-red/02.jpg
assets/products/gfe-killy-workwear-red/03.jpg
```

2. Open `data.js`.
3. Add the paths to the item's `images` array:

```js
images: [
  "/assets/products/gfe-killy-workwear-red/01.jpg",
  "/assets/products/gfe-killy-workwear-red/02.jpg",
  "/assets/products/gfe-killy-workwear-red/03.jpg"
]
```

The product slug page will automatically show the gallery thumbnails.

## Add a new product

1. Create a new folder:

```txt
assets/products/my-new-product/
products/my-new-product/index.html
```

2. Copy any existing product `index.html`, change `data-slug="..."` to the new slug.
3. Add the new product object inside `data.js`.
