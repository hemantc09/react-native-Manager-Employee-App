//actions for login LoginForm

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOG_OUT_USER
 } from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: PASSWORD_CHANGED,
      payload: text
    };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    //we also using LOGIN_USER for spinner
    dispatch({ type: LOGIN_USER });

    //sign in user
    //create user
    //on fail show error message

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
      });
    };
  };

//when user fail to login helper method
const loginUserFail = (dispatch) => {
  dispatch({
      type: LOGIN_USER_FAIL
  });
};

//the method below is a helper method with dispatch and user argument when user
//login loginUserSuccess
//after login success show the emploeeLis key from Scene  we want to display
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};

export const logOutUser = () => dispatch => {
  firebase.auth()
    .signOut()
    .then(() => {
      dispatch({ type: LOG_OUT_USER });
      Actions.auth();
      console.log('Sign-out successful');
    })
    .catch(error => {
      console.log(error);
    });
};

// export const logOutUser = () => (dispatch) => {
//   firebase.auth().signOut()
//     .then(() => {
//       dispatch({ type: LOG_OUT_USER });
//       Actions.auth();
//     })
//     .catch((error) => {
//       console.log(error);
//   });
// };
