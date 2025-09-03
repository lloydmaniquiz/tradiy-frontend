import React from "react";
import "../styles/DashboardReferrals.css";

export default function DashboardReferrals() {
  return (
    <div className="db-referrals-container">
      {/* Banner Section */}
      <div className="db-referrals-banner">
        <div className="db-referrals-banner-text">
          <h2>Refer a Trader and get rewarded!</h2>
          <p>
            Invite other traders to Tradiy Hero and score 5 points per referral.
          </p>
        </div>
        <div className="db-referrals-banner-points">
          <span>5 Points</span>
          <p>Credit</p>
        </div>
      </div>

      {/* Share Link Section */}
      <div className="db-referrals-share">
        <p>Share your referral link with other traders.</p>
        <div className="db-referrals-link-box">
          <input
            type="text"
            value="https://tradiyhero.com/referral/FMfGgzQbffVcCwxkdHNwDplSTChjtwQh"
            readOnly
          />
          <button className="db-referrals-copy">Copy Link</button>
        </div>
        <div className="db-referrals-socials">
          <button className="facebook">Facebook</button>
          <button className="instagram">Instagram</button>
          <button className="linkedin">LinkedIn</button>
          <button className="tiktok">TikTok</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="db-referrals-stats">
        <div className="db-referrals-card">
          <h3>Referral Sign Ups</h3>
          <p>12</p>
        </div>
        <div className="db-referrals-card">
          <h3>Successful Referrals</h3>
          <p>34</p>
        </div>
        <div className="db-referrals-card">
          <h3>Credits Earned</h3>
          <p>56</p>
        </div>
      </div>
    </div>
  );
}
