const INIT_STATE = {
  cartItems: [],
};

const CartReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_ITEM":
      let fetchItems = [];

      return {
        ...state,
        cartItems: fetchItems,
      };

    case "ADD_ITEM":
      let cloneCartItems = [...state.cartItems];
      cloneCartItems.push(action.payload);

      return {
        ...state,
        cartItems: cloneCartItems,
      };

    case "DELETE_ITEM":
      let cloneCartDeleted = [...state.cartItems];
      cloneCartDeleted.splice(action.payload, 1);

      return {
        ...state,
        cartItems: cloneCartDeleted,
      };

    case "ORDER_PLACED":
      let doneOrder = [];

      return {
        ...state,
        cartItems: doneOrder,
      };

    default:
      return state;
  }
};

export { CartReducers };
