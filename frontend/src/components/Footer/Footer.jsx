import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src={assets.logo} alt="NNT Logo" className="footer-logo" />
          <p>
            Delicious food delivered to your doorstep. NNT Purple Food House
            offers a wide variety of cuisines to satisfy your cravings.
          </p>
          <div className="social-icons">
            <a href="#">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/order">Place Order</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Food Street, Tasty
            City
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 234 567 8900
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@nntpurple.com
          </p>
          <div className="app-downloads">
            <h4>Download Our App</h4>
            <div className="store-links">
              <a href="#">
                <img src={assets.app_store} alt="App Store" />
              </a>
              <a href="#">
                <img src={assets.play_store} alt="Play Store" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} NNT Purple Food House. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
