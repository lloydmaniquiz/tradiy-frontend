import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import tradiyCYAN from "../images/footer/Tradiy-Hero-NewLogo.png";
import telephone from "../images/footer/telephone.png";
import mail from "../images/footer/mail.png";
import "../App.css";
import Divider from "./divider";
import LocalTrades from "./local-trades";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-local">
        <Divider />
        <LocalTrades />
        <Divider />
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <img src={tradiyCYAN} alt="tradiy-cyan" />
          <ul>
            <li>United Kingdom</li>
            <li>© 2025, Tradiy. All rights reserved.</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-us">
            <li>
              <img src={telephone} alt="telephone" /> +44 (0)141 846 2126
            </li>
            <li>
              <img src={mail} alt="mail" /> support@tradiy.com
            </li>
          </ul>
          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com/Tradiyuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Tradiyuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/tradiyuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/tradiy-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link to="/trader-coc">Trader Code of Conduct</Link>
            </li>
            <li>
              <Link to="/site-map">Site Map</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
