import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { employeesFetch, logOutUser } from '../actions';
import ListItem from './ListItem';
import { CardSection, Button } from './common';


class EmployeeList extends Component {


  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }


  //caled with new set of props
  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this Component
    //will be rendered with
    //this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  onButtonPressLogout() {
    console.log('logout');
    this.props.logOutUser();
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
      return <ListItem style={styles.listItemStyle} employee={employee} />;
  }


  render() {
    const { listViewStyles } = styles;
    // console.log(this.props);
    return (
      <View>
        <ListView
          style={listViewStyles}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
         <CardSection>
            <Button onPress={this.onButtonPressLogout.bind(this)}>
                Log Out
            </Button>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }; //{shit: 'Monday', name: 'ss', id: '23sdsf'};
  });
  return { employees };
};


const styles = {
  listViewStyles: {
    backgroundColor: '#fff',
    padding: 10
  },
  listItemStyle: {
    borderWidth: 10,
    borderColor: 'red'
  }
};
export default connect(mapStateToProps, { employeesFetch, logOutUser })(EmployeeList);
