import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

const ChatbotScreen = (props) => {
  const [inp, setInp] = useState('');
  const [messages, setMessages] = useState(['hello']);

  const addMessage = (message) => {
    setMessages((pre) => {
      return [...pre, message];
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ bottom: 70 }}>
        {messages.map((el) => {
          return (
            <View key={el}>
              <Text style={styles.message}>{el}</Text>
            </View>
          );
        })}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Enter your query.."
        value={inp}
        onChangeText={(str) => setInp(str)}
        onSubmitEditing={(e) => {
          console.log(e.nativeEvent.text);
          addMessage(e.nativeEvent.text);
          setInp('');
        }}
      />
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({
  screen: {
    minHeight: Dimensions.get('window').height - 50,
  },
  input: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'grey',
    bottom: 10,
    width: '100%',
    height: 60,
    backgroundColor: '#e0dcdc',
    alignSelf: 'center',
  },
  message: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 5,
    paddingVertical: 5,
    fontSize: 25,
  },
});
