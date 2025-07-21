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
  
  // Demo properties
  isDemo?: boolean;
  demoLabel?: string;
  
  // Additional properties for enhanced functionality
  lastUpdate?: string;
  procedures?: any[]; // For now, using any; would be ToothProcedure[] in full implementation
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
  | 'extraction_indicated'
  | 'not_erupted';

export interface Patient {
  name: string;
  age: number;
  lastVisit: string;
}

export interface Tool {
  id: string;
  name: string;
  status: ToothStatus;
  color: string;
  icon: string;
}