import {
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
      let updateProduct = [...state.ProductData];
      updateProduct.push(action.payload);

      return {
        ...state,
        ProductData: updateProduct,
      };

    default:
      return state;
  }
};

export { ProductReducer };
