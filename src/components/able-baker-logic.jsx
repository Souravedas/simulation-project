// ---------- IAT mapping ----------
export const getIAT = (rv) => {
    if (rv <= 25) return 1;
    if (rv <= 65) return 2;
    if (rv <= 85) return 3;
    return 4;
};

// ---------- Able service ----------
export const getAbleST = (rv) => {
    if (rv <= 30) return 2;
    if (rv <= 70) return 3;
    return 4;
};

// ---------- Baker service ----------
export const getBakerST = (rv) => {
    if (rv <= 35) return 3;
    if (rv <= 80) return 4;
    return 5;
};

// ---------- Main Simulation ----------
export const generateAbleBakerSimulation = (numCustomers) => {
    const data = [];

    let ableFreeAt = 0;
    let bakerFreeAt = 0;

    for (let i = 0; i < numCustomers; i++) {
        const rvAT = Math.floor(Math.random() * 100) + 1;
        const IAT = i === 0 ? 0 : getIAT(rvAT);
        const AT = i === 0 ? 0 : data[i - 1].AT + IAT;

        let server = "";
        let TSB = 0, ST = 0, TSE = 0;
        let callerDelay = 0;

        // Decide server
        if (ableFreeAt <= AT) {
            server = "Able";
            TSB = AT;
            ST = getAbleST(Math.floor(Math.random() * 100) + 1);
            TSE = TSB + ST;
            ableFreeAt = TSE;
        } else if (bakerFreeAt <= AT) {
            server = "Baker";
            TSB = AT;
            ST = getBakerST(Math.floor(Math.random() * 100) + 1);
            TSE = TSB + ST;
            bakerFreeAt = TSE;
        } else {
            // Both busy → choose who frees first
            if (ableFreeAt <= bakerFreeAt) {
                server = "Able";
                TSB = ableFreeAt;
                ST = getAbleST(Math.floor(Math.random() * 100) + 1);
                TSE = TSB + ST;
                callerDelay = TSB - AT;
                ableFreeAt = TSE;
            } else {
                server = "Baker";
                TSB = bakerFreeAt;
                ST = getBakerST(Math.floor(Math.random() * 100) + 1);
                TSE = TSB + ST;
                callerDelay = TSB - AT;
                bakerFreeAt = TSE;
            }
        }

        const TSS = TSE - AT;

        data.push({
            customer: i + 1,
            rvAT,
            IAT,
            AT,
            server,
            TSB,
            ST,
            TSE,
            callerDelay,
            TSS
        });
    }

    return data;
};