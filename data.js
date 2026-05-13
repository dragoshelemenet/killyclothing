const WHATSAPP_NUMBER = "447496349619";

const PRODUCTS = [
  {
    slug: "just-kool-nah-summer-set",
    name: "Just Kool Nah! Summer Set",
    category: "Sets",
    price: "£45",
    color: "White",
    short: "Graphic tee and shorts with the bright Just Kool Nah! artwork.",
    description: "A clean white summer set with loud island-style cartoon graphics on the tee and shorts. Easy to wear, still different.",
    images: [
      "/assets/products/just-kool-nah-summer-set/01.jpg"
    ]
  },
  {
    slug: "gfe-killy-workwear-red",
    name: "GFE Killy Workwear Set",
    category: "Sets",
    price: "£65",
    color: "Red",
    short: "Red button-up workwear set with large back print.",
    description: "A red short-sleeve shirt and trouser set with bold GFE Killy logo placements and a big statement back graphic.",
    images: [
      "/assets/products/gfe-killy-workwear-red/01.jpg"
    ]
  },
  {
    slug: "gfe-killy-workwear-white",
    name: "GFE Killy Workwear Set",
    category: "Sets",
    price: "£65",
    color: "White",
    short: "Clean white workwear set with black Killy logos.",
    description: "Minimal white utility-style shirt and trousers with sharp black Killy logo placements.",
    images: [
      "/assets/products/gfe-killy-workwear-white/01.jpg"
    ]
  },
  {
    slug: "gfe-killy-workwear-black",
    name: "GFE Killy Workwear Set",
    category: "Sets",
    price: "£65",
    color: "Black",
    short: "Black workwear set with white Killy logos.",
    description: "Black utility-style set with contrast white Killy branding. Clean, bold, and easy to style.",
    images: [
      "/assets/products/gfe-killy-workwear-black/01.jpg"
    ]
  },
  {
    slug: "just-kool-nah-slides",
    name: "Just Kool Nah! Slides",
    category: "Footwear",
    price: "£25",
    color: "Black",
    short: "Black slides with bright Just Kool Nah! artwork.",
    description: "Easy black slides finished with the colorful Just Kool Nah! graphic across the strap.",
    images: [
      "/assets/products/just-kool-nah-slides/01.jpg"
    ]
  },
  {
    slug: "killy-essentials-pack",
    name: "KILLY Essentials Pack",
    category: "Essentials",
    price: "From £30",
    color: "Black",
    short: "Hoodie, tee, joggers, cap and sneaker mockup pack.",
    description: "Core KILLY black essentials with distressed white branding across staple pieces.",
    images: [
      "/assets/products/killy-essentials-pack/01.png"
    ]
  }
];

function productUrl(slug) {
  return `/products/${slug}/`;
}

function whatsappUrl(product) {
  const text = `I want to buy ${product.name} (${product.color}) - ${product.price}. Please send me sizes and payment details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function generalWhatsappUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("I want to buy from KILLY. Please send me the available products and sizes.")}`;
}

function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug);
}
