import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {backend} from '../../config/backendServer';
import axios from 'axios';

export default class FacebookLoginButton extends Component {
  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data.accessToken && data.userID) {
        axios
          .post(
            backend.url + '/facebook_login',
            {
              accessToken: data.accessToken,
              userId: data.userID,
            },
            {headers: {'Content-Type': 'application/json'}},
          )
          .then((res) => {
            // console.log(res);
          });
      }
    });
  };

  getAndSendFacebookAccessToken = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        this.getAccessToken();
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    return (
      <View>
        <Button onPress={this.getAndSendFacebookAccessToken} title="Login">
          Login
        </Button>
      </View>
    );
  }
}

module.exports = FacebookLoginButton;
