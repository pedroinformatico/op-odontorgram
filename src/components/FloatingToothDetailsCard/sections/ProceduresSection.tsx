import React, { useState } from 'react';
import { Plus, Calendar, Check, Clock } from 'lucide-react';

interface Procedure {
  id: string;
  code: string;
  name: string;
  date: string;
  status: 'planned' | 'completed' | 'in_progress';
  notes?: string;
}

interface ProceduresSectionProps {
  procedures?: Procedure[];
  onProcedureAdd?: (procedure: Omit<Procedure, 'id'>) => void;
}

const commonProcedures = [
  { code: 'OP001', name: 'Obturación simple' },
  { code: 'OP002', name: 'Obturación compuesta' },
  { code: 'EN001', name: 'Endodoncia unirradicular' },
  { code: 'EN002', name: 'Endodoncia multirradicular' },
  { code: 'PR001', name: 'Corona metal porcelana' },
  { code: 'PR002', name: 'Corona libre de metal' },
  { code: 'CI001', name: 'Implante dental' },
  { code: 'CI002', name: 'Extracción simple' },
  { code: 'PE001', name: 'Profilaxis' },
  { code: 'PE002', name: 'Detartraje' }
];

export const ProceduresSection: React.FC<ProceduresSectionProps> = ({
  procedures = [],
  onProcedureAdd
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [procedureStatus, setProcedureStatus] = useState<'planned' | 'completed' | 'in_progress'>('planned');

  const handleAddProcedure = () => {
    if (!selectedProcedure || !onProcedureAdd) return;

    const procedure = commonProcedures.find(p => p.code === selectedProcedure);
    if (!procedure) return;

    onProcedureAdd({
      code: procedure.code,
      name: procedure.name,
      date: new Date().toISOString(),
      status: procedureStatus
    });

    setSelectedProcedure('');
    setProcedureStatus('planned');
    setShowAddForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4 text-success" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <Calendar className="w-4 h-4 text-info" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En progreso';
      default:
        return 'Planificado';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-secondary">
          Procedimientos realizados
        </h4>
        {onProcedureAdd && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-ghost btn-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Agregar
          </button>
        )}
      </div>

      {/* Lista de procedimientos */}
      <div className="space-y-2">
        {procedures.length > 0 ? (
          procedures.map((procedure) => (
            <div 
              key={procedure.id} 
              className="p-3 bg-surface-secondary rounded-lg flex items-start gap-3"
            >
              <div className="mt-1">
                {getStatusIcon(procedure.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      {procedure.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {procedure.code} • {new Date(procedure.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`
                    text-xs px-2 py-1 rounded-full
                    ${procedure.status === 'completed' 
                      ? 'bg-success/20 text-success' 
                      : procedure.status === 'in_progress'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-info/20 text-info'
                    }
                  `}>
                    {getStatusLabel(procedure.status)}
                  </span>
                </div>
                {procedure.notes && (
                  <p className="text-xs text-text-secondary mt-1">
                    {procedure.notes}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-text-secondary text-sm">
            No hay procedimientos registrados
          </div>
        )}
      </div>

      {/* Formulario para agregar procedimiento */}
      {showAddForm && onProcedureAdd && (
        <div className="p-4 bg-surface-secondary rounded-lg space-y-3">
          <select
            value={selectedProcedure}
            onChange={(e) => setSelectedProcedure(e.target.value)}
            className="select select-bordered select-sm w-full"
          >
            <option value="">Seleccionar procedimiento...</option>
            {commonProcedures.map((proc) => (
              <option key={proc.code} value={proc.code}>
                {proc.code} - {proc.name}
              </option>
            ))}
          </select>
          
          <select
            value={procedureStatus}
            onChange={(e) => setProcedureStatus(e.target.value as any)}
            className="select select-bordered select-sm w-full"
          >
            <option value="planned">Planificado</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddProcedure}
              disabled={!selectedProcedure}
              className="btn btn-primary btn-sm flex-1"
            >
              Agregar
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setSelectedProcedure('');
                setProcedureStatus('planned');
              }}
              className="btn btn-ghost btn-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Procedimientos frecuentes */}
      {!showAddForm && onProcedureAdd && (
        <div>
          <p className="text-xs font-semibold text-text-secondary mb-2">
            Procedimientos frecuentes:
          </p>
          <div className="grid grid-cols-2 gap-1">
            {commonProcedures.slice(0, 4).map((proc) => (
              <button
                key={proc.code}
                onClick={() => {
                  setSelectedProcedure(proc.code);
                  setShowAddForm(true);
                }}
                className="btn btn-ghost btn-xs justify-start"
              >
                <Plus className="w-3 h-3 mr-1" />
                {proc.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};