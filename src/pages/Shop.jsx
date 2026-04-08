import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { hotDeals } from "../data/hotdeals";
import { trendingLaptops } from "../data/trending";
import ProductCard from "../components/ProductCard";
import DiscountProduct from "../components/DiscountProduct";
import TrendingProduct from "../components/TrendingProduct";
import Filter from "../components/Filter";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Update search query and category when URL changes
  useEffect(() => {
    const query = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    setSearchQuery(query);
    setSelectedCategory(category);
  }, [searchParams]);

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setSelectedCategory(value);
      if (value !== "all") {
        setSearchParams((prev) => {
          prev.set("category", value);
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.delete("category");
          return prev;
        });
      }
    }
    if (type === "brand") setSelectedBrand(value);
    if (type === "price") setPriceRange(value);
  };

  // Get products based on category
  const getCategoryProducts = () => {
    if (selectedCategory === "hotdeals") return hotDeals;
    if (selectedCategory === "trending") return trendingLaptops;
    return products;
  };

  const categoryProducts = getCategoryProducts();

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
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

      if (selectedBrand !== "all" && product.brand !== selectedBrand)
        return false;
      if (priceRange !== "all") {
        const productPrice = product.discountPrice || product.price;
        if (priceRange === "under500" && productPrice >= 500) return false;
        if (
          priceRange === "500-1000" &&
          (productPrice < 500 || productPrice >= 1000)
        )
          return false;
        if (
          priceRange === "1000-1500" &&
          (productPrice < 1000 || productPrice >= 1500)
        )
          return false;
        if (priceRange === "over1500" && productPrice < 1500) return false;
      }
      return true;
    });
  }, [searchQuery, selectedBrand, priceRange, categoryProducts]);

  const getPageTitle = () => {
    if (selectedCategory === "hotdeals") return "Hot Deals";
    if (selectedCategory === "trending") return "Trending Laptops";
    return "Shop Laptops";
  };

  const renderProductCard = (product) => {
    if (selectedCategory === "hotdeals") {
      return <DiscountProduct key={product.id} product={product} />;
    }
    if (selectedCategory === "trending") {
      return <TrendingProduct key={product.id} product={product} />;
    }
    return <ProductCard key={product.id} product={product} />;
  };

  return (
    <div className={`shop-section ${selectedCategory === "hotdeals" ? "discount-section" : ""} ${selectedCategory === "trending" ? "trending-section" : ""}`}>
      <div className="container-custom">
        <h1 className={`page-title ${selectedCategory === "hotdeals" ? "text-red-600" : ""} ${selectedCategory === "trending" ? "text-blue-600" : ""}`}>{getPageTitle()}</h1>
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
          Showing {filteredProducts.length} of {categoryProducts.length} laptops
        </p>

        <Filter
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          priceRange={priceRange}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid-products">
            {filteredProducts.map((product) => renderProductCard(product))}
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
