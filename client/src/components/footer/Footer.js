import React from "react";
import FB from "../../img/facebook-icon.png";
import Twitter from "../../img/twitter-icon.png";
import Pinterest from "../../img/pinterest-icon.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_1">
        <div className="footer_1-wrapper">
          <div className="footer1-customerInfo">
            <p className="p_txt">Customer Information</p>
            <div className="customerInfo-links">
              <div className="customerInfo-link">Help Centre</div>
              <div className="customerInfo-link">Privacy Policy</div>
              <div className="customerInfo-link">Gift Cards</div>
              <div className="customerInfo-link">Returns</div>
              <div className="customerInfo-link">Shipping & Delivery</div>
              <div className="customerInfo-link">Cookie Policy</div>
            </div>
          </div>
          <div className="footer_1-findUs">
            <p className="p_txt">Find Us On</p>
            <ul className="footer_1-sm">
              <li className="footer_1-li">
                <img src={FB} alt="" />
              </li>
              <li className="footer_1-li">
                <img src={Twitter} alt="" />
              </li>
              <li className="footer_1-li">
                <img src={Pinterest} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_2">
        <div className="footer_2-wrapper">
          <p className="p_title">We accept the following payment methods</p>
          <ul className="footer_2-payment">
            <li className="footer_2-li">
              <img src={FB} alt="" />
            </li>
            <li className="footer_2-li">
              <img src={Twitter} alt="" />
            </li>
            <li className="footer_2-li">
              <img src={Pinterest} alt="" />
            </li>
          </ul>
          <p className="p_copyrights">2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
