// ===============================
// PSEUDO RANDOM NUMBER GENERATOR
// ===============================

// Linear Congruential Generator (LCG)
let seed = 27; // you can change seed if needed

const a = 17;
const c = 43;
const m = 100;

// Generates random digit in range 1–100
export const nextRandomDigit = () => {
  seed = (a * seed + c) % m;
  return seed === 0 ? 100 : seed;
};

// ===============================
// NEWSDAY TYPE LOGIC
// ===============================

export const getNewsdayType = (rvType) => {
  if (rvType <= 35) return "Good";
  else if (rvType <= 80) return "Fair";
  else return "Poor";
};

// ===============================
// DEMAND LOGIC
// ===============================

export const getDemand = (type, rvDemand) => {
  if (type === "Poor") {
    if (rvDemand <= 44) return 40;
    if (rvDemand <= 66) return 50;
    if (rvDemand <= 82) return 60;
    if (rvDemand <= 94) return 70;
    return 80;
  }

  if (type === "Fair") {
    if (rvDemand <= 10) return 40;
    if (rvDemand <= 28) return 50;
    if (rvDemand <= 68) return 60;
    if (rvDemand <= 88) return 70;
    if (rvDemand <= 96) return 80;
    return 90;
  }

  if (type === "Good") {
    if (rvDemand <= 3) return 40;
    if (rvDemand <= 8) return 50;
    if (rvDemand <= 23) return 60;
    if (rvDemand <= 43) return 70;
    if (rvDemand <= 78) return 80;
    if (rvDemand <= 93) return 90;
    return 100;
  }

  return 0;
};

// ===============================
// NEWSPAPER SIMULATION LOGIC
// ===============================

export const generateNewspaperSimulation = (
  stock,
  buyingPrice,
  sellingPrice,
  numDays = 10
) => {
  const UNSOLD_PRICE = 0.05; // $0.05
  const buyingPriceCents = buyingPrice / 100;
  const sellingPriceCents = sellingPrice / 100;

  const data = [];

  for (let i = 0; i < numDays; i++) {

    // 🔁 USE PRNG (NOT Math.random)
    const rvType = nextRandomDigit();
    const type = getNewsdayType(rvType);

    const rvDemand = nextRandomDigit();
    const demand = getDemand(type, rvDemand);

    const sold = Math.min(stock, demand);
    const revenue = sold * sellingPriceCents;

    const lostProfit =
      demand > stock
        ? (demand - stock) * (sellingPriceCents - buyingPriceCents)
        : 0;

    const salvage =
      stock > demand ? (stock - demand) * UNSOLD_PRICE : 0;

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