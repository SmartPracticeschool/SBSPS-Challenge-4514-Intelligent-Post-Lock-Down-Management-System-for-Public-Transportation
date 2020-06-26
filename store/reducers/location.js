import {
  SET_DESTINATION_LOCATION,
  SET_PICKUP_LOCATION,
} from "../actions/location";

const initialState = {
  pickup: null,
  destination: null,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKUP_LOCATION:
      return Object.assign({}, state, { pickup: action.location });
    case SET_DESTINATION_LOCATION:
      return Object.assign({}, state, { destination: action.location });
    default:
      return state;
  }
};
