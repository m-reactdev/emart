import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthReducer } from "./all-reducers/AuthReducers";
import { CartReducers } from "./all-reducers/CartReducers";
import { ProductReducer } from "./all-reducers/ProductReducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthState", "ProductState", "CartState"],
};

const RootReducers = combineReducers({
  AuthState: AuthReducer,
  ProductState: ProductReducer,
  CartState: CartReducers,
});

export default persistReducer(persistConfig, RootReducers);
