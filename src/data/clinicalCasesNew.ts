import { Tooth } from '../lib/odontograma/types';
import { casesData } from './cases';
import { initialPermanentTeeth, initialTemporaryTeeth } from '../lib/odontograma/data/initialTeeth';

export interface ClinicalCase {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'periodontal' | 'orthodontic' | 'pediatric' | 'complex';
  permanentTeeth: Partial<Tooth>[];
  temporaryTeeth: Partial<Tooth>[];
}

// Función para aplicar los datos de un caso a los dientes base
export function applyCase(
  caseData: ClinicalCase,
  basePermanentTeeth: Tooth[] = initialPermanentTeeth,
  baseTemporaryTeeth: Tooth[] = initialTemporaryTeeth
): { permanentTeeth: Tooth[]; temporaryTeeth: Tooth[] } {
  
  // Aplicar datos permanentes
  const permanentTeeth = basePermanentTeeth.map(tooth => {
    const caseToothData = caseData.permanentTeeth.find(t => t.id === tooth.id);
    if (caseToothData) {
      return {
        ...tooth,
        ...caseToothData,
        lastUpdate: new Date().toISOString()
      };
    }
    return tooth;
  });

  // Aplicar datos temporales
  const temporaryTeeth = baseTemporaryTeeth.map(tooth => {
    const caseToothData = caseData.temporaryTeeth.find(t => t.id === tooth.id);
    if (caseToothData) {
      return {
        ...tooth,
        ...caseToothData,
        lastUpdate: new Date().toISOString()
      };
    }
    return tooth;
  });

  return { permanentTeeth, temporaryTeeth };
}

export const clinicalCases: ClinicalCase[] = casesData;

// Función helper para obtener un caso por ID
export const getClinicalCaseById = (id: string): ClinicalCase | undefined => {
  return clinicalCases.find(c => c.id === id);
};

// Función helper para obtener casos por categoría
export const getClinicalCasesByCategory = (category: ClinicalCase['category']): ClinicalCase[] => {
  return clinicalCases.filter(c => c.category === category);
};