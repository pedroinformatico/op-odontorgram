import React, { useState } from 'react';
import { toothDocumentation } from '../data/demoTeeth';
import { Info, Book, FileJson } from 'lucide-react';

export const ToothDocumentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notation' | 'anatomy' | 'statuses' | 'json'>('notation');
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 btn btn-primary btn-circle btn-lg shadow-lg"
        title="Documentación Clínica"
      >
        <Info className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] bg-base-100 rounded-lg shadow-2xl border border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300 flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Book className="w-5 h-5" />
          Documentación Clínica
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-ghost btn-sm btn-circle"
        >
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed m-4">
        <button
          className={`tab ${activeTab === 'notation' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('notation')}
        >
          Notación
        </button>
        <button
          className={`tab ${activeTab === 'anatomy' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('anatomy')}
        >
          Anatomía
        </button>
        <button
          className={`tab ${activeTab === 'statuses' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('statuses')}
        >
          Estados
        </button>
        <button
          className={`tab ${activeTab === 'json' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          JSON
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'notation' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Sistema FDI (Notación Internacional)</h4>
              <p className="text-sm text-base-content/80 mb-2">
                {toothDocumentation.clinicalNotation.FDI.description}
              </p>
              <div className="bg-base-200 p-3 rounded-lg space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Permanentes:</span> {toothDocumentation.clinicalNotation.FDI.permanent}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Temporales:</span> {toothDocumentation.clinicalNotation.FDI.temporary}
                </p>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div>
              <h4 className="font-semibold mb-2">Ejemplos de Notación</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-base-200 p-2 rounded">
                  <span className="font-mono font-bold">1.8</span> - Tercer molar superior derecho
                </div>
                <div className="bg-base-200 p-2 rounded">
                  <span className="font-mono font-bold">2.1</span> - Incisivo central superior izquierdo
                </div>
                <div className="bg-base-200 p-2 rounded">
                  <span className="font-mono font-bold">3.6</span> - Primer molar inferior izquierdo
                </div>
                <div className="bg-base-200 p-2 rounded">
                  <span className="font-mono font-bold">5.5</span> - Segundo molar temporal superior derecho
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="space-y-4">
            {Object.entries(toothDocumentation.anatomy).map(([type, info]) => (
              <div key={type} className="bg-base-200 p-3 rounded-lg">
                <h4 className="font-semibold capitalize mb-1">{type}</h4>
                <p className="text-sm text-base-content/80">{info.description}</p>
                <div className="mt-2 text-xs space-y-1">
                  <p><span className="font-medium">Raíces:</span> {info.rootCount}</p>
                  <p><span className="font-medium">Posiciones:</span> {info.positions.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'statuses' && (
          <div className="space-y-2">
            {Object.entries(toothDocumentation.statuses).map(([status, description]) => (
              <div key={status} className="flex items-start gap-3 p-2 hover:bg-base-200 rounded">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${getStatusColor(status)}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{status}</p>
                  <p className="text-xs text-base-content/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'json' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Estructura JSON de un Diente</h4>
              <pre className="bg-base-200 p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "id": 16,
  "clinicalId": "1.6",
  "quadrant": 1,
  "position": 6,
  "status": "healthy",
  "toothType": "molar",
  "rootCount": 3,
  "rootType": "trifurcated",
  "surfaces": {
    "oclusal": "healthy",
    "vestibular": "caries",
    "lingual": "healthy",
    "mesial": "healthy",
    "distal": "filled"
  },
  "mobilityGrade": 0,
  "gingivalRecession": 2,
  "pocketDepth": 3,
  "notes": "Caries vestibular detectada",
  "verticalOffset": -5,
  "isDemo": true,
  "demoLabel": "Molar con caries"
}`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Superficies del Diente</h4>
              <div className="space-y-1 text-sm">
                {Object.entries(toothDocumentation.surfaces).map(([surface, description]) => (
                  <div key={surface} className="flex gap-2">
                    <span className="font-medium capitalize w-20">{surface}:</span>
                    <span className="text-base-content/80">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    healthy: 'bg-green-500',
    caries: 'bg-red-500',
    filled: 'bg-blue-500',
    crown: 'bg-yellow-500',
    extracted: 'bg-gray-500',
    implant: 'bg-purple-500',
    root_canal: 'bg-orange-500',
    fracture: 'bg-red-700',
    bridge: 'bg-indigo-500',
    extraction_indicated: 'bg-red-600'
  };
  return colors[status] || 'bg-gray-400';
}