import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { push , replace } from 'react-router-redux';
import { connect } from 'react-redux';
import './navigation.css'



class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    this.navLinks = [
        {key: 'tasks', url:'/tasks', labal:'My Tasks'},
        {key: 'about', url:'/about', labal:'About'},
        {key: 'task', url:'/task/new', labal:'Add New Task'}
    ]

    return (
      <Navbar className="navbar" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">MY TO-DO APP</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect}>
          {
            this.navLinks.map(link => <NavItem eventKey={link.key} href="#">{link.labal}</NavItem>)
          }

            </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleSelect(selectedKey) {
    //alert('selected ' + selectedKey);
    const selectedNav = this.navLinks.filter(nav => nav.key === selectedKey ? true : false)
    this.props.dispatch(push(selectedNav[0].url));
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapDispatchToProps)(Navigation);
