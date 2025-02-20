import "../App.css";
import Footer from "../landing-page/footer";
import StickyHeader from "../landing-page/sticky-header";
import CallNow from "../images/contact-us/call.png";
import EmailNow from "../images/contact-us/email.png";
import WhatsAppNow from "../images/contact-us/whatsapp.png";
import LiveChat from "../images/contact-us/live-chat.png";
import QR from "../images/contact-us/qr.png";
import ArrowBlue from "../images/contact-us/arrow-blue.png"
import ArrowWhite from "../images/contact-us/arrow-white.png"

const ContactUs = () => {
    return ( 
        <>
            <StickyHeader />
            <div className="contact-us-container">
                <h1>Get in Touch!</h1>
                <p>We’d love to hear from you. Whether you have questions, feedback, or simply want to connect, reach out using the options below.</p>

                {/* Contact Cards Section */}
                <div className="contact-cards">
                    {/* Call Us */}
                    <div className="contact-card">
                        <div className="contact-card-content">
                            <div className="icon-container">
                                <img src={CallNow} alt="Call Icon" className="icon-img" />
                            </div>
                            <h3>CALL US</h3>
                            <p>You can reach us directly at the following number:</p>
                            <p className="highlight">01234 567890</p>
                            <p>We’re available to take your calls during our operating hours every day of the week. Don’t hesitate to contact us for any questions, concerns, or urgent assistance—we’re always happy to help!</p>
                        </div>
                        <a href="tel:01234567890" className="contact-button">
                            Call Now
                            <img src={ArrowBlue} alt="blue-arrow" className="arrow-icon" />
                        </a>
                    </div>

                    {/* Email Us */}
                    <div className="contact-card">
                        <div className="contact-card-content">
                            <div className="icon-container">
                                <img src={EmailNow} alt="Email Icon" className="icon-img" />
                            </div>
                            <h3>EMAIL US</h3>
                            <p>Reach out to us anytime via email:</p>
                            <p className="highlight">support@email.com</p>
                            <p>Feel free to share your inquiries, feedback, or concerns, and we’ll respond as soon as possible..</p>
                        </div>
                        <a href="mailto:support@email.com" className="contact-button">
                            Email Now
                            <img src={ArrowBlue} alt="blue-arrow" className="arrow-icon" />
                        </a>
                    </div>

                    {/* Message Us (WhatsApp) */}
                    <div className="contact-card">
                        <div className="contact-card-content">
                            <div className="icon-container">
                                <img src={WhatsAppNow} alt="WhatsApp Icon" className="icon-img" />
                            </div>
                            <h3>MESSAGE US</h3>
                            <p>Chat with our support team directly on WhatsApp for real-time help. Simply scan the QR code below to start a conversation:</p>
                            <img src={QR} alt="WhatsApp QR" className="qr-code" />
                        </div>
                        <a href="https://wa.me/01234567890" target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
                            Open WhatsApp
                            <img src={ArrowWhite} alt="white-arrow" className="arrow-icon" />
                        </a>
                    </div>

                    {/* Live Chat */}
                    <div className="contact-card">
                        <div className="contact-card-content">
                            <div className="icon-container">
                                <img src={LiveChat} alt="Live Chat Icon" className="icon-img" />
                            </div>
                            <h3>LIVE CHAT</h3>
                            <div className="contact-card-content-wrapper">
                            <h3 className="highlight">Coming Soon on Tradiy!</h3>
                            <p>We’re excited to bring you a real-time live chat feature to make connecting with our support team even easier!.</p>
                            <p className="small-text">Stay tuned for updates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
