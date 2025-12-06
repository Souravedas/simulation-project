const NewspaperTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const downloadCSV = () => {
    const headers = [
      "Day",
      "RV Type",
      "Type",
      "RV Demand",
      "Demand",
      "Revenue",
      "Lost Profit",
      "Salvage",
      "Daily Profit",
    ];
    const rows = data.map((row) =>
      [
        row.day,
        row.rvType,
        row.type,
        row.rvDemand,
        row.demand,
        row.revenue,
        row.lostProfit,
        row.salvage,
        row.dailyProfit,
      ].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "NewspaperSimulation.csv";
    link.click();
  };

  return (
    <div className="table-container">
      <button className="download-btn" onClick={downloadCSV}>
        Download CSV
      </button>
      <table className="sim-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>RV Type</th>
            <th>Type</th>
            <th>RV Demand</th>
            <th>Demand</th>
            <th>Revenue</th>
            <th>Lost Profit</th>
            <th>Salvage</th>
            <th>Daily Profit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.day}>
              <td>{row.day}</td>
              <td>{row.rvType}</td>
              <td>{row.type}</td>
              <td>{row.rvDemand}</td>
              <td>{row.demand}</td>
              <td>{row.revenue}</td>
              <td>{row.lostProfit}</td>
              <td>{row.salvage}</td>
              <td>{row.dailyProfit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewspaperTable;
