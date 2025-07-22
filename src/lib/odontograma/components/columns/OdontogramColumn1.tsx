import React from 'react';
import { DetailedToothComponent } from '../DetailedToothComponent';
import { AlignedToothContainer } from '../AlignedToothContainer';
import { TOOTH_SLOT_HEIGHT, TEMPORARY_TOOTH_SLOT_HEIGHT } from '../../constants/layout';
import { OdontogramColumnProps } from './types';

/**
 * Columna 1 del odontograma - Grupos 1 y 4
 * Contiene los molares y premolares del lado derecho
 */
export const OdontogramColumn1: React.FC<OdontogramColumnProps> = ({
  permanentUpperGroup,
  permanentLowerGroup,
  temporaryUpperGroup,
  temporaryLowerGroup,
  showTemporaryTeeth,
  showBiteEffect,
  developerMode,
  selectedTooth,
  onToothClick,
  groupNumber,
}) => {
  return (
    <div className="flex flex-col">
      {/* Header Grupo 1 */}
      <div className="h-[50px] flex flex-col items-center justify-end ">
        <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mb-2">
          Grupo 1
        </div>
        <div className="w-full h-3 border-l-2 border-r-2 border-t-2 border-accent/50 rounded-t-lg"></div>
      </div>
      
      {/* Fila 1: Dientes permanentes superiores */}
      <div className={`${TOOTH_SLOT_HEIGHT} flex items-center justify-end px-2 pb-4 ${developerMode ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Grupo 1 Row</span>
        )}
        <div className={`flex gap-2`}>
          {[...permanentUpperGroup].reverse().map((tooth) => (
            <AlignedToothContainer
              key={tooth.id}
              isUpper={true}
              isTemporary={false}
              developerMode={developerMode}
              toothId={tooth.clinicalId || tooth.id.toString()}
            >
              <DetailedToothComponent
                tooth={tooth}
                isSelected={selectedTooth?.id === tooth.id}
                onToothClick={onToothClick}
                isUpper={true}
                developerMode={developerMode}
              />
            </AlignedToothContainer>
          ))}
        </div>
      </div>
      
      {/* Fila 2: Dientes temporales superiores / Espacio mordida */}
      <div className={`${showBiteEffect || showTemporaryTeeth ? TEMPORARY_TOOTH_SLOT_HEIGHT : 'h-0 overflow-hidden'} transition-all duration-300 flex items-center justify-end px-2  ${developerMode && showTemporaryTeeth ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Temp Upper Row</span>
        )}
        {showTemporaryTeeth && !showBiteEffect && (
          <div className={`flex gap-2`}>
            {[...temporaryUpperGroup].reverse().map((tooth) => (
              <AlignedToothContainer
                key={tooth.id}
                isUpper={true}
                isTemporary={true}
                developerMode={developerMode}
                toothId={tooth.clinicalId || tooth.id.toString()}
              >
                <DetailedToothComponent
                  tooth={tooth}
                  isSelected={selectedTooth?.id === tooth.id}
                  onToothClick={onToothClick}
                  isUpper={true}
                  developerMode={developerMode}
                  isTemporary={true}
                />
              </AlignedToothContainer>
            ))}
          </div>
        )}
      </div>
      
      {/* Fila 3: Dientes temporales inferiores / Espacio mordida */}
      <div className={`${showBiteEffect || showTemporaryTeeth ? TEMPORARY_TOOTH_SLOT_HEIGHT : 'h-0 overflow-hidden'} transition-all duration-300 flex items-center justify-end px-2 ${developerMode && showTemporaryTeeth ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Temp Lower Row</span>
        )}
        {showTemporaryTeeth && !showBiteEffect && (
          <div className={`flex gap-2`}>
            {[...temporaryLowerGroup].reverse().map((tooth) => (
              <AlignedToothContainer
                key={tooth.id}
                isUpper={false}
                isTemporary={true}
                developerMode={developerMode}
                toothId={tooth.clinicalId || tooth.id.toString()}
              >
                <DetailedToothComponent
                  tooth={tooth}
                  isSelected={selectedTooth?.id === tooth.id}
                  onToothClick={onToothClick}
                  isUpper={false}
                  developerMode={developerMode}
                  isTemporary={true}
                />
              </AlignedToothContainer>
            ))}
          </div>
        )}
      </div>
      
      {/* Fila 4: Dientes permanentes inferiores */}
      <div className={`${TOOTH_SLOT_HEIGHT} flex items-center justify-start px-2 ${developerMode ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Grupo 4 Row</span>
        )}
        <div className={`flex gap-2`}>
          {[...permanentLowerGroup].reverse().map((tooth) => (
            <AlignedToothContainer
              key={tooth.id}
              isUpper={false}
              isTemporary={false}
              developerMode={developerMode}
              toothId={tooth.clinicalId || tooth.id.toString()}
            >
              <DetailedToothComponent
                tooth={tooth}
                isSelected={selectedTooth?.id === tooth.id}
                onToothClick={onToothClick}
                isUpper={false}
                developerMode={developerMode}
              />
            </AlignedToothContainer>
          ))}
        </div>
      </div>
      
      {/* Footer Grupo 4 */}
      <div className="h-[50px] flex flex-col items-center justify-start">
        <div className="w-full h-3 border-l-2 border-r-2 border-b-2 border-accent/50 rounded-b-lg"></div>
        <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mt-2">
          Grupo 4
        </div>
      </div>
    </div>
  );
};