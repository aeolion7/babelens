import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Picker, View, Switch } from 'react-native';
import { connect } from 'react-redux';
import { setSource, setTarget } from '../store/language';
import { toggleOptimization } from '../store/settings';
import LanguageSelector from '../components/LanguageSelector';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            marginTop: 25,
            marginBottom: 0,
          }}
        >
          Please specify your source (left) and destination (right) languages:
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <LanguageSelector
            initialValue={this.props.sourceLanguage}
            changeLanguage={language =>
              this.props.changeSourceLanguage(language)
            }
            style={{ width: '50%' }}
          />
          <LanguageSelector
            initialValue={this.props.targetLanguage}
            changeLanguage={language =>
              this.props.changeTargetLanguage(language)
            }
            style={{ width: '50%' }}
          />
        </View>
        <View style={{ paddingTop: 20 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Text style={{ fontSize: 24 }}>Handwriting Mode</Text>
            <Switch
              value={this.props.documentOptimization}
              onValueChange={this.props.switchOptimizationMode}
            />
          </View>
          <Text style={{ padding: 10 }}>
            Enable this option for greater accuracy in the recognition of
            handwriting. This may also perform better if you are trying to
            recognize text that is more densely spaced, such as in a document.
          </Text>
        </View>
        <ExpoConfigView />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    documentOptimization: state.settings.optimization,
    sourceLanguage: state.language.sourceLanguage,
    targetLanguage: state.language.targetLanguage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSourceLanguage: newSource => {
      dispatch(setSource(newSource));
    },
    changeTargetLanguage: newTarget => {
      dispatch(setTarget(newTarget));
    },
    switchOptimizationMode: () => {
      dispatch(toggleOptimization());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
