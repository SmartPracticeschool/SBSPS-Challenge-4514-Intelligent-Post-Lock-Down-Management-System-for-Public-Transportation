import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Picker,
  Alert,
  ActivityIndicator,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { clearLocation } from "../store/actions/location";

import axios from "axios";

const GetDetailsPage = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedValue, setSelectedValue] = useState("online");
  const user = useSelector((state) => state.auth.user);
  const location = useSelector((state) => state.location);
  const token = useSelector((state) => state.auth.token);
  let mobile, name, email, pickup, destination, mode;
  if (user) {
    mobile = user.mobile;
    name = user.name;
    email = user.email;
  }
  if (location) {
    mode = location.mode;
    pickup = location.pickup;
    destination = location.destination;
  }

  const getOrderId = useCallback(async (amount) => {
    setIsLoading(true);

    const res = await axios.post(
      "http://192.168.43.206:3000/api/v1/booking/createorder",
      { amount }
    );
    return res.data.data.id;
  });

  const book = useCallback(async (pickup, destination, transportationMode) => {
    console.log(pickup, destination, transportationMode);
    const res = await axios.post(
      "http://192.168.43.206:3000/api/v1/booking/createBooking",
      {
        pickup: JSON.stringify(pickup),
        destination: JSON.stringify(destination),
        transportationMode: transportationMode.toLowerCase(),
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const comp =
    selectedValue === "online" ? (
      <Button
        title="Pay Now"
        onPress={async () => {
          try {
            setError(null);
            const orderId = await getOrderId(2000);
            var options = {
              description: "Book your transport",
              image: "https://i.imgur.com/3g7nmJC.png",
              currency: "INR",
              key: "rzp_test_2EpN77dvZEjRup",
              amount: "2000",
              name: "Smart Transport",
              order_id: orderId, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
              prefill: {
                email: email,
                contact: "+91" + mobile,
                name: name,
              },
              theme: { color: "green" },
            };

            RazorpayCheckout.open(options)
              .then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch((error) => {
                // handle failure
                // setIsLoading(false);
                setIsLoading(false);
                setError(error.description);
              });
          } catch (er) {
            setIsLoading(false);
            setError(er.response.data.message);
          }
        }}
      />
    ) : (
      <Button
        title="Proceed"
        onPress={async (e) => {
          setError(null);
          try {
            setIsLoading(true);
            const bookingDetails = await book(pickup, destination, mode);
            setIsLoading(false);
            props.navigation.replace("Booking Success", { bookingDetails });
            dispatch(clearLocation());
          } catch (er) {
            setError(er.response.data.message);
            setIsLoading(false);
          }
        }}
      />
    );
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10,
          color: "black",
        }}
      >
        Select Payment Method
      </Text>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 150,
            fontSize: 15,
            borderColor: "grey",
            borderWidth: 1,
            color: "black",
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="cash" value="cash" />
          <Picker.Item label="Pay Online" value="online" />
        </Picker>
      </View>
      <View style={{ width: "50%" }}>
        {isLoading ? <ActivityIndicator color="black" /> : comp}
      </View>
    </View>
  );
};

export default GetDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
