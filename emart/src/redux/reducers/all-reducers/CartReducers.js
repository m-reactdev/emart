import {
  ADD_ITEM,
  DELETE_ITEM,
  FETCH_ITEM,
  ORDER_PLACED,
  RESET_ORDER,
  UPDATE_ITEM,
} from "../../actions/actions-types/ActionType";

const INIT_STATE = {
  cartItems: [],
  item: null,
  purchasedItem: [],
};

const CartReducers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      let fetchItems = [];

      return {
        ...state,
        cartItems: fetchItems,
      };

    case ADD_ITEM:
      let cloneCartItems = [...state.cartItems];
      cloneCartItems.push(action.payload);

      return {
        ...state,
        cartItems: cloneCartItems,
      };

    case DELETE_ITEM:
      let cloneCartDeleted = [...state.cartItems];
      cloneCartDeleted.splice(action.payload, 1);

      return {
        ...state,
        cartItems: cloneCartDeleted,
      };

    case UPDATE_ITEM:
      let updateItem = action.payload;

      return {
        ...state,
        cartItems: updateItem,
      };

    case ORDER_PLACED:
      let doneOrder = action.payload.cartItems;
      let item = action.payload.item;

      return {
        ...state,
        cartItems: [],
        purchasedItem: doneOrder,
        item: item,
      };

    case RESET_ORDER:
      return {
        ...state,
        cartItems: [],
        purchasedItem: [],
        item: null,
      };

    default:
      return state;
  }
};

export { CartReducers };
