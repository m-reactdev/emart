const INIT_STATE = {
  ProductData: [],
  viewItem: null,
};

const ProductReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      let fetchProducts = action.payload;

      return {
        ...state,
        ProductData: fetchProducts,
      };

    case "VIEW_PRODUCT":
      let viewItem = action.payload;

      return {
        ...state,
        viewItem: viewItem,
      };

    default:
      return state;
  }
};

export { ProductReducer };
