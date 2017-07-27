import React, { Component } from 'react';
import SortBar from './../sortbar/sortbar.component'
import Task from './../task/task.component'
import {ASC, DESC} from './../../stores/constants/sort.constants'
import {Col, Row} from 'react-bootstrap';
import './tasklist.css';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.complete = this.complete.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.sort = this.sort.bind(this);
    //this.task = {};
  }

  render() {
    const tasks = this.sortTasks(this.props.data, this.props.sort) || [];
    console.log('sort tasks', tasks);
    return (
      <div className="tasklist">
        <SortBar onSortChange={this.sort} sort={this.props.sort}></SortBar>
        <Row>
          {tasks.map((task, i) =>
            this.applyFilter(task) && <Col xs={12} sm={6} md={4}> <Task key={i} task={task} onSelect={this.edit} onDelete={this.delete} onComplete={this.complete}></Task></Col>
          )}
        </Row>
      </div>
    );
  }

  sortTasks(tasks, criteria) {
    return tasks.sort((a,b) => {
      if (criteria.order === ASC) {
        return a[criteria.sortBy] > b[criteria.sortBy] ? 1 : -1;
      }
      else {
        return a[criteria.sortBy] < b[criteria.sortBy] ? 1 : -1;
      }
    })
  }

  applyFilter(task) {
    if (this.props.filters.showComplete && (this.props.filters.showComplete === task.complete))
      return true;
    if (this.props.filters.showPending && (this.props.filters.showPending === !task.complete))
      return true;
    else {
      return false;
    }

  }

  sort(criteria) {
    this.props.onSort(criteria);
  }

  edit(id) {
    console.log('edit fired');
    this.props.onEdit(id);
  }

  delete(id) {
    console.log('delete fired');
    this.props.onDelete(id);
  }

  complete(task) {
    console.log('complete fired');
    this.props.onComplete(task);
  }
}

export default TaskList;
