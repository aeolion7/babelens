import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
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
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#2F85D6',
      borderBottomColor: '#222',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: 'Avenir',
    },
  };

  state = {
    text: '',
    translatedText: '',
    isLoading: false,
  };

  _translateText = async () => {
    const { sourceLang, targetLang } = this.props;
    const { text } = this.state;
    if (!this.state.text) {
      Alert.alert(
        'No text to translate has been entered. Please enter the text that you would like to translate.'
      );
    } else {
      try {
        this.setState({ isLoading: true });
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
          this.setState({ isLoading: false });
        } else {
          const translatedResult = translationJSON.text[0];
          Alert.alert(translatedResult);
          this.setState({ translatedText: translatedResult, isLoading: false });
          this.props.storeTextObj(this.state.text, this.state.translatedText);
        }
      } catch (err) {
        console.error('There was an error in translation: ', err);
      }
    }
  };

  render() {
    return (
      <DismissKeyboard>
        <View style={{ backgroundColor: '#eaeaea', flex: 10 }}>
          <View style={{ padding: 40, flex: 9 }}>
            <TextInput
              multiline={true}
              style={{
                flex: 7,
                fontWeight: '300',
                fontSize: 32,
                backgroundColor: '#eaeaea',
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
          {this.state.isLoading && (
            <ActivityIndicator
              size="large"
              color="#1f75dc"
              style={{ left: 195, top: 285, position: 'absolute' }}
            />
          )}
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
              color="red"
            />
            <Button
              title="Translate"
              onPress={() => {
                this._translateText(this.state.text);
              }}
              style={{ flex: 1 }}
              color="blue"
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
