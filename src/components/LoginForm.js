import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange(text) {
      this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    //if loading true show spinner
    //else show the button
    if (this.props.loading) {
      return <Spinner size='large' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
            <Text style={styles.errorTextStyle}>
                {this.props.error}
            </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Card>
          <CardSection>
          {/* We refactored code by importing Input Component and remove
            TextInput we had initially*/
          /* when user enter the text the it gets the value and setsthe value of the text in
            state above Also we are passing value and onChangeText passing as props to Input.js*/}
            <Input
              placeholder='user@gmail.com'
              label='Email'
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          {/* we are passing props email  */}
          </CardSection>

          <CardSection>
          {/* we are passing secureTextEntry which is by default true */}
            <Input
              secureTextEntry
              placeholder='password'
              label='Password'
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          {/* if there is error renderError get called  */}
          {this.renderError()}
           <CardSection style={{ padding: 0, borderWidth: 0 }}>
            {this.renderButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
   errorTextStyle: {
     marginTop: 10,
     fontSize: 20,
     alignSelf: 'center',
     color: '#404021'
   },
   containerStyle: {
     flex: 1,
     backgroundColor: '#AAA839',
     justifyContent: 'center',
     paddingBottom: 100,
   }
 };

//The connectg helper method give the access to props text
//from actions above in the method onEmailChange()
//value produced by reducer as props state.auth.email

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return {
    email,
    password,
    error,
    loading
  };
};

//help to get action creators
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
