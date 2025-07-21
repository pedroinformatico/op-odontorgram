import React from 'react';
import { Tooth, ToothStatus } from '../types';
import { getToothVerticalOffset } from '../config/layoutConfig';
import { Check, AlertCircle, CircleDot, Crown, X, Plus, Zap, AlertTriangle as TriangleAlert, Link, AlertOctagon } from 'lucide-react';

export interface DetailedToothComponentProps {
  tooth: Tooth;
  isSelected: boolean;
  onToothClick: (tooth: Tooth, event?: React.MouseEvent) => void;
  isUpper: boolean;
  isTemporary?: boolean;
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
  isTemporary = false
}) => {
  const getToothStyle = (status: ToothStatus) => {
    const baseStyles = {
      healthy: 'border-success text-success-content',
      caries: 'border-error text-error-content',
      filled: 'border-info text-info-content',
      crown: 'border-warning text-warning-content',
      extracted: 'border-neutral text-neutral-content',
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
    
    switch (status) {
      case 'healthy': return 'bg-success/20 border-success text-success-content';
      case 'caries': return 'bg-error/20 border-error text-error-content';
      case 'filled': return 'bg-info/20 border-info text-info-content';
      case 'crown': return 'bg-warning/20 border-warning text-warning-content';
      case 'extracted': return 'bg-neutral/20 border-neutral text-neutral-content';
      case 'implant': return 'bg-primary/20 border-primary text-primary-content';
      case 'root_canal': return 'bg-secondary/20 border-secondary text-secondary-content';
      case 'fracture': return 'bg-accent/20 border-accent text-accent-content';
      case 'bridge': return 'bg-purple-500/20 border-purple-500 text-purple-600';
      case 'extraction_indicated': return 'bg-red-600/20 border-red-600 text-red-700';
      case 'not_erupted': return 'bg-gray-100 border-gray-300 text-gray-400 opacity-50';
      default: return 'bg-surface-secondary border-border-color text-text-primary';
    }
  };

  const getSurfaceStyle = (status: ToothStatus) => {
    if (isTemporary) {
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
    
    switch (status) {
      case 'healthy': return 'bg-success/40 border-success';
      case 'caries': return 'bg-error/40 border-error';
      case 'filled': return 'bg-info/40 border-info';
      case 'crown': return 'bg-warning/40 border-warning';
      case 'extracted': return 'bg-neutral/40 border-neutral';
      case 'implant': return 'bg-primary/40 border-primary';
      case 'root_canal': return 'bg-secondary/40 border-secondary';
      case 'fracture': return 'bg-orange-600/40 border-orange-600';
      case 'bridge': return 'bg-purple-500/40 border-purple-500';
      case 'extraction_indicated': return 'bg-red-600/40 border-red-600';
      case 'not_erupted': return 'bg-gray-200/40 border-gray-300';
      default: return 'bg-surface-secondary/40 border-border-color';
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
      if (isFrontal) return 'w-6 h-10 sm:w-8 sm:h-12';
      if (isPremolar) return 'w-7 h-12 sm:w-9 sm:h-14';
      return 'w-8 h-14 sm:w-10 sm:h-16';
    }
    
    if (isFrontal) return 'w-8 h-12 sm:w-10 sm:h-16';
    if (isPremolar) return 'w-9 h-14 sm:w-11 sm:h-18';
    return 'w-10 h-16 sm:w-12 sm:h-20';
  };

  const handleToothClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToothClick(tooth, e);
  };

  const StatusIcon = statusIcons[tooth.status];
  const verticalOffset = getToothVerticalOffset(tooth.id);

  return (
    <div 
      className="relative group flex flex-col items-center"
      style={{ transform: `translateY(${verticalOffset}px)` }}
    >
      {/* Número del diente con tooltip */}
      <div className={`tooltip tooltip-top mb-1 ${tooth.demoLabel ? 'before:max-w-xs before:whitespace-pre-wrap' : ''}`} 
           data-tip={tooth.demoLabel || ''}>
        <div className={`text-xs font-bold flex items-center gap-1 ${isTemporary ? 'text-orange-500' : 'text-accent'}`}>
          <span>{tooth.clinicalId || tooth.id}</span>
          {tooth.demoLabel && (
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
          )}
        </div>
      </div>
      
      {/* Raíces del diente (para dientes superiores) */}
      {isUpper && (
        <div className={`w-full ${isTemporary ? 'h-2 sm:h-3' : 'h-3 sm:h-4'} flex justify-center mb-1 relative`}>
          <div className={isExtracted ? 'opacity-30' : ''}>
            {isFrontal ? (
              <div className={`${isTemporary ? 'w-1 sm:w-1.5 h-2 sm:h-3' : 'w-1.5 sm:w-2 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
            ) : isPremolar ? (
              <div className="flex gap-1">
                <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
                <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
              </div>
            ) : (
              <div className="flex gap-0.5">
                <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
                <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
                <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-b-0 rounded-t-full shadow-sm`}></div>
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
      )}
      
      {/* Diente principal */}
      <div className={`${getToothSize()} relative`}>
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
              className={`col-start-2 row-start-1 rounded-sm border ${isTemporary ? 'border-orange-400' : 'border-gray-300'} ${getSurfaceStyle(tooth.surfaces?.vestibular || tooth.status)}`}
              title="Superficie vestibular"
            />
            
            {/* Superficie mesial (izquierda) */}
            <div
              className={`col-start-1 row-start-2 rounded-sm border ${isTemporary ? 'border-orange-400' : 'border-gray-300'} ${getSurfaceStyle(tooth.surfaces?.mesial || tooth.status)}`}
              title="Superficie mesial"
            />
            
            {/* Superficie oclusal (centro) */}
            <div
              className={`col-start-2 row-start-2 rounded-sm border ${isTemporary ? 'border-orange-400' : 'border-gray-300'} ${getSurfaceStyle(tooth.surfaces?.oclusal || tooth.status)}`}
              title="Superficie oclusal"
            />
            
            {/* Superficie distal (derecha) */}
            <div
              className={`col-start-3 row-start-2 rounded-sm border ${isTemporary ? 'border-orange-400' : 'border-gray-300'} ${getSurfaceStyle(tooth.surfaces?.distal || tooth.status)}`}
              title="Superficie distal"
            />
            
            {/* Superficie lingual (abajo) */}
            <div
              className={`col-start-2 row-start-3 rounded-sm border ${isTemporary ? 'border-orange-400' : 'border-gray-300'} ${getSurfaceStyle(tooth.surfaces?.lingual || tooth.status)}`}
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

        {/* Raíces del diente (para dientes inferiores) */}
        {!isUpper && (
          <div className={`w-full ${isTemporary ? 'h-2 sm:h-3' : 'h-3 sm:h-4'} flex justify-center mt-1 relative`}>
            <div className={isExtracted ? 'opacity-30' : ''}>
              {isFrontal ? (
                <div className={`${isTemporary ? 'w-1 sm:w-1.5 h-2 sm:h-3' : 'w-1.5 sm:w-2 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
              ) : isPremolar ? (
                <div className="flex gap-1">
                  <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
                  <div className={`${isTemporary ? 'w-0.5 sm:w-1 h-2 sm:h-3' : 'w-1 sm:w-1.5 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
                </div>
              ) : (
                <div className="flex gap-0.5">
                  <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
                  <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
                  <div className={`${isTemporary ? 'w-0.5 h-2 sm:h-3' : 'w-0.5 sm:w-1 h-3 sm:h-4'} ${getToothStyle(tooth.status)} border-2 border-t-0 rounded-b-full shadow-sm`}></div>
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
        )}
      </div>
    </div>
  );
};