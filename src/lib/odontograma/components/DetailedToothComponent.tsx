import React from 'react';
import { Tooth, ToothStatus } from '../types';
import { getToothVerticalOffset } from '../config/layoutConfig';
import { TOOTH_HEIGHT } from '../constants/layout';
import { Check, AlertCircle, CircleDot, Crown, X, Plus, Zap, AlertTriangle as TriangleAlert, Link, AlertOctagon } from 'lucide-react';

export interface DetailedToothComponentProps {
  tooth: Tooth;
  isSelected: boolean;
  onToothClick: (tooth: Tooth, event?: React.MouseEvent) => void;
  isUpper: boolean;
  isTemporary?: boolean;
  isDarkMode?: boolean;
  developerMode?: boolean;
}

const statusIcons = {
  healthy: Check,
  caries: AlertCircle,
  filled: CircleDot,
  crown: Crown,
  extracted: X,
  implant: Plus,
  root_canal: Zap,
  fracture: TriangleAlert,
  bridge: Link,
  extraction_indicated: AlertOctagon,
  not_erupted: undefined,
};

export const DetailedToothComponent: React.FC<DetailedToothComponentProps> = ({ 
  tooth, 
  isSelected,
  onToothClick, 
  isUpper,
  isTemporary = false,
  isDarkMode = false,
  developerMode = false
}) => {
  const getToothStyle = (status: ToothStatus) => {
    const baseStyles = isDarkMode ? {
      healthy: 'border-green-700 text-green-300',
      caries: 'border-red-700 text-red-300',
      filled: 'border-blue-700 text-blue-300',
      crown: 'border-amber-700 text-amber-300',
      extracted: 'border-gray-600 text-gray-400',
      implant: 'border-purple-700 text-purple-300',
      root_canal: 'border-pink-700 text-pink-300',
      fracture: 'border-orange-700 text-orange-300',
      bridge: 'border-indigo-700 text-indigo-300',
      extraction_indicated: 'border-red-800 text-red-400',
      not_erupted: 'border-gray-600 text-gray-500',
    } : {
      healthy: 'border-success text-success-content',
      caries: 'border-error text-error-content',
      filled: 'border-info text-info-content',
      crown: 'border-warning text-warning-content',
      extracted: 'border-gray-500 text-gray-700',
      implant: 'border-primary text-primary-content',
      root_canal: 'border-secondary text-secondary-content',
      fracture: 'border-accent text-accent-content',
      bridge: 'border-purple-500 text-purple-600',
      extraction_indicated: 'border-red-600 text-red-700',
      not_erupted: 'border-gray-300 text-gray-400',
    };
    
    if (isTemporary) {
      return `bg-orange-100 ${baseStyles[status] || 'border-border-color text-text-primary'}`;
    }
    
    if (isDarkMode) {
      switch (status) {
        case 'healthy': return 'bg-green-900/30 border-green-700 text-green-300';
        case 'caries': return 'bg-red-900/30 border-red-700 text-red-300';
        case 'filled': return 'bg-blue-900/30 border-blue-700 text-blue-300';
        case 'crown': return 'bg-amber-900/30 border-amber-700 text-amber-300';
        case 'extracted': return 'bg-gray-800/30 border-gray-600 text-gray-400';
        case 'implant': return 'bg-purple-900/30 border-purple-700 text-purple-300';
        case 'root_canal': return 'bg-pink-900/30 border-pink-700 text-pink-300';
        case 'fracture': return 'bg-orange-900/30 border-orange-700 text-orange-300';
        case 'bridge': return 'bg-indigo-900/30 border-indigo-700 text-indigo-300';
        case 'extraction_indicated': return 'bg-red-950/30 border-red-800 text-red-400';
        case 'not_erupted': return 'bg-gray-800 border-gray-600 text-gray-500 opacity-50';
        default: return 'bg-gray-800 border-gray-600 text-gray-300';
      }
    } else {
      switch (status) {
        case 'healthy': return 'bg-success/20 border-success text-success-content';
        case 'caries': return 'bg-error/20 border-error text-error-content';
        case 'filled': return 'bg-info/20 border-info text-info-content';
        case 'crown': return 'bg-warning/20 border-warning text-warning-content';
        case 'extracted': return 'bg-gray-500/20 border-gray-500 text-gray-700';
        case 'implant': return 'bg-primary/20 border-primary text-primary-content';
        case 'root_canal': return 'bg-secondary/20 border-secondary text-secondary-content';
        case 'fracture': return 'bg-accent/20 border-accent text-accent-content';
        case 'bridge': return 'bg-purple-500/20 border-purple-500 text-purple-600';
        case 'extraction_indicated': return 'bg-red-600/20 border-red-600 text-red-700';
        case 'not_erupted': return 'bg-gray-100 border-gray-300 text-gray-400 opacity-50';
        default: return 'bg-surface-secondary border-border-color text-text-primary';
      }
    }
  };

  const getSurfaceStyle = (status: ToothStatus) => {
    if (isTemporary) {
      if (isDarkMode) {
        switch (status) {
          case 'healthy': return 'bg-orange-900/40 border-green-700';
          case 'caries': return 'bg-orange-900/40 border-red-700';
          case 'filled': return 'bg-orange-900/40 border-blue-700';
          case 'crown': return 'bg-orange-900/40 border-amber-700';
          case 'extracted': return 'bg-orange-900/40 border-gray-600';
          case 'implant': return 'bg-orange-900/40 border-purple-700';
          case 'root_canal': return 'bg-orange-900/40 border-pink-700';
          case 'fracture': return 'bg-orange-900/40 border-orange-700';
          case 'bridge': return 'bg-orange-900/40 border-indigo-700';
          case 'extraction_indicated': return 'bg-orange-900/40 border-red-800';
          default: return 'bg-orange-900/40 border-gray-600';
        }
      } else {
        switch (status) {
          case 'healthy': return 'bg-orange-200 border-success';
          case 'caries': return 'bg-orange-200 border-error';
          case 'filled': return 'bg-orange-200 border-info';
          case 'crown': return 'bg-orange-200 border-warning';
          case 'extracted': return 'bg-orange-200 border-neutral';
          case 'implant': return 'bg-orange-200 border-primary';
          case 'root_canal': return 'bg-orange-200 border-secondary';
          case 'fracture': return 'bg-orange-200 border-orange-600';
          case 'bridge': return 'bg-orange-200 border-purple-500';
          case 'extraction_indicated': return 'bg-orange-200 border-red-600';
          default: return 'bg-orange-200 border-border-color';
        }
      }
    }
    
    if (isDarkMode) {
      switch (status) {
        case 'healthy': return 'bg-green-900/40 border-green-700';
        case 'caries': return 'bg-red-900/40 border-red-700';
        case 'filled': return 'bg-blue-900/40 border-blue-700';
        case 'crown': return 'bg-amber-900/40 border-amber-700';
        case 'extracted': return 'bg-gray-800/40 border-gray-600';
        case 'implant': return 'bg-purple-900/40 border-purple-700';
        case 'root_canal': return 'bg-pink-900/40 border-pink-700';
        case 'fracture': return 'bg-orange-900/40 border-orange-700';
        case 'bridge': return 'bg-indigo-900/40 border-indigo-700';
        case 'extraction_indicated': return 'bg-red-950/40 border-red-800';
        case 'not_erupted': return 'bg-gray-800/40 border-gray-600';
        default: return 'bg-gray-800/40 border-gray-600';
      }
    } else {
      switch (status) {
        case 'healthy': return 'bg-success/40 border-success';
        case 'caries': return 'bg-error/40 border-error';
        case 'filled': return 'bg-info/40 border-info';
        case 'crown': return 'bg-warning/40 border-warning';
        case 'extracted': return 'bg-gray-500/40 border-gray-500';
        case 'implant': return 'bg-primary/40 border-primary';
        case 'root_canal': return 'bg-secondary/40 border-secondary';
        case 'fracture': return 'bg-orange-600/40 border-orange-600';
        case 'bridge': return 'bg-purple-500/40 border-purple-500';
        case 'extraction_indicated': return 'bg-red-600/40 border-red-600';
        case 'not_erupted': return 'bg-gray-200/40 border-gray-300';
        default: return 'bg-surface-secondary/40 border-border-color';
      }
    }
  };

  const isExtracted = tooth.status === 'extracted' || tooth.status === 'extraction_indicated';
  const isFrontal = tooth.position <= 3;
  const isPremolar = tooth.position === 4 || tooth.position === 5;

  const getToothShape = () => {
    if (isFrontal) {
      return isUpper ? 'rounded-t-xl rounded-b-full' : 'rounded-b-xl rounded-t-full';
    } else if (isPremolar) {
      return 'rounded-xl';
    } else {
      return 'rounded-lg';
    }
  };

  const getToothSize = () => {
    if (isTemporary) {
      if (isFrontal) return 'w-6 sm:w-8';
      if (isPremolar) return 'w-7 sm:w-9';
      return 'w-8 sm:w-10';
    }
    
    if (isFrontal) return 'w-8 sm:w-10';
    if (isPremolar) return 'w-9 sm:w-11';
    return 'w-10 sm:w-12';
  };

  const handleToothClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToothClick(tooth, e);
  };

  const StatusIcon = statusIcons[tooth.status];
  const verticalOffset = getToothVerticalOffset(tooth.id);

  // Componente del label (número del diente)
  const toothLabel = (
    <div className={isUpper ? "mb-1" : "mt-1"}>
      <div className={`text-xs font-bold flex items-center gap-1 ${isTemporary ? 'text-orange-500' : 'text-accent'}`}>
        <span>{tooth.clinicalId || tooth.id}</span>
        {tooth.notes && (
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
        )}
      </div>
    </div>
  );

  // Componente de las raíces
  const toothRoots = (
    <div className={`w-full ${isTemporary ? 'h-2 sm:h-3' : 'h-3 sm:h-4'} flex justify-center ${isUpper ? 'mb-1' : ''} relative`}>
      <div className={isExtracted ? 'opacity-30' : ''}>
        {isFrontal ? (
          <div className={`${isTemporary ? 'w-1 sm:w-1.5 h-2 sm:h-3' : 'w-1.5 sm:w-2 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
        ) : isPremolar ? (
          <div className="flex gap-1">
            <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
            <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
          </div>
        ) : (
          <div className="flex gap-0.5">
            <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
            <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
            <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 ${isUpper ? 'border-b-0 rounded-t-full' : 'border-t-0 rounded-b-full'} shadow-sm`}></div>
          </div>
        )}
      </div>
      {/* X mark for extracted teeth */}
      {isExtracted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-0.5 bg-red-500 rotate-45 max-w-[20px]"></div>
          <div className="w-full h-0.5 bg-red-500 -rotate-45 absolute max-w-[20px]"></div>
        </div>
      )}
    </div>
  );

  // Componente del diente principal
  const toothBody = (
    <div className={`${getToothSize()} mb-1 relative`}>
      {/* Corona del diente */}
      <button
        className={`
          w-full ${isTemporary ? 'h-6 sm:h-10' : 'h-8 sm:h-12'} border-2 transition-all duration-200
          ${getToothShape()}
          ${getToothStyle(tooth.status)}
          ${isSelected ? 'ring-2 ring-accent ring-offset-2' : ''}
          ${isExtracted ? 'opacity-40' : 'hover:scale-105 hover:shadow-lg'}
          cursor-pointer
          flex items-center justify-center relative overflow-hidden
          shadow-sm
        `}
        onClick={handleToothClick}
      >
        {/* Grid de superficies visibles */}
        <div className="absolute inset-0.5 grid grid-cols-3 grid-rows-3 gap-0.5">
          {/* Superficie vestibular (arriba) */}
          <div
            className={`col-start-2 row-start-1 rounded-sm border ${isTemporary ? (isDarkMode ? 'border-orange-700' : 'border-orange-400') : (isDarkMode ? 'border-gray-600' : 'border-gray-300')} ${getSurfaceStyle(tooth.surfaces?.vestibular || tooth.status)}`}
            title="Superficie vestibular"
          />
          
          {/* Superficie mesial (izquierda) */}
          <div
            className={`col-start-1 row-start-2 rounded-sm border ${isTemporary ? (isDarkMode ? 'border-orange-700' : 'border-orange-400') : (isDarkMode ? 'border-gray-600' : 'border-gray-300')} ${getSurfaceStyle(tooth.surfaces?.mesial || tooth.status)}`}
            title="Superficie mesial"
          />
          
          {/* Superficie oclusal (centro) */}
          <div
            className={`col-start-2 row-start-2 rounded-sm border ${isTemporary ? (isDarkMode ? 'border-orange-700' : 'border-orange-400') : (isDarkMode ? 'border-gray-600' : 'border-gray-300')} ${getSurfaceStyle(tooth.surfaces?.oclusal || tooth.status)}`}
            title="Superficie oclusal"
          />
          
          {/* Superficie distal (derecha) */}
          <div
            className={`col-start-3 row-start-2 rounded-sm border ${isTemporary ? (isDarkMode ? 'border-orange-700' : 'border-orange-400') : (isDarkMode ? 'border-gray-600' : 'border-gray-300')} ${getSurfaceStyle(tooth.surfaces?.distal || tooth.status)}`}
            title="Superficie distal"
          />
          
          {/* Superficie lingual (abajo) */}
          <div
            className={`col-start-2 row-start-3 rounded-sm border ${isTemporary ? (isDarkMode ? 'border-orange-700' : 'border-orange-400') : (isDarkMode ? 'border-gray-600' : 'border-gray-300')} ${getSurfaceStyle(tooth.surfaces?.lingual || tooth.status)}`}
            title="Superficie lingual"
          />
        </div>

        {/* Marca de extracción */}
        {isExtracted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-0.5 bg-red-500 rotate-45"></div>
            <div className="w-10 h-0.5 bg-red-500 -rotate-45 absolute"></div>
          </div>
        )}
      </button>
    </div>
  );

  // Contenido del diente (label + raíz + diente o diente + raíz + label)
  const toothContent = (
    <div 
      className={`h-[105px] relative group flex flex-col items-center ${isUpper ? 'justify-start' : 'justify-end'} ${tooth.notes ? 'tooltip tooltip-top before:max-w-xs before:whitespace-pre-wrap' : ''} ${developerMode ? 'border-2 border-yellow-500 border-dashed' : ''}`}
      data-tip={tooth.notes || ''}
    >
      {isUpper ? (
        <>
          {/* Para dientes superiores: label → raíces → diente */}
          {toothLabel}
          {toothRoots}
          {toothBody}
        </>
      ) : (
        <>
          {/* Para dientes inferiores: diente → raíces → label */}
          {toothBody}
          {toothRoots}
          {toothLabel}
        </>
      )}
    </div>
  );

  // Auto-layout structure: 3 elements (offset, tooth, libre)
  // Height is managed by parent AlignedToothContainer (160px)
  return (
    <div className="h-full flex flex-col">
      {isUpper ? (
        <>
          {/* Offset dinámico */}
          <div 
            style={{ height: `${verticalOffset}px` }} 
            className={developerMode ? 'bg-pink-200/50' : ''}
          />
          {/* Contenedor del diente fijo (105px) */}
          {toothContent}
          {/* Libre (ocupa el resto) */}
          <div 
            className={`flex-1 ${developerMode ? 'bg-yellow-200/50' : ''}`}
          />
        </>
      ) : (
        <>
          {/* Libre (ocupa el resto) */}
          <div 
            className={`flex-1 ${developerMode ? 'bg-yellow-200/50' : ''}`}
          />
          {/* Contenedor del diente fijo (105px) */}
          {toothContent}
          {/* Offset dinámico */}
          <div 
            style={{ height: `${verticalOffset}px` }} 
            className={developerMode ? 'bg-pink-200/50' : ''}
          />
        </>
      )}
    </div>
  );
};