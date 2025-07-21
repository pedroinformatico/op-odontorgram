import React from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { clinicalCases, ClinicalCase } from '../data/clinicalCases';

interface CaseSelectorProps {
  selectedCaseId: string;
  onCaseSelect: (caseId: string) => void;
  className?: string;
}

export const CaseSelector: React.FC<CaseSelectorProps> = ({ 
  selectedCaseId, 
  onCaseSelect,
  className = '' 
}) => {
  const selectedCase = clinicalCases.find(c => c.id === selectedCaseId);

  const categoryLabels: Record<ClinicalCase['category'], string> = {
    empty: '🦷 Vacío',
    basic: '🔵 Básico',
    periodontal: '🔴 Periodontal',
    complex: '⚡ Complejo',
    orthodontic: '🦷 Ortodoncia',
    pediatric: '👶 Pediátrico',
    infant: '🍼 Infantil'
  };

  const categoryColors: Record<ClinicalCase['category'], string> = {
    empty: 'badge-ghost',
    basic: 'badge-info',
    periodontal: 'badge-error',
    complex: 'badge-warning',
    orthodontic: 'badge-primary',
    pediatric: 'badge-success',
    infant: 'badge-secondary'
  };

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label 
        tabIndex={0} 
        className="btn btn-sm btn-ghost gap-2 normal-case"
        title="Seleccionar caso clínico"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">
          {selectedCase ? selectedCase.name : 'Seleccionar caso'}
        </span>
        {selectedCase && (
          <div className={`badge badge-sm ${categoryColors[selectedCase.category]}`}>
            {categoryLabels[selectedCase.category]}
          </div>
        )}
        <ChevronDown className="w-3 h-3" />
      </label>
      
      <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-80 max-h-96 overflow-y-auto">
        <div className="text-xs font-semibold text-base-content/60 px-2 py-1">
          CASOS CLÍNICOS PREDEFINIDOS
        </div>
        
        {clinicalCases.map((clinicalCase) => (
          <div key={clinicalCase.id}>
            <button
              onClick={() => onCaseSelect(clinicalCase.id)}
              className={`w-full text-left p-3 rounded-lg hover:bg-base-200 transition-colors ${
                selectedCaseId === clinicalCase.id ? 'bg-base-200' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`badge badge-sm ${categoryColors[clinicalCase.category]} mt-0.5`}>
                  {categoryLabels[clinicalCase.category]}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{clinicalCase.name}</div>
                  <div className="text-xs text-base-content/60 mt-1">
                    {clinicalCase.description}
                  </div>
                  {clinicalCase.patientAge && (
                    <div className="text-xs text-base-content/50 mt-1">
                      Edad del paciente: {clinicalCase.patientAge} años
                    </div>
                  )}
                </div>
              </div>
            </button>
            
            {clinicalCase.id !== clinicalCases[clinicalCases.length - 1].id && (
              <div className="divider my-1 h-px"></div>
            )}
          </div>
        ))}
        
        <div className="divider my-1"></div>
        
        <div className="text-xs text-base-content/50 px-2 py-2">
          <strong>Nota:</strong> Al seleccionar un caso, se cargarán automáticamente 
          las condiciones dentales predefinidas. Puedes modificarlas después.
        </div>
      </div>
    </div>
  );
};