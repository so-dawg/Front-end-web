import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SubmitRepair.css";

function SubmitRepair() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    laptopBrand: "",
    laptopModel: "",
    serialNumber: "",
    issueType: "",
    issueDescription: "",
    preferredDate: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const issueTypes = [
    "Screen Damage",
    "Battery Issues",
    "Keyboard Problems",
    "Water Damage",
    "Software Issues",
    "Hardware Failure",
    "Charging Port",
    "Overheating",
    "Audio Problems",
    "Other",
  ];

  const laptopBrands = [
    "Apple",
    "Dell",
    "HP",
    "Lenovo",
    "ASUS",
    "Acer",
    "MSI",
    "Microsoft Surface",
    "Samsung",
    "Razer",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.laptopBrand) {
      newErrors.laptopBrand = "Please select a laptop brand";
    }

    if (!formData.laptopModel.trim()) {
      newErrors.laptopModel = "Laptop model is required";
    }

    if (!formData.issueType) {
      newErrors.issueType = "Please select an issue type";
    }

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = "Please describe the issue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Repair submission:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="submit-repair">
        <div className="submit-repair__success">
          <div className="submit-repair__success-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
            >
              <circle cx="40" cy="40" r="36" fill="#4CAF50" />
              <path
                d="M24 40L36 52L56 28"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="submit-repair__success-title">
            Repair Request Submitted!
          </h2>
          <p className="submit-repair__success-message">
            Thank you, {formData.fullName}! We've received your repair request
            for your {formData.laptopBrand} {formData.laptopModel}. Our team
            will contact you at {formData.email} within 24 hours.
          </p>
          <div className="submit-repair__success-actions">
            <button
              className="btn-primary-lg"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: "",
                  email: "",
                  phone: "",
                  laptopBrand: "",
                  laptopModel: "",
                  serialNumber: "",
                  issueType: "",
                  issueDescription: "",
                  preferredDate: "",
                  additionalNotes: "",
                });
              }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-repair">
      <div className="submit-repair__container">
        <div className="submit-repair__header">
          <h1 className="submit-repair__title">Submit Laptop for Repair</h1>
          <p className="submit-repair__subtitle">
            Fill out the form below and our certified technicians will get back
            to you within 24 hours.
          </p>
        </div>

        <form className="submit-repair__form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="submit-repair__section">
            <h2 className="submit-repair__section-title">
              Personal Information
            </h2>
            <div className="submit-repair__grid">
              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`submit-repair__input ${
                    errors.fullName ? "error" : ""
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="submit-repair__error">{errors.fullName}</p>
                )}
              </div>

              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`submit-repair__input ${
                    errors.email ? "error" : ""
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="submit-repair__error">{errors.email}</p>
                )}
              </div>

              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`submit-repair__input ${
                    errors.phone ? "error" : ""
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="submit-repair__error">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Laptop Information Section */}
          <div className="submit-repair__section">
            <h2 className="submit-repair__section-title">
              Laptop Information
            </h2>
            <div className="submit-repair__grid">
              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Laptop Brand <span className="required">*</span>
                </label>
                <select
                  name="laptopBrand"
                  value={formData.laptopBrand}
                  onChange={handleChange}
                  className={`submit-repair__select ${
                    errors.laptopBrand ? "error" : ""
                  }`}
                >
                  <option value="">Select a brand</option>
                  {laptopBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
                {errors.laptopBrand && (
                  <p className="submit-repair__error">{errors.laptopBrand}</p>
                )}
              </div>

              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Laptop Model <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="laptopModel"
                  value={formData.laptopModel}
                  onChange={handleChange}
                  className={`submit-repair__input ${
                    errors.laptopModel ? "error" : ""
                  }`}
                  placeholder="e.g., MacBook Pro 2023, XPS 15"
                />
                {errors.laptopModel && (
                  <p className="submit-repair__error">{errors.laptopModel}</p>
                )}
              </div>

              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Serial Number (Optional)
                </label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  className="submit-repair__input"
                  placeholder="e.g., ABC123XYZ456"
                />
              </div>
            </div>
          </div>

          {/* Issue Details Section */}
          <div className="submit-repair__section">
            <h2 className="submit-repair__section-title">Issue Details</h2>
            <div className="submit-repair__grid">
              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Issue Type <span className="required">*</span>
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className={`submit-repair__select ${
                    errors.issueType ? "error" : ""
                  }`}
                >
                  <option value="">Select an issue</option>
                  {issueTypes.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
                {errors.issueType && (
                  <p className="submit-repair__error">{errors.issueType}</p>
                )}
              </div>

              <div className="submit-repair__field">
                <label className="submit-repair__label">
                  Preferred Repair Date (Optional)
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="submit-repair__input"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="submit-repair__field submit-repair__field--full">
                <label className="submit-repair__label">
                  Issue Description <span className="required">*</span>
                </label>
                <textarea
                  name="issueDescription"
                  value={formData.issueDescription}
                  onChange={handleChange}
                  className={`submit-repair__textarea ${
                    errors.issueDescription ? "error" : ""
                  }`}
                  placeholder="Please describe the issue in detail..."
                  rows="5"
                />
                {errors.issueDescription && (
                  <p className="submit-repair__error">
                    {errors.issueDescription}
                  </p>
                )}
              </div>

              <div className="submit-repair__field submit-repair__field--full">
                <label className="submit-repair__label">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="submit-repair__textarea"
                  placeholder="Any additional information..."
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-repair__actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Repair Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmitRepair;
