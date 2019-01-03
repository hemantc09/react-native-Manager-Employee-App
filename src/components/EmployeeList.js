import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';


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
    console.log(this.props);
    return (

        <ListView
          style={listViewStyles}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
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
export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
