import { Tooth } from '../types';

// Constants for mapping tooth types by position according to FDI system
export const TOOTH_TYPES = {
  PERMANENT: {
    1: 'Incisivo central',
    2: 'Incisivo lateral',
    3: 'Canino',
    4: 'Primer premolar',
    5: 'Segundo premolar',
    6: 'Primer molar',
    7: 'Segundo molar',
    8: 'Tercer molar (muela del juicio)'
  },
  TEMPORARY: {
    1: 'Incisivo central',
    2: 'Incisivo lateral',
    3: 'Canino',
    4: 'Primer molar',
    5: 'Segundo molar'
  }
};

// Tooth groups for the odontogram
export const TOOTH_GROUPS = {
  CENTRAL_POSITIONS: [1, 2, 3], // Incisors and canines
  LATERAL_POSITIONS: [4, 5, 6, 7, 8] // Premolars and molars
};

export const initialPermanentTeeth: Tooth[] = [
  // Quadrant 1 (Upper right)
  { id: 11, clinicalId: '1.1', quadrant: 1, position: 1, status: 'healthy', verticalOffset: 20 },
  { id: 12, clinicalId: '1.2', quadrant: 1, position: 2, status: 'healthy', verticalOffset: 15 },
  { id: 13, clinicalId: '1.3', quadrant: 1, position: 3, status: 'healthy', verticalOffset: 10 },
  { id: 14, clinicalId: '1.4', quadrant: 1, position: 4, status: 'healthy', verticalOffset: 5 },
  { id: 15, clinicalId: '1.5', quadrant: 1, position: 5, status: 'healthy', verticalOffset: 2 },
  { id: 16, clinicalId: '1.6', quadrant: 1, position: 6, status: 'healthy', verticalOffset: 0 },
  { id: 17, clinicalId: '1.7', quadrant: 1, position: 7, status: 'healthy', verticalOffset: -2 },
  { id: 18, clinicalId: '1.8', quadrant: 1, position: 8, status: 'healthy', verticalOffset: -5 },
  
  // Quadrant 2 (Upper left)
  { id: 21, clinicalId: '2.1', quadrant: 2, position: 1, status: 'healthy', verticalOffset: 20 },
  { id: 22, clinicalId: '2.2', quadrant: 2, position: 2, status: 'healthy', verticalOffset: 15 },
  { id: 23, clinicalId: '2.3', quadrant: 2, position: 3, status: 'healthy', verticalOffset: 10 },
  { id: 24, clinicalId: '2.4', quadrant: 2, position: 4, status: 'healthy', verticalOffset: 5 },
  { id: 25, clinicalId: '2.5', quadrant: 2, position: 5, status: 'healthy', verticalOffset: 2 },
  { id: 26, clinicalId: '2.6', quadrant: 2, position: 6, status: 'healthy', verticalOffset: 0 },
  { id: 27, clinicalId: '2.7', quadrant: 2, position: 7, status: 'healthy', verticalOffset: -2 },
  { id: 28, clinicalId: '2.8', quadrant: 2, position: 8, status: 'healthy', verticalOffset: -5 },
  
  // Quadrant 3 (Lower left)
  { id: 31, clinicalId: '3.1', quadrant: 3, position: 1, status: 'healthy', verticalOffset: -20 },
  { id: 32, clinicalId: '3.2', quadrant: 3, position: 2, status: 'healthy', verticalOffset: -15 },
  { id: 33, clinicalId: '3.3', quadrant: 3, position: 3, status: 'healthy', verticalOffset: -10 },
  { id: 34, clinicalId: '3.4', quadrant: 3, position: 4, status: 'healthy', verticalOffset: -5 },
  { id: 35, clinicalId: '3.5', quadrant: 3, position: 5, status: 'healthy', verticalOffset: -2 },
  { id: 36, clinicalId: '3.6', quadrant: 3, position: 6, status: 'healthy', verticalOffset: 0 },
  { id: 37, clinicalId: '3.7', quadrant: 3, position: 7, status: 'healthy', verticalOffset: 2 },
  { id: 38, clinicalId: '3.8', quadrant: 3, position: 8, status: 'healthy', verticalOffset: 5 },
  
  // Quadrant 4 (Lower right)
  { id: 41, clinicalId: '4.1', quadrant: 4, position: 1, status: 'healthy', verticalOffset: -20 },
  { id: 42, clinicalId: '4.2', quadrant: 4, position: 2, status: 'healthy', verticalOffset: -15 },
  { id: 43, clinicalId: '4.3', quadrant: 4, position: 3, status: 'healthy', verticalOffset: -10 },
  { id: 44, clinicalId: '4.4', quadrant: 4, position: 4, status: 'healthy', verticalOffset: -5 },
  { id: 45, clinicalId: '4.5', quadrant: 4, position: 5, status: 'healthy', verticalOffset: -2 },
  { id: 46, clinicalId: '4.6', quadrant: 4, position: 6, status: 'healthy', verticalOffset: 0 },
  { id: 47, clinicalId: '4.7', quadrant: 4, position: 7, status: 'healthy', verticalOffset: 2 },
  { id: 48, clinicalId: '4.8', quadrant: 4, position: 8, status: 'healthy', verticalOffset: 5 },
];

