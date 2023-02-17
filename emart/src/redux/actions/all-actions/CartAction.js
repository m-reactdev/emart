import { toast } from "react-toastify";
import { ADD_ITEM, DELETE_ITEM, FETCH_ITEM, ORDER_PLACED, RESET_ORDER, UPDATE_ITEM } from "../actions-types/ActionType";

const fetchCartItems = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ITEM,
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
      type: ADD_ITEM,
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
      type: DELETE_ITEM,
      payload: id,
    });
  };
};

const updateIncreaseItems = (index, cartItems, setTotalAmount) => {
  return (dispatch) => {
    const newCart = [...cartItems];
    let price = 0;
    newCart[index].quantity = newCart[index].quantity + 1;
    newCart[index].price = newCart[index].quantity * newCart[index].unitPrice;
    newCart.forEach((element) => {
      price += element.price;
    });
    setTotalAmount(price);
    dispatch({
      type: UPDATE_ITEM,
      payload: newCart,
    });
  };
};

const updateDecreaseItems = (index, cartItems, setTotalAmount) => {
  return (dispatch) => {
    const newCart = [...cartItems];
    let price = 0;
    newCart[index].quantity = newCart[index].quantity - 1;
    newCart[index].price = newCart[index].quantity * newCart[index].unitPrice;
    newCart.forEach((element) => {
      price += element.price;
    });
    setTotalAmount(price);
    dispatch({
      type: UPDATE_ITEM,
      payload: newCart,
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
        type: ORDER_PLACED,
        payload: {
          item: item,
          cartItems: cartItems,
        },
      });
      navigate("/success");
    }, 2000);
  };
};

const resetOrder = (navigate) => {
  return (dispatch) => {
    dispatch({
      type: RESET_ORDER,
    });

    navigate("/");
  };
};

export {
  fetchCartItems,
  addCartItems,
  deleteCartItems,
  updateIncreaseItems,
  updateDecreaseItems,
  orderDone,
  resetOrder,
};
