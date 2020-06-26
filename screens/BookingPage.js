import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import BookModal from "../Components/BookModal";

const BookingPage = (props) => {
  const getUrl = async (location, type) => {
    console.log("hello");
    const myApiKey = "xKY10BBNp7cUAsRjzs70x205CQUqW0bu";
    fetch(
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=${myApiKey}&location=${location.latitude}%2C${location.longitude}&outFormat=json&thumbMaps=true`
    )
      .then((response, err) => {
        if (err) console.log(err);
        else return response.json();
      })
      .then((responseJson) => {
        // console.log(responseJson.results[0]["locations"][0]);
        if (type === "pickup")
          setPickupUrl(responseJson.results[0]["locations"][0]["mapUrl"]);
        else
          setDestinationUrl(responseJson.results[0]["locations"][0]["mapUrl"]);
      });
  };

  const pickup = useSelector((state) => state.location.pickup);
  console.log(pickup, "pickup");
  const destination = useSelector((state) => state.location.destination);
  console.log(destination, "destination");
  const [pickupUrl, setPickupUrl] = useState(null);
  const [destinationUrl, setDestinationUrl] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (pickup) {
      getUrl(pickup, "pickup");
    }
    if (destination) {
      getUrl(destination, "destination");
    }
  }, [pickup, destination]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShow(false);
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20, paddingVertical: 10 }}>
          Book Your Transport
        </Text>
        <View style={styles.mapContain}>
          {pickupUrl ? (
            <Image
              source={{ uri: pickupUrl }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text>Not selected yet</Text>
          )}
        </View>
        <Button
          title="Set Pickup point"
          onPress={() => {
            props.navigation.navigate("Maps", { text: "pickup" });
          }}
        />
        <View style={styles.mapContain}>
          {destinationUrl ? (
            <Image
              source={{ uri: destinationUrl }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text>Not selected yet</Text>
          )}
        </View>
        <View style={{ zIndex: 1 }}>
          <Button
            title="Set Destination"
            onPress={() => {
              props.navigation.navigate("Maps", { text: "destination" });
            }}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            zIndex: 1,
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-around",
          }}
        >
          <Button title="RIDE NOW" onPress={() => setShow(true)} />
          <Button title="Rental" onPress={() => setShow(true)} />
        </View>
        <BookModal
          navigation={props.navigation}
          show={show}
          urls={{ pickupUrl, destinationUrl }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BookingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 1,
  },
  mapContain: {
    width: "80%",
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    height: "30%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
