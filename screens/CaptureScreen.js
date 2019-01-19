import React from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { WebBrowser, Camera, Permissions } from 'expo';
import { connect } from 'react-redux';
import { API_KEY, YANDEX_KEY } from '../assets/secrets';

import { MonoText } from '../components/StyledText';

class CaptureScreen extends React.Component {
  state = {
    imageUri: null,
    hasCameraPermission: null,
    isLoading: false,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _snap = async () => {
    try {
      if (this.camera) {
        let photo = await this.camera.takePictureAsync({ base64: true });
        this.setState({ imageUri: photo.base64 });
        this._convertToText();
      } else {
        console.log('There is no camera or the camera is inaccessible.');
      }
    } catch (err) {
      console.error('An error occured while taking the picture:', err);
    }
  };

  _convertToText = async () => {
    try {
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' + API_KEY,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: this.state.imageUri,
                },
                features: [
                  {
                    type: 'DOCUMENT_TEXT_DETECTION',
                    maxResults: 1,
                  },
                ],
              },
            ],
          }),
        }
      );
      const responseJSON = await response.json();
      if (
        !(
          responseJSON &&
          responseJSON.responses &&
          responseJSON.responses[0] &&
          responseJSON.responses[0].fullTextAnnotation
        )
      ) {
        console.log(
          'There was no readable text in your image. Please try again.'
        );
      } else {
        const text = responseJSON.responses[0].fullTextAnnotation.text;
        this._translate(text);
      }
    } catch (err) {
      console.error('An error occurred during text conversion:', err);
    }
  };

  _translate = async text => {
    try {
      const translation = await fetch(
        `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${YANDEX_KEY}&text=${text}&lang=en-de`,
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
        console.log('There was an error in translation.');
      } else {
        Alert.alert(translationJSON.text[0]);
      }
    } catch (err) {
      console.error('There was an error in translation: ', err);
    }
  };

  static navigationOptions = {
    title: 'BabelLens',
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if (this.state.imageUri) {
        imageView = (
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: this.state.imageUri }}
          />
        );
      }
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            />
          </Camera>
          <Button
            title="Capture Image"
            onPress={() => {
              this._snap();
            }}
          />
        </View>
      );
    }
  }
}

export default connect(null)(CaptureScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
