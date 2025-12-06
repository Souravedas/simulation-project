import { useState } from "react";
import { generateNewspaperSimulation } from "./newspaper-logic";
import NewspaperTable from "./newspaper-table";
import "./newspaper.css";

const NewspaperSimulation = () => {
  const [stock, setStock] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [numDays, setNumDays] = useState("");
  const [data, setData] = useState([]);

  const handleGenerate = () => {
    const s = parseInt(stock);
    const bp = parseFloat(buyPrice);
    const sp = parseFloat(sellPrice);
    const n = parseInt(numDays);

    if (!s || !bp || !sp || !n) {
      alert("Please enter all valid inputs!");
      return;
    }

    const simData = generateNewspaperSimulation(s, bp, sp, n);
    setData(simData);
  };

  return (
    <div className="newspaper-container">
      <h1>Newspaper Simulation</h1>
      <div className="controls">
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="number"
          placeholder="Buying Price"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Days"
          value={numDays}
          onChange={(e) => setNumDays(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate Table</button>
      </div>

      <NewspaperTable data={data} />
    </div>
  );
};

export default NewspaperSimulation;
