import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Banner from "../components/Banner";
import Image from "../assets/imgs/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItems } from "../redux/actions/all-actions/CartAction";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState();
  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  const gotoCheckout = () => {
    if (authUser !== null) {
      navigate("/checkout");
    } else {
      toast.info("You need to be logged in.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
      <Banner title={"Cart"} background={Image} />
      <MDBContainer>
        <div className="cart_block">
          {cartItems.length > 0 ? (
            <MDBRow>
              <MDBCol lg="9">
                <MDBTable align="middle">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              src={item.imgUrl.preview}
                              alt=""
                              style={{ width: "60px", height: "60px" }}
                              className="rounded-2"
                            />
                          </td>
                          <td>{item.title}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <Link
                              onClick={() =>
                                dispatch(deleteCartItems(item.item_Id))
                              }
                            >
                              <MdDelete />
                            </Link>{" "}
                          </td>
                        </tr>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
              <MDBCol lg="3">
                <div className="cart_totals">
                  <div className="sub_total">
                    <h4>Subtotal</h4>
                    <h3>${totalAmount}</h3>
                  </div>
                  <p>Taxes and shipping will calculate in chaeckout.</p>
                  <div className="btns_block">
                    <MDBBtn onClick={gotoCheckout}>Checkout</MDBBtn>
                    <MDBBtn onClick={() => navigate("/shop")}>
                      Continue Shopping
                    </MDBBtn>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          ) : (
            <p className="text-center"> Empty Cart</p>
          )}
        </div>
      </MDBContainer>
    </>
  );
};

export default Cart;
