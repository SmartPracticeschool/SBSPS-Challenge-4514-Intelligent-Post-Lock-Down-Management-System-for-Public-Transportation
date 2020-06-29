import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { BookingStack } from "./StackNavigators";
import BookingPage from "../screens/BookingPage";
const Tab = createMaterialBottomTabNavigator();
export const BottomTabNavigator = () => {
  return (
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
        name="Donation"
        component={BookingPage}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-gift" size={26} color={color} />;
          },
          tabBarColor: "orange",
        }}
      />
      <Tab.Screen
        name="HelpStack"
        component={BookingStack}
        options={{
          title: "Help",
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-basket" size={26} color={color} />;
          },
          tabBarColor: "green",
        }}
      />
      <Tab.Screen
        name="Volunteer"
        component={BookingStack}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-people" size={26} color={color} />;
          },
          tabBarColor: "blue",
        }}
      />
    </Tab.Navigator>
  );
};
