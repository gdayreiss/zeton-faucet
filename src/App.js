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
        <div>
          <img src="/src/images/headerimage.jpg" alt="Żetonium Faucet app header image" />
          <h1>Żetonium Faucet</h1>
          <form onSubmit={this.handleSubmit}>
            <label>Żetonium ID</label>
            <input type="text" name="blockchainId" value={this.state.blockchainId} onChange={this.handleChange} />
            <button type="submit">Submit</button>
            <p>{this.state.message}</p>
          </form>
        </div>
    );
  }
}

export default FormComponent;