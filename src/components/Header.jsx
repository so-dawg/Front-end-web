import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import styles from "../style/Header.module.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showSignInDropdown, setShowSignInDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const signInRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

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
      if (signInRef.current && !signInRef.current.contains(e.target)) {
        setShowSignInDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
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
          <Link to="/" className={styles.headerLogo}>LazyStore</Link>

          {/* Desktop Search Bar */}
          <div className={styles.searchContainer} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <button type="submit" className={styles.searchButton}><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button>
              <input
                type="text"
                placeholder="Search"
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

          {/* Right side: Desktop Menu + Mobile Icons */}
          <div className={styles.rightSection}>
            {/* Desktop Navigation Menu - Hidden on mobile */}
            <ul className={styles.desktopMenu}>
              <li><Link to="/" className={styles.headerLink}>Home</Link></li>
              <li><Link to="/shop" className={styles.headerLink}>Product</Link></li>
              <li><Link to="/contact-us" className={styles.headerLink}>Contact</Link></li>
              <li className={styles.signInWrapper} ref={signInRef}>
                <div
                  className={styles.signInToggle}
                  onClick={() => setShowSignInDropdown(!showSignInDropdown)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3F3F46"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm146.5-204.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm100-95.5q47-15.5 86-44.5-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160q53 0 100-15.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17Zm-43-43Zm0 360Z" /></svg>
                  <span>Sign In</span>
                  <svg className={styles.dropdownArrow} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#3F3F46"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></svg>
                </div>
                {showSignInDropdown && (
                  <div className={styles.signInDropdown}>
                    <div className={styles.signInDropdownContent}>
                      <p className={styles.signInDropdownTitle}>Welcome!</p>
                      <p className={styles.signInDropdownSubtitle}>Sign in to access your account</p>
                      <div className={styles.signInDropdownButtons}>
                        <button
                          className={styles.signInDropdownButton}
                          onClick={() => {
                            navigate("/sign-in");
                            setShowSignInDropdown(false);
                          }}
                        >
                          Sign In
                        </button>
                        <button
                          className={styles.signUpDropdownButton}
                          onClick={() => {
                            navigate("/create-account");
                            setShowSignInDropdown(false);
                          }}
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>

            {/* Mobile Icons (Hamburger + Cart) */}
            <div className={styles.mobileIcons}>
              {/* Mobile Menu Toggle Button */}
              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3F3F46">
                  {isMobileMenuOpen ? (
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  ) : (
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                  )}
                </svg>
              </button>

              <Link to="/cart" className={styles.cartLink}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3F3F46"><path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" /></svg>
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </Link>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`} ref={mobileMenuRef}>
            <ul className={styles.mobileMenuList}>
              <li><Link to="/" className={styles.headerLink} onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/shop" className={styles.headerLink} onClick={() => setIsMobileMenuOpen(false)}>Product</Link></li>
              <li><Link to="/contact-us" className={styles.headerLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
            </ul>

            {/* Mobile-only Sign In Section */}
            <div className={styles.mobileSignIn}>
              <div className={styles.mobileSignInContent}>
                <Link
                  to="/sign-in"
                  className={styles.mobileSignInButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/create-account"
                  className={styles.mobileSignUpButton}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
