import React from 'react';
import {View, StyleSheet} from 'react-native';
import FacebookLoginButton from './src/components/facebookLoginButton';

const App = () => {
  return (
    <View style={styles.container}>
      <FacebookLoginButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
export default App;
