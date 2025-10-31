// --- Inter-arrival time mapping ---
export const getInterArrivalTime = (rv) => {
    if (rv <= 125) return 1;
    if (rv <= 250) return 2;
    if (rv <= 375) return 3;
    if (rv <= 500) return 4;
    if (rv <= 625) return 5;
    if (rv <= 750) return 6;
    if (rv <= 875) return 7;
    return 8; // 876–1000
};

// --- Service time mapping ---
export const getServiceTime = (rv) => {
    if (rv <= 25) return 1;
    if (rv <= 35) return 2;
    if (rv <= 65) return 3;
    if (rv <= 75) return 4;
    if (rv <= 95) return 5;
    return 6; // 96–100
};

// --- Generate full simulation table ---
export const generateSimulation = (numCustomers) => {
    const data = [];

    for (let i = 0; i < numCustomers; i++) {
        const rvAT = Math.floor(Math.random() * 1000) + 1;
        const rvST = Math.floor(Math.random() * 100) + 1;
        const IAT = i === 0 ? 0 : getInterArrivalTime(rvAT); // First customer has IAT = 0
        const ST = getServiceTime(rvST);

        const prev = data[i - 1] || {};
        const prevAT = i === 0 ? 0 : prev.AT;
        const prevTSE = i === 0 ? 0 : prev.TSE;

        const AT = i === 0 ? 0 : prevAT + IAT; // first arrival time = 0
        const TSB = i === 0 ? 0 : Math.max(prevTSE, AT);
        const WT = TSB - AT;
        const TSE = TSB + ST;
        const TSS = WT + ST;
        const IOS = i === 0 ? 0 : Math.max(0, TSB - prevTSE);

        data.push({
            customer: i + 1, rvAT, IAT, AT, rvST, ST,
            TSB, WT, TSE, TSS, IOS
        });
    }

    return data;
};

export const calculateSummary = (data) => {
    if (!data || data.length === 0) return null;

    const n = data.length;
    const totalWT = data.reduce((sum, d) => sum + d.WT, 0);
    const totalST = data.reduce((sum, d) => sum + d.ST, 0);
    const totalIAT = data.slice(1).reduce((sum, d) => sum + d.IAT, 0); // exclude first IAT
    const totalIOS = data.reduce((sum, d) => sum + d.IOS, 0);
    const totalTSS = data.reduce((sum, d) => sum + d.TSS, 0);
    const waited = data.filter((d) => d.WT > 0).length;
    const lastTSE = data[data.length - 1]?.TSE || 0;

    return {
        avgWaitingTime: (totalWT / n).toFixed(2),
        probWait: (waited / n).toFixed(2),
        probIdle: lastTSE ? (totalIOS / lastTSE).toFixed(2) : "0.00",
        avgServiceTime: (totalST / n).toFixed(2),
        avgTimeBetweenArrival: n > 1 ? (totalIAT / (n - 1)).toFixed(2) : "0.00",
        avgWaitingForThoseWhoWait: waited > 0 ? (totalWT / waited).toFixed(2) : "0.00",
        avgTimeInSystem: (totalTSS / n).toFixed(2),
    };
};
