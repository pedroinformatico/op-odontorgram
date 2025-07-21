import React, { useState, useEffect } from 'react';
import { X, Activity, FileText, Syringe, Check, AlertCircle, CircleDot, Crown, Plus, Zap, AlertTriangle, Link, AlertOctagon } from 'lucide-react';
import { Tooth, ToothStatus } from '../../types/dental';
import { NotesSection } from './sections/NotesSection';
import { ProceduresSection } from './sections/ProceduresSection';
import './FloatingToothDetailsCard.css';

interface FloatingToothDetailsCardProps {
  tooth: Tooth;
  onUpdateTooth: (toothId: number, updates: Partial<Tooth>) => void;
  onClose: () => void;
}

type TabType = 'estado' | 'notas' | 'historial';
type ToothSurface = 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';

const statusOptions = [
  { id: 'healthy', name: 'Sano', icon: Check, color: '#10b981' },
  { id: 'caries', name: 'Caries', icon: AlertCircle, color: '#ef4444' },
  { id: 'filled', name: 'Obturado', icon: CircleDot, color: '#3b82f6' },
  { id: 'crown', name: 'Corona', icon: Crown, color: '#f59e0b' },
  { id: 'root_canal', name: 'Endodoncia', icon: Zap, color: '#ec4899' },
  { id: 'implant', name: 'Implante', icon: Plus, color: '#8b5cf6' },
  { id: 'extracted', name: 'Extraído', icon: X, color: '#6b7280' },
  { id: 'fracture', name: 'Fractura', icon: AlertTriangle, color: '#f97316' },
  { id: 'bridge', name: 'Puente', icon: Link, color: '#6366f1' },
  { id: 'extraction_indicated', name: 'Extracción indicada', icon: AlertOctagon, color: '#dc2626' },
];

