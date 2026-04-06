import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Update search query when URL changes
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    if (type === "category") setSelectedCategory(value);
    if (type === "brand") setSelectedBrand(value);
    if (type === "price") setPriceRange(value);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.specs.processor.toLowerCase().includes(query) ||
          product.specs.ram.toLowerCase().includes(query) ||
          product.specs.display.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

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
  }, [searchQuery, selectedCategory, selectedBrand, priceRange]);

  return (
    <div className="shop-section">
      <div className="container-custom">
        <h1 className="page-title">Shop Laptops</h1>
        {searchQuery && (
          <div className="search-active mb-4 flex items-center gap-2">
            <span className="text-gray-600">Searching for:</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">"{searchQuery}"</span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSearchParams({});
              }}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              ✕ Clear
            </button>
          </div>
        )}
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
                setSearchQuery("");
                setSearchParams({});
              }}
              className="btn-primary mt-4"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
