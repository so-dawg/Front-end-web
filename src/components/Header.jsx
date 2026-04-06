import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { products } from "../data/products";
import styles from "./Header.module.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.processor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
    setHighlightedIndex(-1);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowDropdown(true);
    }
  };

  const handleSelectProduct = (product) => {
    navigate(`/product/${product.id}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
    } else {
      navigate("/shop");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectProduct(filteredProducts[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.headerLogo}>💻 LaptopStore</Link>
          <ul className={styles.headerMenu}>
            <li><Link to="/" className={styles.headerLink}>Home</Link></li>
            <li><Link to="/shop" className={styles.headerLink}>Shop Laptops</Link></li>
          </ul>
          <div className={styles.searchContainer} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <button type="submit" className={styles.searchButton}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button>
              <input
                type="text"
                placeholder="Search laptops..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleKeyDown}
                className={styles.searchInput}
              />
            </form>
            {showDropdown && filteredProducts.length > 0 && (
              <div className={styles.searchDropdown}>
                <div className={styles.dropdownHeader}>
                  <span>{filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} found</span>
                  <button
                    onClick={() => {
                      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                      setShowDropdown(false);
                    }}
                    className={styles.seeAllButton}
                  >
                    See all →
                  </button>
                </div>
                <ul className={styles.dropdownList}>
                  {filteredProducts.slice(0, 6).map((product, index) => (
                    <li
                      key={product.id}
                      className={`${styles.dropdownItem} ${index === highlightedIndex ? styles.dropdownItemHighlighted : ""
                        }`}
                      onClick={() => handleSelectProduct(product)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className={styles.dropdownItemName}>{product.name}</div>
                      <div className={styles.dropdownItemInfo}>
                        <span className={styles.dropdownItemBrand}>{product.brand}</span>
                        <span className={styles.dropdownItemPrice}>${product.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showDropdown && searchQuery.trim() && filteredProducts.length === 0 && (
              <div className={styles.searchDropdown}>
                <div className={styles.noResults}>
                  <p>No products found for "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                      setShowDropdown(false);
                    }}
                    className={styles.seeAllButton}
                  >
                    Search anyway →
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link to="/shop" className={styles.headerLink}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3F3F46"><path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg></Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
