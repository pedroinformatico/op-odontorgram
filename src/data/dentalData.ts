import { Tooth, Tool } from '../types/dental';

// Constantes para mapear tipos de dientes por posición según sistema FDI
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

// Grupos de dientes para el odontograma
export const TOOTH_GROUPS = {
  CENTRAL_POSITIONS: [1, 2, 3], // Incisivos y caninos
  LATERAL_POSITIONS: [4, 5, 6, 7, 8] // Premolares y molares
};

export const initialTeeth: Tooth[] = [
  // Cuadrante 1 (Superior derecho)
  { id: 11, clinicalId: '1.1', quadrant: 1, position: 1, status: 'healthy' },
  { id: 12, clinicalId: '1.2', quadrant: 1, position: 2, status: 'healthy' },
  { id: 13, clinicalId: '1.3', quadrant: 1, position: 3, status: 'healthy' },
  { id: 14, clinicalId: '1.4', quadrant: 1, position: 4, status: 'healthy' },
  { id: 15, clinicalId: '1.5', quadrant: 1, position: 5, status: 'healthy' },
  { id: 16, clinicalId: '1.6', quadrant: 1, position: 6, status: 'healthy' },
  { id: 17, clinicalId: '1.7', quadrant: 1, position: 7, status: 'healthy' },
  { id: 18, clinicalId: '1.8', quadrant: 1, position: 8, status: 'healthy' },
  
  // Cuadrante 2 (Superior izquierdo)
  { id: 21, clinicalId: '2.1', quadrant: 2, position: 1, status: 'healthy' },
  { id: 22, clinicalId: '2.2', quadrant: 2, position: 2, status: 'healthy' },
  { id: 23, clinicalId: '2.3', quadrant: 2, position: 3, status: 'healthy' },
  { id: 24, clinicalId: '2.4', quadrant: 2, position: 4, status: 'healthy' },
  { id: 25, clinicalId: '2.5', quadrant: 2, position: 5, status: 'healthy' },
  { id: 26, clinicalId: '2.6', quadrant: 2, position: 6, status: 'healthy' },
  { id: 27, clinicalId: '2.7', quadrant: 2, position: 7, status: 'healthy' },
  { id: 28, clinicalId: '2.8', quadrant: 2, position: 8, status: 'healthy' },
  
  // Cuadrante 3 (Inferior izquierdo)
  { id: 31, clinicalId: '3.1', quadrant: 3, position: 1, status: 'healthy' },
  { id: 32, clinicalId: '3.2', quadrant: 3, position: 2, status: 'healthy' },
  { id: 33, clinicalId: '3.3', quadrant: 3, position: 3, status: 'healthy' },
  { id: 34, clinicalId: '3.4', quadrant: 3, position: 4, status: 'healthy' },
  { id: 35, clinicalId: '3.5', quadrant: 3, position: 5, status: 'healthy' },
  { id: 36, clinicalId: '3.6', quadrant: 3, position: 6, status: 'healthy' },
  { id: 37, clinicalId: '3.7', quadrant: 3, position: 7, status: 'healthy' },
  { id: 38, clinicalId: '3.8', quadrant: 3, position: 8, status: 'healthy' },
  
  // Cuadrante 4 (Inferior derecho)
  { id: 41, clinicalId: '4.1', quadrant: 4, position: 1, status: 'healthy' },
  { id: 42, clinicalId: '4.2', quadrant: 4, position: 2, status: 'healthy' },
  { id: 43, clinicalId: '4.3', quadrant: 4, position: 3, status: 'healthy' },
  { id: 44, clinicalId: '4.4', quadrant: 4, position: 4, status: 'healthy' },
  { id: 45, clinicalId: '4.5', quadrant: 4, position: 5, status: 'healthy' },
  { id: 46, clinicalId: '4.6', quadrant: 4, position: 6, status: 'healthy' },
  { id: 47, clinicalId: '4.7', quadrant: 4, position: 7, status: 'healthy' },
  { id: 48, clinicalId: '4.8', quadrant: 4, position: 8, status: 'healthy' },
];

