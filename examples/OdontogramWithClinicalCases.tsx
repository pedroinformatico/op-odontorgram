import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  Tooth,
  getClinicalCaseById 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

/**
 * Ejemplo de odontograma con casos clínicos predefinidos
 * Muestra cómo implementar la funcionalidad de casos clínicos
 */
export function OdontogramWithClinicalCases() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [selectedCase, setSelectedCase] = useState('empty');
  const [showTemporary, setShowTemporary] = useState(false);
  const [showBite, setShowBite] = useState(false);
  const [animating, setAnimating] = useState(false);

  const simulateBite = () => {
    setAnimating(true);
    setShowBite(false);
    setTimeout(() => setShowBite(true), 300);
    setTimeout(() => setShowBite(false), 1000);
    setTimeout(() => setAnimating(false), 1500);
  };

  const handleCaseSelect = (caseId: string) => {
    const clinicalCase = getClinicalCaseById(caseId);
    
    if (!clinicalCase) return;

    // Aplicar datos del caso preservando la estructura base
    const updatedPermanentTeeth = teeth.map(tooth => {
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
        };
      }
      return tooth;
    });

    const updatedTemporaryTeeth = temporaryTeeth.map(tooth => {
      const caseToothData = clinicalCase.temporaryTeeth.find(t => t.id === tooth.id);
      if (caseToothData) {
        return {
          ...tooth,
          status: caseToothData.status,
          notes: caseToothData.notes || tooth.notes,
          surfaces: caseToothData.surfaces || tooth.surfaces,
        };
      }
      return tooth;
    });

    setTeeth(updatedPermanentTeeth);
    setTemporaryTeeth(updatedTemporaryTeeth);
    setSelectedCase(caseId);

    // Mostrar dientes temporales para casos pediátricos
    if (caseId === 'pediatric' || caseId === 'infant') {
      setShowTemporary(true);
    }
  };

  const cases = [
    { id: 'empty', name: 'Por defecto', description: 'Todos los dientes sanos' },
    { id: 'basic', name: 'Caso básico adulto', description: 'Caries y obturaciones comunes' },
    { id: 'periodontal', name: 'Enfermedad periodontal', description: 'Movilidad y pérdida ósea' },
    { id: 'complex', name: 'Caso complejo', description: 'Múltiples tratamientos' },
    { id: 'orthodontic', name: 'Ortodoncia activa', description: 'Tratamiento ortodóncico' },
    { id: 'pediatric', name: 'Dentición mixta', description: '6-8 años' },
    { id: 'infant', name: 'Solo temporales', description: '3-5 años' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Odontograma con Casos Clínicos</h1>
      
      {/* Selector de casos clínicos */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Seleccionar caso clínico:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {cases.map(caseItem => (
            <div
              key={caseItem.id}
              onClick={() => handleCaseSelect(caseItem.id)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedCase === caseItem.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <h4 className="font-semibold text-sm">{caseItem.name}</h4>
              <p className="text-xs text-gray-600 mt-1">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Odontograma */}
      <div style={{ height: '600px' }}>
        <Odontogram
          teeth={teeth}
          temporaryTeeth={temporaryTeeth}
          showTemporaryTeeth={showTemporary}
          onToggleTemporaryTeeth={setShowTemporary}
          selectedTooth={selectedTooth}
          onToothClick={setSelectedTooth}
          showBiteEffect={showBite}
          onToggleBiteEffect={setShowBite}
          isAnimatingBite={animating}
          onSimulateBite={simulateBite}
          selectedCaseId={selectedCase}
          onCaseSelect={handleCaseSelect}
        />
      </div>

      {/* Información del caso */}
      {selectedCase !== 'empty' && (
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h3 className="font-bold text-lg mb-2">Caso Activo</h3>
          <p className="text-sm">
            {cases.find(c => c.id === selectedCase)?.name} - {cases.find(c => c.id === selectedCase)?.description}
          </p>
        </div>
      )}
    </div>
  );
}