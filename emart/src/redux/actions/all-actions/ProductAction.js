import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/constant/Constant";

const addProduct = (data) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/products/create-product`;

      let response = await axios({
        method: "POST",
        url: apiUrl,
        data: data,
      });

      if (response) {
        toast.success(response.data.message, {
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
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
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
};

const fetchProducts = () => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/products/fetch-products`;

      let response = await axios({
        method: "GET",
        url: apiUrl,
      });

      if (response) {
        // console.log(response);
        let products = response.data.data;
        dispatch({
          type: "FETCH_PRODUCTS",
          payload: products,
        });
      }
    } catch (error) {
      toast.error(error.message, {
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
};

const viewItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: "VIEW_PRODUCT",
      payload: item,
    });
  };
};

export { addProduct, fetchProducts, viewItem };
