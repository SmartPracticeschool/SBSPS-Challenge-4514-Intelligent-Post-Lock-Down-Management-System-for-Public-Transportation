import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";

const BookingSuccess = (props) => {
  const bookingDetails = props.route.params.bookingDetails;
  console.log(bookingDetails);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headText}>Thanks for Booking!!</Text>
      <Text style={styles.head}>Booking Id : {bookingDetails._id}</Text>
      <Text style={styles.mapHead}>Pickup Point</Text>
      <View style={styles.mapContain}>
        <Image
          source={{ uri: JSON.parse(bookingDetails.pickup).url }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.mapHead}>Destination</Text>
      <View style={styles.mapContain}>
        <Image
          source={{ uri: JSON.parse(bookingDetails.destination).url }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text style={styles.head}>
        Transportation Mode : {bookingDetails.transportationMode}
      </Text>
      <Text style={styles.head}>Fare : 200</Text>
      <Text style={styles.head}>Confirmation : Pending</Text>
      <Text style={styles.head}>
        Booked on : {bookingDetails.createdAt.slice(0, 10)}
      </Text>
      <Button
        title="Okay"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </ScrollView>
  );
};

export default BookingSuccess;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  head: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 7,
    borderColor: "grey",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "black",
  },
  mapContain: {
    width: "50%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    height: 130,
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
    color: "black",
  },
});
