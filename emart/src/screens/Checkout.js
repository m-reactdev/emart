import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import {  useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Image from "../assets/imgs/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  orderDone,
} from "../redux/actions/all-actions/CartAction";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState();
  const [data, setData] = useState({
    address: "",
    postalCode: "",
    city: "",
  });

  let { address, postalCode, city } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  const orderPlaced = () => {
    let orderData = {
      name: authUser.name,
      user_Id: authUser._id,
      email: authUser.email,
      address,
      postalCode,
      city,
    };

    if (!address && !postalCode && !city) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(orderDone(orderData, navigate, cartItems));
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      let price = 0;
      cartItems.forEach((element) => {
        price += element.price;
      });
      setTotalAmount(price);
    }
  }, [cartItems]);

  return (
    <>
      <Banner title={"Checkout"} background={Image} />
      <MDBContainer>
        <div className="checkout_form">
          {cartItems.length > 0 ? (
            <MDBRow>
              <MDBCol xl={8}>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    id="form3Example1"
                    label="Full Name"
                    // onChange={handleChange}
                    disabled
                    value={authUser.name}
                    name="Full Name"
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    type="email"
                    id="form3Example2"
                    label="Email"
                    // onChange={handleChange}
                    disabled
                    value={authUser.email}
                    name="Email"
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    id="form3Example3"
                    label="Address"
                    onChange={handleChange}
                    value={address}
                    name="address"
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    id="form3Example4"
                    label="City"
                    onChange={handleChange}
                    value={city}
                    name="city"
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    type="number"
                    id="form3Example5"
                    label="Postal Code"
                    onChange={handleChange}
                    value={postalCode}
                    name="postalCode"
                  />
                </div>
                <div className="form-group">
                  <MDBRadio
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    label="Cash on delivery"
                    defaultChecked
                  />
                </div>
              </MDBCol>
              <MDBCol xl={4}>
                <div className="cart_totals">
                  <h2>Order Summary</h2>
                  <div className="sub_total">
                    <h4>Subtotal</h4>
                    <h3>${totalAmount}</h3>
                  </div>
                  <div className="sub_total">
                    <h4>Shipping</h4>
                    <h3>$10</h3>
                  </div>

                  <hr />
                  <div className="sub_total">
                    <h4>Total</h4>
                    <h3>${`${totalAmount + 10}`}</h3>
                  </div>
                  <div className="btns_block">
                    <MDBBtn onClick={orderPlaced}>Place Order</MDBBtn>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          ) : (
            <p className="text-center">Empty Cart</p>
          )}
        </div>
      </MDBContainer>
    </>
  );
};

export default Checkout;
