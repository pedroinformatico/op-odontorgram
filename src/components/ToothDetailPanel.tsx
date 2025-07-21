import React, { useState, useEffect } from 'react';
import { Palette, RotateCcw, RotateCw, Trash2, Edit3, Pen, Eraser, Circle, Settings, Plus, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Tooth, ToothStatus } from '../types/dental';

interface ToothDetailPanelProps {
  tooth: Tooth | null;
  onUpdateTooth: (toothId: number, updates: Partial<Tooth>) => void;
}

type ToothSurface = 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';

const toothViews = [
  { id: 'oclusal', name: 'Oclusal', description: 'Vista superior' },
  { id: 'vestibular', name: 'Vestibular', description: 'Vista frontal' },
  { id: 'lingual', name: 'Lingual', description: 'Vista posterior' }
];

const drawingTools = [
  { id: 'pen', name: 'Lápiz', icon: Pen, color: '#000000' },
  { id: 'red', name: 'Rojo', icon: Circle, color: '#FF5252' },
  { id: 'yellow', name: 'Amarillo', icon: Circle, color: '#FFC107' },
  { id: 'blue', name: 'Azul', icon: Circle, color: '#2196F3' },
  { id: 'eraser', name: 'Borrador', icon: Eraser, color: '#FFFFFF' }
];

