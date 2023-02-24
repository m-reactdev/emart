import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Image from "../assets/imgs/banner.jpg";
import Select from "react-select";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import Product from "../components/Product";
import { categoryOptions } from "../components/SelectOptions";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/all-actions/ProductAction";
import { ColorRing } from "react-loader-spinner";

const Shop = () => {
  let dispatch = useDispatch();

  let ProductData = useSelector(({ ProductState }) => {
    return ProductState.ProductData;
  });

  const [category, setCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState("");
  const [product, setProduct] = useState([]);

  const handleChange = (e) => {
    let filterValue = e.value;
    setCategory(e);
    setSearchText("");

    if (filterValue === "sofa") {
      let filterItem = ProductData.filter((e) => e.category === "sofa");
      setProduct(filterItem);
    } else if (filterValue === "chair") {
      let filterItem = ProductData.filter((e) => e.category === "chair");
      setProduct(filterItem);
    } else if (filterValue === "mobile") {
      let filterItem = ProductData.filter((e) => e.category === "mobile");
      setProduct(filterItem);
    } else if (filterValue === "watch") {
      let filterItem = ProductData.filter((e) => e.category === "watch");
      setProduct(filterItem);
    } else if (filterValue === "wireless") {
      let filterItem = ProductData.filter((e) => e.category === "wireless");
      setProduct(filterItem);
    }
  };

  const searchHandler = (e) => {
    if (e) {
      setCategory(null);
    }
    let filterValue = e.target.value;
    setSearchText(filterValue);

    let filterItem = ProductData.filter((e) =>
      e.productName.toLowerCase().includes(filterValue.toLowerCase())
    );

    if (filterItem.length > 0) setProduct(filterItem);
    else {
      setProduct([]);
      setError("No Data Found.");
    }
  };

  useEffect(() => {
    setProduct(ProductData);
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [ProductData]);

  return (
    <>
      <Banner title="Products" background={Image} />
      <MDBContainer>
        <div className="search_block">
          <div className="search_filter">
            <Select
              value={category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder="Select Category"
              autoFocus={false}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgb(248 86 6 / 20%)",
                  primary: " #f85606",
                },
              })}
            />
          </div>
          <div className="search_input">
            <input
              type="text"
              className="form-control"
              placeholder="Search here..."
              value={searchText}
              onChange={searchHandler}
            />
          </div>
        </div>
        <div className="products_listing row mb-md-5">
          {ProductData.length === 0 ? (
            <div className="loader">
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          ) : (
            product.map((item, index) => {
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
          )}

          {product.length === 0 && <p className="emptyData">{error}</p>}
        </div>
      </MDBContainer>
    </>
  );
};

export default Shop;
