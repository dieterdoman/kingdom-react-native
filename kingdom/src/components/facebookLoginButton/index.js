import React, {Component} from 'react';
import {View} from 'react-native';
import {LoginButton} from 'react-native-fbsdk';

export default class FacebookLoginButton extends Component {
  render() {
    const onLogin = (error, result) => {
      if (error) {
        alert('Login failed with error: ' + error.message);
      } else if (result.isCancelled) {
        alert('Login was cancelled');
      } else {
        alert(
          'Login was successful with permissions: ' + result.grantedPermissions,
        );
      }
    };

    return (
      <View>
        <LoginButton
          publishPermissions={['email']}
          onLoginFinished={onLogin}
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    );
  }
}

module.exports = FacebookLoginButton;