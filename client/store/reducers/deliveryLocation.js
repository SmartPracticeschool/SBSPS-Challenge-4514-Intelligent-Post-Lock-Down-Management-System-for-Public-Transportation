import {
  SET_DESTINATION_LOCATION,
  SET_PICKUP_LOCATION,
  SET_TRANSPORTATION_MODE,
  CLEAR_LOCATION,
} from '../actions/deliveryLocation';

const initialState = {
  pickup: null,
  destination: null,
  mode: null,
};

export const deliveryLocationReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICKUP_LOCATION:
      return Object.assign({}, state, { pickup: action.location });
    case SET_DESTINATION_LOCATION:
      return Object.assign({}, state, { destination: action.location });
    case SET_TRANSPORTATION_MODE:
      return Object.assign({}, state, { mode: action.mode });
    case CLEAR_LOCATION:
      return initialState;
    default:
      return state;
  }
};
