import React, { useLayoutEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import HeaderButton from '../../Components/HeadButton';
import Button from '../../Components/UI/CustomButton';
import CardComponent from '../../Components/UI/CardComponent';

const DonationScreen = ({ navigation }) => {
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
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{
            uri:
              'https://m.economictimes.com/thumb/height-450,width-600,imgsize-386084,msid-74847792/food-poor-istock.jpg',
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              opacity: 0.5,
            }}
          ></View>
          <View
            style={{
              width: '60%',
              marginLeft: 20,
              marginTop: 30,
              position: 'absolute',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
                color: 'white',
              }}
            >
              Donate to the needy
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: '300',
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Better health is enjoyed by those who donate their time, expertise
              or money to others who are in need.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.pointContainer}>
        <View style={styles.pointBlock}>
          <Text style={styles.headText}>45</Text>
          <Text style={styles.subText}>Earned by you</Text>
        </View>
        <View style={styles.pointBlock}>
          <Text style={styles.headText}>9k</Text>
          <Text style={styles.subText}>Global Points</Text>
        </View>
        <View style={styles.pointBlock}>
          <Text style={styles.headText}>45</Text>
          <Text style={styles.subText}>All time points</Text>
        </View>
      </View>
      <Button
        style={{
          width: '100%',
          borderRadius: 40,
          backgroundColor: 'green',
          marginTop: 10,
        }}
        onPress={() => {
          navigation.navigate('Details');
        }}
      >
        Donate
      </Button>
      <Text style={{ fontSize: 10 }}>
        Earn minimun 100 points to get reward
      </Text>
      <Text style={styles.head}>Your Donation History</Text>
      <CardComponent
        title="Food"
        buttonDesc="More Details"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS29cSSL4V6fBmmCW4rWpCCAFvltOGPHBjvmg&usqp=CAU"
        desc="You earned 10 points"
        time="On 1st july"
      />
      <CardComponent
        title="Clothes"
        buttonDesc="More Details"
        imageUrl="https://foreveramber.co.uk/wp-content/uploads/2017/01/sell-used-clothes-for-cash.jpg"
        desc="You earned 15 points"
        time="On 31st june"
      />
      <CardComponent
        title="Plastics"
        buttonDesc="More Details"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTlyvjsexA2gIebhy0RtUYSFXFuv7bBcdh_sw&usqp=CAU"
        desc="You earned 20 points"
        time="On 29th may"
      />
    </ScrollView>
  );
};

export default DonationScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    minHeight: Dimensions.get('window').width,
    backgroundColor: '#b07d62',
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  pointContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    height: 100,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  subText: {
    fontWeight: '500',
    color: '#388fc2',
    fontSize: 14,
  },
  head: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginVertical: 10,
    alignSelf: 'baseline',
    marginLeft: 10,
  },
});
