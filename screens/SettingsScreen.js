import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, Picker, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    // TODO: modify languageReducer onChange
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
          Please specify your origin and destination languages:
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Picker style={{ width: '50%' }}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="German" value="de" />
          </Picker>
          <Picker style={{ width: '50%' }}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>
        <ExpoConfigView />
      </>
    );
  }
}
