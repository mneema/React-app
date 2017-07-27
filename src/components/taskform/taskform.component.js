import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, ControlLabel, FormControl, Col, Button, HelpBlock} from 'react-bootstrap';
import './taskform.css'

class TaskForm extends Component {
  constructor(props) {
    super(props);
    console.log('props',props);
    this.submit = this.submit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCatagoryChange = this.handleCatagoryChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.state = {catagory: '', description:'',dueData:'', validations: {catagoty:null, desc:null, dueDate:null}};
  }

  //if the parent component updates the prop, force re-render
  componentWillReceiveProps(nextProps) {
       this.setState({catagory: nextProps.data.catagory,
                      description:nextProps.data.description,
                      dueData:nextProps.data.dueDate,
                      validations:this.state.validations});
  }

  render() {
    const {catagory, description} = this.props.data;

    return (
      <Form className="taskform">
        <FormGroup validationState={this.state.validations.catagory}>
          <ControlLabel>Catagory</ControlLabel>
          <FormControl componentClass="select" ref="catagory" value={this.state.catagory} onChange={this.handleCatagoryChange}  placeholder="Select Catagory">
            <option value="">select</option>
            {this.props.catagories.map((catagory, i) =>
              <option value={catagory.code} key={i}>{catagory.description}</option>
            )}
          </FormControl>
          <HelpBlock>This is a required field.</HelpBlock>
        </FormGroup>
        <FormGroup validationState={this.state.validations.desc}>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" rows={5} ref="description" value={this.state.description} onChange={this.handleDescChange} placeholder="Add a description"/>
          <HelpBlock>This is a required field.</HelpBlock>
        </FormGroup>

        <FormGroup validationState={this.state.validations.dueDate}>
          <ControlLabel>Due Date</ControlLabel>
          <FormControl type="date" ref="dueDate" placeholder="Due Date" onChange={this.handleDateChange} defaultValue="" value={this.props.data.dueDate}/>
        </FormGroup>
        <FormGroup>
          <Col >
            <Button bsStyle="primary" onClick={this.submit}>
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  handleDateChange(e) {
    this.setState(Object.assign({},this.state,{dueDate:e.target.value}));
  }

  handleDescChange(e) {
    this.setState(Object.assign({},this.state,{description:e.target.value}));
  }

  handleCatagoryChange(e) {
    this.setState(Object.assign({},this.state,{catagory:e.target.value}));
  }

  submit() {
    let formData = {}, errorFlag=false, validations = {};
    console.log('ReactDOM.findDOMNode(ref)',ReactDOM.findDOMNode(this.refs.catagory).value)
    formData.id = Date.now();
    formData.catagory = ReactDOM.findDOMNode(this.refs.catagory).value;
    formData.description = ReactDOM.findDOMNode(this.refs.description).value;
    formData.dueDate = ReactDOM.findDOMNode(this.refs.dueDate).value;
    console.log('formData',formData);
    if(formData.catagory === '') {
      errorFlag = true;
      validations.catagory = "error";
    }
    if (formData.description === '') {
      errorFlag = true;
      validations.desc = "error";
    }
    if(errorFlag) {
      this.setState(Object.assign({}, this.state,{validations}))
      return;
    }
    this.props.onSubmit(formData);
  }

  validation(formData, field) {

  }
}

export default TaskForm;
