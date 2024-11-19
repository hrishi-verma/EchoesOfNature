import React from "react";
import "./footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <p className="text">
          &copy; {new Date().getFullYear()} ExtinctAnimalTracker. All Rights Reserved.
        </p>
        
        {/* Scroll Up Button */}
        <button
          onClick={scrollToTop}
          className="scroll-up-btn"
        >
          Scroll Up
        </button>
      </div>
    </footer>
  );
};

export default Footer;
