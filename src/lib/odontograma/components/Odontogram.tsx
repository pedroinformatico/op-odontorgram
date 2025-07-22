import React from 'react';
import { Tooth } from '../types';
import { OdontogramColumn1, OdontogramColumn2, OdontogramColumn3 } from './columns';

export interface OdontogramProps {
  teeth: Tooth[];
  temporaryTeeth: Tooth[];
  showTemporaryTeeth: boolean;
  onToggleTemporaryTeeth: (show: boolean) => void;
  selectedTooth: Tooth | null;
  onToothClick: (tooth: Tooth) => void;
  showBiteEffect: boolean;
  onToggleBiteEffect: (show: boolean) => void;
  isAnimatingBite: boolean;
  onSimulateBite: () => void;
  selectedCaseId?: string;
  onCaseSelect?: (caseId: string) => void;
  developerMode?: boolean;
  onToggleDeveloperMode?: (enabled: boolean) => void;
  onToothHover?: (tooth: Tooth | null) => void;
}

export const Odontogram: React.FC<OdontogramProps> = ({ 
  teeth, 
  temporaryTeeth, 
  showTemporaryTeeth, 
  onToggleTemporaryTeeth,
  selectedTooth, 
  onToothClick,
  showBiteEffect,
  onToggleBiteEffect,
  isAnimatingBite,
  onSimulateBite,
  selectedCaseId,
  onCaseSelect,
  developerMode = false,
  onToggleDeveloperMode,
  onToothHover
}) => {
  const getQuadrantTeeth = (quadrant: number) => {
    return teeth.filter(tooth => tooth.quadrant === quadrant).sort((a, b) => a.position - b.position);
  };

  const getQuadrantTemporaryTeeth = (quadrant: number) => {
    return temporaryTeeth.filter(tooth => tooth.quadrant === quadrant).sort((a, b) => a.position - b.position);
  };

  const q1Teeth = getQuadrantTeeth(1); // Superior derecho
  const q2Teeth = getQuadrantTeeth(2); // Superior izquierdo
  const q3Teeth = getQuadrantTeeth(3); // Inferior izquierdo
  const q4Teeth = getQuadrantTeeth(4); // Inferior derecho

  const q1TempTeeth = getQuadrantTemporaryTeeth(1);
  const q2TempTeeth = getQuadrantTemporaryTeeth(2);
  const q3TempTeeth = getQuadrantTemporaryTeeth(3);
  const q4TempTeeth = getQuadrantTemporaryTeeth(4);

  // Dividir los dientes en 6 grupos según la imagen de referencia
  // Grupos superiores
  const grupo1 = q1Teeth.filter(t => t.position > 3); // 14, 15, 16, 17, 18 (5 dientes)
  const grupo2Superior = [...q1Teeth.filter(t => t.position <= 3), ...q2Teeth.filter(t => t.position <= 3)]; // 13, 12, 11, 21, 22, 23 (6 dientes)
  const grupo3 = q2Teeth.filter(t => t.position > 3); // 24, 25, 26, 27, 28 (5 dientes)

  // Grupos inferiores
  const grupo4 = q4Teeth.filter(t => t.position > 3); // 44, 45, 46, 47, 48 (5 dientes)
  const grupo5Inferior = [...q4Teeth.filter(t => t.position <= 3), ...q3Teeth.filter(t => t.position <= 3)]; // 43, 42, 41, 31, 32, 33 (6 dientes)
  const grupo6 = q3Teeth.filter(t => t.position > 3); // 34, 35, 36, 37, 38 (5 dientes)

  // Grupos temporales
  const grupo1Temp = q1TempTeeth.filter(t => t.position > 3); // 54, 55 (2 dientes)
  const grupo2Temp = [...q1TempTeeth.filter(t => t.position <= 3), ...q2TempTeeth.filter(t => t.position <= 3)]; // 53, 52, 51, 61, 62, 63 (6 dientes)
  const grupo3Temp = q2TempTeeth.filter(t => t.position > 3); // 64, 65 (2 dientes)

  const grupo4Temp = q4TempTeeth.filter(t => t.position > 3); // 84, 85 (2 dientes)
  const grupo5Temp = [...q4TempTeeth.filter(t => t.position <= 3), ...q3TempTeeth.filter(t => t.position <= 3)]; // 83, 82, 81, 71, 72, 73 (6 dientes)
  const grupo6Temp = q3TempTeeth.filter(t => t.position > 3); // 74, 75 (2 dientes)

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className=" text-center space-y-3">
        {/* Título principal con toggle */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl font-semibold text-text-primary">
            Odontograma {showTemporaryTeeth ? 'Mixto' : 'Adulto'}
          </h2>
          
          {/* Toggle compacto para dientes temporales */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">Dientes temporales</span>
            <button
              onClick={() => onToggleTemporaryTeeth(!showTemporaryTeeth)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                showTemporaryTeeth ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                showTemporaryTeeth ? 'translate-x-5' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            32 dientes permanentes
          </div>
          
          {showTemporaryTeeth && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-600 rounded-full text-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              20 dientes temporales
            </div>
          )}
          
          {/* Botón para modo desarrollador */}
          <button
            onClick={() => {
              if (onToggleDeveloperMode) {
                onToggleDeveloperMode(!developerMode);
              }
            }}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all ${
              developerMode 
                ? 'bg-purple-500/20 text-purple-600 border border-purple-500/50' 
                : 'bg-gray-100 text-gray-500 border border-gray-300 hover:bg-gray-200'
            }`}
            title="Modo desarrollador - Muestra la estructura del layout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium">Dev</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Contenedor principal */}
        <div className="relative">
          {/* Estructura de 3 columnas */}
          <div className="flex items-start gap-2 scale-75 sm:scale-90 lg:scale-100">
            {/* Columna 1 - Grupos 1 y 4 */}
            <OdontogramColumn1
              permanentUpperGroup={grupo1}
              permanentLowerGroup={grupo4}
              temporaryUpperGroup={grupo1Temp}
              temporaryLowerGroup={grupo4Temp}
              showTemporaryTeeth={showTemporaryTeeth}
              showBiteEffect={showBiteEffect}
              developerMode={developerMode}
              selectedTooth={selectedTooth}
              onToothClick={onToothClick}
              groupNumber={1}
              groupLabel="Grupo 1"
            />

            {/* Columna 2 - Grupos 2 y 5 */}
            <OdontogramColumn2
              permanentUpperGroup={grupo2Superior}
              permanentLowerGroup={grupo5Inferior}
              temporaryUpperGroup={grupo2Temp}
              temporaryLowerGroup={grupo5Temp}
              showTemporaryTeeth={showTemporaryTeeth}
              showBiteEffect={showBiteEffect}
              developerMode={developerMode}
              selectedTooth={selectedTooth}
              onToothClick={onToothClick}
              groupNumber={2}
              groupLabel="Grupo 2"
            />

            {/* Columna 3 - Grupos 3 y 6 */}
            <OdontogramColumn3
              permanentUpperGroup={grupo3}
              permanentLowerGroup={grupo6}
              temporaryUpperGroup={grupo3Temp}
              temporaryLowerGroup={grupo6Temp}
              showTemporaryTeeth={showTemporaryTeeth}
              showBiteEffect={showBiteEffect}
              developerMode={developerMode}
              selectedTooth={selectedTooth}
              onToothClick={onToothClick}
              groupNumber={3}
              groupLabel="Grupo 3"
            />
          </div>

          {/* Separador horizontal entre arcadas (posición absoluta) */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-8">
            <div className=" w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent shadow-sm">
              {showTemporaryTeeth && (
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-sm mt-0.5"></div>
              )}
            </div>
          </div>

        </div>
      </div>

     
    </div>
  );
};