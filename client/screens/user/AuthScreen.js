import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import FacebookLoginButton from '../../Components/facebookLoginButton';
// import * as GoogleSignIn from "expo-google-sign-in";
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import GoogleSigninButton from '../../Components/googleSiginButton';

import Input from '../../Components/UI/Input';
import Card from '../../Components/UI/Card';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (!user) {
      console.log('running..');
      GoogleSignin.configure({
        webClientId:
          '783346339308-k3daq805ntuqlav62d9avv90os6md0nb.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
        androidClientId:
          '783346339308-85sonk0u6fvichboudktdedebfi84eot.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
      });
      // initAsync();
    }
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async (type, idToken = null) => {
    let action;
    if (type === 'facebook') {
      console.log('hello');
      action = authActions.facebookLogin(idToken);
    } else if (type === 'google') {
      action = authActions.googleLogin(idToken);
    } else if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
        formState.inputValues.passwordConfirm,
        formState.inputValues.name,
        formState.inputValues.mobile
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      console.log('hello');
      await dispatch(action);
      props.navigation.replace('Logged In');
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const login = async () => {
    try {
      const res = await GoogleSignin.hasPlayServices();
      console.log(res);
      const info = await GoogleSignin.signIn();
      console.log({ userInfo: info });
      await authHandler('google', info.idToken);
      await GoogleSignin.signOut();
    } catch (er) {
      console.log(er);
      console.log(statusCodes[er.code]);
    }
  };

  const facebookLogin = async () => {
    try {
      setError(null);
      const res = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (res.isCancelled) {
        setError('Login is cancelled');
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken();
        authHandler('facebook', accessToken.accessToken);
      }
      LoginManager.logOut();
    } catch (er) {
      setError(er.response.data.message);
    }
  };

  return (
    <View behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isSignup ? (
              <>
                <Input
                  id="passwordConfirm"
                  label="Confirm Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="name"
                  label="Name"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid name."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                <Input
                  id="mobile"
                  label="Mobile"
                  keyboardType="phone-pad"
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
              </>
            ) : null}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={'red'} />
              ) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  color={'red'}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={'green'}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
        <GoogleSigninButton onPress={login} style={{ width: '80%' }}>
          SignIn with google
        </GoogleSigninButton>
        <FacebookLoginButton onPress={facebookLogin} style={{ width: '80%' }}>
          Signin with facebook
        </FacebookLoginButton>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
