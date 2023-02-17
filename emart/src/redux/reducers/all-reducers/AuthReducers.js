import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../../actions/actions-types/ActionType";

const INIT_STATE = {
  user: null,
};

const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let authUser = action.payload;

      return {
        ...state,
        user: authUser,
      };

    case LOGOUT_USER:
      let emptyUser = null;

      return {
        ...state,
        user: emptyUser,
      };

    case UPDATE_USER:
      let updateUser = action.payload;

      return {
        ...state,
        user: updateUser,
      };

    default:
      return state;
  }
};

export { AuthReducer };
