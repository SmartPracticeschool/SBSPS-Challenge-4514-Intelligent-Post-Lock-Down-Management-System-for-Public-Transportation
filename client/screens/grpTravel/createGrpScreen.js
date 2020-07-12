import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import CustomButtom from '../../Components/UI/CustomButton';

const CreaetGrp = (props) => {
  const [grpName, setGrpName] = useState('');
  const [mnum, setMnum] = useState('1');
  const [emails, setEmails] = useState([]);

  let el = [];
  for (let i = 0; i < mnum * 1; i++) {
    el.push(
      <TextInput
        key={i}
        style={styles.input}
        value={emails[i]}
        placeholder={`Enter email of member ${i + 1}`}
        keyboardType="email-address"
        onChangeText={(str) =>
          setEmails((pre) => {
            pre[i] = str;
            return pre;
          })
        }
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.head}>Enter group details</Text>
      <TextInput
        style={styles.input}
        placeholder="Group name"
        value={grpName}
        onChangeText={(str) => setGrpName(str)}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of members"
        value={mnum}
        onChangeText={(str) => setMnum((str * 1) % 10)}
        keyboardType="numeric"
      />

      {el}
      <CustomButtom
        style={styles.button}
        onPress={() =>
          Alert.alert(
            'Success!',
            `Group "${grpName}" created succefully! Use group name to book in group.`,
            [{ text: 'Okay' }]
          )
        }
      >
        Create Group
      </CustomButtom>
    </ScrollView>
  );
};

export default CreaetGrp;

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: '#324376',
    borderBottomWidth: 2,
    marginVertical: 10,
    padding: 5,
  },
  short: {
    width: '50%',
    borderBottomColor: '#324376',
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
  button: {
    width: '80%',
    backgroundColor: '#586ba4',
    borderRadius: 20,
    marginVertical: 10,
  },
});
