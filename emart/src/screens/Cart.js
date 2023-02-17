import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
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
import {
  deleteCartItems,
  updateIncreaseItems,
  updateDecreaseItems,
} from "../redux/actions/all-actions/CartAction";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState();

  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  const handleIncreaseQuantity = (index) => {
    if (cartItems[index].quantity <= 9) {
      dispatch(updateIncreaseItems(index, cartItems, setTotalAmount));
    }
  };

  const handleDecreaseQuantity = (index) => {
    if (cartItems[index].quantity >= 2) {
      dispatch(updateDecreaseItems(index, cartItems, setTotalAmount));
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
              <MDBCol xl="9">
                <MDBTable align="middle" responsive>
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
                          <td>{item.price}</td>
                          <td>
                            <div className="quantity">
                              <Link
                                onClick={() => handleDecreaseQuantity(index)}
                              >
                                <FaMinus />
                              </Link>
                              <span>{item.quantity}</span>
                              <Link
                                onClick={() => handleIncreaseQuantity(index)}
                              >
                                <FaPlus />
                              </Link>
                            </div>
                          </td>
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
              <MDBCol xl="3">
                <div className="cart_totals">
                  <div className="sub_total">
                    <h4>Subtotal</h4>
                    <h3>${totalAmount}</h3>
                  </div>
                  <p>Taxes and shipping will calculate in chaeckout.</p>
                  <div className="btns_block">
                    <MDBBtn onClick={() => navigate("/checkout")}>
                      Checkout
                    </MDBBtn>
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
