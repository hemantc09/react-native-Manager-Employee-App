//employee edit form - reusable form  designed using EmployeeForm.js
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {
  state = { showModal: false }


  componentWillMount() {
    //for each key value pair we are performing logic thats why lodash used
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }
  onButtonPress() {
    const { name, phone, shift } = this.props;
    //console.log(name, phone, shift);
    //dont forget to pass the emp uid for update the particular emp
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    //rememebr its backqutes
    //dont worry about text error below its okay
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  //onAccept it will delete the employee an call the employeeDelete actions
  //employee get deleted here onAccept
  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }
  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { cardSectionStyle } = styles;
    return (
      <Card>
        <EmployeeForm />

        <CardSection
        style={cardSectionStyle}
        >
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection
        style={cardSectionStyle}
        >
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection
          style={cardSectionStyle}
        >
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Fire Employee
          </Button>
        </CardSection>
          {/*passing the props to confirm based on yes no behavior*/}
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

const styles = {
  cardSectionStyle: {
    padding: 0,
    borderWidth: 1,
  }
};
export default connect(mapStateToProps, {
   employeeUpdate,
   employeeSave,
   employeeDelete
})(EmployeeEdit);
