import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import Logo from "../../assets/imgs/logo1.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/all-actions/AuthAction";
import { fetchCartItems } from "../../redux/actions/all-actions/CartAction";

const Header = () => {
  let location = useLocation();
  let dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [quantity, setQuantity] = useState(0);

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  const logOutHandler = () => {
    if (authUser !== null) {
      dispatch(logoutUser());
      dispatch(fetchCartItems());
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      let quantity = 0;
      cartItems.forEach((element) => {
        quantity += element.quantity;
      });
      setQuantity(quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems]);

  useEffect(() => {
    if (
      location.pathname === "/register" ||
      location.pathname === "/login" ||
      location.pathname === "/add-product"
    ) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {hideHeader ? null : (
        <MDBNavbar expand="lg" light bgColor="light" className="custom_header">
          <MDBContainer>
            <MDBNavbarBrand href="/">
              <img src={Logo} />
            </MDBNavbarBrand>
            <div className="admin_block">
              <MDBNavbarNav>
                <MDBNavbarItem className="cart_item">
                  <MDBNavbarLink href="/cart">
                    <MDBIcon fas icon="shopping-cart" />
                    <span className="itemSelected">{quantity}</span>
                  </MDBNavbarLink>
                </MDBNavbarItem>

                {authUser ? (
                  <MDBNavbarItem className="user_info">
                    {authUser.profileImage !== null ? (
                      <div className="dp">
                        <img src={authUser.profileImage} alt="" />
                      </div>
                    ) : (
                      <span className="profileBox">
                        {authUser.name.charAt(0)}
                      </span>
                    )}
                    <div className="div">
                      <span>{authUser.name}</span>
                      <MDBNavbarLink onClick={logOutHandler}>
                        Logout
                      </MDBNavbarLink>
                    </div>
                  </MDBNavbarItem>
                ) : (
                  <MDBDropdown>
                    <MDBDropdownToggle tag="a">
                      <MDBIcon fas icon="user-alt" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="/login" link>
                        Login
                      </MDBDropdownItem>
                      <MDBDropdownItem href="/register" link>
                        Register
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                )}
              </MDBNavbarNav>
            </div>
            <MDBNavbarToggler
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav}>
              <MDBNavbarNav>
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current="page" href="/">
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/shop">Shop</MDBNavbarLink>
                </MDBNavbarItem>
                {authUser?.role === "Customer" ? null : (
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/add-product">
                      Add Product
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                )}
                <MDBNavbarItem>
                  <MDBNavbarLink href="/cart">Cart</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      )}
    </>
  );
};

export default Header;
