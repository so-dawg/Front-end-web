import styles from "../style/Filter.module.css";

function Filter({ onFilterChange, selectedCategory, selectedBrand, priceRange }) {
  const categories = ["all", "laptop"];
  const brands = ["all", "Dell", "Apple", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Razer", "Samsung", "LG"];

  return (
    <div className={styles.filterCard}>
      <div className={styles.gridFilter}>
        <div>
          <label className={styles.filterLabel}>Category</label>
          <select value={selectedCategory} onChange={(e) => onFilterChange("category", e.target.value)} className={styles.input}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.filterLabel}>Brand</label>
          <select value={selectedBrand} onChange={(e) => onFilterChange("brand", e.target.value)} className={styles.input}>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.filterLabel}>Price Range</label>
          <select value={priceRange} onChange={(e) => onFilterChange("price", e.target.value)} className={styles.input}>
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
