import './App.css';
import React, { useState, useEffect } from 'react';

const BalanceChecker = () => {
  const [balance, setBalance] = useState({});
  const [betaBalance, setBetaBalance] = useState({});
  const [isLoading, setIsLoading] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    const response = await Promise.all([
      fetch('https://pdsapi.dase.io:8081/api/balances?zetoniumUserId=0xb85973a890991e1d3cc2f5925302a532a9d17b71'),
      fetch('https://beta.dase.io:8081/api/balances?zetoniumUserId=0xb85973a890991e1d3cc2f5925302a532a9d17b71')
    ]);
    const [data, betaData] = await Promise.all(
      response.map(res => res.json())
    );
    setBalance(data);
    setBetaBalance(betaData);
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={handleClick}>Check Bank Balance</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
        <p>PDSAPI Silver Żetons: {parseFloat(balance.silver_leos) / 1000000}</p>
        <p>PDSAPI Gold Żetons: {parseFloat(balance.gold_leos) / 10000000}</p>
        <p>Beta Silver Żetons: {parseFloat(betaBalance.silver_leos) / 1000000}</p>
        <p>Beta Gold Żetons: {parseFloat(betaBalance.gold_leos) / 1000000}</p>
        </>
      )}
    </div>
  );
};

export default BalanceChecker;