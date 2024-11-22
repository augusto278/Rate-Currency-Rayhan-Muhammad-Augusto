import React, { useState, useEffect } from "react";
import CurrencyTable from "./component/CurrencyTable";
import "./style.css";

const App = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchRates = async () => {
      const API_URL = `https://api.currencyfreaks.com/latest?apikey=188380f385914ca2b15f50def0c628dd`;

      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const relevantRates = {
          CAD: data.rates.CAD,
          IDR: data.rates.IDR,
          JPY: data.rates.JPY,
          CHF: data.rates.CHF,
          EUR: data.rates.EUR,
          GBP: data.rates.GBP,
        };
        setRates(relevantRates); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="app">
      <h1>Currency Exchange Rates</h1>
      {loading && <p>Loading exchange rates...</p>}
      {error && <p>Error: {error}</p>}
      {rates && <CurrencyTable rates={rates} />}
      <p className="footer">
        Rates are based on 1 USD. This application uses API from{" "}
        <a href="https://currencyfreaks.com/" target="_blank" rel="noreferrer">
          Currency Freaks
        </a>
        .
      </p>
    </div>
  );
};

export default App;
