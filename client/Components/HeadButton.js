import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const HeaderButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{ paddingHorizontal: 12 }}>
      <Ionicons name={props.name} size={props.size} color="white" />
    </TouchableOpacity>
  );
};

export default HeaderButton;
