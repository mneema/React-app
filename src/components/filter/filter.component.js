import React, { Component } from 'react';
import {Form, FormGroup, Checkbox, ControlLabel} from 'react-bootstrap';
import './filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {showComplete:true, showPending:true};
    this.handleCompleteFilter = this.handleCompleteFilter.bind(this);
    this.handlePendingFilter = this.handlePendingFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showComplete:nextProps.filters.showComplete, showPending:nextProps.filters.showPending});
  }

  render() {
    return (
      <Form className="filter">
        <FormGroup>
          <ControlLabel>Filter By :  </ControlLabel>{'      '}
          <Checkbox inline checked={this.state.showComplete} onChange={this.handleCompleteFilter}>
            Completed
          </Checkbox>
          {' '}
          <Checkbox inline checked={this.state.showPending} onChange={this.handlePendingFilter}>
            Pending
          </Checkbox>
        </FormGroup>
      </Form>
    );
  }

  handleCompleteFilter(e) {
    this.setState({showComplete:e.target.checked, showPending:this.state.showPending});
    console.log('filter state', this.state);
    this.props.onFilter({showComplete:e.target.checked, showPending:this.state.showPending});
  }

  handlePendingFilter(e) {
    this.setState({showComplete:this.state.showComplete, showPending:e.target.checked});
    console.log('filter state', this.state);
    this.props.onFilter({showComplete:this.state.showComplete, showPending:e.target.checked});
  }
}

export default Filter;
