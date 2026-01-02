import { useMemo, useState } from "react";
import { generateAbleBakerSimulation } from "./able-baker-logic";
import "./able-baker.css";

const AbleBakerSimulation = ({ goBack }) => {
    const [numCustomers, setNumCustomers] = useState("");
    const [data, setData] = useState([]);

    const handleGenerate = () => {
        const n = parseInt(numCustomers);
        if (!n || n <= 0) {
            alert("Please enter a valid number of customers!");
            return;
        }
        setData(generateAbleBakerSimulation(n));
    };

    const stats = useMemo(() => {
        if (!data.length) return null;

        const totalDelay = data.reduce((s, r) => s + (r.callerDelay || 0), 0);
        const avgDelay = totalDelay / data.length;

        const maxTSE = Math.max(...data.map((r) => r.TSE || 0));
        const ableBusy = data
            .filter((r) => r.server === "Able")
            .reduce((s, r) => s + (r.ST || 0), 0);
        const bakerBusy = data
            .filter((r) => r.server === "Baker")
            .reduce((s, r) => s + (r.ST || 0), 0);

        return {
            avgDelay: avgDelay.toFixed(2),
            totalDelay: totalDelay.toFixed(2),
            ableUtil: maxTSE ? (ableBusy / maxTSE).toFixed(2) : "0.00",
            bakerUtil: maxTSE ? (bakerBusy / maxTSE).toFixed(2) : "0.00",
            makespan: maxTSE.toFixed(2),
        };
    }, [data]);

    return (
        <div className="ab-page">
            {/* Header */}
            <div className="ab-header">
                <div>
                    <h1 className="ab-title">Able–Baker Simulation</h1>
                    <p className="ab-subtitle">
                        Two parallel servers. Customers go to the first available server.
                        If both busy → caller delay.
                    </p>
                </div>
                <button className="ab-back" onClick={goBack}>
                    ← Back
                </button>
            </div>

            {/* Input Card */}
            <div className="ab-card">
                <div className="ab-card-title">Inputs</div>

                <div className="ab-form">
                    <div className="ab-field">
                        <label>Number of Customers</label>
                        <input
                            type="number"
                            placeholder="e.g., 10"
                            value={numCustomers}
                            onChange={(e) => setNumCustomers(e.target.value)}
                        />
                    </div>

                    <div className="ab-actions">
                        <button className="ab-primary" onClick={handleGenerate}>
                            Generate Final Table
                        </button>
                        <button
                            className="ab-secondary"
                            onClick={() => {
                                setNumCustomers("");
                                setData([]);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Summary */}
            {stats && (
                <div className="ab-card">
                    <div className="ab-card-title">Quick Summary</div>
                    <div className="ab-stats">
                        <div className="ab-stat">
                            <span className="ab-stat-label">Avg Caller Delay</span>
                            <span className="ab-stat-value">{stats.avgDelay}</span>
                        </div>
                        <div className="ab-stat">
                            <span className="ab-stat-label">Total Delay</span>
                            <span className="ab-stat-value">{stats.totalDelay}</span>
                        </div>
                        <div className="ab-stat">
                            <span className="ab-stat-label">Able Utilization</span>
                            <span className="ab-stat-value">{stats.ableUtil}</span>
                        </div>
                        <div className="ab-stat">
                            <span className="ab-stat-label">Baker Utilization</span>
                            <span className="ab-stat-value">{stats.bakerUtil}</span>
                        </div>
                        <div className="ab-stat ab-stat-wide">
                            <span className="ab-stat-label">Simulation End Time (Makespan)</span>
                            <span className="ab-stat-value">{stats.makespan}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Final Table */}
            {data.length > 0 && (
                <div className="ab-card">
                    <div className="ab-card-title">Final Simulation Table</div>
                    <div className="ab-table-wrap">
                        <table className="ab-table">
                            <thead>
                                <tr>
                                    <th rowSpan="2">Customer</th>
                                    <th rowSpan="2">RV (AT)</th>
                                    <th rowSpan="2">IAT</th>
                                    <th rowSpan="2">AT</th>

                                    <th colSpan="3" className="group-header able-header">Able</th>
                                    <th colSpan="3" className="group-header baker-header">Baker</th>

                                    <th rowSpan="2">Caller Delay</th>
                                    <th rowSpan="2">TSS</th>
                                </tr>

                                <tr>
                                    <th>TSB</th>
                                    <th>ST</th>
                                    <th>TSE</th>

                                    <th>TSB</th>
                                    <th>ST</th>
                                    <th>TSE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((r) => {
                                    const ableTSB = r.server === "Able" ? r.TSB : "";
                                    const ableST = r.server === "Able" ? r.ST : "";
                                    const ableTSE = r.server === "Able" ? r.TSE : "";

                                    const bakerTSB = r.server === "Baker" ? r.TSB : "";
                                    const bakerST = r.server === "Baker" ? r.ST : "";
                                    const bakerTSE = r.server === "Baker" ? r.TSE : "";

                                    return (
                                        <tr key={r.customer}>
                                            <td>{r.customer}</td>
                                            <td>{r.rvAT}</td>
                                            <td>{r.IAT}</td>
                                            <td>{r.AT}</td>

                                            <td>{ableTSB}</td>
                                            <td>{ableST}</td>
                                            <td>{ableTSE}</td>

                                            <td>{bakerTSB}</td>
                                            <td>{bakerST}</td>
                                            <td>{bakerTSE}</td>

                                            <td>{r.callerDelay}</td>
                                            <td>{r.TSS}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <p className="ab-note">
                        Note: Able/Baker columns are blank for customers not served by that server.
                    </p>
                </div>
            )}

            {/* Empty State */}
            {data.length === 0 && (
                <div className="ab-empty">
                    Enter number of customers and click <b>Generate Final Table</b>.
                </div>
            )}
        </div>
    );
};

export default AbleBakerSimulation;