import React from "react";

const CurrencyTable = ({ rates }) => {
  const calculateBuySell = (rate) => {
    const exchangeRate = parseFloat(rate);
    const weBuy = (exchangeRate * 1.05).toFixed(4);
    const weSell = (exchangeRate * 0.95).toFixed(4);

    return { weBuy, weSell, exchangeRate: exchangeRate.toFixed(4) };
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rates).map(([currency, rate]) => {
          const { weBuy, weSell, exchangeRate } = calculateBuySell(rate);
          return (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{weBuy}</td>
              <td>{exchangeRate}</td>
              <td>{weSell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
