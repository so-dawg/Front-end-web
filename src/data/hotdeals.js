const productImageModules = import.meta.glob("../Assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const assetEntries = Object.entries(productImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => {
    const filename = path.split("/").pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, "") || "";
    const tokens = filename
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return { image, tokens };
  });

const productTokenSet = (text) =>
  new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );

const pickProductPicture = (product, index) => {
  if (assetEntries.length === 0) return undefined;

  const productTokens = productTokenSet(`${product.brand} ${product.name}`);
  let bestMatch = null;
  let bestScore = -1;

  for (const asset of assetEntries) {
    let score = 0;
    for (const token of asset.tokens) {
      if (productTokens.has(token)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = asset;
    }
  }

  if (bestScore > 0 && bestMatch) return bestMatch.image;
  return assetEntries[index % assetEntries.length].image;
};

const hotDealsBase = [
  {
    id: 201,
    name: "Dell XPS 15 - Flash Sale",
    category: "hotdeals",
    price: 1099.99,
    originalPrice: 1499.99,
    discountPrice: 1099.99,
    brand: "Dell",
    specs: {
      processor: "Intel Core i7-12700H",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      display: '15.6" FHD+',
      graphics: "NVIDIA GeForce RTX 3050",
    },
    inStock: true,
    rating: 4.6,
    offerEnds: "Apr 15, 2026",
  },
  {
    id: 202,
    name: "HP Pavilion 15 - Limited Offer",
    category: "hotdeals",
    price: 499.99,
    originalPrice: 749.99,
    discountPrice: 499.99,
    brand: "HP",
    specs: {
      processor: "AMD Ryzen 5 5625U",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" FHD IPS',
      graphics: "AMD Radeon Graphics",
    },
    inStock: true,
    rating: 4.2,
    offerEnds: "Apr 20, 2026",
  },
  {
    id: 203,
    name: "Lenovo IdeaPad 5 Pro - Special Deal",
    category: "hotdeals",
    price: 699.99,
    originalPrice: 999.99,
    discountPrice: 699.99,
    brand: "Lenovo",
    specs: {
      processor: "AMD Ryzen 7 5800H",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: '16" 2.5K 120Hz',
      graphics: "NVIDIA GeForce RTX 3050",
    },
    inStock: true,
    rating: 4.5,
    offerEnds: "Apr 18, 2026",
  },
  {
    id: 204,
    name: "ASUS TUF Gaming A15 - Mega Sale",
    category: "hotdeals",
    price: 849.99,
    originalPrice: 1199.99,
    discountPrice: 849.99,
    brand: "ASUS",
    specs: {
      processor: "AMD Ryzen 7 6800H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      display: '15.6" FHD 144Hz',
      graphics: "NVIDIA GeForce RTX 3060",
    },
    inStock: true,
    rating: 4.6,
    offerEnds: "Apr 25, 2026",
  },
  {
    id: 205,
    name: "Acer Swift 3 - Clearance",
    category: "hotdeals",
    price: 499.99,
    originalPrice: 699.99,
    discountPrice: 499.99,
    brand: "Acer",
    specs: {
      processor: "AMD Ryzen 7 5700U",
      ram: "8GB LPDDR4x",
      storage: "512GB SSD",
      display: '14" FHD IPS',
      graphics: "AMD Radeon Graphics",
    },
    inStock: true,
    rating: 4.3,
    offerEnds: "Apr 22, 2026",
  },
  {
    id: 206,
    name: "MSI GF63 Thin - Hot Deal",
    category: "hotdeals",
    price: 649.99,
    originalPrice: 899.99,
    discountPrice: 649.99,
    brand: "MSI",
    specs: {
      processor: "Intel Core i5-11400H",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" FHD 144Hz',
      graphics: "NVIDIA GeForce GTX 1650",
    },
    inStock: true,
    rating: 4.1,
    offerEnds: "Apr 17, 2026",
  },
  {
    id: 207,
    name: "MacBook Air M2 - Exclusive Deal",
    category: "hotdeals",
    price: 999.99,
    originalPrice: 1199.99,
    discountPrice: 999.99,
    brand: "Apple",
    specs: {
      processor: "Apple M2",
      ram: "8GB Unified",
      storage: "256GB SSD",
      display: '13.6" Liquid Retina',
      graphics: "Integrated 8-core GPU",
    },
    inStock: true,
    rating: 4.8,
    offerEnds: "Apr 30, 2026",
  },
  {
    id: 208,
    name: "Samsung Galaxy Book3 - Discount",
    category: "hotdeals",
    price: 749.99,
    originalPrice: 999.99,
    discountPrice: 749.99,
    brand: "Samsung",
    specs: {
      processor: "Intel Core i5-1335U",
      ram: "8GB LPDDR4x",
      storage: "256GB SSD",
      display: '15.6" FHD AMOLED',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.3,
    offerEnds: "Apr 19, 2026",
  },
  {
    id: 209,
    name: "Lenovo ThinkPad E15 - Business Deal",
    category: "hotdeals",
    price: 599.99,
    originalPrice: 849.99,
    discountPrice: 599.99,
    brand: "Lenovo",
    specs: {
      processor: "Intel Core i5-1235U",
      ram: "16GB DDR4",
      storage: "256GB SSD",
      display: '15.6" FHD IPS',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.2,
    offerEnds: "Apr 28, 2026",
  },
  {
    id: 210,
    name: "ASUS VivoBook 15 - Budget Deal",
    category: "hotdeals",
    price: 449.99,
    originalPrice: 629.99,
    discountPrice: 449.99,
    brand: "ASUS",
    specs: {
      processor: "Intel Core i5-1135G7",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      display: '15.6" FHD',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.0,
    offerEnds: "Apr 21, 2026",
  },
  {
    id: 211,
    name: "HP Envy 13 - Premium Deal",
    category: "hotdeals",
    price: 799.99,
    originalPrice: 1099.99,
    discountPrice: 799.99,
    brand: "HP",
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB LPDDR4x",
      storage: "512GB SSD",
      display: '13.3" FHD Touch',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.5,
    offerEnds: "Apr 26, 2026",
  },
  {
    id: 212,
    name: "Dell Inspiron 16 - Value Deal",
    category: "hotdeals",
    price: 579.99,
    originalPrice: 799.99,
    discountPrice: 579.99,
    brand: "Dell",
    specs: {
      processor: "AMD Ryzen 5 5500U",
      ram: "8GB DDR4",
      storage: "256GB SSD",
      display: '16" FHD+',
      graphics: "AMD Radeon Graphics",
    },
    inStock: true,
    rating: 4.1,
    offerEnds: "Apr 23, 2026",
  },
];

export const hotDeals = hotDealsBase.map((product, index) => ({
  ...product,
  picture: pickProductPicture(product, index),
}));
