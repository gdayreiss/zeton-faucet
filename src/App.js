import React, { Component } from 'react';
import './App.css';
import FormComponent from './FormComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Żetonium Faucet </h1>
        <img src={require('./headerimage.jpg')} width="400" height="400" alt="header image" />
        <FormComponent
          endpoint="https://pdsapi.dase.io:8081/api/balances/transfer"
          buttonText="Submit PDSAPI"
          title="PDSAPI"
        />
        <FormComponent
          endpoint="https://beta.dase.io:8081/api/balances/transfer"
          buttonText="Submit Beta"
          title="Beta"
        />
      </div>
    );
  }
}

export default App;