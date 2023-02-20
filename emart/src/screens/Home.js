import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/imgs/banner.jpg";
import Chair from "../assets/imgs/counter-timer-img.png";
import { MDBContainer } from "mdb-react-ui-kit";
import { FaShippingFast } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { RiSecurePaymentFill } from "react-icons/ri";
import { SiAdguard } from "react-icons/si";
import ShippingBox from "../components/ShippingBox";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/all-actions/ProductAction";
import { ColorRing } from "react-loader-spinner";

const Home = () => {
  let dispatch = useDispatch();
  const [days, setDays] = useState(21);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let ProductData = useSelector(({ ProductState }) => {
    return ProductState.ProductData;
  });

  // console.log(ProductData)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [ProductData]);

  useEffect(() => {
    let timer;

    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes === 59) {
        setHours(hours + 1);
        setMinutes(0);
        setSeconds(0);
      }
      if (hours === 24) {
        setDays(days - 1);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
      }
    }, 1000);

    if (days === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  return (
    <>
      <div className="hero_banner">
        <MDBContainer>
          <div className="text">
            <p>
              <b>Trending products in 2023</b>
            </p>
            <h1>Make your Interior more minimalistic & modern</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              eaque recusandae adipisci quia expedita nulla exercitationem
              quaerat laudantium aliquid.
            </p>
            <Link to={"/shop"} className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </MDBContainer>

        <div className="img">
          <img src={Banner} alt="" />
        </div>
      </div>
      <MDBContainer>
        <div className="shopping_info">
          <ShippingBox
            icon={<FaShippingFast />}
            title="Free Shipping"
            description="Lorem ipsum dolor sit amet ipsum return."
          />
          <ShippingBox
            icon={<SlRefresh />}
            title="Easy Returns"
            description="Lorem ipsum dolor sit amet ipsum return."
          />
          <ShippingBox
            icon={<RiSecurePaymentFill />}
            title="Secure Payment"
            description="Lorem ipsum dolor sit amet ipsum return."
          />
          <ShippingBox
            icon={<SiAdguard />}
            title="Back Guarantee"
            description="Lorem ipsum dolor sit amet ipsum return."
          />
        </div>
        <div className="products_block">
          <h2>Trending Products</h2>
          <div className="products_listing row">
            {ProductData && ProductData.length > 0 ? (
              ProductData.filter((e) => e.category === "sofa")
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

        <div className="products_block">
          <h2>Best Selling</h2>
          <div className="products_listing row">
            {ProductData && ProductData.length > 0 ? (
              ProductData.filter((e) => e.category === "chair")
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
      <div className="bg_sale_offer">
        <MDBContainer>
          <div className="sale_offer">
            <div className="timer_block">
              <p>Limited Offer</p>
              <h4>Quality Armchair</h4>
              <div className="timer">
                <p>
                  <span>{days}</span> <span>Days</span>
                </p>
                :
                <p>
                  <span>{hours < 10 ? "0" + hours : hours}</span>{" "}
                  <span>Hours</span>
                </p>
                :
                <p>
                  <span>{minutes < 10 ? "0" + minutes : minutes}</span>{" "}
                  <span>Minutes</span>
                </p>
                :
                <p>
                  <span>{seconds < 10 ? "0" + seconds : seconds}</span>{" "}
                  <span>Seconds</span>
                </p>
              </div>
              <Link className="btn btn-primary btn-visit">Visit Store</Link>
            </div>
            <div className="img">
              <img src={Chair} alt="" />
            </div>
          </div>
        </MDBContainer>
      </div>
      <MDBContainer>
        <div className="products_block">
          <h2>New Arrivals</h2>
          <div className="products_listing row">
            {ProductData && ProductData.length > 0 ? (
              ProductData.filter((element) => {
                return (
                  element.category === "wireless" ||
                  element.category === "mobile" ||
                  element.category === "watch"
                );
              })
                .slice(0, 12)
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

        {/* <div className="products_block">
          <h2>Popular in Category</h2>
          <div className="products_listing row">
            {ProductData?.filter((e) => e.category === "watch")
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
        </div> */}
      </MDBContainer>
    </>
  );
};

export default Home;
