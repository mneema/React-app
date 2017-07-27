import React, { Component } from 'react';
import Navigation from './components/navigation/nav.component';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Navigation></Navigation>
        </div>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
