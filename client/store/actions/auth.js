import { AsyncStorage, TextPropTypes } from 'react-native';
import axios from 'axios';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const signup = (email, password, passwordConfirm, name, mobile) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://192.168.43.206:3000/api/v1/users/signup',

        {
          email: email,
          password: password,
          name: name,
          mobile: mobile,
          passwordConfirmation: passwordConfirm,
        }
      );

      const resData = response.data;
      console.log(resData);
      dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
      saveDataToStorage(resData.token, resData.user, expirationDate);
    } catch (er) {
      throw new Error(er.response.data.message);
    }
  };
};

export const googleLogin = (idToken) => {
  return async (dispatch) => {
    const response = await axios.post(
      'http://192.168.43.206:3000/api/v1/users/login',
      { method: 'google', idToken }
    );
    const resData = response.data;
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const facebookLogin = (accessToken) => {
  console.log('hh');
  return async (dispatch) => {
    const response = await axios.post(
      'http://192.168.43.206:3000/api/v1/users/login',
      { method: 'facebook', accessToken }
    );
    const resData = response.data;
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      'http://192.168.43.206:3000/api/v1/users/login',
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const resData = response.data;
    console.log(resData);
    dispatch(authenticate(resData.user, resData.token, resData.expiresIn));
    const expirationDate = new Date(new Date().getTime() + resData.expiresIn);
    saveDataToStorage(resData.token, resData.user, expirationDate);
  };
};

export const authenticate = (user, token, expiryTime) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, user: user, token: token });
  };
};

const saveDataToStorage = (token, user, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      user: user,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const logout = () => {
  // clearLogoutTimer();
  console.log('logging out');
  AsyncStorage.removeItem('userData');
  console.log('removed');
  return { type: LOGOUT };
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
