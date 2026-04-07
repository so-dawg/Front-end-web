import { useState } from "react";
import styles from "./ContactUs.module.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setMessageSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <div className={styles.contactHeader}>
          <h1 className={styles.contactTitle}>Contact Us</h1>
          <p className={styles.contactSubtitle}>
            Please feel free to contact us, if you have any question
          </p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactFormSection}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className={styles.sendButton}>
                Send Message
              </button>
              {messageSent && (
                <div className={styles.successMessage}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#10B981">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                  <span>Your message has been sent successfully!</span>
                </div>
              )}
            </form>
          </div>

          <div className={styles.contactInfoSection}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2563EB">
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Support Email</h3>
              <p className={styles.infoText}>
                <a href="mailto:support@laptopstore.com" className={styles.infoLink}>
                  support@laptopstore.com
                </a>
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2563EB">
                  <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Call Us</h3>
              <p className={styles.infoText}>
                <a href="tel:+15550001234" className={styles.infoLink}>
                  +1 (555) 000-1234
                </a>
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#2563EB">
                  <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80Z" />
                </svg>
              </div>
              <h3 className={styles.infoTitle}>Working Time</h3>
              <p className={styles.infoText}>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
