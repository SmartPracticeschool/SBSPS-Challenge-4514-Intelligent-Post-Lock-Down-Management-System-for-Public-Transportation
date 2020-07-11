import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import BookModal from '../Components/BookModal';
import HeaderButton from '../Components/HeadButton';

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
  const pickup = useSelector((state) => state.location.pickup);

  const destination = useSelector((state) => state.location.destination);

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
    <TouchableWithoutFeedback
      onPress={() => {
        setShow(false);
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            paddingVertical: 10,
            color: 'black',
          }}
        >
          Book Your Transport
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
          color="#80b918"
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
            color="#80b918"
            title="Set Destination"
            onPress={() => {
              props.navigation.navigate('Maps', { text: 'destination' });
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            zIndex: 1,
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-around',
          }}
        >
          <Button
            color="#007f5f"
            title="RIDE NOW"
            onPress={() => setShow(true)}
            disabled={!pickup && !destination}
          />
          <Button
            color="#007f5f"
            title="Rental"
            onPress={() => props.navigation.navigate('Possible Routes')}
          />
        </View>
        <BookModal
          navigation={props.navigation}
          show={show}
          urls={{ pickupUrl, destinationUrl }}
        />
      </View>
    </TouchableWithoutFeedback>
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
    height: '30%',
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
