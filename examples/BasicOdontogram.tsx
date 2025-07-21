import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  Tooth 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

/**
 * Ejemplo básico de uso del odontograma
 * Muestra cómo configurar un odontograma simple con todas las props requeridas
 */
export function BasicOdontogram() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
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

  const handleToothClick = (tooth: Tooth) => {
    setSelectedTooth(tooth);
    console.log('Diente seleccionado:', tooth);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Odontograma Básico</h1>
      
      <div style={{ height: '600px' }}>
        <Odontogram
          teeth={teeth}
          temporaryTeeth={temporaryTeeth}
          showTemporaryTeeth={showTemporary}
          onToggleTemporaryTeeth={setShowTemporary}
          selectedTooth={selectedTooth}
          onToothClick={handleToothClick}
          showBiteEffect={showBite}
          onToggleBiteEffect={setShowBite}
          isAnimatingBite={animating}
          onSimulateBite={simulateBite}
        />
      </div>

      {selectedTooth && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Diente Seleccionado</h3>
          <p>ID: {selectedTooth.clinicalId}</p>
          <p>Estado: {selectedTooth.status}</p>
        </div>
      )}
    </div>
  );
}