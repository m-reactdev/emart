import React, { useEffect, useState } from "react";
import Logo from "../../assets/imgs/logo-white1.png";
import { Link, useLocation } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

const Footer = () => {
  const [hideFooter, setHideFooter] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/register" ||
      location.pathname === "/login" ||
      location.pathname === "/add-product"
    ) {
      setHideFooter(true);
    } else {
      setHideFooter(false);
    }
  }, [location]);
  return (
    <>
      {hideFooter ? null : (
        <div className="bg_footer">
          <MDBContainer>
            <div className="flex_box">
              <div className="info">
                <img src={Logo} />
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
                  aperiam ad ab consequatur ut deleniti, amet.
                </p>
              </div>
              <div className="top_useful_links">
                <ul>
                  <li>Top Categories</li>
                  <li>
                    <Link to={""}>Mobile Phones</Link>
                  </li>
                  <li>
                    <Link to={""}>Modern Sofa</Link>
                  </li>
                  <li>
                    <Link to={""}>Arm Chair</Link>
                  </li>
                  <li>
                    <Link to={""}>Smart Watches</Link>
                  </li>
                </ul>
              </div>
              <div className="top_useful_links">
                <ul>
                  <li>Usefull Links</li>
                  <li>
                    <Link to={"/shop"}>Shop</Link>
                  </li>
                  <li>
                    <Link to={"/cart"}>Cart</Link>
                  </li>
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li>
                    <Link to={"#"}>Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="top_useful_links">
                <ul>
                  <li>Contact</li>
                  <li>123 Zindabazar, Sylets, Karachi</li>
                  <li>+69124789625</li>
                  <li>info@emart.com</li>
                </ul>
              </div>
            </div>

            <p className="copyright">
              Copyright 2023 developed by Misbah Hussain. All rights reserved.
            </p>
          </MDBContainer>
        </div>
      )}
    </>
  );
};

export default Footer;
