import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

const CardComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.sub}>{props.desc}</Text>
          <Text style={styles.sub}>{props.time}</Text>
          <View
            style={{
              width: '100%',
              bottom: 5,
              right: 2,
            }}
          >
            <Button
              color="green"
              title={props.buttonDesc}
              onPress={props.onPress}
            />
          </View>
        </View>
        <Image
          source={{ uri: props.imageUrl }}
          style={{ width: '40%', height: '100%' }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 10,
    width: '99%',
    backgroundColor: 'black',
    borderRadius: 50,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  textContainer: {
    width: '60%',
    height: '100%',
    paddingLeft: 30,
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  sub: {
    fontSize: 17,
    marginBottom: 7,
    color: 'white',
  },
});
