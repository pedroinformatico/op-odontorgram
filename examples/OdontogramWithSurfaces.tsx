import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  Tooth,
  ToothStatus,
  ToothSurface 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

/**
 * Ejemplo de odontograma con edición de superficies dentales
 * Permite editar individualmente cada superficie de un diente
 */
export function OdontogramWithSurfaces() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [currentSurfaceTool, setCurrentSurfaceTool] = useState<ToothStatus>('healthy');
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

  const updateToothSurface = (toothId: number, surface: ToothSurface, status: ToothStatus) => {
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
  };

  const surfaces: Array<{ key: ToothSurface; label: string }> = [
    { key: 'oclusal', label: 'Oclusal' },
    { key: 'vestibular', label: 'Vestibular' },
    { key: 'lingual', label: 'Lingual' },
    { key: 'mesial', label: 'Mesial' },
    { key: 'distal', label: 'Distal' },
  ];

  const surfaceTools: Array<{ status: ToothStatus; label: string; color: string }> = [
    { status: 'healthy', label: 'Sano', color: '#10b981' },
    { status: 'caries', label: 'Caries', color: '#ef4444' },
    { status: 'filled', label: 'Obturado', color: '#3b82f6' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Odontograma con Superficies Dentales</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Odontograma */}
        <div>
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
            />
          </div>
        </div>

        {/* Panel de edición de superficies */}
        <div>
          {selectedTooth ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                Editar Diente {selectedTooth.clinicalId}
              </h2>

              {/* Herramienta actual */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-2">Herramienta:</h3>
                <div className="flex gap-2">
                  {surfaceTools.map(tool => (
                    <button
                      key={tool.status}
                      onClick={() => setCurrentSurfaceTool(tool.status)}
                      className="px-3 py-1 rounded text-sm"
                      style={{
                        backgroundColor: tool.status === currentSurfaceTool ? tool.color : '#e5e7eb',
                        color: tool.status === currentSurfaceTool ? 'white' : 'black',
                      }}
                    >
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Superficies del diente */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Superficies:</h3>
                {surfaces.map(surface => (
                  <div key={surface.key} className="flex items-center justify-between">
                    <span className="font-medium">{surface.label}:</span>
                    <div className="flex gap-2">
                      {surfaceTools.map(tool => (
                        <button
                          key={tool.status}
                          onClick={() => updateToothSurface(selectedTooth.id, surface.key, tool.status)}
                          className={`w-20 px-2 py-1 rounded text-xs ${
                            selectedTooth.surfaces?.[surface.key] === tool.status
                              ? 'ring-2 ring-offset-1 ring-gray-800'
                              : ''
                          }`}
                          style={{
                            backgroundColor: selectedTooth.surfaces?.[surface.key] === tool.status 
                              ? tool.color 
                              : '#f3f4f6',
                            color: selectedTooth.surfaces?.[surface.key] === tool.status 
                              ? 'white' 
                              : '#6b7280',
                          }}
                        >
                          {tool.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Vista previa del diente */}
              <div className="mt-6 p-4 bg-white rounded">
                <h3 className="text-sm font-semibold mb-3">Vista previa:</h3>
                <div className="flex justify-center">
                  <div className="relative w-16 h-16">
                    {/* Representación visual simple del diente con superficies */}
                    <div className="absolute inset-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                      {/* Superficie oclusal (centro) */}
                      <div 
                        className="absolute top-1/4 left-1/4 w-1/2 h-1/2"
                        style={{
                          backgroundColor: selectedTooth.surfaces?.oclusal === 'caries' ? '#ef4444' :
                                         selectedTooth.surfaces?.oclusal === 'filled' ? '#3b82f6' : '#10b981'
                        }}
                      />
                      {/* Otras superficies como bordes */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-2"
                        style={{
                          backgroundColor: selectedTooth.surfaces?.vestibular === 'caries' ? '#ef4444' :
                                         selectedTooth.surfaces?.vestibular === 'filled' ? '#3b82f6' : '#10b981'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center h-full">
              <p className="text-gray-500">Selecciona un diente para editar sus superficies</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}