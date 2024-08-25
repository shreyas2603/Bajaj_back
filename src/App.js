import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = () => {
    try {
      // Validate JSON input
      const parsedJson = JSON.parse(jsonInput);

      // Call the backend API (replace with your actual API endpoint)
      fetch('https://bajaj-backend-57wn.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      })
        .then((response) => response.json())
        .then((data) => {
          setResponse(data);
          setError('');
        })
        .catch((err) => {
          setError('Error connecting to the backend');
        });
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResults = () => {
    if (!response) return null;
  
    const filteredResults = selectedOptions.map((option) => {
      if (option.value === 'alphabets') {
        return (
          <div key="alphabets">
            Alphabets: {JSON.stringify(response.alphabets)}
          </div>
        );
      }
      if (option.value === 'numbers') {
        return (
          <div key="numbers">
            Numbers: {JSON.stringify(response.numbers)}
          </div>
        );
      }
      if (option.value === 'highest_lowercase') {
        return (
          <div key="highest_lowercase">
            Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}
          </div>
        );
      }
      return null;
    });
  
    return <div className="results">{filteredResults}</div>;
  };
  

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <div className="input-container">
        <textarea
          placeholder='Enter JSON like {"data": ["A", "1", "b"]}'
          value={jsonInput}
          onChange={handleJsonChange}
          rows="5"
          cols="50"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <div className="error">{error}</div>}
      {response && (
        <div className="dropdown-container">
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            placeholder="Select response filters"
          />
          {renderResults()}
        </div>
      )}
    </div>
  );
}

export default App;
