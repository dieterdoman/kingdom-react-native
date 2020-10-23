import React, {Component} from 'react';
import {View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {backend} from '../../config/backendServer';
import axios from 'axios';

export default class FacebookLoginButton extends Component {
  componentDidMount() {
    this.getAndSendFacebookAccessToken();
  }

  getAndSendFacebookAccessToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      axios
        .post(
          backend.url + '/facebook_login',
          {accessToken: data.accessToken},
          {headers: {'Content-Type': 'application/json'}},
        )
        .then((res) => {
          console.log(res);
        });
    });
  };

  render() {
    const onLogin = (error, result) => {
      if (error) {
        alert('Login failed with error: ' + error.message);
      } else if (result.isCancelled) {
        alert('Login was cancelled');
      } else {
        this.getAndSendFacebookAccessToken();
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
