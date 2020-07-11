import React, { useEffect, useState, useLayoutEffect } from 'react';
import HeaderButton from '../../Components/HeaderButton';
import axios from 'axios';
import {
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import {
  addPickupLocation,
  addDestinationLocation,
} from '../../store/actions/deliveryLocation';

const LocationModal = (props) => {
  const [location, setLocation] = useState(null);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'give permission',
        'Permission to access location was denied'
      );
    }

    let res = await Location.getCurrentPositionAsync({});
    setLocation(res.coords);
    console.log(res);
  };

  useEffect(() => {
    getLocation();
  }, []);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButton
            name="Set Location"
            color="#be95c4"
            onPress={async () => {
              const myApiKey = 'xKY10BBNp7cUAsRjzs70x205CQUqW0bu';
              const res = await axios.get(
                `https://www.mapquestapi.com/geocoding/v1/reverse?key=${myApiKey}&location=${location.latitude}%2C${location.longitude}&outFormat=json&thumbMaps=true`
              );
              console.log(res.data.results[0]['locations'][0]['mapUrl']);
              if (props.route.params.text === 'pickup')
                dispatch(
                  addPickupLocation({
                    ...location,
                    url: res.data.results[0]['locations'][0]['mapUrl'],
                  })
                );
              else
                dispatch(
                  addDestinationLocation({
                    ...location,
                    url: res.data.results[0]['locations'][0]['mapUrl'],
                  })
                );
              props.navigation.goBack();
            }}
          />
        );
      },
    });
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={{
            position: 'absolute',
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            width: '100%',
            bottom: 10,
            zIndex: 100,
            backgroundColor: 'white',
            padding: 30,
          }}
          onSubmitEditing={async (e) => {
            const myApiKey = 'xKY10BBNp7cUAsRjzs70x205CQUqW0bu';
            fetch(
              `https://www.mapquestapi.com/geocoding/v1/address?key=${myApiKey}&inFormat=kvp&outFormat=json&location=${value}&thumbMaps=false`
            )
              .then((response, err) => {
                if (err) console.log(err);
                else return response.json();
              })
              .then((responseJson) => {
                const loc = responseJson.results[0]['locations'][0]['latLng'];
                setLocation({ latitude: loc.lat, longitude: loc.lng });
              });
            console.log(e.nativeEvent.text);
          }}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder="Enter address or drag pin to desired location"
        />
        {location ? (
          <MapView
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0422,
            }}
            style={{
              width: '100%',
              height: '100%',
            }}
            showsMyLocationButton={true}
            showsCompass={true}
            showsUserLocation={true}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            onPress={(e) => {
              setLocation(e.nativeEvent.coordinate);
              console.log(e.nativeEvent.coordinate);
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
              onDragEnd={(e) => {
                setLocation(e.nativeEvent.coordinate);
                console.log(e.nativeEvent.coordinate);
              }}
            ></Marker>
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationModal;
