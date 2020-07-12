import React from 'react';

import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import CustomButton from '../../Components/UI/CustomButton';

const FindScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TextInput style={styles.input} placeholder="Enter group name" />
      <Text style={styles.text}>OR</Text>
      <TextInput style={styles.input} placeholder="Enter your pin" />
      <Button color="#586ba4" title="search" />
      <View style={styles.card}>
        <Text style={styles.text}>Group Name : New Group</Text>
        <Text style={styles.text}>Members : 5</Text>
        <Text style={styles.text}>Pickup : Tripura Bus Station, 751002</Text>
        <Text style={styles.text}>
          Destination : Harihar Bus Station,751003
        </Text>
        <CustomButton
          style={styles.button}
          onPress={() => {
            Alert.alert(
              'Request sent',
              'Your request has been sent to group admin. After he confirms you will be added to the group',
              [{ text: 'Understood' }]
            );
          }}
        >
          Request to join
        </CustomButton>
      </View>
    </ScrollView>
  );
};

export default FindScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#324376',
    width: '70%',
    marginVertical: 10,
    padding: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  card: {
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: '#324376',
    paddingVertical: 15,
    marginTop: 10,
  },
  button: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#586ba4',
    marginTop: 8,
  },
});
