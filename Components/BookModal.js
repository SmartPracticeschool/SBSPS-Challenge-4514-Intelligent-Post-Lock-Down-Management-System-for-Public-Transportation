import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from "react-native";

const BookModal = (props) => {
  const height = Dimensions.get("window").height;
  const styles = StyleSheet.create({
    container: {
      width: "98%",
      bottom: props.show ? 0 : -height,
      borderWidth: 1,
      borderColor: "grey",
      zIndex: 50,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    transport: {
      width: "100%",
      borderColor: "grey",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
    },
  });

  const yTranslate = useRef(new Animated.Value(0)).current;
  let negativeHeight = -height + height / 2 + 60;
  console.log(negativeHeight);
  let modalMoveY = yTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  });
  let translateStyle = { transform: [{ translateY: modalMoveY }] };

  useEffect(() => {
    if (props.show) {
      yTranslate.setValue(0);
      Animated.spring(yTranslate, {
        toValue: 1,
        friction: 6,
      }).start();
    } else {
      Animated.timing(yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
      }).start();
    }
  });

  return (
    <Animated.View style={[styles.container, translateStyle]}>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 2,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Available Transports!
        </Text>
        <TouchableNativeFeedback
          onPress={() => {
            props.navigation.navigate("Booking Success", {
              locations: props.urls,
              mode: "Bus",
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Bus</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            props.navigation.navigate("Booking Success", {
              locations: props.urls,
              mode: "Auto",
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Auto</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            props.navigation.navigate("Booking Success", {
              locations: props.urls,
              mode: "Taxi",
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Taxi</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            props.navigation.navigate("Booking Success", {
              locations: props.urls,
              mode: "Bike",
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Bike</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Animated.View>
  );
};

export default BookModal;
