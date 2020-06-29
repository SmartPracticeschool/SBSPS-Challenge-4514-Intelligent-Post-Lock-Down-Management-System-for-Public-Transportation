import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { BookingStack } from "./StackNavigators";
import { BottomTabNavigator } from "./TabNavigators";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{ backgroundColor: "white" }}
      drawerContentOptions={{
        labelStyle: {
          color: "black",
        },
        activeTintColor: "orange",
      }}
      //   drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Book" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
