export const SET_PICKUP_LOCATION = "SET_PICKUP_LOCATION";
export const SET_TRANSPORTATION_MODE = "SET_TRANSPORTATION_MODE";
export const SET_DESTINATION_LOCATION = "SET_DESTINATION_LOCATION";
export const CLEAR_LOCATION = "CLEAR_LOCATION";

export const addPickupLocation = (location) => {
  return { type: SET_PICKUP_LOCATION, location };
};

export const addDestinationLocation = (location) => {
  return { type: SET_DESTINATION_LOCATION, location };
};

export const setTransportationMode = (mode) => {
  return { type: SET_TRANSPORTATION_MODE, mode };
};

export const clearLocation = () => {
  return { type: CLEAR_LOCATION };
};
