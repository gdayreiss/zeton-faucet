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
    fetch(this.props.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            this.setState({ message: "Funds transferred (500k Leos)" });
        } else {
            this.setState({ message: "Error: " + response.status + " " + response.statusText});
        }
    })
    .catch(error => {
        this.setState({ message: error });
    });
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1> {this.props.title}</h1>
      <form onSubmit={this.handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems
      :'center', justifyContent: 'center'}}>
        <label>
          Blockchain ID:
          <input type="text" name="blockchainId" value={this.state.blockchainId} onChange={this.handleChange} />
        </label>
        <input type="submit" value= {this.props.buttonText} />
      </form>
      <p>{this.state.message}</p>
      </div>
    );
  }
}

export default FormComponent;
