import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../Components/UI/CustomButton';
import HeaderButton from '../../Components/HeadButton';

const BookingScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-arrow-round-back"
            color="white"
            size={38}
            onPress={() => {
              navigation.goBack();
            }}
          />
        );
      },
    });
  });
  return (
    <View style={styles.screen}>
      <Text numberOfLines={1} style={styles.head}>
        Travel in group to avail discounts
      </Text>

      <Button style={styles.button}>Group Invitations</Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Find Group')}
      >
        Find a group
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Create Group')}
      >
        Create a group
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('Book')}>
        Book Your Travel
      </Button>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  button: {
    width: '80%',
    backgroundColor: '#586ba4',
    borderRadius: 20,
    marginVertical: 10,
  },
});
