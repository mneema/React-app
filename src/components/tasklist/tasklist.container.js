import React, { Component } from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import Filter from './../filter/filter.component';
import TaskList from './../tasklist/tasklist.component';
import { connect } from 'react-redux'
import { push , replace } from 'react-router-redux'
import {
  fetchTasks,
  deleteTask,
  completeTask
} from './../../stores/actions/tasks.actions'
import {
  filterTasks
} from './../../stores/actions/filter.actions'
import {
  sortTasks
} from './../../stores/actions/sort.actions'


class TaskListContainer extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
    this.gotoEdit = this.gotoEdit.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    //this.state = {clickedOnce:false};
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTasks());
  }

  render() {
    console.log('this.props.tasks',this.props.tasks);
    return (
      <div >
        <Row>
          <Col xs={12}>
            <Filter filters={this.props.filters} onFilter={this.filterTasks}></Filter>
          </Col>
        </Row>
        <TaskList data={this.props.tasks} filters={this.props.filters} sort={this.props.sort} onEdit={this.gotoEdit} onDelete={this.deleteTask} onComplete={this.completeTask} onSort={this.sortTasks}></TaskList>
      </div>
    );
  }



  addTask() {
    const { dispatch } = this.props;
    console.log('clicked',dispatch);
    dispatch(replace('/task/new'));
  }

  gotoEdit(id) {
    const { dispatch } = this.props;
    console.log('clicked',dispatch);
    dispatch(push(`/task/${id}`));
  }

  deleteTask(id) {
    this.props.deleteTask(id);
  }

  completeTask(task) {
    this.props.completeTask(task);
  }

  filterTasks(filters) {
    this.props.filterTasks(filters);
  }

  sortTasks(criteria){
    this.props.sortTasks(criteria);
  }

}

function mapStateToProps(state) {
  const { tasks, filters, sort }  = state;
  console.log('tasks',tasks);
  return {
    tasks : tasks.tasks,
    isFetching : tasks.isFetching,
    filters,
    sort
  }
}

// inject onClick
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteTask: (id) => dispatch(deleteTask(id)),
    completeTask: (task) => dispatch(completeTask(task)),
    filterTasks: (filters) => dispatch(filterTasks(filters)),
    sortTasks: (criteria) => dispatch(sortTasks(criteria))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer)
