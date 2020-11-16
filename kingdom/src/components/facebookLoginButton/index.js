import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {backend} from '../../config/backendServer';
import axios from 'axios';

export default class FacebookLoginButton extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }
  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data && data.accessToken && data.userID) {
        this.setState({loggedIn: true});
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

  logout = () => {
    LoginManager.logOut();
    this.setState({loggedIn: false});
  };

  render() {
    const {loggedIn} = this.state;
    const buttonText = loggedIn === true ? 'Logout' : 'Login';
    const onPressFunction =
      loggedIn === true ? this.logout : this.getAndSendFacebookAccessToken;
    return (
      <View>
        <Button onPress={onPressFunction} title={buttonText}>
          {buttonText}
        </Button>
      </View>
    );
  }
}

module.exports = FacebookLoginButton;
