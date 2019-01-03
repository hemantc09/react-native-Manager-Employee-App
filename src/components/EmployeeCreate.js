
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

/*
E.g.  from ItemList.js Actions.employeeCreate({ employees: this.props.employee });
Access this props. In the employee create form.
We are using those props and prefilling it when it comes to edit.
*/
class EmployeeCreate extends Component {

  onButtonPress() {
      const { name, phone, shift } = this.props;
      //default shift is Monday if not set
      this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    //props receive here print on console
    //console.log(this.props.employee);
    // {...this.props} pass all props to EmployeeForm as well
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  //state.employeeForm state coming from the key employeeForm assigned in reducer
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

//help to get action creators
export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate
})(EmployeeCreate);
