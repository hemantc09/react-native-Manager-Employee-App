//Actions fpr EmployeeCreate LoginForm
//one action crate to udpate prop and value can be any thing base on actions
//e.g. if you want to update shift which is prop and monday which is value
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

//create user data action
export const employeeCreate = ({ name, phone, shift }) => {
  //get currentUser which is uid property
  const { currentUser } = firebase.auth();
  //called using redux thunk but not actually using it remember
  return (dispatch) => {
    //console.log(name, phone, shift);
    //take database and reference to '/users/userId/employees'
    //remember this is backquotes ``
    //and push to db
    //type - reset dont show the back button
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
        .then(() => {
          dispatch({ type: EMPLOYEE_CREATE });
          Actions.pop({ type: 'reset' });
      });
  };
};

//fetch emp data action
export const employeesFetch = () => {
  //get currentUser
  const { currentUser } = firebase.auth();

  //anytime data come from ref call the function snapshot fun
  //snapshot is an object that describes data
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

//edit employee action and save it
export const employeeSave = ({ name, phone, shift, uid }) => {
    //whats happening here when yo create new action.See below
    //this is Asynchronous action so we are returning the function
    //const - get current users
    //return refere to fb db with uid
    //set the props data
    //dispatch EMPLOYEE_SAVE_SUCCESS because it has to clear all forms once saved
    //Actions.employeeList go back to emp list component
    const { currentUser } = firebase.auth();
    return (dispatch) => {
      firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({ name, phone, shift })
          .then(() => {
            dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
            Actions.employeeList({ type: 'reset' });
        });
    };
};

//delete employee actions
//and get back to employeeList
export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
        .then(() => {
          Actions.employeeList({ type: 'reset' });
        });
  };
};
