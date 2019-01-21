import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Recent Translations',
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
    let keyId = 0;
    const recents = this.props.recentTranslations;
    return (
      <ScrollView style={{ backgroundColor: '#fefefe' }}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text
              style={{
                ...styles.column,
                fontWeight: '600',
                fontFamily: 'Cochin',
              }}
            >
              Source:
            </Text>
            <Text
              style={{
                ...styles.column,
                fontWeight: '600',
                fontFamily: 'Cochin',
              }}
            >
              Translation:
            </Text>
          </View>
          <View style={styles.border} />
          {recents[0] ? (
            recents.map(textObj => {
              return (
                <View key={keyId++}>
                  <View style={styles.listItem}>
                    <Text style={styles.column}>{textObj.recognizedText}</Text>
                    <Text style={styles.column}>{textObj.translatedText}</Text>
                  </View>
                  <View style={styles.border} />
                </View>
              );
            })
          ) : (
            <Text style={styles.empty}>
              The 10 most recent translation requests will appear here.
            </Text>
          )}
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
  empty: {
    textAlign: 'center',
    padding: 15,
    fontSize: 24,
    fontFamily: 'Damascus',
    fontWeight: '200',
    color: '#aaa',
  },
  listItem: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
    fontSize: 20,
    fontWeight: '200',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
