const productImageModules = import.meta.glob("../Assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const tokenize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const assetEntries = Object.entries(productImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => {
    const filename = path.split("/").pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, "") || "";
    return { image, tokens: tokenize(filename) };
  });

export function pickProductPicture(product, index) {
  if (assetEntries.length === 0) return undefined;

  const productTokens = new Set(tokenize(`${product.brand} ${product.name}`));
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
}

export const withPictures = (items) =>
  items.map((product, index) => ({
    ...product,
    picture: pickProductPicture(product, index),
  }));
