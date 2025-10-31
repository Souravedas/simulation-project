const Table = ({ data }) => {
    if (!data || data.length === 0) return null;

    const downloadCSV = () => {
        const headers = [
            "Customer", "RV (A.T)", "IAT", "AT",
            "RV (S.T)", "ST", "TSB", "WT",
            "TSE", "TSS", "IOS"
        ];
        const rows = data.map((row) =>
            [
                row.customer, row.rvAT, row.IAT, row.AT,
                row.rvST, row.ST, row.TSB, row.WT,
                row.TSE, row.TSS, row.IOS,
            ].join(",")
        );
        const csvContent = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "GroceryQueueSimulation.csv";
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
                        <th>Customer</th>
                        <th>RV (A.T)</th>
                        <th>IAT</th>
                        <th>AT</th>
                        <th>RV (S.T)</th>
                        <th>ST</th>
                        <th>TSB</th>
                        <th>WT</th>
                        <th>TSE</th>
                        <th>TSS</th>
                        <th>IOS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.customer}>
                            <td>{row.customer}</td>
                            <td>{row.rvAT}</td>
                            <td>{row.IAT}</td>
                            <td>{row.AT}</td>
                            <td>{row.rvST}</td>
                            <td>{row.ST}</td>
                            <td>{row.TSB}</td>
                            <td>{row.WT}</td>
                            <td>{row.TSE}</td>
                            <td>{row.TSS}</td>
                            <td>{row.IOS}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;