import React from "react";
import FB from "../../img/facebook-icon.png";
import Twitter from "../../img/twitter-icon.png";
import Pinterest from "../../img/pinterest-icon.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_1">
        <div className="footer_1-wrapper">
          <div className="footer_1-findUs">
            <p className="p_txt" style={{ textAlign: "center" }}>
              Ми в соціальних мережах
            </p>
            <ul className="footer_1-sm">
              <li className="footer_1-li">
                <a target="blank" href="https://instagram.com/cur.curia">
                  <img src={FB} alt="instalogo" width={70} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <center style={{ color: "gold" }}>2022</center>
      </div>
    </footer>
  );
};

export default Footer;
