import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setGroup } from '../../store/actions/location';

const NameModal = (props) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  if (!props.show) return null;
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          marginVertical: 5,
        }}
      >
        {props.title}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(s) => setValue(s)}
        placeholder="Group Name"
        autoFocus
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableNativeFeedback onPress={props.cancel}>
          <View style={{ width: '50%', padding: 10 }}>
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              CANCEL
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            if (value.length > 0) {
              dispatch(setGroup(value));
              props.press();
            }
            setValue('');
          }}
        >
          <View style={{ width: '50%', padding: 10 }}>
            <Text
              style={{
                color: 'blue',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}
            >
              OK
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default NameModal;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    zIndex: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    top: '40%',
    // translateY:
  },
  input: {
    marginVertical: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 5,
    width: '90%',
  },
});
