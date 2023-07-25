import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [date, setDate] = useState('');
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(stockSymbol, date);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/fetchStockData', { stockSymbol, date });

      setTradeData(response.data);
    } catch (error) {
      setError('Failed to fetch stock data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Stock Trade Statistics</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Stock Symbol:
          <input type="text" value={stockSymbol} onChange={(e) => setStockSymbol(e.target.value)} required />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit" disabled={loading}>Get Trade Data</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tradeData && (
        <div>
          <h2>Trade Statistics for {stockSymbol} on {date}</h2>
          <p>Open: {tradeData.open}</p>
          <p>High: {tradeData.high}</p>
          <p>Low: {tradeData.low}</p>
          <p>Close: {tradeData.close}</p>
          <p>Volume: {tradeData.volume}</p>
        </div>
      )}
    </div>
  );
}

export default App;
