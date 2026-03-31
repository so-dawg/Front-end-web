function Filter({ onFilterChange, selectedCategory, selectedBrand, priceRange }) {
  const categories = ["all", "laptop"];
  const brands = ["all", "Dell", "Apple", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Razer", "Samsung", "LG"];

  return (
    <div className="filter-card">
      <div className="grid-filter">
        <div>
          <label className="filter-label">Category</label>
          <select value={selectedCategory} onChange={(e) => onFilterChange("category", e.target.value)} className="input">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="filter-label">Brand</label>
          <select value={selectedBrand} onChange={(e) => onFilterChange("brand", e.target.value)} className="input">
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="filter-label">Price Range</label>
          <select value={priceRange} onChange={(e) => onFilterChange("price", e.target.value)} className="input">
            <option value="all">All Prices</option>
            <option value="under500">Under $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-1500">$1000 - $1500</option>
            <option value="over1500">Over $1500</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
