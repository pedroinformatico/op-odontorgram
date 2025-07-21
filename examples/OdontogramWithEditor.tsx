import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  Tooth,
  ToothStatus 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

/**
 * Ejemplo de odontograma con editor de estados
 * Permite cambiar el estado de los dientes haciendo clic con diferentes herramientas
 */
export function OdontogramWithEditor() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [currentTool, setCurrentTool] = useState<ToothStatus>('healthy');
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
    // Actualizar el estado del diente con la herramienta actual
    const updatedTeeth = teeth.map(t => 
      t.id === tooth.id 
        ? { ...t, status: currentTool, lastUpdate: new Date().toISOString() }
        : t
    );
    setTeeth(updatedTeeth);
    setSelectedTooth(tooth);
  };

  const tools: Array<{ status: ToothStatus; label: string; color: string }> = [
    { status: 'healthy', label: 'Sano', color: '#10b981' },
    { status: 'caries', label: 'Caries', color: '#ef4444' },
    { status: 'filled', label: 'Obturado', color: '#3b82f6' },
    { status: 'crown', label: 'Corona', color: '#f59e0b' },
    { status: 'extracted', label: 'Extraído', color: '#6b7280' },
    { status: 'implant', label: 'Implante', color: '#8b5cf6' },
    { status: 'root_canal', label: 'Endodoncia', color: '#6366f1' },
    { status: 'fracture', label: 'Fractura', color: '#f97316' },
  ];

  const resetOdontogram = () => {
    setTeeth(initialPermanentTeeth);
    setTemporaryTeeth(initialTemporaryTeeth);
    setSelectedTooth(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Odontograma con Editor</h1>
      
      {/* Barra de herramientas */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Herramienta actual:</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map(tool => (
            <button
              key={tool.status}
              onClick={() => setCurrentTool(tool.status)}
              className="px-4 py-2 rounded transition-all"
              style={{
                backgroundColor: tool.status === currentTool ? tool.color : '#e5e7eb',
                color: tool.status === currentTool ? 'white' : 'black',
                fontWeight: tool.status === currentTool ? 'bold' : 'normal',
                transform: tool.status === currentTool ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {tool.label}
            </button>
          ))}
        </div>
        
        <button
          onClick={resetOdontogram}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Resetear Odontograma
        </button>
      </div>

      {/* Odontograma */}
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

      {/* Información del diente seleccionado */}
      {selectedTooth && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold text-lg mb-2">Diente Seleccionado</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">ID FDI:</span> {selectedTooth.clinicalId}
            </div>
            <div>
              <span className="font-semibold">Estado:</span> {selectedTooth.status}
            </div>
            <div>
              <span className="font-semibold">Cuadrante:</span> {selectedTooth.quadrant}
            </div>
            <div>
              <span className="font-semibold">Posición:</span> {selectedTooth.position}
            </div>
            {selectedTooth.notes && (
              <div className="col-span-2">
                <span className="font-semibold">Notas:</span> {selectedTooth.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}