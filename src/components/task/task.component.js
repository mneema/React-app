import React, { Component } from 'react';
import {Col, Button, Row} from 'react-bootstrap';
import './task.css'

class Task extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.complete = this.complete.bind(this);
  }

  render() {
    return (
      <div className={this.props.task.complete ? 'task complete':'task pending'}>
        <div className="header" >
          <Row>
            <Col xs={6} sm={8}>
              <h3>{this.props.task.catagory}</h3>
            </Col>
            <Col xs={6} sm={4}>
              <strong>{this.props.task.dueDate}</strong>
            </Col>

          </Row>
        </div>
        <hr/>
        <p>{this.props.task.description}</p>
        <div>
          <Button onClick={this.edit}>Edit</Button>
          <Button onClick={this.delete}>Delete</Button>
          {!this.props.task.complete &&
          <Button onClick={this.complete}>Complete</Button>
          }
        </div>
      </div>
    );
  }

  delete() {
    this.props.onDelete(this.props.task.id);
  }

  complete() {
    this.props.onComplete(this.props.task);
  }

  edit() {
    this.props.onSelect(this.props.task.id);
  }
}

export default Task;