export const temporaryTeeth: Tooth[] = [
  // Cuadrante 5 (Superior derecho temporal)
  { id: 51, clinicalId: '5.1', quadrant: 1, position: 1, status: 'healthy', isTemporary: true },
  { id: 52, clinicalId: '5.2', quadrant: 1, position: 2, status: 'healthy', isTemporary: true },
  { id: 53, clinicalId: '5.3', quadrant: 1, position: 3, status: 'healthy', isTemporary: true },
  { id: 54, clinicalId: '5.4', quadrant: 1, position: 4, status: 'healthy', isTemporary: true },
  { id: 55, clinicalId: '5.5', quadrant: 1, position: 5, status: 'healthy', isTemporary: true },
  
  // Cuadrante 6 (Superior izquierdo temporal)
  { id: 61, clinicalId: '6.1', quadrant: 2, position: 1, status: 'healthy', isTemporary: true },
  { id: 62, clinicalId: '6.2', quadrant: 2, position: 2, status: 'healthy', isTemporary: true },
  { id: 63, clinicalId: '6.3', quadrant: 2, position: 3, status: 'healthy', isTemporary: true },
  { id: 64, clinicalId: '6.4', quadrant: 2, position: 4, status: 'healthy', isTemporary: true },
  { id: 65, clinicalId: '6.5', quadrant: 2, position: 5, status: 'healthy', isTemporary: true },
  
  // Cuadrante 7 (Inferior izquierdo temporal)
  { id: 71, clinicalId: '7.1', quadrant: 3, position: 1, status: 'healthy', isTemporary: true },
  { id: 72, clinicalId: '7.2', quadrant: 3, position: 2, status: 'healthy', isTemporary: true },
  { id: 73, clinicalId: '7.3', quadrant: 3, position: 3, status: 'healthy', isTemporary: true },
  { id: 74, clinicalId: '7.4', quadrant: 3, position: 4, status: 'healthy', isTemporary: true },
  { id: 75, clinicalId: '7.5', quadrant: 3, position: 5, status: 'healthy', isTemporary: true },
  
  // Cuadrante 8 (Inferior derecho temporal)
  { id: 81, clinicalId: '8.1', quadrant: 4, position: 1, status: 'healthy', isTemporary: true },
  { id: 82, clinicalId: '8.2', quadrant: 4, position: 2, status: 'healthy', isTemporary: true },
  { id: 83, clinicalId: '8.3', quadrant: 4, position: 3, status: 'healthy', isTemporary: true },
  { id: 84, clinicalId: '8.4', quadrant: 4, position: 4, status: 'healthy', isTemporary: true },
  { id: 85, clinicalId: '8.5', quadrant: 4, position: 5, status: 'healthy', isTemporary: true },
];

export const dentalTools: Tool[] = [
  { id: 'healthy', name: 'Sano', status: 'healthy', color: 'bg-success text-success-content', icon: 'check' },
  { id: 'caries', name: 'Caries', status: 'caries', color: 'bg-error text-error-content', icon: 'alert-circle' },
  { id: 'filled', name: 'Obturado', status: 'filled', color: 'bg-info text-info-content', icon: 'circle-dot' },
  { id: 'crown', name: 'Corona', status: 'crown', color: 'bg-warning text-warning-content', icon: 'crown' },
  { id: 'extracted', name: 'Extraído', status: 'extracted', color: 'bg-neutral text-neutral-content', icon: 'x' },
  { id: 'implant', name: 'Implante', status: 'implant', color: 'bg-primary text-primary-content', icon: 'plus' },
  { id: 'root_canal', name: 'Endodoncia', status: 'root_canal', color: 'bg-secondary text-secondary-content', icon: 'zap' },
  { id: 'fracture', name: 'Fractura', status: 'fracture', color: 'bg-orange-600 text-white', icon: 'triangle-alert' },
  { id: 'not_erupted', name: 'No erupcionado', status: 'not_erupted', color: 'bg-gray-300 text-gray-600', icon: 'circle' },
];