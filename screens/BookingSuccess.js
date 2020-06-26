import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { createIconSetFromFontello } from "@expo/vector-icons";

const BookingSuccess = (props) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  //   const x = [
  //     "F",
  //     "i",
  //     "n",
  //     "d",
  //     "i",
  //     "n",
  //     "g",
  //     " B",
  //     "e",
  //     "s",
  //     "t",
  //     " R",
  //     "o",
  //     "u",
  //     "t",
  //     "e",
  //     "s",
  //     " F",
  //     "o",
  //     "r",
  //     " Y",
  //     "o",
  //     "u",
  //     ".",
  //     ".",
  //     ".",
  //   ];
  const x = [
    "Checking all possible routes...",
    "Finding Best Route for you...",
  ];
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
      if (i > x[j].length - 1) {
        setText("");
        i = 0;
        j++;
        console.log(j);
      }

      if (j > x.length - 1) {
        clearInterval(interval);
        setText("Confirming your booking...");
      } else {
        setText((pre) => pre + x[j][i]);
        console.log(x[j][i]);
        i++;
      }
    }, 80);
  }, []);
  const locations = props.route.params.locations;
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "black",
            fontSize: 20,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          {text}
        </Text>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Thanks for Booking!!</Text>
      <Text style={styles.head}>Booking Id : 1234</Text>
      <Text style={styles.mapHead}>Pickup Point</Text>
      <View style={styles.mapContain}>
        <Image
          source={{ uri: locations.pickupUrl }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.mapHead}>Destination</Text>
      <View style={styles.mapContain}>
        <Image
          source={{ uri: locations.destinationUrl }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.head}>
        Transportation Mode : {props.route.params.mode}
      </Text>
      <Text style={styles.head}>Fare : 200</Text>
      <Text style={styles.head}>Confirmation : Pending</Text>
    </View>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    borderColor: "grey",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  mapContain: {
    width: "60%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    height: "20%",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  mapHead: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
