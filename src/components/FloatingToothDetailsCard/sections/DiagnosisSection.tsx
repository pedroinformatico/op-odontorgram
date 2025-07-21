import React from 'react';
import { Check, AlertCircle, CircleDot, Crown, X, Plus, Zap, AlertTriangle, Link, AlertOctagon } from 'lucide-react';
import { ToothStatus } from '../../../types/dental';

interface DiagnosisSectionProps {
  currentStatus: ToothStatus;
  onStatusChange: (status: ToothStatus) => void;
}

interface DiagnosisOption {
  id: ToothStatus;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const diagnosisOptions: DiagnosisOption[] = [
  {
    id: 'healthy',
    label: 'Sano',
    icon: Check,
    color: '#10b981',
    description: 'Diente sin patologías'
  },
  {
    id: 'caries',
    label: 'Caries',
    icon: AlertCircle,
    color: '#ef4444',
    description: 'Presencia de caries dental'
  },
  {
    id: 'filled',
    label: 'Obturado',
    icon: CircleDot,
    color: '#3b82f6',
    description: 'Diente con obturación'
  },
  {
    id: 'crown',
    label: 'Corona',
    icon: Crown,
    color: '#f59e0b',
    description: 'Corona protésica'
  },
  {
    id: 'extracted',
    label: 'Extraído',
    icon: X,
    color: '#6b7280',
    description: 'Diente extraído'
  },
  {
    id: 'implant',
    label: 'Implante',
    icon: Plus,
    color: '#8b5cf6',
    description: 'Implante dental'
  },
  {
    id: 'root_canal',
    label: 'Endodoncia',
    icon: Zap,
    color: '#ec4899',
    description: 'Tratamiento de conducto'
  },
  {
    id: 'fracture',
    label: 'Fractura',
    icon: AlertTriangle,
    color: '#f97316',
    description: 'Fractura dental'
  },
  {
    id: 'bridge',
    label: 'Puente',
    icon: Link,
    color: '#6366f1',
    description: 'Puente dental'
  },
  {
    id: 'extraction_indicated',
    label: 'Extracción indicada',
    icon: AlertOctagon,
    color: '#dc2626',
    description: 'Requiere extracción'
  }
];

export const DiagnosisSection: React.FC<DiagnosisSectionProps> = ({ 
  currentStatus, 
  onStatusChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Selecciona un estado:
        </h4>
        
        <div className="grid grid-cols-2 gap-2">
          {diagnosisOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = currentStatus === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => onStatusChange(option.id)}
                className={`
                  flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-accent bg-accent/10 shadow-sm' 
                    : 'border-border-color hover:border-accent/50 hover:bg-surface-hover'
                  }
                `}
                title={option.description}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: option.color }}
                  />
                </div>
                <span className={`text-sm font-medium ${
                  isSelected ? 'text-text-primary' : 'text-text-secondary'
                }`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Status Description */}
      <div className="p-3 bg-surface-secondary rounded-lg">
        <p className="text-sm text-text-secondary">
          <strong>Estado actual:</strong>{' '}
          {diagnosisOptions.find(opt => opt.id === currentStatus)?.description || 'Sin definir'}
        </p>
      </div>
    </div>
  );
};