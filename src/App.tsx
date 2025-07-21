import React, { useState, useEffect, useRef } from 'react';
import { Patient, ToothStatus } from './types/dental';
import { generateDemoTeeth, generateDemoTemporaryTeeth } from './data/demoTeeth';
import { PatientHeader } from './components/PatientHeader';
import { FloatingToothDetailsCard } from './components/FloatingToothDetailsCard';
import { ColorLegend } from './components/ColorLegend';
import { CompactCaseSelector } from './components/CompactCaseSelector';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getClinicalCaseById } from './data/clinicalCases';

// Importar desde la librería
import { Odontogram, Tooth, initialPermanentTeeth, initialTemporaryTeeth } from './lib/odontograma';
import './lib/odontograma/styles/odontogram.css';

function App() {
  const [teeth, setTeeth] = useLocalStorage<Tooth[]>('odontogram-teeth', initialPermanentTeeth);
  const [tempTeeth, setTempTeeth] = useLocalStorage<Tooth[]>('odontogram-temp-teeth', initialTemporaryTeeth);
  const [showTemporaryTeeth, setShowTemporaryTeeth] = useLocalStorage<boolean>('show-temporary-teeth', false);
  const [patient, setPatient] = useLocalStorage<Patient>('odontogram-patient', {
    name: '',
    age: 0,
    lastVisit: new Date().toISOString().split('T')[0]
  });
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [showBiteEffect, setShowBiteEffect] = useState<boolean>(true); // Empezar abierto
  const [isAnimatingBite, setIsAnimatingBite] = useState<boolean>(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('empty');

  const handleToothClick = (tooth: Tooth, event?: React.MouseEvent) => {
    setSelectedTooth(tooth);
  };

  // Manejar selección de caso clínico
  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
    
    // Si es el caso por defecto, restaurar los datos iniciales
    if (caseId === 'empty') {
      setTeeth(initialPermanentTeeth);
      setTempTeeth(initialTemporaryTeeth);
      setSelectedTooth(null);
      return;
    }
    
    const clinicalCase = getClinicalCaseById(caseId);
    
    if (clinicalCase) {
      // Preservar los datos estructurales y solo actualizar status y notes
      setTeeth(prevTeeth => {
        return prevTeeth.map(tooth => {
          const caseToothData = clinicalCase.permanentTeeth.find(t => t.id === tooth.id);
          if (caseToothData) {
            return {
              ...tooth, // Preservar todos los datos estructurales
              status: caseToothData.status,
              notes: caseToothData.notes || tooth.notes
            };
          }
          return tooth;
        });
      });
      
      setTempTeeth(prevTeeth => {
        return prevTeeth.map(tooth => {
          const caseToothData = clinicalCase.temporaryTeeth.find(t => t.id === tooth.id);
          if (caseToothData) {
            return {
              ...tooth, // Preservar todos los datos estructurales
              status: caseToothData.status,
              notes: caseToothData.notes || tooth.notes
            };
          }
          return tooth;
        });
      });
      
      // Actualizar edad del paciente si está definida
      if (clinicalCase.patientAge) {
        setPatient(prev => ({
          ...prev,
          age: clinicalCase.patientAge || 0,
          name: prev.name || `Paciente ${clinicalCase.name}`
        }));
      }
      
      // Mostrar dientes temporales para casos pediátricos
      if (clinicalCase.category === 'pediatric' || clinicalCase.category === 'infant') {
        setShowTemporaryTeeth(true);
      }
      
      // Limpiar selección de diente
      setSelectedTooth(null);
    }
  };

  // Ejecutar animación de mordida al iniciar
  useEffect(() => {
    // Pequeño delay para que se vea la transición
    const timer = setTimeout(() => {
      setShowBiteEffect(false); // Cerrar la boca
    }, 200);

    return () => clearTimeout(timer);
  }, []); // Solo ejecutar una vez al montar el componente

  // Función para simular mordida completa
  const simulateBite = () => {
    if (isAnimatingBite) return;
    
    setIsAnimatingBite(true);
    
    // Empezar con la boca cerrada
    setShowBiteEffect(false);
    
    // Abrir la boca
    setTimeout(() => {
      setShowBiteEffect(true);
    }, 300);
    
    // Cerrar la boca (morder)
    setTimeout(() => {
      setShowBiteEffect(false);
    }, 1000);
    
    // Terminar animación
    setTimeout(() => {
      setIsAnimatingBite(false);
    }, 1500);
  };

  const handleUpdateTooth = (toothId: number, updates: Partial<Tooth>) => {
    // Determinar si es un diente temporal o permanente
    const isTemporary = toothId >= 51 && toothId <= 85;
    
    if (isTemporary) {
      setTempTeeth(prevTeeth =>
        prevTeeth.map(tooth =>
          tooth.id === toothId
            ? { ...tooth, ...updates }
            : tooth
        )
      );
    } else {
      setTeeth(prevTeeth =>
        prevTeeth.map(tooth =>
          tooth.id === toothId
            ? { ...tooth, ...updates }
            : tooth
        )
      );
    }
    
    if (selectedTooth && selectedTooth.id === toothId) {
      setSelectedTooth(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleResetOdontogram = () => {
    // Pedir confirmación antes de resetear
    if (!confirm('¿Estás seguro de que quieres resetear todo el odontograma? Se perderán todos los cambios realizados.')) {
      return;
    }
    
    // Resetear los dientes a su estado inicial
    setTeeth(initialPermanentTeeth);
    setTempTeeth(initialTemporaryTeeth);
    setSelectedCaseId('empty');
    
    // Limpiar selección
    setSelectedTooth(null);
    
    // Opcional: Limpiar también los datos del paciente
    setPatient({
      name: '',
      age: 0,
      lastVisit: new Date().toISOString().split('T')[0]
    });
  };


  return (
    <div className="min-h-screen bg-surface-primary text-text-primary">
      {/* Header del Paciente */}
      <PatientHeader 
        patient={patient} 
        onPatientChange={setPatient}
      />
      
      {/* Layout Principal - Grid 3 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-[calc(100vh-80px)]">
        {/* Columna Izquierda - Odontograma (2/3 del ancho) */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-6 h-full overflow-auto">
            <div className="flex flex-col h-full">
              {/* Header con FDI y selector de casos */}
              <div className="mb-2 flex justify-between items-center">
                <span className="text-xs text-base-content/60 bg-base-200 px-2 py-1 rounded">
                  Sistema de numeración: FDI
                </span>
                <CompactCaseSelector
                  selectedCaseId={selectedCaseId}
                  onCaseSelect={handleCaseSelect}
                />
              </div>
              
              <Odontogram
                teeth={teeth}
                temporaryTeeth={tempTeeth}
                showTemporaryTeeth={showTemporaryTeeth}
                onToggleTemporaryTeeth={setShowTemporaryTeeth}
                selectedTooth={selectedTooth}
                onToothClick={handleToothClick}
                showBiteEffect={showBiteEffect}
                onToggleBiteEffect={setShowBiteEffect}
                isAnimatingBite={isAnimatingBite}
                onSimulateBite={simulateBite}
                selectedCaseId={selectedCaseId}
                onCaseSelect={handleCaseSelect}
              />
              
              {/* Leyenda de colores y símbolos */}
              <div className="mt-4">
                <ColorLegend />
              </div>
              
              {/* Botón de reset */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleResetOdontogram}
                  className="btn btn-error btn-sm"
                  title="Resetear todos los dientes a su estado inicial"
                >
                  🔄 Resetear Odontograma
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Columna Derecha - Panel de Detalles del Diente (1/3 del ancho) */}
        <div className="lg:col-span-1">
          {selectedTooth ? (
            <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 h-full sticky top-6">
              <FloatingToothDetailsCard
                tooth={selectedTooth}
                onUpdateTooth={handleUpdateTooth}
                onClose={() => setSelectedTooth(null)}
              />
            </div>
          ) : (
            <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-6 h-full flex items-center justify-center">
              <div className="text-center text-base-content/60">
                <p className="text-lg font-medium mb-2">Selecciona un diente</p>
                <p className="text-sm">Haz clic en cualquier diente del odontograma para ver sus detalles y herramientas</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;