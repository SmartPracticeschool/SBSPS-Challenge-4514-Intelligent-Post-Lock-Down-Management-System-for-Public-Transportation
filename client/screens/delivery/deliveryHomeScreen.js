import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import HeaderButton from '../../Components/HeadButton';

const BookingPage = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-menu"
            color="white"
            size={25}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        );
      },
    });
  });
  const pickup = useSelector((state) => state.deliveryLocation.pickup);

  const destination = useSelector(
    (state) => state.deliveryLocation.destination
  );

  const [pickupUrl, setPickupUrl] = useState(null);
  const [destinationUrl, setDestinationUrl] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (pickup) setPickupUrl(pickup.url);
    else setPickupUrl(null);
    if (destination) setDestinationUrl(destination.url);
    else setDestinationUrl(null);
    setShow(false);
  }, [pickup, destination]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          paddingVertical: 10,
          color: 'black',
        }}
      >
        Set Delivery Locations
      </Text>
      <View style={styles.mapContain}>
        {pickupUrl ? (
          <Image
            source={{ uri: pickupUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Text>Not selected yet</Text>
        )}
      </View>
      <Button
        color="#5e548e"
        title="Set Pickup point"
        onPress={() => {
          props.navigation.navigate('Maps', { text: 'pickup' });
        }}
      />
      <View style={styles.mapContain}>
        {destinationUrl ? (
          <Image
            source={{ uri: destinationUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Text>Not selected yet</Text>
        )}
      </View>
      <View style={{ zIndex: 1 }}>
        <Button
          color="#5e548e"
          title="Set Drop Location"
          onPress={() => {
            props.navigation.navigate('Maps', { text: 'destination' });
          }}
        />
      </View>

      <View style={{ width: '80%', marginVertical: 20 }}>
        <Button
          title="Request for delivery"
          color="#5e548e"
          onPress={() => props.navigation.navigate('Details')}
        />
      </View>
    </ScrollView>
  );
};

export default BookingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapContain: {
    width: '80%',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 200,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
