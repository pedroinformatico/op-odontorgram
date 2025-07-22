import React from 'react';
import { DetailedToothComponent } from '../DetailedToothComponent';
import { AlignedToothContainer } from '../AlignedToothContainer';
import { TOOTH_SLOT_HEIGHT, TEMPORARY_TOOTH_SLOT_HEIGHT } from '../../constants/layout';
import { OdontogramColumnProps } from './types';

/**
 * Columna 2 del odontograma - Grupos 2 y 5
 * Contiene los incisivos y caninos centrales con separadores
 */
export const OdontogramColumn2: React.FC<OdontogramColumnProps> = ({
  permanentUpperGroup,
  permanentLowerGroup,
  temporaryUpperGroup,
  temporaryLowerGroup,
  showTemporaryTeeth,
  showBiteEffect,
  developerMode,
  selectedTooth,
  onToothClick,
}) => {
  return (
    <div className="flex flex-col">
      {/* Header Grupo 2 */}
      <div className="h-[50px] flex flex-col items-center justify-end ">
        <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mb-2">
          Grupo 2
        </div>
        <div className="w-full h-3 border-l-2 border-r-2 border-t-2 border-accent/50 rounded-t-lg"></div>
      </div>
      
      {/* Fila 1: Dientes permanentes superiores */}
      <div className={`${TOOTH_SLOT_HEIGHT} flex items-center justify-center px-2  ${developerMode ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Grupo 2 Row</span>
        )}
        <div className="flex items-center gap-1">
          {/* Lado derecho del grupo 2 (13, 12, 11) */}
          <div className={`flex gap-2`}>
            {permanentUpperGroup.slice(0, 3).reverse().map((tooth) => (
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
          {/* Separador entre incisivos centrales */}
          <div className="w-0.5 h-16 bg-accent/30 mx-2"></div>
          {/* Lado izquierdo del grupo 2 (21, 22, 23) */}
          <div className={`flex gap-2`}>
            {permanentUpperGroup.slice(3).map((tooth) => (
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
      </div>
      
      {/* Fila 2: Dientes temporales superiores / Espacio mordida */}
      <div className={`${showBiteEffect || showTemporaryTeeth ? TEMPORARY_TOOTH_SLOT_HEIGHT : 'h-0 overflow-hidden'} transition-all duration-300 flex items-center justify-center px-2  ${developerMode && showTemporaryTeeth ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Temp Upper Row (Group 2)</span>
        )}
        {showTemporaryTeeth && !showBiteEffect && (
          <div className="flex items-center gap-1">
            {/* Lado derecho del grupo 2 temporal */}
            <div className={`flex gap-2`}>
              {temporaryUpperGroup.slice(0, 3).reverse().map((tooth) => (
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
                    isTemporary={true}
                    developerMode={developerMode}
                  />
                </AlignedToothContainer>
              ))}
            </div>
            {/* Separador entre incisivos centrales */}
            <div className="w-0.5 h-12 bg-orange-500/30 mx-2"></div>
            {/* Lado izquierdo del grupo 2 temporal */}
            <div className={`flex gap-2`}>
              {temporaryUpperGroup.slice(3).map((tooth) => (
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
                    isTemporary={true}
                    developerMode={developerMode}
                  />
                </AlignedToothContainer>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Fila 3: Dientes temporales inferiores / Espacio mordida */}
      <div className={`${showBiteEffect || showTemporaryTeeth ? TEMPORARY_TOOTH_SLOT_HEIGHT : 'h-0 overflow-hidden'} transition-all duration-300 flex items-center justify-center px-2  ${developerMode && showTemporaryTeeth ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Temp Lower Row (Group 5)</span>
        )}
        {showTemporaryTeeth && !showBiteEffect && (
          <div className="flex items-center gap-1">
            {/* Lado derecho del grupo 5 temporal */}
            <div className={`flex gap-2`}>
              {temporaryLowerGroup.slice(0, 3).reverse().map((tooth) => (
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
                    isTemporary={true}
                    developerMode={developerMode}
                  />
                </AlignedToothContainer>
              ))}
            </div>
            {/* Separador entre incisivos centrales */}
            <div className="w-0.5 h-12 bg-orange-500/30 mx-2"></div>
            {/* Lado izquierdo del grupo 5 temporal */}
            <div className={`flex gap-2`}>
              {temporaryLowerGroup.slice(3).map((tooth) => (
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
                    isTemporary={true}
                    developerMode={developerMode}
                  />
                </AlignedToothContainer>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Fila 4: Dientes permanentes inferiores */}
      <div className={`${TOOTH_SLOT_HEIGHT} flex items-center justify-center px-2 ${developerMode ? `border-2 border-purple-500 border-dashed relative` : ''}`}>
        {developerMode && (
          <span className="absolute -top-6 left-0 text-xs text-purple-600 font-mono bg-white px-1">Grupo 5 Row</span>
        )}
        <div className="flex items-center gap-1">
          {/* Lado derecho del grupo 5 (43, 42, 41) */}
          <div className={`flex gap-2`}>
            {permanentLowerGroup.slice(0, 3).reverse().map((tooth) => (
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
          {/* Separador entre incisivos centrales */}
          <div className="w-0.5 h-16 bg-accent/30 mx-2"></div>
          {/* Lado izquierdo del grupo 5 (31, 32, 33) */}
          <div className={`flex gap-2`}>
            {permanentLowerGroup.slice(3).map((tooth) => (
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
      </div>
      
      {/* Footer Grupo 5 */}
      <div className="h-[50px] flex flex-col items-center justify-start">
        <div className="w-full h-3 border-l-2 border-r-2 border-b-2 border-accent/50 rounded-b-lg"></div>
        <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mt-2">
          Grupo 5
        </div>
      </div>
    </div>
  );
};