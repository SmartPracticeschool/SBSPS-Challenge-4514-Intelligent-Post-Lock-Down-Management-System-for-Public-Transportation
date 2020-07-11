import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BookingPage from './screens/BookingPage';
import BookingSuccess from './screens/BookingSuccess';
import GetDetailsPage from './screens/getDetailsPage.';
import PossibleRoutes from './screens/possibleRoutes';
import Location from './screens/Location';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from './screens/user/AuthScreen';
import StartupScreen from './screens/StartupScreen';
import CustomDrawer from './Components/customDrawer';
import UserScreen from './screens/user/userScreen';
import ChatbotScreen from './screens/chatbot/botScreen';
import ProductDetailsScreen from './screens/delivery/productDetailsScreen';
import DeliveryHomeScreen from './screens/delivery/deliveryHomeScreen';
import MapDelivery from './screens/delivery/Location';
import SuccessDelivery from './screens/delivery/successDelivery';
import Scanner from './screens/QRcode/scanner';

import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BookingStack = () => (
  <Stack.Navigator
    initialRouteName="Book"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#2b9348' },
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
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#6a00f4' },
    }}
  >
    <Stack.Screen name="My Profile" component={UserScreen} />
  </Stack.Navigator>
);

const StackDelivery = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#5e548e' },
    }}
  >
    <Stack.Screen name="Delivery" component={DeliveryHomeScreen} />
    <Stack.Screen name="Maps" component={MapDelivery} />
    <Stack.Screen name="Details" component={ProductDetailsScreen} />
    <Stack.Screen name="Success" component={SuccessDelivery} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="Book" shifting={true}>
    <Tab.Screen
      name="Book"
      component={BookingStack}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-bus" size={26} color={color} />;
        },
        tabBarColor: '#55a630',
      }}
    />
    <Tab.Screen
      name="Delivery"
      component={StackDelivery}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-basket" size={26} color={color} />;
        },
        tabBarColor: '#9f86c0',
      }}
    />
    <Tab.Screen
      name="User"
      component={StackUser}
      options={{
        tabBarIcon: ({ color }) => {
          return <Ionicons name="ios-contact" size={26} color={color} />;
        },
        tabBarColor: '#8900f2',
      }}
    />
  </Tab.Navigator>
);

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#7b5a44' },
      }}
    >
      <Stack.Screen name="SmartTransport Bot" component={ChatbotScreen} />
    </Stack.Navigator>
  );
};

const QRcodeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#7b5a44' },
      }}
    >
      <Stack.Screen name="QRcode" component={Scanner} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerStyle={{ backgroundColor: 'white' }}
    drawerContentOptions={{
      labelStyle: {
        color: 'black',
        fontFamily: 'open-sans-bold',
      },
      activeTintColor: 'orange',
    }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Home" component={TabNavigator} />
    <Drawer.Screen name="Chat with us" component={ChatStack} />
    <Drawer.Screen name="Scan QRcode" component={QRcodeStack} />
  </Drawer.Navigator>
);

const logoutStack = () => <Stack.Navigator></Stack.Navigator>;

export default function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
      <Stack.Navigator
        name="main"
        initialRouteName={!token ? 'Logged out' : 'Logged In'}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
