import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

//define initial state of object state
const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      /* e.g. action.payload === { prop: 'name', value: 'Hemant'}
      //also we are using key interpolation  ES6 syntax [prop]: value
      //without es6 it will look like this below
      //const newState = {};
      //newState[action.prop] = action.value
      */
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
