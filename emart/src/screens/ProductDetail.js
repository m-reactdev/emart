import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import Image from "../assets/imgs/banner.jpg";
import {
  MDBBtn,
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRadio,
  MDBCol,
} from "mdb-react-ui-kit";

import Rating from "../components/Rating";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/all-actions/ProductAction";
import { addCartItems } from "../redux/actions/all-actions/CartAction";
import { toast } from "react-toastify";

const ProductDetail = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [basicActive, setBasicActive] = useState("tab1");

  let cartItems = useSelector(({ CartState }) => {
    return CartState.cartItems;
  });

  let ProductData = useSelector(({ ProductState }) => {
    return ProductState.ProductData;
  });

  let state = useSelector(({ ProductState }) => {
    return ProductState.viewItem;
  });

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });

  const addToCart = (item) => {
    let cartData = {
      title: item.productName,
      imgUrl: item.imgUrl,
      price: item.price,
      product_Id: item.product_Id,
      item_Id: item._id,
      quantity: 1,
      user_Id: authUser._id,
      user_Name: authUser.name,
      user_Email: authUser.email,
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
  };

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Banner title={state.productName} background={Image} />
      <MDBContainer>
        <div className="product_view row">
          <MDBCol lg={5}>
            <div className="img">
              <img src={state.imgUrl.preview} alt={state.category} />
            </div>
          </MDBCol>

          <MDBCol lg={7}>
            <div className="info">
              <h3>{state.productName}</h3>
              <div className="rating">
                <Rating avgRating={state.avgRating} />
                <p>({state.reviews.length} customer reviews)</p>
              </div>
              <div className="price">
                <h4>${state.price}</h4>
                <p>Category: {state.category}</p>
              </div>

              <span>{state.shortDesc}</span>
              <MDBBtn onClick={() => addToCart(state)}>Add to cart</MDBBtn>
            </div>
          </MDBCol>
        </div>
        <div className="tab_block">
          <MDBTabs className="mb-3">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick("tab1")}
                active={basicActive === "tab1"}
              >
                Description
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleBasicClick("tab2")}
                active={basicActive === "tab2"}
              >
                Reviews ({state.reviews.length})
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={basicActive === "tab1"}>
              <p>{state.description}</p>
            </MDBTabsPane>
            <MDBTabsPane show={basicActive === "tab2"}>
              <ul>
                {state.reviews.map((item, index) => {
                  return (
                    <li className="review_item" key={index}>
                      <h5>John Deo</h5>
                      <h4>{item.rating} (rating)</h4>
                      <p>{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
        <div className="similar_products">
          <h5> You may also like</h5>
          <div className="products_listing">
            {ProductData.filter((element) => {
              return (
                element.category === state.category &&
                element.productName !== state.productName
              );
            })
              .slice(0, 4)
              .map((item, index) => {
                return (
                  <Product
                    key={index}
                    image={item.imgUrl.preview}
                    title={item.productName}
                    category={item.category}
                    price={item.price}
                    item={item}
                  />
                );
              })}
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default ProductDetail;
