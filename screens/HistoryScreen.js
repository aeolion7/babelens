import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Recently Translated Text',
  };

  render() {
    let keyId = 0;
    const recents = this.props.recentTranslations;
    return (
      <ScrollView style={{ backgroundColor: '#fefefe' }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={{ ...styles.column, fontWeight: '600' }}>Source:</Text>
            <Text style={{ ...styles.column, fontWeight: '600' }}>
              Translation:
            </Text>
          </View>
          <View style={styles.border} />
          {recents &&
            recents.map(textObj => {
              return (
                <View key={keyId++}>
                  <View style={styles.listItem}>
                    <Text style={styles.column}> {textObj.recognizedText}</Text>
                    <Text style={styles.column}>{textObj.translatedText}</Text>
                  </View>
                  <View style={styles.border} />
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    recentTranslations: state.text.recentTranslations,
  };
};

export default connect(mapStateToProps)(HistoryScreen);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  centered: {
    textAlign: 'center',
  },
  listItem: {
    flex: 1,
    paddingTop: 20,
    flexGrow: 1,
    flexBasis: 50,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  border: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    height: 1,
  },
  column: {
    width: '50%',
    textAlign: 'center',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
  },
});