export const initialTemporaryTeeth: Tooth[] = [
  // Quadrant 5 (Upper right temporary)
  { id: 51, clinicalId: '5.1', quadrant: 1, position: 1, status: 'healthy', isTemporary: true, verticalOffset: 15 },
  { id: 52, clinicalId: '5.2', quadrant: 1, position: 2, status: 'healthy', isTemporary: true, verticalOffset: 10 },
  { id: 53, clinicalId: '5.3', quadrant: 1, position: 3, status: 'healthy', isTemporary: true, verticalOffset: 5 },
  { id: 54, clinicalId: '5.4', quadrant: 1, position: 4, status: 'healthy', isTemporary: true, verticalOffset: 3 },
  { id: 55, clinicalId: '5.5', quadrant: 1, position: 5, status: 'healthy', isTemporary: true, verticalOffset: -2 },
  
  // Quadrant 6 (Upper left temporary)
  { id: 61, clinicalId: '6.1', quadrant: 2, position: 1, status: 'healthy', isTemporary: true, verticalOffset: 15 },
  { id: 62, clinicalId: '6.2', quadrant: 2, position: 2, status: 'healthy', isTemporary: true, verticalOffset: 10 },
  { id: 63, clinicalId: '6.3', quadrant: 2, position: 3, status: 'healthy', isTemporary: true, verticalOffset: 5 },
  { id: 64, clinicalId: '6.4', quadrant: 2, position: 4, status: 'healthy', isTemporary: true, verticalOffset: 3 },
  { id: 65, clinicalId: '6.5', quadrant: 2, position: 5, status: 'healthy', isTemporary: true, verticalOffset: -2 },
  
  // Quadrant 7 (Lower left temporary)
  { id: 71, clinicalId: '7.1', quadrant: 3, position: 1, status: 'healthy', isTemporary: true, verticalOffset: -15 },
  { id: 72, clinicalId: '7.2', quadrant: 3, position: 2, status: 'healthy', isTemporary: true, verticalOffset: -10 },
  { id: 73, clinicalId: '7.3', quadrant: 3, position: 3, status: 'healthy', isTemporary: true, verticalOffset: -5 },
  { id: 74, clinicalId: '7.4', quadrant: 3, position: 4, status: 'healthy', isTemporary: true, verticalOffset: -3 },
  { id: 75, clinicalId: '7.5', quadrant: 3, position: 5, status: 'healthy', isTemporary: true, verticalOffset: 2 },
  
  // Quadrant 8 (Lower right temporary)
  { id: 81, clinicalId: '8.1', quadrant: 4, position: 1, status: 'healthy', isTemporary: true, verticalOffset: -15 },
  { id: 82, clinicalId: '8.2', quadrant: 4, position: 2, status: 'healthy', isTemporary: true, verticalOffset: -10 },
  { id: 83, clinicalId: '8.3', quadrant: 4, position: 3, status: 'healthy', isTemporary: true, verticalOffset: -5 },
  { id: 84, clinicalId: '8.4', quadrant: 4, position: 4, status: 'healthy', isTemporary: true, verticalOffset: -3 },
  { id: 85, clinicalId: '8.5', quadrant: 4, position: 5, status: 'healthy', isTemporary: true, verticalOffset: 2 },
];