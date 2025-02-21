import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format. Expected { "data": [values] }');
      }

      const res = await fetch("http://localhost:5000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredResponse = () => {
    if (!responseData) return null;
    let result = { ...responseData };

    if (filters.includes("Numbers")) {
      result.numbers = result.numbers || [];
    }
    if (filters.includes("Alphabets")) {
      result.alphabets = result.alphabets || [];
    }
    if (filters.includes("Highest Alphabet")) {
      result.highest_alphabet = result.highest_alphabet || [];
    }

    return result;
  };

  return (
    <div className="container">
      <h1>JSON Validator</h1>
      <input
        type="text"
        placeholder='Enter JSON '
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="input-field"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      {error && <p className="error-message">{error}</p>}

      {responseData && (
        <>
          <div className="filter-options">
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={(e) =>
                  setFilters((prev) =>
                    e.target.checked ? [...prev, e.target.value] : prev.filter((f) => f !== e.target.value)
                  )
                }
              />{" "}
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={(e) =>
                  setFilters((prev) =>
                    e.target.checked ? [...prev, e.target.value] : prev.filter((f) => f !== e.target.value)
                  )
                }
              />{" "}
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest Alphabet"
                onChange={(e) =>
                  setFilters((prev) =>
                    e.target.checked ? [...prev, e.target.value] : prev.filter((f) => f !== e.target.value)
                  )
                }
              />{" "}
              Highest Alphabet
            </label>
          </div>

          <div className="response-box">
            <p>
              <strong>Filtered Response:</strong>
            </p>
            <p>Numbers: {filteredResponse().numbers?.join(", ")}</p>
            <p>Alphabets: {filteredResponse().alphabets?.join(", ")}</p>
            <p>Highest Alphabet: {filteredResponse().highest_alphabet?.join(", ")}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
