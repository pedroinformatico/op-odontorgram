// Main components
export { Odontogram } from './components/Odontogram';
export type { OdontogramProps } from './components/Odontogram';

export { DetailedToothComponent } from './components/DetailedToothComponent';
export type { DetailedToothComponentProps } from './components/DetailedToothComponent';

// Types
export type {
  Tooth,
  ToothStatus,
  ToothProcedure,
  ToothSurface
} from './types';

// Data
export {
  TOOTH_TYPES,
  TOOTH_GROUPS,
  initialPermanentTeeth,
  initialTemporaryTeeth
} from './data/dentalData';

// Utils for creating teeth data
export const createTooth = (
  id: number,
  quadrant: 1 | 2 | 3 | 4,
  position: number,
  options?: Partial<Tooth>
): Tooth => {
  const clinicalId = `${quadrant}.${position}`;
  return {
    id,
    clinicalId,
    quadrant,
    position,
    status: 'healthy',
    verticalOffset: 0,
    ...options
  } as Tooth;
};