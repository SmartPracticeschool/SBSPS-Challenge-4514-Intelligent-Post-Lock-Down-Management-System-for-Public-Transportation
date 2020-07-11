import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import HeaderButton from '../../Components/HeadButton';

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused, setFocused] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-arrow-round-back"
            color="white"
            size={38}
            onPress={() => {
              navigation.goBack();
            }}
          />
        );
      },
    });
  });
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    const uns = navigation.addListener('focus', () => {
      setFocused(true);
    });
    navigation.addListener('blur', () => {
      setFocused(false);
    });
    return uns;
  }, [navigation]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!isFocused) return null;
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}
    >
      <Camera
        style={{ width: '100%', height: '80%', zIndex: 2 }}
        type={type}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(res) => {
          console.log(res);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            // flexDirection: 'row',
          }}
        >
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
              {' '}
              Flip{' '}
            </Text>
          </TouchableOpacity> */}
        </View>
      </Camera>
    </View>
  );
};

export default Scanner;
