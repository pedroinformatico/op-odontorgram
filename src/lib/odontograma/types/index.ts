export interface Tooth {
  id: number;
  clinicalId?: string;  // Clinical notation: "1.8", "2.1", etc.
  quadrant: 1 | 2 | 3 | 4;
  position: number;
  status: ToothStatus;
  notes?: string;
  isTemporary?: boolean;
  verticalOffset?: number;
  
  // Anatomical properties
  toothType?: 'incisor' | 'canine' | 'premolar' | 'molar';
  rootCount?: 1 | 2 | 3;
  rootType?: 'single' | 'bifurcated' | 'trifurcated';
  
  // Clinical properties
  mobilityGrade?: 0 | 1 | 2 | 3;  // Tooth mobility grade
  furcationGrade?: 0 | 1 | 2 | 3;  // Furcation involvement
  gingivalRecession?: number;  // in mm
  pocketDepth?: number;  // in mm
  
  // Visual customization
  crownHeight?: number;
  rootLength?: number;
  
  // Surface conditions
  surfaces?: {
    oclusal?: ToothStatus;
    vestibular?: ToothStatus;
    lingual?: ToothStatus;
    mesial?: ToothStatus;
    distal?: ToothStatus;
  };
  
  // Additional properties
  lastUpdate?: string;
  procedures?: ToothProcedure[];
}

export type ToothStatus = 
  | 'healthy'
  | 'caries'
  | 'filled'
  | 'crown'
  | 'extracted'
  | 'implant'
  | 'root_canal'
  | 'fracture'
  | 'bridge'
  | 'extraction_indicated';

export interface ToothProcedure {
  id: string;
  type: string;
  date: string;
  description?: string;
  cost?: number;
}

export interface ToothSurface {
  name: 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';
  status: ToothStatus;
}