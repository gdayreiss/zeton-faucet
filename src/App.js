import React, { Component } from 'react';
import './App.css';
import FormComponent from './FormComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormComponent
          endpoint="https://pdsapi.dase.io:8081/api/balances/transfer"
          buttonText="Submit PDSAPI"
        />
        <FormComponent
          endpoint="https://beta.dase.io:8081/api/balances/transfer"
          buttonText="Submit Beta"
        />
      </div>
    );
  }
}

export default App;