// Tooth layout configuration
// This file contains UI-specific positioning data that should not be stored with clinical data

export interface ToothLayoutConfig {
  verticalOffset: number;
}

export const toothLayoutConfig: Record<number, ToothLayoutConfig> = {
  // Permanent teeth layout configuration
  // Quadrant 1 (Upper right)
  11: { verticalOffset: 20 },
  12: { verticalOffset: 15 },
  13: { verticalOffset: 10 },
  14: { verticalOffset: 5 },
  15: { verticalOffset: 2 },
  16: { verticalOffset: 0 },
  17: { verticalOffset: -2 },
  18: { verticalOffset: -5 },
  
  // Quadrant 2 (Upper left)
  21: { verticalOffset: 20 },
  22: { verticalOffset: 15 },
  23: { verticalOffset: 10 },
  24: { verticalOffset: 5 },
  25: { verticalOffset: 2 },
  26: { verticalOffset: 0 },
  27: { verticalOffset: -2 },
  28: { verticalOffset: -5 },
  
  // Quadrant 3 (Lower left)
  31: { verticalOffset: -20 },
  32: { verticalOffset: -15 },
  33: { verticalOffset: -10 },
  34: { verticalOffset: -5 },
  35: { verticalOffset: -2 },
  36: { verticalOffset: 0 },
  37: { verticalOffset: 2 },
  38: { verticalOffset: 5 },
  
  // Quadrant 4 (Lower right)
  41: { verticalOffset: -20 },
  42: { verticalOffset: -15 },
  43: { verticalOffset: -10 },
  44: { verticalOffset: -5 },
  45: { verticalOffset: -2 },
  46: { verticalOffset: 0 },
  47: { verticalOffset: 2 },
  48: { verticalOffset: 5 },
  
  // Temporary teeth layout configuration
  // Quadrant 5 (Upper right temporary)
  51: { verticalOffset: 15 },
  52: { verticalOffset: 10 },
  53: { verticalOffset: 5 },
  54: { verticalOffset: 3 },
  55: { verticalOffset: -2 },
  
  // Quadrant 6 (Upper left temporary)
  61: { verticalOffset: 15 },
  62: { verticalOffset: 10 },
  63: { verticalOffset: 5 },
  64: { verticalOffset: 3 },
  65: { verticalOffset: -2 },
  
  // Quadrant 7 (Lower left temporary)
  71: { verticalOffset: -15 },
  72: { verticalOffset: -10 },
  73: { verticalOffset: -5 },
  74: { verticalOffset: -3 },
  75: { verticalOffset: 2 },
  
  // Quadrant 8 (Lower right temporary)
  81: { verticalOffset: -15 },
  82: { verticalOffset: -10 },
  83: { verticalOffset: -5 },
  84: { verticalOffset: -3 },
  85: { verticalOffset: 2 },
};

// Helper function to get vertical offset for a tooth
export const getToothVerticalOffset = (toothId: number): number => {
  return toothLayoutConfig[toothId]?.verticalOffset || 0;
};