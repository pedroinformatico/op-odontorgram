import { Tooth } from '../../types';

export interface OdontogramColumnProps {
  // Grupos de dientes
  permanentUpperGroup: Tooth[];
  permanentLowerGroup: Tooth[];
  temporaryUpperGroup: Tooth[];
  temporaryLowerGroup: Tooth[];
  
  // Props de visualización
  showTemporaryTeeth: boolean;
  showBiteEffect: boolean;
  developerMode: boolean;
  
  // Props de interacción
  selectedTooth: Tooth | null;
  onToothClick: (tooth: Tooth) => void;
  
  // Información del grupo
  groupNumber: number;
  groupLabel: string;
}

export interface ToothRowProps {
  teeth: Tooth[];
  isUpper: boolean;
  isTemporary: boolean;
  selectedTooth: Tooth | null;
  onToothClick: (tooth: Tooth) => void;
  developerMode: boolean;
  reverseOrder?: boolean;
}