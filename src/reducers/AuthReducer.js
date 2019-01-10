import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOG_OUT_USER
 } from '../actions/types';

//always have something to return from reducer. Never return null
//thats why we created the object below
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
 };

export default (state = INITIAL_STATE, action) => {
  // console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
    /* make a new object take all the props of existing and throw in the object
      define email and toss in that state object  */
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        //new state in case if we added new props,
        // reset to INITIAL_STATE with all clear field
        //and user
        ...state,
        ...INITIAL_STATE,
        user: action.payload
      };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed', loading: false, password: '' };

    case LOG_OUT_USER:
      return {
        ...state
      };
    default:
      return state;
  }
};
