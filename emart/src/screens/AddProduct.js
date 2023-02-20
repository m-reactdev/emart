import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import Logo from "../assets/imgs/logo1.png";
import { categoryOptions } from "../components/SelectOptions";
import Select from "react-select";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../redux/actions/all-actions/ProductAction";

const AddProduct = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let authUser = useSelector(({ AuthState }) => {
    return AuthState.user;
  });
  const [data, setData] = useState({
    productName: "",
    imgUrl: null,
    category: null,
    quantity: "",
    price: "",
    shortDesc: "",
    description: "",
  });

  let {
    productName,
    imgUrl,
    category,
    quantity,
    price,
    shortDesc,
    description,
  } = data;

  const clearForm = () => {
    setData({
      productName: "",
      imgUrl: null,
      category: null,
      quantity: "",
      price: "",
      shortDesc: "",
      description: "",
    });

    console.log(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const reduce_image_file_size = async (
    base64Str,
    MAX_WIDTH = 250,
    MAX_HEIGHT = 250
  ) => {
    let resized_base64 = await new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
    return resized_base64;
  };

  const imageChange = async (e) => {
    let file = e.target.files[0];
    let newUrl = await toBase64(file);

    if (newUrl) {
      const resized = await reduce_image_file_size(newUrl);
      let data = { preview: resized };
      setData((prevState) => ({
        ...prevState,
        imgUrl: data,
      }));
    } else {
      console.log("return err");
    }
  };

  const deleteImage = () => {
    let actualUrl = null;
    setData((prevState) => ({
      ...prevState,
      imgUrl: actualUrl,
    }));
  };

  const handleSubmit = () => {
    if (authUser !== null) {
      let data = {
        vendor_Id: authUser._id,
        vendor_Name: authUser.name,
        vendor_Email: authUser.email,
        product_Id: Math.floor(1000 + Math.random() * 9000),
        imgUrl: imgUrl,
        productName: productName,
        category: category?.value,
        quantity: quantity,
        price: parseInt(price),
        shortDesc: shortDesc,
        description: description,
      };

      if (
        data.productName !== "" &&
        data.category !== "" &&
        data.price !== "" &&
        data.description !== "" &&
        data.imgUrl !== null
      ) {
        dispatch(addProduct(data, clearForm));
      } else {
        toast.warn("Please fill required fields.", {
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
      }, 1500);
    }
  };

  return (
    <>
      <MDBContainer>
        <div className="form_bg">
          <Link to={"/"}>
            <img src={Logo} alt="" className="logo" />
          </Link>

          <div className="post_hd">
            <h1>Sell Your Product</h1>
            <p>
              Place your product and get found by countless potential buyers.
            </p>
          </div>

          <div className="product_form_block">
            <MDBRow>
              <MDBCol lg={6}>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    id="form3Example1"
                    label="Product Name"
                    onChange={handleChange}
                    value={productName}
                    name="productName"
                  />
                </div>
              </MDBCol>
              <MDBCol lg={6}>
                <div className="form-group">
                  <Select
                    isClearable={true}
                    value={category}
                    onChange={(event) =>
                      setData((prevState) => ({
                        ...prevState,
                        category: event,
                      }))
                    }
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
              </MDBCol>
              <MDBCol lg={6}>
                <div className="form-group">
                  <MDBInput
                    type="number"
                    id="form3Example2"
                    label="Product Quantity"
                    // onChange={handleChange}
                    onChange={(e) => {
                      const min = 0;
                      const max = 10;
                      var value = parseInt(e.target.value, 10);

                      if (value > max) value = max;
                      if (value < min) value = min;

                      setData((prevState) => ({
                        ...prevState,
                        quantity: value,
                      }));
                    }}
                    value={quantity}
                    name="quantity"
                  />
                </div>
              </MDBCol>
              <MDBCol lg={6}>
                <div className="form-group">
                  <MDBInput
                    type="number"
                    id="form3Example3"
                    label="Product Price"
                    onChange={handleChange}
                    value={price}
                    name="price"
                  />
                </div>
              </MDBCol>
              <MDBCol lg={12}>
                <div className="form-group">
                  <MDBInput
                    type="text"
                    id="form3Example5"
                    label="Short Descriptiion"
                    onChange={handleChange}
                    value={shortDesc}
                    name="shortDesc"
                  />
                </div>
                <div className="form-group">
                  <MDBTextArea
                    label="Description"
                    onChange={handleChange}
                    value={description}
                    name="description"
                    id="textAreaExample"
                    rows={4}
                  />
                </div>
              </MDBCol>
              <MDBCol lg={6}>
                <div className="form-group">
                  <div className="file_block">
                    <label htmlFor="customFile" className="file_select">
                      <BsFillImageFill /> Select Image
                      <MDBFile
                        onChange={imageChange}
                        accept="/image/*"
                        id="customFile"
                        type="file"
                      />
                    </label>
                    {imgUrl !== null ? (
                      <>
                        <div className="imgPreview">
                          <img src={imgUrl.preview} alt="" />
                        </div>
                        <MDBBtn onClick={deleteImage} className="deleteBtn">
                          <MdDelete />
                        </MDBBtn>
                      </>
                    ) : null}
                  </div>
                </div>
              </MDBCol>
              <MDBCol lg={12}>
                <div className="submit_form">
                  <MDBBtn className="submitBtn" onClick={handleSubmit}>
                    Submit
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </MDBContainer>
    </>
  );
};

export default AddProduct;
