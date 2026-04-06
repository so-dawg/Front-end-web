import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "Gaming Laptops", path: "/shop?category=gaming" },
    { name: "Business Laptops", path: "/shop?category=business" },
    { name: "Ultrabooks", path: "/shop?category=ultrabook" },
    { name: "Budget Laptops", path: "/shop?category=budget" },
    { name: "Workstations", path: "/shop?category=workstation" },
    { name: "2-in-1 Convertibles", path: "/shop?category=convertible" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to shop with search query
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      {/* Top Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementContent}>
          <span className={styles.announcementText}>
            Free shipping on orders over $999 | Use code{" "}
            <strong>TECH2026</strong> for 10% off
          </span>
          <button
            className={styles.announcementClose}
            aria-label="Close announcement"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.headerContainer}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.logoIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <line x1="2" y1="20" x2="22" y2="20" strokeLinecap="round" />
              <line x1="8" y1="16" x2="16" y2="16" strokeLinecap="round" />
            </svg>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>LaptopStore</span>
              <span className={styles.logoTagline}>Premium Tech Deals</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div
            className={`${styles.searchContainer} ${searchOpen ? styles.searchOpen : ""}`}
          >
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search laptops, brands, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                onFocus={() => setSearchOpen(true)}
              />
              <button
                type="submit"
                className={styles.searchButton}
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <button
              className={`${styles.actionButton} ${styles.searchToggleBtn}`}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              to="/account"
              className={styles.actionButton}
              aria-label="Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.actionLabel}>Account</span>
            </Link>

            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <div className={styles.navContainer}>
          <ul className={styles.navMenu}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>

            <li
              className={styles.navItem}
              onMouseEnter={() => setActiveDropdown("categories")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`${styles.navLink} ${styles.hasDropdown}`}>
                Shop
                <span className={styles.dropdownArrow}>▼</span>
              </button>

              {activeDropdown === "categories" && (
                <div className={styles.megaMenu}>
                  <div className={styles.megaMenuGrid}>
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        className={styles.megaMenuItem}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className={styles.megaMenuName}>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.megaMenuFooter}>
                    <Link to="/shop" className={styles.megaMenuLink}>
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li className={styles.navItem}>
              <Link to="/shop?deals=true" className={styles.navLink}>
                Deals
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/support" className={styles.navLink}>
                Support
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/about" className={styles.navLink}>
                About Us
              </Link>
            </li>
          </ul>

          <div className={styles.navRight}></div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileSearch}>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.mobileSearchInput}
              />
              <button type="submit" className={styles.mobileSearchButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>

          <ul className={styles.mobileNavMenu}>
            <li>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                Shop All
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link to={cat.path} onClick={() => setMobileMenuOpen(false)}>
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/shop?deals=true"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </Link>
            </li>
            <li>
              <Link to="/support" onClick={() => setMobileMenuOpen(false)}>
                Support
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </Link>
            </li>
          </ul>

          <div className={styles.mobileMenuFooter}>
            <Link to="/account" className={styles.mobileFooterLink}>
              My Account
            </Link>
            <Link to="/orders" className={styles.mobileFooterLink}>
              Track Order
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
