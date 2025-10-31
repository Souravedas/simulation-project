import { useState } from "react";
import { generateSimulation, calculateSummary } from "./components/simulation-logic";
import Table from "./components/simulation-table";
import "./index.css";

function App() {
  const [numCustomers, setNumCustomers] = useState("");
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);

  const handleGenerate = () => {
    const n = parseInt(numCustomers);
    if (!n || n <= 0) {
      alert("Please enter a valid number of customers!");
      return;
    }
    const simData = generateSimulation(n);
    setData(simData);
    setSummary(calculateSummary(simData));
  };

  return (
    <div className="app-container">
      <h1>Grocery Queue Simulation</h1>
      <div className="controls">
        <input
          type="number"
          placeholder="Enter number of customers"
          value={numCustomers}
          onChange={(e) => setNumCustomers(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate Table</button>
      </div>

      {summary && (
        <div className="summary">
          <h2>Summary</h2>
          <ul>
            <li>Average Waiting Time: {summary.avgWaitingTime}</li>
            <li>Probability Customer Waits: {summary.probWait}</li>
            <li>Probability Idle: {summary.probIdle}</li>
            <li>Average Service Time: {summary.avgServiceTime}</li>
            <li>Average Time Between Arrivals: {summary.avgTimeBetweenArrival}</li>
            <li>Average Waiting for Those Who Wait: {summary.avgWaitingForThoseWhoWait}</li>
            <li>Average Time in System: {summary.avgTimeInSystem}</li>
          </ul>
        </div>
      )}

      <Table data={data} />
    </div>
  );
}

export default App;
