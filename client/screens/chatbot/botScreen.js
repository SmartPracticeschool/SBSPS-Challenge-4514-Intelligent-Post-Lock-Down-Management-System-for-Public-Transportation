import React, { useCallback, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { IconButton } from 'react-native-paper';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import HeaderButton from '../../Components/HeadButton';

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: 'white',
          borderRadius: 5,
        },
        left: {
          backgroundColor: 'white',
          borderRadius: 5,
        },
      }}
      textStyle={{
        right: {
          color: 'black',
        },
      }}
    />
  );
}
const BotScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  let img =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC';
  if (user) {
    if (user.photo) img = user.photo;
  }
  function renderSend(props) {
    if (loading)
      return (
        <View style={{ alignSelf: 'center', paddingHorizontal: 20 }}>
          <ActivityIndicator color="#ab8365" />
        </View>
      );
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={40} color="#ab8365" />
        </View>
      </Send>
    );
  }
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButton
            name="ios-arrow-round-back"
            color="white"
            size={38}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        );
      },
    });
  });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello! How can I help you?',

      user: {
        _id: 2,
        name: 'React Native',
        avatar:
          'https://www.seekpng.com/png/small/521-5210550_download-svg-download-png-astronaut-emoji.png',
      },
    },
  ]);
  const recieveMessage = async (mess) => {
    try {
      console.log(mess);
      const res = await fetch(
        'https://api.eu-de.assistant.watson.cloud.ibm.com/v2/assistants/4d523037-72b3-4759-af0a-a650a2694dcb/message?version=2020-04-01',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Basic ' +
              'YXBpa2V5Okt6UTJzZjlReGNzcFptc1dBdmNkMGtONmpxY0pYb2E1UkV2WjkxWS15aW1T',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: { text: mess } }),
        }
      );
      const response = await res.json();
      const text = response.output.generic[0].text;

      setMessages((prev) =>
        GiftedChat.append(prev, [
          {
            _id: prev.length,
            text: text,
            user: {
              _id: 2,
              name: 'Bot',
              avatar:
                'https://www.seekpng.com/png/small/521-5210550_download-svg-download-png-astronaut-emoji.png',
            },
          },
        ])
      );
      setLoading(false);
    } catch (er) {
      console.log(er);
    }
  };
  const onSend = useCallback((messages = []) => {
    setLoading(true);
    console.log(messages, 'messages');
    console.log('hello');
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    recieveMessage(messages[0].text);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      placeholder="Enter your qurey here.."
      onSend={(messages) => {
        onSend(
          messages.map((el) => {
            return {
              _id: el._id,
              text: el.text,
              user: { ...el.user, avatar: img },
            };
          })
        );
        console.log(messages);
      }}
      renderSend={renderSend}
      alwaysShowSend
      renderBubble={renderBubble}
      showUserAvatar
    />
  );
};

export default BotScreen;

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
