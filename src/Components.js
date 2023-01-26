import './App.css';
import React, { Component } from 'react';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockchainId: '',
      message: ''
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
        "senderCurrency": "SILVER",
        "receiverCurrency": "SILVER",
        "senderId": "0xb85973a890991e1d3cc2f5925302a532a9d17b71",
        "senderCredentials": "0xdfbe3f4ce2c85e26a6fa9b0481c7c3ddfb8ca15e502a3d67422a5d67d5e0a89a",
        "receiverId": this.state.blockchainId,
        "currencyAmount": 500000
    }
    fetch("https://pdsapi.dase.io:8081/api/balances/transfer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            this.setState({ message: "Funds transferred (500k Leos on PDSAPI)" });
        } else {
            this.setState({ message: "Error: " + response.status + " " + response.statusText});
        }
    })
    .catch(error => {
        this.setState({ message: error });
    });
  }
  render() {
    document.title = "GDR Żetonium Faucet";
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <img src={require('./headerimage.jpg')} width="400" height="400" alt="header image" />
      <h1> Żetonium Faucet</h1>
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <label>Żetonium ID</label>
        <input type="text" name="blockchainId" value={this.state.blockchainId} onChange={this.handleChange} style={{margin:'10px 0'}} />
        <button type="submit" style={{margin:'10px 0'}}>Submit</button>
        <p>{this.state.message}</p>
      </form>
    </div>
    );
  }
}

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch("https://pdsapi.dase.io:8081/api/balances/history")
    .then(response => response.json())
    .then(data => {
      this.setState({ data: data });
    })
    .catch(error => {
      this.setState({ data: [
        {
          "userId": "0xb85973a890991e1d3cc2f5925302a532a9d17b71"
        }
      ] });
    });
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1> Żetonium Faucet Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Timestamp</th>
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
                <td>{item.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    );
  }
}

export { FormComponent, RequestTable };