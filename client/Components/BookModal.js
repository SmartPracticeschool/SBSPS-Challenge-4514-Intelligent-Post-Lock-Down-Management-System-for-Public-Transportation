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
import { useDispatch } from "react-redux";
import { setTransportationMode } from "../store/actions/location";

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

  const dispatch = useDispatch();

  const yTranslate = useRef(new Animated.Value(0)).current;
  let negativeHeight = -height + height / 2 + 60;
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
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
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
            color: "black",
          }}
        >
          Available Transports!
        </Text>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Bus"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Bus
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Auto"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Auto
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Taxi"));
            props.navigation.navigate("Possible Routes");
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Taxi
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(setTransportationMode("Bike"));
            props.navigation.navigate("Book Here", {
              screen: "Possible Routes",
              inital: false,
            });
          }}
        >
          <View style={styles.transport}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "black" }}>
              Bike
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Animated.View>
  );
};

export default BookModal;
