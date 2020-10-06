import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './components/appbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <ButtonAppBar/>
        </div>
      </div>
    );
  }
}

export default App;
