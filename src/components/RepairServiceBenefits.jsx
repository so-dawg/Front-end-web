import React from "react";
import "../style/RepairServiceBenefits.css";

const RepairServiceBenefits = () => {
  const features = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#E8F5E9" />
          <path
            d="M15 24.5L21 30.5L33 18.5"
            stroke="#2E7D32"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Certified Technicians",
      description:
        "A certified technician will diagnose and repair your product.",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M14 34L24 14L34 34"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 28H30"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M10 38H38"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="18" cy="10" r="4" stroke="#191C1F" strokeWidth="2" />
          <path
            d="M30 6L34 10L30 14"
            stroke="#191C1F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Guaranteed Repairs",
      description:
        "Our certified technicians deliver authorized repair services you can trust.",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 4L8 14V24C8 34 15 42 24 44C33 42 40 34 40 24V14L24 4Z"
            fill="#E8F5E9"
            stroke="#2E7D32"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M17 24L22 29L31 20"
            stroke="#2E7D32"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "2-years Warranty",
      description: "Experience more confidence with a 2-years repair warranty.",
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle
            cx="24"
            cy="24"
            r="8"
            stroke="#191C1F"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="24" cy="24" r="3" fill="#191C1F" />
          <path
            d="M24 10V16"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M24 32V38"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M10 24H16"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M32 24H38"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M14.1 14.1L18.3 18.3"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M29.7 29.7L33.9 33.9"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M14.1 33.9L18.3 29.7"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M29.7 18.3L33.9 14.1"
            stroke="#191C1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Genuine Parts",
      description:
        "Your product will be repaired using original manufacturer parts.",
    },
  ];

  return (
    <section className="repair-benefits">
      <div className="repair-benefits__container">
        <h2 className="repair-benefits__title">
          Benefits of Pro Repair Service
        </h2>

        <div className="repair-benefits__grid">
          {/* Left: 2x2 feature cards */}
          <div className="repair-benefits__cards">
            {features.map((feature, index) => (
              <div className="repair-benefits__card" key={index}>
                <div className="repair-benefits__card-icon">{feature.icon}</div>
                <h3 className="repair-benefits__card-title">{feature.title}</h3>
                <p className="repair-benefits__card-desc">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: tall banner */}
          <div className="repair-benefits__banner">
            <div className="repair-benefits__banner-overlay"></div>
            <div className="repair-benefits__banner-content">
              <svg
                className="repair-benefits__banner-icon"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M16 52L32 16L48 52"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 42H42"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M8 58H56"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="24"
                  cy="10"
                  r="5"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <path
                  d="M40 5L46 10L40 15"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="repair-benefits__banner-title">
                Request a Repair
              </h3>
              <p className="repair-benefits__banner-desc">
                Sign into your LazyStore account to book a repair and enjoy
                fast, reliable service from our certified technicians.
              </p>
              <button className="repair-benefits__banner-btn">
                Let&apos;s start
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairServiceBenefits;
