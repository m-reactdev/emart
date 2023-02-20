import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ColorRing } from "react-loader-spinner";
import Rating from "../components/Rating";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  handlerReview,
} from "../redux/actions/all-actions/ProductAction";
import { addCartItems } from "../redux/actions/all-actions/CartAction";
import { toast } from "react-toastify";

const ProductDetail = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [basicActive, setBasicActive] = useState("tab1");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

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

  const handleValue = (e) => {
    setRating(e.target.value);
  };

  const handleReview = () => {
    if (authUser) {
      if (rating > 0 && text !== "") {
        let review = {
          name: authUser.name,
          rating: Number(rating),
          text: text,
        };

        let newReviews = [...state.reviews];
        newReviews.push(review);

        let avgRating = [state.avgRating, Number(rating)];
        const sum = avgRating.reduce((total, rating) => total + rating, 0);
        const average = sum / avgRating.length;

        let data = {
          _id: state._id,
          vendor_Id: state.vendor_Id,
          vendor_Name: state.name,
          vendor_Email: state.vendor_Name,
          product_Id: state.product_Id,
          imgUrl: state.imgUrl,
          productName: state.productName,
          category: state.category,
          quantity: state.quantity,
          price: state.price,
          shortDesc: state.shortDesc,
          description: state.description,
          reviews: newReviews,
          avgRating: average,
        };

        dispatch(handlerReview(data, navigate));
      } else {
        toast.warn("Please fill all required fields.", {
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
    }
  };

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
                      <h5>{item.name}</h5>
                      <h4>{item.rating} (rating)</h4>
                      <p>{item.text}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="write_review_block">
                <h3>Leave your experience</h3>
                <div className="rating_select">
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio1"
                    value="1"
                    onChange={handleValue}
                    label="Very Poor"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio2"
                    value="2"
                    onChange={handleValue}
                    label="Poor"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio3"
                    value="3"
                    onChange={handleValue}
                    label="Good"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio4"
                    value="4"
                    onChange={handleValue}
                    label="Very Good"
                    inline
                  />
                  <MDBRadio
                    name="inlineRadio"
                    id="inlineRadio5"
                    value="5"
                    onChange={handleValue}
                    label="Excellent"
                    inline
                  />
                </div>
                <textarea
                  placeholder="Review Message"
                  rows="5"
                  className="form-control"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>

                <MDBBtn onClick={handleReview}>Submit</MDBBtn>
              </div>
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
        <div className="similar_products">
          <h5> You may also like</h5>
          <div className="products_listing row">
            {ProductData && ProductData.length > 0 ? (
              ProductData.filter((element) => {
                return (
                  element?.category === state.category &&
                  element?.productName !== state.productName
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
                })
            ) : (
              <div className="loader">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default ProductDetail;
