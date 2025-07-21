import { useState, useCallback } from 'react';
import { Tooth, ToothStatus, ToothSurface } from '../lib/odontograma/types';
import { initialPermanentTeeth, initialTemporaryTeeth } from '../lib/odontograma/data/initialTeeth';

interface UseOdontogramStateReturn {
  teeth: Tooth[];
  temporaryTeeth: Tooth[];
  selectedTooth: Tooth | null;
  showTemporaryTeeth: boolean;
  setTeeth: (teeth: Tooth[]) => void;
  setTemporaryTeeth: (teeth: Tooth[]) => void;
  setSelectedTooth: (tooth: Tooth | null) => void;
  setShowTemporaryTeeth: (show: boolean) => void;
  updateTooth: (toothId: number, updates: Partial<Tooth>) => void;
  updateToothStatus: (toothId: number, status: ToothStatus) => void;
  updateToothSurface: (toothId: number, surface: ToothSurface, status: ToothStatus) => void;
  resetToDefaults: () => void;
}

export function useOdontogramState(): UseOdontogramStateReturn {
  const [teeth, setTeeth] = useState<Tooth[]>(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState<Tooth[]>(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [showTemporaryTeeth, setShowTemporaryTeeth] = useState(false);

  const updateTooth = useCallback((toothId: number, updates: Partial<Tooth>) => {
    setTeeth(prevTeeth => 
      prevTeeth.map(tooth => 
        tooth.id === toothId 
          ? { ...tooth, ...updates, lastUpdate: new Date().toISOString() }
          : tooth
      )
    );
  }, []);

  const updateToothStatus = useCallback((toothId: number, status: ToothStatus) => {
    updateTooth(toothId, { status });
  }, [updateTooth]);

  const updateToothSurface = useCallback((toothId: number, surface: ToothSurface, status: ToothStatus) => {
    setTeeth(prevTeeth => 
      prevTeeth.map(tooth => 
        tooth.id === toothId 
          ? {
              ...tooth,
              surfaces: {
                ...tooth.surfaces,
                [surface]: status
              },
              lastUpdate: new Date().toISOString()
            }
          : tooth
      )
    );
  }, []);

  const resetToDefaults = useCallback(() => {
    setTeeth(initialPermanentTeeth);
    setTemporaryTeeth(initialTemporaryTeeth);
    setSelectedTooth(null);
  }, []);

  return {
    teeth,
    temporaryTeeth,
    selectedTooth,
    showTemporaryTeeth,
    setTeeth,
    setTemporaryTeeth,
    setSelectedTooth,
    setShowTemporaryTeeth,
    updateTooth,
    updateToothStatus,
    updateToothSurface,
    resetToDefaults
  };
}