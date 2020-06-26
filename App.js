import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Location from "./screens/Location";
import { NavigationContainer } from "@react-navigation/native";
import { locationReducer } from "./store/reducers/location";
import { BookingStack } from "./navigator/StackNavigators";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({ location: locationReducer });

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BookingStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
