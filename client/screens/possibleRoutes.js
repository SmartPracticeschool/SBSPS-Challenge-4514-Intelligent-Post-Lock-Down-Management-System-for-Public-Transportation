import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const PossibleRoutes = (props) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const x = [
    'Checking all possible routes...',
    'Finding Best Route for you...',
  ];
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 6000);
    let i = 0;
    let j = 0;
    const interval = setInterval(() => {
      if (i > x[j].length - 1) {
        setText('');
        i = 0;
        j++;
        console.log(j);
      }

      if (j > x.length - 1) {
        clearInterval(interval);
        setText('Confirming your booking...');
      } else {
        setText((pre) => pre + x[j][i]);
        console.log(x[j][i]);
        i++;
      }
    }, 80);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
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
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 20,
          marginVertical: 20,
        }}
      >
        All best possible routes are shown below..
      </Text>
      <Button
        color="#007f5f"
        title="next page"
        onPress={() => {
          props.navigation.navigate('Payment Details');
          // props.navigation.push("Payment Details");
        }}
      />
    </View>
  );
};

export default PossibleRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
