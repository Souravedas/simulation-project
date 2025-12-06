// --- Generate type of day based on random digit (1-100) ---
export const getNewsdayType = (rvType) => {
  if (rvType <= 35) return "Good";
  else if (rvType <= 80) return "Fair";
  else return "Poor";
};

// --- Generate demand based on type and random digit (1-100) ---
export const getDemand = (type, rvDemand) => {
  if (type === "Poor") {
    if (rvDemand >= 1 && rvDemand <= 44) return 40;
    if (rvDemand >= 45 && rvDemand <= 66) return 50;
    if (rvDemand >= 67 && rvDemand <= 82) return 60;
    if (rvDemand >= 83 && rvDemand <= 94) return 70;
    if (rvDemand >= 95 && rvDemand <= 100) return 80;
  } else if (type === "Fair") {
    if (rvDemand >= 1 && rvDemand <= 10) return 40;
    if (rvDemand >= 11 && rvDemand <= 28) return 50;
    if (rvDemand >= 29 && rvDemand <= 68) return 60;
    if (rvDemand >= 69 && rvDemand <= 88) return 70;
    if (rvDemand >= 89 && rvDemand <= 96) return 80;
    if (rvDemand >= 97 && rvDemand <= 100) return 90;
  } else if (type === "Good") {
    if (rvDemand >= 1 && rvDemand <= 3) return 40;
    if (rvDemand >= 4 && rvDemand <= 8) return 50;
    if (rvDemand >= 9 && rvDemand <= 23) return 60;
    if (rvDemand >= 24 && rvDemand <= 43) return 70;
    if (rvDemand >= 44 && rvDemand <= 78) return 80;
    if (rvDemand >= 79 && rvDemand <= 93) return 90;
    if (rvDemand >= 94 && rvDemand <= 100) return 100;
  }
  return 0;
};

// --- Generate full newspaper simulation table ---
export const generateNewspaperSimulation = (
  stock,
  buyingPrice,
  sellingPrice,
  numDays = 10
) => {
  const UNSOLD_PRICE = 0.05; // $0.05 = 5 cents
  const buyingPriceCents = buyingPrice / 100;
  const sellingPriceCents = sellingPrice / 100;

  const data = [];

  for (let i = 0; i < numDays; i++) {
    const rvType = Math.floor(Math.random() * 100) + 1;
    const type = getNewsdayType(rvType);

    const rvDemand = Math.floor(Math.random() * 100) + 1;
    const demand = getDemand(type, rvDemand);

    const sold = Math.min(stock, demand);
    const revenue = sold * sellingPriceCents;
    const lostProfit =
      demand > stock
        ? (demand - stock) * (sellingPriceCents - buyingPriceCents)
        : 0;
    const salvage = stock > demand ? (stock - demand) * UNSOLD_PRICE : 0;
    const dailyProfit =
      revenue - stock * buyingPriceCents - lostProfit + salvage;

    data.push({
      day: i + 1,
      rvType,
      type,
      rvDemand,
      demand,
      revenue: revenue.toFixed(2),
      lostProfit: lostProfit.toFixed(2),
      salvage: salvage.toFixed(2),
      dailyProfit: dailyProfit.toFixed(2),
    });
  }

  return data;
};
