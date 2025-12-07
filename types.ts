export enum ClearLamp {
  FAILED = 'FAILED',
  CLEAR = 'CLEAR',
  FULL_COMBO = 'FULL_COMBO',
  ALL_JUSTICE = 'ALL_JUSTICE',
}

export interface CalculationResult {
  rating: number;
  overPower: number;
  overPowerBase: number;
  overPowerBonus: number; // Clear bonus
  overPowerGapBonus: number; // The score gap bonus for > 1,007,500
  maxPossibleOverPower: number;
  rank: string;
}

export interface CalculationInput {
  score: number;
  constant: number;
  lamp: ClearLamp;
}
