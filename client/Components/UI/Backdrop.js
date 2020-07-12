import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const Backdrop = (props) => {
  if (!props.show) return null;
  return (
    <TouchableWithoutFeedback onPress={props.press}>
      <View
        style={{
          width: '100%',
          height: '100%',
          zIndex: 2,
          backgroundColor: 'black',
          //   backgroundColor: 'transparent',
          opacity: 0.4,
          position: 'absolute',
        }}
      ></View>
    </TouchableWithoutFeedback>
  );
};

export default Backdrop;
