import React from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setSource, setTarget } from '../store/language';
import { toggleOptimization, toggleOCRPreview } from '../store/settings';
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
            textAlign: 'center',
            fontSize: 32,
            paddingTop: 25,
            paddingBottom: 5,
            fontWeight: '200',
          }}
        >
          Translate text
        </Text>
        <View
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <Text style={styles.selectorLabels}>from:</Text>
          <Text style={styles.selectorLabels}>to:</Text>
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
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}
          >
            <Text style={styles.settingHeader}>Document/Handwriting Mode</Text>
            <Switch
              value={this.props.documentOptimization}
              onValueChange={this.props.switchOptimizationMode}
            />
          </View>
          <Text style={{ padding: 10 }}>
            Enable this option for greater handwriting recognition accuracy.
            This will also better recognize text in more densely spaced formats,
            such as in a document.
          </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}
          >
            <Text style={styles.settingHeader}>Display OCR Preview</Text>
            <Switch
              value={this.props.previewOCR}
              onValueChange={this.props.switchOCRPreview}
            />
          </View>
          <Text style={{ padding: 10 }}>
            This option provides you with a preview of the text that was
            recognized in your image. Disable it if you prefer to be given the
            translation directly.
          </Text>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    documentOptimization: state.settings.optimization,
    previewOCR: state.settings.previewOCR,
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
    switchOCRPreview: () => {
      dispatch(toggleOCRPreview());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

const styles = StyleSheet.create({
  selectorLabels: {
    width: '50%',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    fontWeight: '200',
  },
  settingHeader: { fontSize: 26, fontWeight: '200' },
});
