import React from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';

const CustomButton = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View
        style={{
          ...props.style,
          alignItems: 'center',
          paddingVertical: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          {props.children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomButton;
