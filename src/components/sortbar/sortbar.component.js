import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Col, Button} from 'react-bootstrap';
import {ASC, DESC} from './../../stores/constants/sort.constants';
import './sortbar.css'

class SortBar extends Component {
  constructor(props) {
    super(props);
    this.state = {sortBy: 'catagory', order:ASC};
    this.handleColumnChange = this.handleColumnChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleColumnChange(e) {
    const sortOptions = {sortBy:e.target.value, order:this.state.order};
    this.setState(sortOptions);
    this.props.onSortChange(sortOptions);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({sortBy:nextProps.sort.sortBy, order:nextProps.sort.order});
  }

  render() {
    const options = ['catagory', 'description', 'dueDate'];
    return (
      <div className="sortbar">
        <FormGroup>
          <ControlLabel>Sory By</ControlLabel>
          <FormControl componentClass="select" value={this.state.sortBy} onChange={this.handleColumnChange}  placeholder="Select Option">
            <option value="select">select</option>
            {options.map((item, i) =>
              <option value={item} key={i}>{item}</option>
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <Col >
            <Button bsStyle="primary" onClick={() => this.submit(ASC)}>
              ASC
            </Button>
            <Button onClick={() => this.submit(DESC)}>
              DESC
            </Button>
          </Col>
        </FormGroup>

      </div>
    );
  }

  submit(option) {
    this.setState({sortBy:this.state.sortBy, order: option});
    this.props.onSortChange({sortBy:this.state.sortBy, order: option});
  }
}

export default SortBar;
