import React from 'react';
import {
  Platform,
  Text,
  View,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setSource, setTarget, swapLanguages } from '../store/language';
import { toggleOptimization, toggleOCRPreview } from '../store/settings';
import LanguageSelector from '../components/LanguageSelector';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#2F95D6',
      borderBottomColor: '#222',
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: 'Avenir',
    },
  };

  render() {
    return (
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            paddingTop: 20,
            paddingBottom: 5,
            fontWeight: '200',
          }}
        >
          Translate text
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
        <TouchableOpacity
          style={{ position: 'absolute', top: 175, right: 185 }}
          title="Swap"
          onPress={() => {
            this.props.swap();
          }}
        >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-swap' : 'md-swap'}
            size={50}
            color="#2e2e2e"
          />
        </TouchableOpacity>
        <View style={{ paddingTop: 10 }}>
          <View style={styles.settingRow}>
            <Text style={styles.settingHeader}>Document/Handwriting Mode</Text>
            <Switch
              value={this.props.documentOptimization}
              onValueChange={this.props.switchOptimizationMode}
              trackColor={{ false: 'grey', true: 'purple' }}
              ios_backgroundColor="#555"
              thumbColor="whitesmoke"
            />
          </View>
          <Text style={styles.flavorText}>
            Enable this option for greater handwriting recognition accuracy.
            This will also better recognize text in more densely spaced formats,
            such as in a document.
          </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <View style={styles.settingRow}>
            <Text style={styles.settingHeader}>Display OCR Preview</Text>
            <Switch
              value={this.props.previewOCR}
              onValueChange={this.props.switchOCRPreview}
              trackColor={{ false: 'grey', true: 'purple' }}
              ios_backgroundColor="#555"
              thumbColor="whitesmoke"
            />
          </View>
          <Text style={styles.flavorText}>
            This option provides you with a preview of the text that was
            recognized in your image. Disable it if you prefer to be given the
            translation directly.
          </Text>
        </View>
      </ScrollView>
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
    swap: () => {
      dispatch(swapLanguages());
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
  settingHeader: { fontSize: 27, fontWeight: '200' },
  settingRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  flavorText: { padding: 10, fontFamily: 'Damascus', fontWeight: '300' },
});
