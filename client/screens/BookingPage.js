import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BookModal from '../Components/BookModal';
import HeaderButton from '../Components/HeadButton';
import BackDrop from '../Components/UI/Backdrop';
import NameModal from '../Components/UI/Modal';
import { useDispatch } from 'react-redux';
import { resetGroup } from '../store/actions/location';

const BookingPage = (props) => {
  const dispatch = useDispatch(dispatch);
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
  const isGroup = useSelector((state) => state.location.groupId);

  const [pickupUrl, setPickupUrl] = useState(null);
  const [destinationUrl, setDestinationUrl] = useState(null);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (pickup) setPickupUrl(pickup.url);
    else setPickupUrl(null);
    if (destination) setDestinationUrl(destination.url);
    else setDestinationUrl(null);
    setShow(false);
  }, [pickup, destination]);
  const travelHandler = useCallback(() => {
    setModal(false);
  });
  return (
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
      <View style={{ zIndex: 1 }}>
        <Button
          color="#80b918"
          title="Set Pickup point"
          onPress={() => {
            props.navigation.navigate('Maps', { text: 'pickup' });
          }}
        />
      </View>
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
          disabled={!pickup && !destination}
        />
        {!isGroup ? (
          <Button
            color="#007f5f"
            title="Group Travel"
            onPress={() => setModal(true)}
            disabled={!pickup && !destination}
          />
        ) : (
          <Button title="Cancel Group" onPress={() => dispatch(resetGroup())} />
        )}
      </View>
      <BookModal
        navigation={props.navigation}
        show={show}
        urls={{ pickupUrl, destinationUrl }}
      />
      <BackDrop
        show={show || modal}
        press={() => {
          setShow(false);
          setModal(false);
        }}
      />
      <NameModal
        title="Enter Group Name"
        show={modal}
        cancel={() => setModal(false)}
        press={travelHandler}
      />
    </View>
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
