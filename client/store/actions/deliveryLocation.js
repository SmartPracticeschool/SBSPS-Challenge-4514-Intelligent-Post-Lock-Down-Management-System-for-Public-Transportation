export const SET_PICKUP_LOCATION = 'SET_PICKUP_LOCATION_DELIVERY';
export const SET_TRANSPORTATION_MODE = 'SET_TRANSPORTATION_MODE_DELIVERY';
export const SET_DESTINATION_LOCATION = 'SET_DESTINATION_LOCATION_DELIVERY';
export const CLEAR_LOCATION = 'CLEAR_LOCATION_DELIVERY';

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
