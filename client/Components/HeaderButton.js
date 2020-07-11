import React from 'react';
import { Text, TouchableOpacity, Button, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const HeaderButton = (props) => {
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <Button color={props.color} title={props.name} onPress={props.onPress} />
    </View>
  );
  // );
};

export default HeaderButton;
