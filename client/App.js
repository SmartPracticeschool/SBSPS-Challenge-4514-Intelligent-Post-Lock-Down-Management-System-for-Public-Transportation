import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BookingPage from "./screens/BookingPage";
import BookingSuccess from "./screens/BookingSuccess";
import GetDetailsPage from "./screens/getDetailsPage.";
import PossibleRoutes from "./screens/possibleRoutes";
import Location from "./screens/Location";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "./screens/user/AuthScreen";
import StartupScreen from "./screens/StartupScreen";
import CustomDrawer from "./Components/customDrawer";
import UserScreen from "./screens/user/userScreen";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BookingStack = () => (
  <Stack.Navigator
    initialRouteName="Book"
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "red" },
    }}
  >
    <Stack.Screen name="Book" component={BookingPage} />
    <Stack.Screen name="Possible Routes" component={PossibleRoutes} />

    <Stack.Screen name="Payment Details" component={GetDetailsPage} />

    <Stack.Screen name="Booking Success" component={BookingSuccess} />
    <Stack.Screen name="Maps" component={Location} />
  </Stack.Navigator>
);

const StackUser = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: { backgroundColor: "blue" },
    }}
  >
    <Stack.Screen name="My Profile" component={UserScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Book" shifting={true}>
    <Tab.Screen
      name="Book Here"
      component={BookingStack}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-home" size={26} color={color} />;
        },
        tabBarColor: "red",
      }}
    />
    <Tab.Screen
      name="User"
      component={StackUser}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-gift" size={26} color={color} />;
        },
        tabBarColor: "blue",
      }}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerStyle={{ backgroundColor: "white" }}
    drawerContentOptions={{
      labelStyle: {
        color: "black",
        fontFamily: "open-sans-bold",
      },
      activeTintColor: "orange",
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={TabNavigator} />

    {/* <Drawer.Screen name="Filters" component={} /> */}
  </Drawer.Navigator>
);

const logoutStack = () => <Stack.Navigator></Stack.Navigator>;

export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      {/* {!token ? (
        <Stack.Navigator>
          <Stack.Screen name="Logging In" component={StartupScreen} />
          <Stack.Screen name="Signin" component={AuthScreen} />
        </Stack.Navigator>
      ) : (
        <DrawerNavigator />
      )} */}
      <Stack.Navigator
        name="main"
        initialRouteName={!token ? "Logged out" : "Logged In"}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Logging In"
          component={StartupScreen}
        />
        <Stack.Screen name="Signin" component={AuthScreen} />

        <Stack.Screen
          name="Logged In"
          options={{ headerShown: false }}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

// {!token ? (
//   <Stack.Navigator>
//     <Stack.Screen name="Logging In" component={StartupScreen} />
//     <Stack.Screen name="Signin" component={AuthScreen} />
//   </Stack.Navigator>
// ) : (
//   <DrawerNavigator />
// )}
