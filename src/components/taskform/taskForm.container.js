import React, { Component } from 'react';
import TaskForm from './taskform.component';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  fetchCatagoriesIfNeeded,
  addTask,
  fetchTask,
  updateTask
} from './../../stores/actions/tasks.actions'

class TaskFormContainer extends Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.submit = this.submit.bind(this);
    //this.state = {clickedOnce:false};
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCatagoriesIfNeeded());
    dispatch(fetchTask(this.props.params.taskId));
  }

  render() {
    console.log('this.props.tasks',this.props.task);
    return (
      <div >
        <TaskForm data={this.props.task} catagories={this.props.catagories} onSubmit={this.submit}></TaskForm>
      </div>
    );
  }

  submit(task) {
    if(this.props.params.taskId === 'new') {
      this.props.addTask(Object.assign({}, task, {id: Date.now()}));
    }
    else {
      this.props.updateTask(Object.assign({}, task, {id: this.props.params.taskId}));
    }
  }

}

function mapStateToProps(state, ownProps) {
  const { tasks }  = state;
  console.log('tasks',tasks);
  return {
    catagories : tasks.catagories,
    isFetching : tasks.isFetching,
    task : tasks.currentTask
  }
}

// inject onClick
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addTask: (task) => dispatch(addTask(task)),
    updateTask: (task) => dispatch(updateTask(task))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFormContainer)
