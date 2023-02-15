import { toast } from "react-toastify";

const fetchCartItems = () => {
  return (dispatch) => {
    dispatch({
      type: "FETCH_ITEM",
    });
  };
};

const addCartItems = (item) => {
  return (dispatch) => {
    toast.success("Item has been added in your cart.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };
};

const deleteCartItems = (id) => {
  return (dispatch) => {
    toast.success("Item has been deleted.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };
};

const orderDone = (item, navigate, cartItems) => {
  return (dispatch) => {
    toast.success("Your order has been placed.", {
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
      dispatch({
        type: "ORDER_PLACED",
      });
      navigate("/success", { state: { item: item, cartItems: cartItems } });
    }, 2000);
  };
};

export { fetchCartItems, addCartItems, deleteCartItems, orderDone };
