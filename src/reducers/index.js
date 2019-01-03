import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';


//auth and employeeForm are peace of state - key : value
export default combineReducers({
    auth: AuthReducer,
    employeeForm: EmployeeFormReducer,
    employees: EmployeeReducer
});
