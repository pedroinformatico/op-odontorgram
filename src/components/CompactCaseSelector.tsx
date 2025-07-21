import React from 'react';
import { ChevronDown } from 'lucide-react';
import { clinicalCases } from '../data/clinicalCases';

interface CompactCaseSelectorProps {
  selectedCaseId: string;
  onCaseSelect: (caseId: string) => void;
  className?: string;
}

export const CompactCaseSelector: React.FC<CompactCaseSelectorProps> = ({ 
  selectedCaseId, 
  onCaseSelect,
  className = '' 
}) => {
  const selectedCase = clinicalCases.find(c => c.id === selectedCaseId);
  
  const getCaseBadgeColor = (caseId: string) => {
    const colors: Record<string, string> = {
      'empty': 'bg-base-200',
      'basic-adult': 'bg-blue-500/20 text-blue-700',
      'periodontal': 'bg-red-500/20 text-red-700',
      'complex': 'bg-orange-500/20 text-orange-700',
      'orthodontic': 'bg-purple-500/20 text-purple-700',
      'pediatric': 'bg-green-500/20 text-green-700',
      'infant': 'bg-pink-500/20 text-pink-700'
    };
    return colors[caseId] || 'bg-base-200';
  };

  return (
    <div className={`dropdown dropdown-end ${className}`}>
      <label 
        tabIndex={0} 
        className={`btn btn-xs gap-1 normal-case ${getCaseBadgeColor(selectedCaseId)} border-0 hover:brightness-95`}
      >
        <span className="text-xs font-medium">
          {selectedCase?.name || 'Seleccionar caso'}
        </span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </label>
      
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow-lg bg-base-100 rounded-box w-48 border border-base-300 mt-1">
        {clinicalCases.map((clinicalCase) => (
          <li key={clinicalCase.id}>
            <button
              onClick={() => onCaseSelect(clinicalCase.id)}
              className={`text-xs px-2 py-1.5 ${
                selectedCaseId === clinicalCase.id ? getCaseBadgeColor(clinicalCase.id) : ''
              }`}
            >
              {clinicalCase.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};