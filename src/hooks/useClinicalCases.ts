import { useState, useCallback } from 'react';
import { Tooth } from '../lib/odontograma/types';
import { clinicalCases, ClinicalCase } from '../data/clinicalCases';
import { initialPermanentTeeth, initialTemporaryTeeth } from '../lib/odontograma/data/initialTeeth';

interface UseClinicalCasesReturn {
  selectedCaseId: string;
  setSelectedCaseId: (caseId: string) => void;
  applyCase: (caseId: string, currentTeeth: Tooth[], currentTemporaryTeeth: Tooth[]) => {
    permanentTeeth: Tooth[];
    temporaryTeeth: Tooth[];
  };
  getCaseById: (caseId: string) => ClinicalCase | undefined;
  getAllCases: () => ClinicalCase[];
  getCasesByCategory: (category: string) => ClinicalCase[];
}

export function useClinicalCases(): UseClinicalCasesReturn {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('empty');

  const getCaseById = useCallback((caseId: string): ClinicalCase | undefined => {
    return clinicalCases.find(c => c.id === caseId);
  }, []);

  const getAllCases = useCallback((): ClinicalCase[] => {
    return clinicalCases;
  }, []);

  const getCasesByCategory = useCallback((category: string): ClinicalCase[] => {
    return clinicalCases.filter(c => c.category === category);
  }, []);

  const applyCase = useCallback((
    caseId: string, 
    currentTeeth: Tooth[], 
    currentTemporaryTeeth: Tooth[]
  ) => {
    const clinicalCase = getCaseById(caseId);
    
    if (!clinicalCase) {
      return {
        permanentTeeth: currentTeeth,
        temporaryTeeth: currentTemporaryTeeth
      };
    }

    if (caseId === 'empty') {
      return {
        permanentTeeth: initialPermanentTeeth,
        temporaryTeeth: initialTemporaryTeeth
      };
    }

    // Aplicar datos del caso clínico preservando estructura base
    const updatedPermanentTeeth = currentTeeth.map(tooth => {
      const caseToothData = clinicalCase.permanentTeeth.find(t => t.id === tooth.id);
      if (caseToothData) {
        return {
          ...tooth,
          status: caseToothData.status,
          notes: caseToothData.notes || tooth.notes,
          surfaces: caseToothData.surfaces || tooth.surfaces,
          mobilityGrade: caseToothData.mobilityGrade ?? tooth.mobilityGrade,
          furcationGrade: caseToothData.furcationGrade ?? tooth.furcationGrade,
          gingivalRecession: caseToothData.gingivalRecession ?? tooth.gingivalRecession,
          pocketDepth: caseToothData.pocketDepth ?? tooth.pocketDepth,
          lastUpdate: new Date().toISOString()
        };
      }
      return tooth;
    });

    const updatedTemporaryTeeth = currentTemporaryTeeth.map(tooth => {
      const caseToothData = clinicalCase.temporaryTeeth.find(t => t.id === tooth.id);
      if (caseToothData) {
        return {
          ...tooth,
          status: caseToothData.status,
          notes: caseToothData.notes || tooth.notes,
          surfaces: caseToothData.surfaces || tooth.surfaces,
          lastUpdate: new Date().toISOString()
        };
      }
      return tooth;
    });

    return {
      permanentTeeth: updatedPermanentTeeth,
      temporaryTeeth: updatedTemporaryTeeth
    };
  }, [getCaseById]);

  return {
    selectedCaseId,
    setSelectedCaseId,
    applyCase,
    getCaseById,
    getAllCases,
    getCasesByCategory
  };
}