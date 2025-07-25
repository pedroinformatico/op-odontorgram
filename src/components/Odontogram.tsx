import React from 'react';
import { Tooth } from '../types/dental';
import { DetailedToothComponent } from './DetailedToothComponent';

interface OdontogramProps {
  teeth: Tooth[];
  temporaryTeeth: Tooth[];
  showTemporaryTeeth: boolean;
  onToggleTemporaryTeeth: (show: boolean) => void;
  showDemoMode: boolean;
  onToggleDemoMode: (show: boolean) => void;
  selectedTooth: Tooth | null;
  onToothClick: (tooth: Tooth) => void;
  showBiteEffect: boolean;
  onToggleBiteEffect: (show: boolean) => void;
  isAnimatingBite: boolean;
  onSimulateBite: () => void;
}

export const Odontogram: React.FC<OdontogramProps> = ({ 
  teeth, 
  temporaryTeeth, 
  showTemporaryTeeth, 
  onToggleTemporaryTeeth,
  showDemoMode,
  onToggleDemoMode,
  selectedTooth, 
  onToothClick,
  showBiteEffect,
  onToggleBiteEffect,
  isAnimatingBite,
  onSimulateBite
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
      <div className="mb-6 text-center space-y-3">
        {/* Título principal con toggle */}
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-xl font-semibold text-text-primary">
            Odontograma {showTemporaryTeeth ? 'Mixto' : 'Adulto'}
          </h2>
          
          {/* Toggle compacto para dientes de leche */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">Dientes de leche</span>
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
          
          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">Modo Demo</span>
            <button
              onClick={() => onToggleDemoMode(!showDemoMode)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                showDemoMode ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                showDemoMode ? 'translate-x-5' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
          
          {/* Bite Effect Button */}
          <button
            onClick={() => onToggleBiteEffect(!showBiteEffect)}
            className={`btn btn-sm ${showBiteEffect ? 'btn-accent' : 'btn-outline btn-accent'}`}
          >
            {showBiteEffect ? '🦷 Cerrar' : '😮 Abrir'}
          </button>
          
          {/* Simulate Bite Animation Button */}
          <button
            onClick={onSimulateBite}
            disabled={isAnimatingBite}
            className={`btn btn-sm ${isAnimatingBite ? 'btn-disabled' : 'btn-outline btn-primary'}`}
          >
            {isAnimatingBite ? '🦷 Mordiendo...' : '🦷 Simular Mordida'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Contenedor principal */}
        <div className="relative">
          {/* Estructura de 3 columnas */}
          <div className="flex items-start gap-2 scale-75 sm:scale-90 lg:scale-100">
            {/* Columna 1 - Grupos 1 y 4 */}
            <div className="flex flex-col">
              {/* Header Grupo 1 */}
              <div className="h-[50px] flex flex-col items-center justify-end mb-6">
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mb-2">
                  Grupo 1
                </div>
                <div className="w-full h-3 border-l-2 border-r-2 border-t-2 border-accent/50 rounded-t-lg"></div>
              </div>
              
              {/* Fila 1: Dientes permanentes superiores */}
              <div className="h-[110px] flex items-center justify-end px-2 mb-2 pb-4">
                <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                  {[...grupo1].reverse().map((tooth) => (
                    <DetailedToothComponent
                      key={tooth.id}
                      tooth={tooth}
                      isSelected={selectedTooth?.id === tooth.id}
                      onToothClick={onToothClick}
                      isUpper={true}
                    />
                  ))}
                </div>
              </div>
              
              {/* Fila 2: Dientes temporales superiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-end px-2 ${showBiteEffect || showTemporaryTeeth ? 'mb-4 pb-3' : ''}`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {[...grupo1Temp].reverse().map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={true}
                        isTemporary={true}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fila 3: Dientes temporales inferiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-end px-2 ${showBiteEffect || showTemporaryTeeth ? 'pt-3' : 'mb-8'}`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {[...grupo4Temp].reverse().map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={false}
                        isTemporary={true}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fila 4: Dientes permanentes inferiores */}
              <div className="mt-8 h-[110px] flex items-center justify-end px-2">
                <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                  {[...grupo4].reverse().map((tooth) => (
                    <DetailedToothComponent
                      key={tooth.id}
                      tooth={tooth}
                      isSelected={selectedTooth?.id === tooth.id}
                      onToothClick={onToothClick}
                      isUpper={false}
                    />
                  ))}
                </div>
              </div>
              
              {/* Footer Grupo 4 */}
              <div className="h-[50px] flex flex-col items-center justify-start">
                <div className="w-full h-3 border-l-2 border-r-2 border-b-2 border-accent/50 rounded-b-lg mb-2"></div>
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30">
                  Grupo 4
                </div>
              </div>
            </div>

            {/* Columna 2 - Grupos 2 y 5 */}
            <div className="flex flex-col">
              {/* Header Grupo 2 */}
              <div className="h-[50px] flex flex-col items-center justify-end mb-6">
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mb-2">
                  Grupo 2
                </div>
                <div className="w-full h-3 border-l-2 border-r-2 border-t-2 border-accent/50 rounded-t-lg"></div>
              </div>
              
              {/* Fila 1: Dientes permanentes superiores */}
              <div className="h-[110px] flex items-center justify-center px-2 mb-2 pb-4">
                <div className="flex items-center gap-1">
                  {/* Lado derecho del grupo 2 (13, 12, 11) */}
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo2Superior.slice(0, 3).reverse().map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={true}
                      />
                    ))}
                  </div>
                  {/* Separador entre incisivos centrales */}
                  <div className="w-0.5 h-16 bg-accent/30 mx-6"></div>
                  {/* Lado izquierdo del grupo 2 (21, 22, 23) */}
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo2Superior.slice(3).map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={true}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Fila 2: Dientes temporales superiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-center px-2 ${showBiteEffect || showTemporaryTeeth ? 'mb-4 pb-3' : ''}`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex items-center gap-1">
                    {/* Lado derecho del grupo 2 temporal */}
                    <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                      {grupo2Temp.slice(0, 3).reverse().map((tooth) => (
                        <DetailedToothComponent
                          key={tooth.id}
                          tooth={tooth}
                          isSelected={selectedTooth?.id === tooth.id}
                          onToothClick={onToothClick}
                          isUpper={true}
                          isTemporary={true}
                        />
                      ))}
                    </div>
                    {/* Separador entre incisivos centrales */}
                    <div className="w-0.5 h-12 bg-orange-500/30 mx-6"></div>
                    {/* Lado izquierdo del grupo 2 temporal */}
                    <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                      {grupo2Temp.slice(3).map((tooth) => (
                        <DetailedToothComponent
                          key={tooth.id}
                          tooth={tooth}
                          isSelected={selectedTooth?.id === tooth.id}
                          onToothClick={onToothClick}
                          isUpper={true}
                          isTemporary={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fila 3: Dientes temporales inferiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-center px-2 ${showBiteEffect || showTemporaryTeeth ? 'pt-3' : 'mb-8'}`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex items-center gap-1">
                    {/* Lado derecho del grupo 5 temporal */}
                    <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                      {grupo5Temp.slice(0, 3).reverse().map((tooth) => (
                        <DetailedToothComponent
                          key={tooth.id}
                          tooth={tooth}
                          isSelected={selectedTooth?.id === tooth.id}
                          onToothClick={onToothClick}
                          isUpper={false}
                          isTemporary={true}
                        />
                      ))}
                    </div>
                    {/* Separador entre incisivos centrales */}
                    <div className="w-0.5 h-12 bg-orange-500/30 mx-6"></div>
                    {/* Lado izquierdo del grupo 5 temporal */}
                    <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                      {grupo5Temp.slice(3).map((tooth) => (
                        <DetailedToothComponent
                          key={tooth.id}
                          tooth={tooth}
                          isSelected={selectedTooth?.id === tooth.id}
                          onToothClick={onToothClick}
                          isUpper={false}
                          isTemporary={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Fila 4: Dientes permanentes inferiores */}
              <div className="mt-8 h-[110px] flex items-center justify-center px-2">
                <div className="flex items-center gap-1">
                  {/* Lado derecho del grupo 5 (43, 42, 41) */}
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo5Inferior.slice(0, 3).reverse().map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={false}
                      />
                    ))}
                  </div>
                  {/* Separador entre incisivos centrales */}
                  <div className="w-0.5 h-16 bg-accent/30 mx-6"></div>
                  {/* Lado izquierdo del grupo 5 (31, 32, 33) */}
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo5Inferior.slice(3).map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Footer Grupo 5 */}
              <div className="h-[50px] flex flex-col items-center justify-start">
                <div className="w-full h-3 border-l-2 border-r-2 border-b-2 border-accent/50 rounded-b-lg mb-2"></div>
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30">
                  Grupo 5
                </div>
              </div>
            </div>

            {/* Columna 3 - Grupos 3 y 6 */}
            <div className="flex flex-col">
              {/* Header Grupo 3 */}
              <div className="h-[50px] flex flex-col items-center justify-end mb-6  ">
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30 mb-2">
                  Grupo 3
                </div>
                <div className="w-full h-3 border-l-2 border-r-2 border-t-2 border-accent/50 rounded-t-lg"></div>
              </div>
              
              {/* Fila 1: Dientes permanentes superiores */}
              <div className="h-[110px] flex items-center justify-start px-2 mb-2 pb-4">
                <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                  {grupo3.map((tooth) => (
                    <DetailedToothComponent
                      key={tooth.id}
                      tooth={tooth}
                      isSelected={selectedTooth?.id === tooth.id}
                      onToothClick={onToothClick}
                      isUpper={true}
                    />
                  ))}
                </div>
              </div>
              
              {/* Fila 2: Dientes temporales superiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-start px-2 ${showBiteEffect || showTemporaryTeeth ? 'mb-4 pb-3' : ''}`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo3Temp.map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={true}
                        isTemporary={true}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fila 3: Dientes temporales inferiores / Espacio mordida */}
              <div className={`${showBiteEffect || showTemporaryTeeth ? 'h-[90px]' : 'h-0'} transition-all duration-300 flex items-center justify-start px-2 ${showBiteEffect || showTemporaryTeeth ? 'pt-3' : 'mb-8'} mt8`}>
                {showTemporaryTeeth && !showBiteEffect && (
                  <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                    {grupo6Temp.map((tooth) => (
                      <DetailedToothComponent
                        key={tooth.id}
                        tooth={tooth}
                        isSelected={selectedTooth?.id === tooth.id}
                        onToothClick={onToothClick}
                        isUpper={false}
                        isTemporary={true}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Fila 4: Dientes permanentes inferiores */}
              <div className="mt-8 h-[110px] flex items-center justify-start px-2">
                <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
                  {grupo6.map((tooth) => (
                    <DetailedToothComponent
                      key={tooth.id}
                      tooth={tooth}
                      isSelected={selectedTooth?.id === tooth.id}
                      onToothClick={onToothClick}
                      isUpper={false}
                    />
                  ))}
                </div>
              </div>
              
              {/* Footer Grupo 6 */}
              <div className="h-[50px] flex flex-col items-center justify-start">
                <div className="w-full h-3 border-l-2 border-r-2 border-b-2 border-accent/50 rounded-b-lg mb-2"></div>
                <div className="px-3 py-1 bg-accent/10 text-accent rounded text-sm font-medium border border-accent/30">
                  Grupo 6
                </div>
              </div>
            </div>
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