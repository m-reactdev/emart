import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../components/constant/Constant";
import { UPDATE_PRODUCT } from "../actions-types/ActionType";

const addProduct = (data, clearForm) => {
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

        clearForm();
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

const handlerReview = (data,navigate) => {
  return async (dispatch) => {
    try {
      let apiUrl = `${BASE_URL}/api/products/update-products`;

      let response = await axios({
        method: "PUT",
        url: apiUrl,
        data: data,
      });

      if (response) {
        toast.success("Send review.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        let products = response.data.data;
        dispatch({
          type: UPDATE_PRODUCT,
          payload: products,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
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

export { addProduct, fetchProducts, viewItem, handlerReview };
