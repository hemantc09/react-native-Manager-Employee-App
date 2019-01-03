import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';


const RouterComponent = () => {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#DEDC71' }}>
      <Scene key='root' hideNavBar>

        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='Please Login' initial />
        </Scene>

        <Scene key='main' inital>
        {/*onRight is a call back function when user click on right title
          Actions.keyName which is we want to show emploeeList
          // this will open the component when user click on it
          //initial means which scene show first
        */}
          <Scene
            rightTitle='Add'
            onRight={() => { Actions.employeeCreate(); }}
            key='employeeList'
            component={EmployeeList}
            title='Employee List'
            initial
          />
          <Scene
            key='employeeCreate'
            component={EmployeeCreate}
            title='Create Employee'
          />
          <Scene
            key='employeeEdit'
            component={EmployeeEdit}
            title='Edit Employee'
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