export const ToothDetailPanel: React.FC<ToothDetailPanelProps> = ({ tooth, onUpdateTooth }) => {
  const [selectedSurface, setSelectedSurface] = useState<ToothSurface>('oclusal');
  const [selectedMainTool, setSelectedMainTool] = useState<'pen' | 'status' | 'other' | null>(null);
  const [selectedDrawingTool, setSelectedDrawingTool] = useState('pen');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (tooth) {
      setNotes(tooth.notes || '');
    }
  }, [tooth]);

  const saveNotes = () => {
    if (!tooth) return;
    onUpdateTooth(tooth.id, { notes });
    setIsEditingNotes(false);
  };

  const getToothTypeName = (position: number) => {
    if (position <= 2) return 'Incisivo';
    if (position === 3) return 'Canino';
    if (position <= 5) return 'Premolar';
    return 'Molar';
  };

  const getQuadrantName = (quadrant: number) => {
    const names = {
      1: 'Superior Derecho',
      2: 'Superior Izquierdo', 
      3: 'Inferior Izquierdo',
      4: 'Inferior Derecho'
    };
    return names[quadrant as keyof typeof names];
  };

  if (!tooth) {
    return null;
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-lg border border-base-300">
      {/* Compact Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-base-content/60 mb-1">Diente Seleccionado</p>
            <h2 className="text-3xl font-bold text-primary mb-1">{tooth.clinicalId || tooth.id}</h2>
            <p className="text-sm text-base-content/80">
              {getToothTypeName(tooth.position)} - Posición {tooth.position}
            </p>
            <p className="text-sm text-base-content/60">
              {getQuadrantName(tooth.quadrant)}
            </p>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`btn ${
              isExpanded 
                ? 'btn-primary' 
                : 'btn-outline btn-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            Notas
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
          {/* Sección 1: Vista del Diente */}
          <div className="p-4 border-b border-base-300">
            <h3 className="text-sm font-medium text-base-content/80 mb-3">Vista del Diente</h3>
            
            {/* Vista Compacta del Diente */}
            <div className="flex justify-center mb-3">
              <div className="relative bg-base-200 rounded-lg p-3">
                <svg width="80" height="80" viewBox="0 0 120 150" className="rounded-lg">
              {/* Corona del diente */}
              <rect
                x="20"
                y="20"
                width="80"
                height="80"
                rx="8"
                fill="#FFF9E6"
                stroke="#E0E0E0"
                strokeWidth="2"
              />
              
              {/* Superficies según la vista seleccionada */}
              {selectedSurface === 'oclusal' && (
                <>
                  {/* Vista oclusal - superficie de masticación */}
                  <rect x="30" y="30" width="60" height="60" rx="4" fill="rgba(76, 175, 80, 0.3)" stroke="#4CAF50" strokeWidth="1" />
                  <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#666">Oclusal</text>
                </>
              )}
              
              {selectedSurface === 'vestibular' && (
                <>
                  {/* Vista vestibular - cara frontal */}
                  <rect x="25" y="25" width="70" height="70" rx="6" fill="rgba(33, 150, 243, 0.3)" stroke="#2196F3" strokeWidth="1" />
                  <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#666">Vestibular</text>
                </>
              )}
              
              {selectedSurface === 'lingual' && (
                <>
                  {/* Vista lingual - cara posterior */}
                  <rect x="25" y="25" width="70" height="70" rx="6" fill="rgba(156, 39, 176, 0.3)" stroke="#9C27B0" strokeWidth="1" />
                  <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#666">Lingual</text>
                </>
              )}
              
              {/* Raíces */}
              <rect x="45" y="100" width="10" height="30" rx="5" fill="#FFF9E6" stroke="#E0E0E0" strokeWidth="1" />
              <rect x="65" y="100" width="10" height="30" rx="5" fill="#FFF9E6" stroke="#E0E0E0" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sección 2: Tabs de Vistas */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-3 gap-2">
          {toothViews.map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedSurface(view.id as ToothSurface)}
              className={`py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                selectedSurface === view.id
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content hover:bg-base-300'
              }`}
            >
              {view.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sección 3: Herramientas Principales */}
      <div className="divider my-2">Herramientas</div>
      <div className="px-4 pb-3">
        
        {/* Barra de herramientas estilo toolbar */}
        <div className="relative">
          <div className="btn-group w-full">
            <button
              onClick={() => {
                setSelectedMainTool(selectedMainTool === 'pen' ? null : 'pen');
                setShowStatusDropdown(false);
              }}
              className={`btn btn-sm flex-1 ${
                selectedMainTool === 'pen'
                  ? 'btn-active'
                  : ''
              }`}
            >
              <Pen className="w-4 h-4 mr-1" />
              Dibujo
            </button>
            
            <button
              onClick={() => {
                setSelectedMainTool(selectedMainTool === 'status' ? null : 'status');
                setShowStatusDropdown(!showStatusDropdown);
              }}
              className={`btn btn-sm flex-1 ${
                selectedMainTool === 'status'
                  ? 'btn-active'
                  : ''
              }`}
            >
              <Settings className="w-4 h-4 mr-1" />
              Estado
            </button>
            
            <button
              onClick={() => {
                setSelectedMainTool(selectedMainTool === 'other' ? null : 'other');
                setShowStatusDropdown(false);
              }}
              className={`btn btn-sm flex-1 ${
                selectedMainTool === 'other'
                  ? 'btn-active'
                  : ''
              }`}
            >
              <Plus className="w-4 h-4 mr-1" />
              Más
            </button>
          </div>
          
          {/* Dropdown de estados */}
          {showStatusDropdown && (
            <ul className="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-full absolute z-10">
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'healthy' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Normal
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'implant' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Implante
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'crown' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Corona
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'bridge' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Puente
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'extracted' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Ausente/Extraído
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    onUpdateTooth(tooth.id, { status: 'extraction_indicated' });
                    setShowStatusDropdown(false);
                  }}
                >
                  Extracción indicada
                </a>
              </li>
            </ul>
          )}
        </div>
        
        {/* Panel de más opciones - Dropdown compacto */}
        {selectedMainTool === 'other' && (
          <div className="dropdown dropdown-bottom dropdown-end mt-2">
            <ul className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52 absolute z-10">
              <li><a><Palette className="w-4 h-4" /> Cambiar color</a></li>
              <li><a><FileText className="w-4 h-4" /> Exportar información</a></li>
              <li><a><Settings className="w-4 h-4" /> Configuración avanzada</a></li>
            </ul>
          </div>
        )}

        {/* Panel de dibujo - Solo visible cuando el lápiz está seleccionado */}
        {selectedMainTool === 'pen' && (
          <div className="card bg-base-200 mt-3">
            <div className="card-body p-2">
              <div className="space-y-1">
                {/* Herramientas de dibujo compactas */}
                <div className="flex gap-1 justify-center">
                  <button
                    onClick={() => setSelectedDrawingTool('pen')}
                    className={`btn btn-xs btn-circle ${
                      selectedDrawingTool === 'pen'
                        ? 'btn-primary'
                        : 'btn-ghost'
                    }`}
                    title="Lápiz"
                  >
                    <Pen className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setSelectedDrawingTool('red')}
                    className={`btn btn-xs btn-circle ${
                      selectedDrawingTool === 'red'
                        ? 'btn-error'
                        : 'btn-ghost'
                    }`}
                    title="Rojo - Caries"
                  >
                    <Circle className="w-3 h-3" fill="#FF5252" />
                  </button>
                  <button
                    onClick={() => setSelectedDrawingTool('yellow')}
                    className={`btn btn-xs btn-circle ${
                      selectedDrawingTool === 'yellow'
                        ? 'btn-warning'
                        : 'btn-ghost'
                    }`}
                    title="Amarillo - Restauraciones"
                  >
                    <Circle className="w-3 h-3" fill="#FFC107" />
                  </button>
                  <button
                    onClick={() => setSelectedDrawingTool('blue')}
                    className={`btn btn-xs btn-circle ${
                      selectedDrawingTool === 'blue'
                        ? 'btn-info'
                        : 'btn-ghost'
                    }`}
                    title="Azul - Endodoncia"
                  >
                    <Circle className="w-3 h-3" fill="#2196F3" />
                  </button>
                  <button
                    onClick={() => setSelectedDrawingTool('eraser')}
                    className={`btn btn-xs btn-circle ${
                      selectedDrawingTool === 'eraser'
                        ? 'btn-secondary'
                        : 'btn-ghost'
                    }`}
                    title="Borrador"
                  >
                    <Eraser className="w-3 h-3" />
                  </button>
                  
                  <div className="divider divider-horizontal mx-1"></div>
                  
                  {/* Acciones */}
                  <button
                    className="btn btn-xs btn-circle btn-ghost"
                    title="Deshacer"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    className="btn btn-xs btn-circle btn-ghost"
                    title="Rehacer"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                  <button
                    className="btn btn-xs btn-circle btn-ghost text-error"
                    title="Borrar todo"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Sección 4: Notas */}
      <div className="divider">Notas del Diente</div>
      <div className="p-3">
        {isEditingNotes ? (
          <div className="form-control">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea textarea-bordered textarea-primary h-24"
              placeholder="Agregar notas sobre este diente..."
              autoFocus
            />
            <div className="card-actions justify-end mt-2">
              <button
                onClick={saveNotes}
                className="btn btn-primary btn-sm"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setNotes(tooth.notes || '');
                  setIsEditingNotes(false);
                }}
                className="btn btn-ghost btn-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsEditingNotes(true)}
            className="card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors"
          >
            <div className="card-body p-4">
              <p className="text-sm text-base-content/70">
                {notes || 'Click para agregar notas...'}
              </p>
            </div>
          </div>
        )}
      </div>
      
      </div>
    </div>
  );
};