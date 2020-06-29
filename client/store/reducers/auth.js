import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log("hmmm");
      return {
        token: action.token,
        user: action.user,
      };
    case LOGOUT:
      console.log("ehllo");
      return { ...initialState };
    default:
      console.log("some");
      return state;
  }
};