export const FloatingToothDetailsCard: React.FC<FloatingToothDetailsCardProps> = ({ 
  tooth, 
  onUpdateTooth, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('estado');
  const [selectedTool, setSelectedTool] = useState<ToothStatus>(tooth.status);
  const [selectedSurface, setSelectedSurface] = useState<ToothSurface | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setSelectedTool(tooth.status);
  }, [tooth.status]);

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

  const getSurfaceColor = (surface: ToothSurface) => {
    const status = tooth.surfaces?.[surface] || tooth.status;
    const colors: Record<string, string> = {
      healthy: '#10b981',
      caries: '#ef4444',
      filled: '#3b82f6',
      crown: '#f59e0b',
      root_canal: '#8b5cf6',
      implant: '#6366f1',
      extracted: '#6b7280',
      fracture: '#f97316',
      bridge: '#8b5cf6',
      extraction_indicated: '#dc2626'
    };
    return colors[status] || '#10b981';
  };

  const handleSurfaceClick = (surface: ToothSurface) => {
    setSelectedSurface(surface);
    
    const newSurfaces = {
      ...tooth.surfaces,
      [surface]: selectedTool
    };
    
    onUpdateTooth(tooth.id, { surfaces: newSurfaces });
  };

  const handleStatusChange = (status: ToothStatus) => {
    setSelectedTool(status);
    onUpdateTooth(tooth.id, { status });
    setHasUnsavedChanges(true);
    
    // Animación de guardado
    setTimeout(() => setHasUnsavedChanges(false), 1000);
  };

  const handleSurfaceUpdate = (surface: string, status: ToothStatus) => {
    const newSurfaces = {
      ...tooth.surfaces,
      [surface]: status
    };
    
    onUpdateTooth(tooth.id, { surfaces: newSurfaces });
    setHasUnsavedChanges(true);
    setTimeout(() => setHasUnsavedChanges(false), 1000);
  };

  const handleWholeToothUpdate = () => {
    onUpdateTooth(tooth.id, { 
      status: selectedTool,
      surfaces: {
        oclusal: selectedTool,
        vestibular: selectedTool,
        lingual: selectedTool,
        mesial: selectedTool,
        distal: selectedTool
      }
    });
    setHasUnsavedChanges(true);
    setTimeout(() => setHasUnsavedChanges(false), 1000);
  };

  const handleNotesUpdate = (notes: string) => {
    onUpdateTooth(tooth.id, { notes });
    setHasUnsavedChanges(true);
    setTimeout(() => setHasUnsavedChanges(false), 1000);
  };

  const handleProcedureAdd = (procedure: any) => {
    const procedures = tooth.procedures || [];
    const newProcedure = {
      ...procedure,
      id: `proc-${Date.now()}`
    };
    
    onUpdateTooth(tooth.id, { 
      procedures: [...procedures, newProcedure]
    });
    setHasUnsavedChanges(true);
    setTimeout(() => setHasUnsavedChanges(false), 1000);
  };

  const tabs = [
    { id: 'estado' as TabType, label: 'Estado', icon: Activity },
    { id: 'notas' as TabType, label: 'Notas', icon: FileText },
    { id: 'historial' as TabType, label: 'Historial', icon: Syringe }
  ];

  const hasNotes = tooth.notes && tooth.notes.trim().length > 0;
  const procedureCount = tooth.procedures?.length || 0;

  return (
    <div className="h-full bg-surface-primary flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-color flex items-center justify-between bg-surface-secondary">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm ${hasUnsavedChanges ? 'save-success' : ''}`}>
              {tooth.clinicalId || tooth.id}
            </div>
            {hasNotes && <div className="has-notes-indicator" />}
            {procedureCount > 0 && (
              <div className="procedure-count">{procedureCount}</div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {getToothTypeName(tooth.position)}
            </h3>
            <p className="text-sm text-text-secondary">
              {getQuadrantName(tooth.quadrant)} • Posición {tooth.position}
            </p>
            {tooth.isTemporary && (
              <span className="badge badge-warning badge-sm mt-1">
                Diente temporal
              </span>
            )}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-border-color bg-surface-secondary">
        <div className="flex bg-surface-primary rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-accent text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4 mr-2 inline" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'estado' && (
          <div className="space-y-4">
            {/* Herramientas */}
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-3">Selecciona un estado:</h4>
              <div className="grid grid-cols-4 gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setSelectedTool(status.id as ToothStatus)}
                    className={`btn btn-sm flex-col h-auto py-2 ${
                      selectedTool === status.id 
                        ? 'text-white shadow-md' 
                        : 'btn-ghost hover:bg-base-200'
                    }`}
                    style={selectedTool === status.id ? {
                      backgroundColor: status.color,
                      borderColor: status.color
                    } : {}}
                  >
                    <status.icon 
                      className="w-4 h-4" 
                      style={{ color: selectedTool === status.id ? 'white' : status.color }}
                    />
                    <span className="text-xs">{status.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diente Ampliado */}
            <div className="flex flex-col items-center">
              <h4 className="text-sm font-medium text-text-secondary mb-4">
                Haz clic en cada superficie para aplicar: 
                <span className={`ml-1 font-semibold text-${statusOptions.find(s => s.id === selectedTool)?.color}`}>
                  {statusOptions.find(s => s.id === selectedTool)?.name}
                </span>
              </h4>
              
              {/* SVG del diente ampliado */}
              <div className="relative mb-4">
                <svg width="200" height="200" viewBox="0 0 200 200" className="border border-border-color rounded-lg bg-surface-secondary">
                  {/* Superficie Vestibular (arriba) */}
                  <rect
                    x="60"
                    y="20"
                    width="80"
                    height="30"
                    rx="8"
                    fill={getSurfaceColor('vestibular')}
                    stroke={selectedSurface === 'vestibular' ? '#000' : '#e5e7eb'}
                    strokeWidth={selectedSurface === 'vestibular' ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSurfaceClick('vestibular')}
                  />
                  <text x="100" y="40" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
                    Vestibular
                  </text>

                  {/* Superficie Mesial (izquierda) */}
                  <rect
                    x="20"
                    y="60"
                    width="30"
                    height="80"
                    rx="8"
                    fill={getSurfaceColor('mesial')}
                    stroke={selectedSurface === 'mesial' ? '#000' : '#e5e7eb'}
                    strokeWidth={selectedSurface === 'mesial' ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSurfaceClick('mesial')}
                  />
                  <text x="35" y="105" textAnchor="middle" fontSize="10" fill="white" className="pointer-events-none">
                    Mesial
                  </text>

                  {/* Superficie Oclusal (centro) */}
                  <rect
                    x="60"
                    y="60"
                    width="80"
                    height="80"
                    rx="12"
                    fill={getSurfaceColor('oclusal')}
                    stroke={selectedSurface === 'oclusal' ? '#000' : '#e5e7eb'}
                    strokeWidth={selectedSurface === 'oclusal' ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSurfaceClick('oclusal')}
                  />
                  <text x="100" y="105" textAnchor="middle" fontSize="14" fill="white" className="pointer-events-none font-semibold">
                    Oclusal
                  </text>

                  {/* Superficie Distal (derecha) */}
                  <rect
                    x="150"
                    y="60"
                    width="30"
                    height="80"
                    rx="8"
                    fill={getSurfaceColor('distal')}
                    stroke={selectedSurface === 'distal' ? '#000' : '#e5e7eb'}
                    strokeWidth={selectedSurface === 'distal' ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSurfaceClick('distal')}
                  />
                  <text x="165" y="105" textAnchor="middle" fontSize="10" fill="white" className="pointer-events-none">
                    Distal
                  </text>

                  {/* Superficie Lingual (abajo) */}
                  <rect
                    x="60"
                    y="150"
                    width="80"
                    height="30"
                    rx="8"
                    fill={getSurfaceColor('lingual')}
                    stroke={selectedSurface === 'lingual' ? '#000' : '#e5e7eb'}
                    strokeWidth={selectedSurface === 'lingual' ? '3' : '1'}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleSurfaceClick('lingual')}
                  />
                  <text x="100" y="170" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
                    Lingual
                  </text>
                </svg>
              </div>

              {/* Botón para aplicar a todo el diente */}
              <button
                onClick={handleWholeToothUpdate}
                className={`btn btn-${statusOptions.find(s => s.id === selectedTool)?.color} btn-wide`}
              >
                Aplicar a todo el diente
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'notas' && (
          <NotesSection
            notes={tooth.notes || ''}
            onNotesUpdate={handleNotesUpdate}
          />
        )}
        
        {activeTab === 'historial' && (
          <ProceduresSection
            procedures={tooth.procedures}
            onProcedureAdd={handleProcedureAdd}
          />
        )}
      </div>
    </div>
  );
};