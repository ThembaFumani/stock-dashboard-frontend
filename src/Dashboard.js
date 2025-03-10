import React, { useState } from "react";
import StockChart from "./StockChart";

const stockSymbols = ["MSFT", "AAPL", "NFLX", "FB", "AMZN"];

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  return (
    <div style={{ padding: "1rem" }}>

      <div style={{ marginBottom: "1rem" }}>
        {stockSymbols.map((symbol) => (
          <button
            key={symbol}
            onClick={() => setSelectedSymbol(symbol)}
            style={{
              margin: "0.5rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              backgroundColor: selectedSymbol === symbol ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {symbol}
          </button>
        ))}
      </div>

      {}
      {selectedSymbol ? (
        <div style={{ marginTop: "1rem" }}>
          <StockChart key={selectedSymbol} symbol={selectedSymbol} /> 
        </div>
      ) : (
        <p>Please select a stock symbol to view the chart.</p>
      )}
    </div>
  );
};

export default Dashboard;
