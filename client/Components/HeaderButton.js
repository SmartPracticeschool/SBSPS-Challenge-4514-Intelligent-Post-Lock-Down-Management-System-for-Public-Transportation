import React from "react";
import { Text, TouchableOpacity, Button, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const HeaderButton = (props) => {
  // return false ? (
  //   <TouchableOpacity onPress={props.onPress} style={{ paddingHorizontal: 8 }}>
  //     <Text>
  //       <Ionicons name={props.name} size={props.size} color={props.color} />
  //     </Text>
  //   </TouchableOpacity>
  // ) : (
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <Button title={props.name} onPress={props.onPress} />
    </View>
  );
  // );
};

export default HeaderButton;
