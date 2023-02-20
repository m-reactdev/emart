import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  viewItem,
} from "../redux/actions/all-actions/ProductAction";
import { addCartItems } from "../redux/actions/all-actions/CartAction";
import { toast } from "react-toastify";
import { MDBCol } from "mdb-react-ui-kit";

const Product = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { image, title, category, price, item } = props;

  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  const addToCart = (item) => {
    if (authUser) {
      let cartData = {
        title: item.productName,
        imgUrl: item.imgUrl,
        price: item.price,
        unitPrice: item.price,
        product_Id: item.product_Id,
        item_Id: item._id,
        quantity: 1,
        user_id: authUser._id,
        user_name: authUser.name,
        user_email: authUser.email,
      };

      let duplicate = false;

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].item_Id === cartData.item_Id) {
          duplicate = true;
          break;
        }
      }

      if (!duplicate) {
        dispatch(addCartItems(cartData));
      } else {
        toast.info("Item has already added in your cart.", {
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
          navigate("/cart");
        }, 1500);
      }
    } else {
      toast.warn("You need to be logged in.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <MDBCol xl={3} lg={4} md={6}>
      <div className="product_item">
        <div className="img">
          <img src={image} alt="" />
        </div>
        <h3>
          <Link
            to={`/product-detail/${item.product_Id}`}
            onClick={() => dispatch(viewItem(item))}
          >
            {title}
          </Link>
        </h3>
        <p>{category}</p>
        <h3>${price}</h3>

        {authUser?.role === "Admin" ? (
          <>
            <div className="icons_block">
              <Link
                onClick={() => dispatch(deleteItem(item))}
                className="del_icon"
              >
                <MdDelete />
              </Link>
              <Link className="add_btn" onClick={() => addToCart(item)}>
                <BsPlusCircleFill />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="icons_block">
              <Link className="add_btn" onClick={() => addToCart(item)}>
                <BsPlusCircleFill />
              </Link>
            </div>
          </>
        )}
      </div>
    </MDBCol>
  );
};

export default Product;
