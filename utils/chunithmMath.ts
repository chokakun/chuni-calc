import { ClearLamp, CalculationResult } from '../types';

const MAX_SCORE = 1010000;

export const getRankString = (score: number): string => {
  if (score >= 1009000) return 'SSS+';
  if (score >= 1007500) return 'SSS';
  if (score >= 1005000) return 'SS+';
  if (score >= 1000000) return 'SS';
  if (score >= 990000) return 'S+';
  if (score >= 975000) return 'S';
  if (score >= 950000) return 'AAA';
  if (score >= 925000) return 'AA';
  if (score >= 900000) return 'A';
  if (score >= 800000) return 'BBB';
  if (score >= 500000) return 'BB';
  return 'C'; // Or D/E in older versions, but typically C is the floor for standard rating
};

export const calculateRating = (score: number, constant: number): number => {
  let calculatedRating = 0;

  if (score >= 1009000) {
    calculatedRating = constant + 2.15;
  } else if (score >= 1007500) {
    calculatedRating = constant + 2.0 + (score - 1007500) / 100 * 0.01;
  } else if (score >= 1005000) {
    calculatedRating = constant + 1.5 + (score - 1005000) / 50 * 0.01;
  } else if (score >= 1000000) {
    calculatedRating = constant + 1.0 + (score - 1000000) / 100 * 0.01;
  } else if (score >= 990000) {
    calculatedRating = constant + 0.6 + (score - 990000) / 250 * 0.01;
  } else if (score >= 975000) {
    calculatedRating = constant + (score - 975000) / 250 * 0.01;
  } else if (score >= 950000) {
    // Usually linear reduction below S
    calculatedRating = constant - 1.5 + (score - 950000) / 150 * 0.01; // Approximation based on chart, strictly for OP usually >= S matters
  } else if (score >= 925000) {
    calculatedRating = constant - 3.0 + (score - 925000) / 250 * 0.01; // Std formula
  } else if (score >= 900000) {
    calculatedRating = constant - 5.0 + (score - 900000) / 250 * 0.01;
  } else {
    calculatedRating = 0; // Simplified for very low scores
  }

  return Math.max(0, calculatedRating);
};

export const calculateOverPower = (
  score: number, 
  constant: number, 
  lamp: ClearLamp
): CalculationResult => {
  const rating = calculateRating(score, constant);
  
  let baseOp = 0;
  let gapBonus = 0;
  let clearBonus = 0;

  // 1. Determine Base OP & Gap Bonus
  if (score >= 1007500) {
    // SSS or higher formula: (Const + 2) * 5 + GapBonus
    baseOp = (constant + 2) * 5;
    // Gap Bonus: (Score - 1,007,500) * 0.0015
    // Max gap bonus at 1,010,000 is 2500 * 0.0015 = 3.75
    gapBonus = (Math.min(score, MAX_SCORE) - 1007500) * 0.0015;
  } else {
    // Below SSS: Rating * 5
    // Note: The prompt chart implies linear relation for S~SSS which is Rating*5.
    baseOp = rating * 5; 
    gapBonus = 0;
  }

  // 2. Determine Clear Bonus
  // FC: 0.5, AJ: 1.0, AJC: 1.25
  if (score === MAX_SCORE) {
    // Implies AJC automatically
    clearBonus = 1.25;
  } else {
    switch (lamp) {
      case ClearLamp.ALL_JUSTICE:
        clearBonus = 1.0;
        break;
      case ClearLamp.FULL_COMBO:
        clearBonus = 0.5;
        break;
      default:
        clearBonus = 0;
        break;
    }
  }

  const totalOp = baseOp + gapBonus + clearBonus;

  // Calculate Max Possible OP for this constant (AJC)
  // (C + 2)*5 + 3.75 (gap) + 1.25 (clear) = 5C + 10 + 5 = 5C + 15 = 5(C+3)
  const maxPossible = (constant + 3) * 5;

  return {
    rating: parseFloat(rating.toFixed(4)), // Keep precision
    overPower: parseFloat(totalOp.toFixed(4)),
    overPowerBase: parseFloat(baseOp.toFixed(4)),
    overPowerBonus: clearBonus,
    overPowerGapBonus: parseFloat(gapBonus.toFixed(4)),
    maxPossibleOverPower: parseFloat(maxPossible.toFixed(4)),
    rank: getRankString(score)
  };
};