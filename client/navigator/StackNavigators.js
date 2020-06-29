import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LocationModal from "../screens/Location";
import BookingPage from "../screens/BookingPage";
import BookingSuccess from "../screens/BookingSuccess";
import GetDetailsPage from "../screens/getDetailsPage.";
import PossibleRoutes from "../screens/possibleRoutes";

const Stack = createStackNavigator();

export const BookingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Book"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "green" },
      }}
    >
      <Stack.Screen name="Book" component={BookingPage} />
      <Stack.Screen name="Possible Routes" component={PossibleRoutes} />

      <Stack.Screen name="Payment Details" component={GetDetailsPage} />

      <Stack.Screen name="Booking Success" component={BookingSuccess} />
      <Stack.Screen name="Maps" component={LocationModal} />
    </Stack.Navigator>
  );
};
