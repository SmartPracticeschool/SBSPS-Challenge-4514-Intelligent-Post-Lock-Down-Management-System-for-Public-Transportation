import React, { useState, useEffect, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';

const ProductDetailsScreen = (props) => {
  const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [pvalue, setPvalue] = useState('');
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [image, setImage] = useState();
  const getPermission = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
  };
  useEffect(() => {
    getPermission();
  }, []);
  const imagePickHandler = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(result);
    } catch (er) {
      Alert.alert('Error occured!', er.message, ['Okay']);
    }
  });
  const takeImageHandler = useCallback(async () => {
    try {
      const res = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: false,
      });
      console.log(res);
      if (!res.cancelled) {
        setImage(res.uri);
      }
    } catch (er) {
      Alert.alert('Error occured!', er.message, ['Okay']);
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.head}>Provide deliverable item details</Text>
      <TextInput
        style={styles.input}
        placeholder="Product name"
        value={productName}
        onChangeText={(str) => setProductName(str)}
      />
      <TextInput
        style={styles.input}
        placeholder="Approximate weight"
        value={weight}
        onChangeText={(str) => setWeight(str)}
      />
      <TextInput
        style={styles.input}
        placeholder="Approximate value"
        value={pvalue}
        onChangeText={(str) => setPvalue(str)}
      />
      <Text style={styles.subhead}>Image of the product</Text>
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        ) : (
          <Text>No image selected</Text>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '80%',
          marginBottom: 10,
        }}
      >
        <Button
          color="#5e548e"
          title="Upload Image"
          onPress={imagePickHandler}
        />
        <Button color="#5e548e" title="Take Image" onPress={takeImageHandler} />
      </View>
      <Text style={styles.head}>Provide Receiver's details</Text>
      <TextInput
        style={styles.input}
        placeholder="Receiver's name"
        value={name}
        onChangeText={(str) => setName(str)}
      />
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={(str) => setEmail(str)}
      />
      <TextInput
        keyboardType="number-pad"
        style={styles.input}
        placeholder="Mobile number"
        value={mobile}
        onChangeText={(str) => setMobile(str)}
      />

      <View style={{ marginVertical: 10, width: '40%' }}>
        <Button
          title="Submit"
          color="#5e548e"
          onPress={() => props.navigation.navigate('Success')}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: '#9f86c0',
    borderBottomWidth: 2,
    marginVertical: 10,
    padding: 5,
  },
  head: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
  subhead: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginVertical: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9f86c0',
    width: '80%',
    height: 300,
    marginVertical: 5,
  },
});
