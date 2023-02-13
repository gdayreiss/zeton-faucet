import './App.css';
import React, { Component } from 'react';

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showTable: false
    };
  }

  handleClick = () => {
    const sevenDaysAgoInSeconds = Math.round(Date.now() / 1000) - 604800;
    fetch(`https://pdsapi.dase.io:8081/api/balances/history?userId=0xb85973a890991e1d3cc2f5925302a532a9d17b71&fromTimestampInSec=${sevenDaysAgoInSeconds}&limit=20`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({ data: data, showTable: true });
    })
    .catch(error => {
      console.error(error);
      this.setState({ data: [], showTable: true });
    })
  };

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1> Faucet Log</h1>
        <button onClick={this.handleClick}>Recent Transactions</button>
        {this.state.showTable && (
          <table>
            <thead>
              <tr>
                <th>block number</th>
                <th>from</th>
                <th>to</th>
                <th>value</th>
                <th>timestamp</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.blockNumber}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>{item.value}</td>
                    <td>{new Date(item.timestamp * 1).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default RequestTable;