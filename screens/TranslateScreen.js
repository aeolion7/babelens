import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { translatedTextDirectly } from '../store/text';
import { YANDEX_KEY } from '../assets/secrets';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class TranslateScreen extends React.Component {
  static navigationOptions = {
    title: 'Text Translation',
  };

  state = {
    text: '',
    translatedText: '',
  };

  _translateText = async () => {
    const { sourceLang, targetLang } = this.props;
    const { text } = this.state;
    try {
      const translation = await fetch(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${text}&lang=${sourceLang}-${targetLang}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const translationJSON = await translation.json();
      if (
        !(translationJSON && translationJSON.text && translationJSON.text[0])
      ) {
        Alert.alert('An error occured during translation. Please try again.');
      } else {
        const translatedResult = translationJSON.text[0];
        Alert.alert(translatedResult);
        this.setState({ translatedText: translatedResult });
        this.props.storeTextObj(this.state.text, this.state.translatedText);
      }
    } catch (err) {
      console.error('There was an error in translation: ', err);
    }
  };

  render() {
    return (
      <DismissKeyboard>
        <View style={{ backgroundColor: '#fefefe', flex: 10 }}>
          <View style={{ padding: 20, flex: 9 }}>
            <TextInput
              multiline={true}
              style={{
                flex: 7,
                fontWeight: '300',
                fontSize: 32,
                backgroundColor: '#fefefe',
                borderRadius: 20,
              }}
              placeholder="You may enter text here and translate it directly using the language options in the Settings tab."
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              ref={input => {
                this.textInput = input;
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <Button
              title="Clear"
              onPress={() => {
                this.textInput.clear();
              }}
              style={{ flex: 1 }}
            />
            <Button
              title="Translate"
              onPress={() => {
                this._translateText(this.state.text);
              }}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    sourceLang: state.language.sourceLanguage,
    targetLang: state.language.targetLanguage,
    lastDetectedText: state.text.lastDetectedText,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeTextObj: (recognizedText, translatedText) => {
      const textObj = {
        recognizedText,
        translatedText,
      };
      dispatch(translatedTextDirectly(textObj));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateScreen);
