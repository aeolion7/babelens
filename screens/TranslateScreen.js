import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';

class TranslateScreen extends React.Component {
  static navigationOptions = {
    title: 'Text Translation',
  };

  state = {
    text: '',
  };

  render() {
    return (
      <>
          <View>
            <TextInput
              style={{ backgroundColor: '#ddd'}}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
      </>
    );
  }
}

export default connect(null)(TranslateScreen);
