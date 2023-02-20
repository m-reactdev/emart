import {
  DELETE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
  VIEW_PRODUCT,
} from "../../actions/actions-types/ActionType";

const INIT_STATE = {
  ProductData: [],
  viewItem: null,
};

const ProductReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      let fetchProducts = action.payload;

      return {
        ...state,
        ProductData: fetchProducts,
      };

    case VIEW_PRODUCT:
      let viewItem = action.payload;

      return {
        ...state,
        viewItem: viewItem,
      };

    case UPDATE_PRODUCT:
      let updateItem = action.payload;

      return {
        ...state,
        viewItem: updateItem,
      };

    case DELETE_PRODUCT:
      let cloneProduct = [...state.ProductData];
      cloneProduct.splice(action.payload._id, 1);

      return {
        ...state,
        ProductData: cloneProduct,
      };

    default:
      return state;
  }
};

export { ProductReducer };
