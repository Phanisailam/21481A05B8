import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberID, setNumberID] = useState('p');
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [newNumbers, setNewNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/numbers/${numberID}`);
      setWindowPrevState(response.data.windowPrevState);
      setWindowCurrState(response.data.windowCurrState);
      setNewNumbers(response.data.numbers);
      setAverage(response.data.avg);
    } catch (error) {
      console.error("There was an error fetching the numbers!", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <div>
          <label>
            Number Type:
            <select value={numberID} onChange={(e) => setNumberID(e.target.value)}>
              <option value="p">Prime</option>
              <option value="f">Fibonacci</option>
              <option value="e">Even</option>
              <option value="r">Random</option>
            </select>
          </label>
        </div>
        <button onClick={fetchNumbers}>Fetch and Calculate Average</button>
        {windowCurrState.length > 0 && (
          <div>
            <h2>Previous Window State:</h2>
            <p>{windowPrevState.join(', ')}</p>
            <h2>Current Window State:</h2>
            <p>{windowCurrState.join(', ')}</p>
            <h2>New Numbers:</h2>
            <p>{newNumbers.join(', ')}</p>
            <h2>Average:</h2>
            <p>{average}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
