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

const trendingLaptopsBase = [
  {
    id: 301,
    name: "MacBook Pro 14 M2 Pro",
    category: "trending",
    price: 1999.99,
    brand: "Apple",
    specs: {
      processor: "Apple M2 Pro",
      ram: "16GB Unified",
      storage: "512GB SSD",
      display: '14.2" Liquid Retina XDR',
      graphics: "Integrated 19-core GPU",
    },
    inStock: true,
    rating: 4.9,
  },
  {
    id: 302,
    name: "Dell XPS 15 9520",
    category: "trending",
    price: 1299.99,
    brand: "Dell",
    specs: {
      processor: "Intel Core i7-12700H",
      ram: "16GB DDR5",
      storage: "512GB SSD",
      display: '15.6" FHD+',
      graphics: "NVIDIA GeForce RTX 3050",
    },
    inStock: true,
    rating: 4.7,
  },
  {
    id: 303,
    name: "ASUS ROG Zephyrus G14",
    category: "trending",
    price: 1649.99,
    brand: "ASUS",
    specs: {
      processor: "AMD Ryzen 9 6900HS",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      display: '14" QHD 120Hz',
      graphics: "NVIDIA GeForce RTX 3060",
    },
    inStock: true,
    rating: 4.8,
  },
  {
    id: 304,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "trending",
    price: 1549.99,
    brand: "Lenovo",
    specs: {
      processor: "Intel Core i7-1260P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: '14" WUXGA',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.7,
  },
  {
    id: 305,
    name: "HP Spectre x360 16",
    category: "trending",
    price: 1549.99,
    brand: "HP",
    specs: {
      processor: "Intel Core i7-12700H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      display: '16" 3K+ OLED Touch',
      graphics: "Intel Arc Graphics",
    },
    inStock: true,
    rating: 4.6,
  },
  {
    id: 306,
    name: "Razer Blade 15 Advanced",
    category: "trending",
    price: 2499.99,
    brand: "Razer",
    specs: {
      processor: "Intel Core i7-12800H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      display: '15.6" QHD 240Hz',
      graphics: "NVIDIA GeForce RTX 3070 Ti",
    },
    inStock: true,
    rating: 4.6,
  },
  {
    id: 307,
    name: "Lenovo Legion 5 Pro",
    category: "trending",
    price: 1399.99,
    brand: "Lenovo",
    specs: {
      processor: "AMD Ryzen 7 5800H",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: '16" WQXGA 165Hz',
      graphics: "NVIDIA GeForce RTX 3070",
    },
    inStock: true,
    rating: 4.7,
  },
  {
    id: 308,
    name: "Samsung Galaxy Book3 Pro",
    category: "trending",
    price: 1449.99,
    brand: "Samsung",
    specs: {
      processor: "Intel Core i7-1360P",
      ram: "16GB LPDDR5",
      storage: "512GB SSD",
      display: '14" AMOLED 2X',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.6,
  },
  {
    id: 309,
    name: "MSI Creator Z16",
    category: "trending",
    price: 2199.99,
    brand: "MSI",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "2TB SSD",
      display: '16" QHD+ Touch',
      graphics: "NVIDIA GeForce RTX 3060",
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: 310,
    name: "LG Gram 17",
    category: "trending",
    price: 1399.99,
    brand: "LG",
    specs: {
      processor: "Intel Core i7-1260P",
      ram: "16GB LPDDR5",
      storage: "1TB SSD",
      display: '17" WQXGA IPS',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: 311,
    name: "HP Omen 16",
    category: "trending",
    price: 1549.99,
    brand: "HP",
    specs: {
      processor: "Intel Core i7-12700H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      display: '16.1" QHD 165Hz',
      graphics: "NVIDIA GeForce RTX 3060",
    },
    inStock: true,
    rating: 4.6,
  },
  {
    id: 312,
    name: "ASUS ZenBook 14 OLED",
    category: "trending",
    price: 899.99,
    brand: "ASUS",
    specs: {
      processor: "AMD Ryzen 7 5800H",
      ram: "16GB LPDDR4x",
      storage: "512GB SSD",
      display: '14" FHD OLED',
      graphics: "AMD Radeon Graphics",
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: 313,
    name: "Acer Swift 5",
    category: "trending",
    price: 1049.99,
    brand: "Acer",
    specs: {
      processor: "Intel Core i7-1165G7",
      ram: "16GB LPDDR4x",
      storage: "1TB SSD",
      display: '14" FHD IPS Touch',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.4,
  },
  {
    id: 314,
    name: "Microsoft Surface Laptop 5",
    category: "trending",
    price: 1299.99,
    brand: "Microsoft",
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB LPDDR5x",
      storage: "512GB SSD",
      display: '13.5" PixelSense Touch',
      graphics: "Intel Iris Xe",
    },
    inStock: true,
    rating: 4.5,
  },
  {
    id: 315,
    name: "Alienware m15 R7",
    category: "trending",
    price: 2199.99,
    brand: "Alienware",
    specs: {
      processor: "AMD Ryzen 9 6900HX",
      ram: "32GB DDR5",
      storage: "1TB SSD",
      display: '15.6" QHD 240Hz',
      graphics: "NVIDIA GeForce RTX 3080",
    },
    inStock: true,
    rating: 4.7,
  },
];

export const trendingLaptops = trendingLaptopsBase.map((product, index) => ({
  ...product,
  picture: pickProductPicture(product, index),
}));
