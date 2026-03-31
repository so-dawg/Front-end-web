import { useState, useMemo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleFilterChange = (type, value) => {
    if (type === "category") setSelectedCategory(value);
    if (type === "brand") setSelectedBrand(value);
    if (type === "price") setPriceRange(value);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory)
        return false;
      if (selectedBrand !== "all" && product.brand !== selectedBrand)
        return false;
      if (priceRange !== "all") {
        if (priceRange === "under500" && product.price >= 500) return false;
        if (
          priceRange === "500-1000" &&
          (product.price < 500 || product.price >= 1000)
        )
          return false;
        if (
          priceRange === "1000-1500" &&
          (product.price < 1000 || product.price >= 1500)
        )
          return false;
        if (priceRange === "over1500" && product.price < 1500) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, priceRange]);

  return (
    <div className="shop-section">
      <div className="container-custom">
        <h1 className="page-title">Shop Laptops</h1>
        <p className="page-subtitle">
          Showing {filteredProducts.length} of {products.length} laptops
        </p>

        <Filter
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid-products">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="shop-empty">
            <p className="shop-empty-text">
              No products found matching your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedBrand("all");
                setPriceRange("all");
              }}
              className="btn-primary mt-4"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
