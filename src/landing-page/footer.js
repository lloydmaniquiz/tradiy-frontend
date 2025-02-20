import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import tradiyCYAN from "../images/footer/tradiy-cyan.png";
import telephone from "../images/footer/telephone.png";
import mail from "../images/footer/mail.png";
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src={tradiyCYAN} alt='tradiy-cyan'/>
          <ul>
            <li>United Kingdom</li>
            <li>© 2025, Tradiy. All rights reserved.</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-us">
            <li><img src={telephone} alt='telephone'/> +44 (0)141 846 2126</li>
            <li><img src={mail} alt='mail' /> support@tradiy.com</li>
          </ul>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/contact-us">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/trader-coc">Trader Code of Conduct</a></li>
            <li><a href="/site-map">Site Map</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
