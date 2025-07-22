// Tooth layout configuration
// This file contains UI-specific positioning data that should not be stored with clinical data

export interface ToothLayoutConfig {
  verticalOffset: number;
}

export const toothLayoutConfig: Record<number, ToothLayoutConfig> = {
  // Permanent teeth layout configuration
  // Based on the offset diagram: 0, 10, 20, 20, 20, 30, 35, 35
  
  // Quadrant 1 (Upper right)
  11: { verticalOffset: 35 },  // Central incisor
  12: { verticalOffset: 35 },  // Lateral incisor
  13: { verticalOffset: 30 },  // Canine
  14: { verticalOffset: 20 },  // First premolar
  15: { verticalOffset: 20 },  // Second premolar
  16: { verticalOffset: 20 },  // First molar
  17: { verticalOffset: 10 },  // Second molar
  18: { verticalOffset: 0 },   // Third molar (wisdom)
  
  // Quadrant 2 (Upper left)
  21: { verticalOffset: 35 },  // Central incisor
  22: { verticalOffset: 35 },  // Lateral incisor
  23: { verticalOffset: 30 },  // Canine
  24: { verticalOffset: 20 },  // First premolar
  25: { verticalOffset: 20 },  // Second premolar
  26: { verticalOffset: 20 },  // First molar
  27: { verticalOffset: 10 },  // Second molar
  28: { verticalOffset: 0 },   // Third molar (wisdom)
  
  // Quadrant 3 (Lower left) - Same positive offsets as upper teeth
  31: { verticalOffset: 35 },  // Central incisor
  32: { verticalOffset: 35 },  // Lateral incisor
  33: { verticalOffset: 30 },  // Canine
  34: { verticalOffset: 20 },  // First premolar
  35: { verticalOffset: 20 },  // Second premolar
  36: { verticalOffset: 20 },  // First molar
  37: { verticalOffset: 10 },  // Second molar
  38: { verticalOffset: 0 },   // Third molar (wisdom)
  
  // Quadrant 4 (Lower right) - Same positive offsets as upper teeth
  41: { verticalOffset: 35 },  // Central incisor
  42: { verticalOffset: 35 },  // Lateral incisor
  43: { verticalOffset: 30 },  // Canine
  44: { verticalOffset: 20 },  // First premolar
  45: { verticalOffset: 20 },  // Second premolar
  46: { verticalOffset: 20 },  // First molar
  47: { verticalOffset: 10 },  // Second molar
  48: { verticalOffset: 0 },   // Third molar (wisdom)
  
  // Temporary teeth layout configuration
  // Smaller arch curve for temporary teeth
  
  // Quadrant 5 (Upper right temporary)
  51: { verticalOffset: 25 },  // Central incisor
  52: { verticalOffset: 25 },  // Lateral incisor
  53: { verticalOffset: 20 },  // Canine
  54: { verticalOffset: 15 },  // First molar
  55: { verticalOffset: 10 },  // Second molar
  
  // Quadrant 6 (Upper left temporary)
  61: { verticalOffset: 25 },  // Central incisor
  62: { verticalOffset: 25 },  // Lateral incisor
  63: { verticalOffset: 20 },  // Canine
  64: { verticalOffset: 15 },  // First molar
  65: { verticalOffset: 10 },  // Second molar
  
  // Quadrant 7 (Lower left temporary) - Same positive offsets as upper temporary teeth
  71: { verticalOffset: 25 },  // Central incisor
  72: { verticalOffset: 25 },  // Lateral incisor
  73: { verticalOffset: 20 },  // Canine
  74: { verticalOffset: 15 },  // First molar
  75: { verticalOffset: 10 },  // Second molar
  
  // Quadrant 8 (Lower right temporary) - Same positive offsets as upper temporary teeth
  81: { verticalOffset: 25 },  // Central incisor
  82: { verticalOffset: 25 },  // Lateral incisor
  83: { verticalOffset: 20 },  // Canine
  84: { verticalOffset: 15 },  // First molar
  85: { verticalOffset: 10 },  // Second molar
};

// Helper function to get vertical offset for a tooth
export const getToothVerticalOffset = (toothId: number): number => {
  return toothLayoutConfig[toothId]?.verticalOffset || 0;
};