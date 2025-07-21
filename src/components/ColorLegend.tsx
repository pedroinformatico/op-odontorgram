import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';
import { DetailedToothComponent } from '../lib/odontograma/components/DetailedToothComponent';
import { Tooth } from '../lib/odontograma/types';

interface ColorLegendProps {
  className?: string;
  theme: 'light' | 'dark'; // <-- AHORA RECIBE DIRECTAMENTE EL TEMA
}

export const ColorLegend: React.FC<ColorLegendProps> = ({ className = '', theme }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Determinar si estamos en modo oscuro para los estilos condicionales
  const isDarkMode = theme === 'dark';

  const sampleTeeth: { tooth: Tooth; label: string; chipColorClass: string }[] = [
    {
      tooth: { id: 1, clinicalId: '1.1', quadrant: 1, position: 1, status: 'healthy', surfaces: { mesial: 'healthy', distal: 'healthy', buccal: 'healthy', lingual: 'healthy', occlusal: 'healthy' } },
      label: 'Sano',
      chipColorClass: 'bg-green-600'
    },
    {
      tooth: { id: 2, clinicalId: '1.2', quadrant: 1, position: 2, status: 'caries', surfaces: { mesial: 'healthy', distal: 'caries', buccal: 'healthy', lingual: 'healthy', occlusal: 'caries' } },
      label: 'Caries',
      chipColorClass: 'bg-red-600'
    },
    {
      tooth: { id: 3, clinicalId: '1.3', quadrant: 1, position: 3, status: 'filled', surfaces: { mesial: 'filled', distal: 'healthy', buccal: 'healthy', lingual: 'healthy', occlusal: 'filled' } },
      label: 'Obturado',
      chipColorClass: 'bg-yellow-600'
    },
    {
      tooth: { id: 4, clinicalId: '1.4', quadrant: 1, position: 4, status: 'crown', surfaces: { mesial: 'crown', distal: 'crown', buccal: 'crown', lingual: 'crown', occlusal: 'crown' } },
      label: 'Corona',
      chipColorClass: 'bg-purple-600'
    },
    {
      tooth: { id: 5, clinicalId: '1.5', quadrant: 1, position: 5, status: 'extracted', surfaces: { mesial: 'extracted', distal: 'extracted', buccal: 'extracted', lingual: 'extracted', occlusal: 'extracted' } },
      label: 'Extraído',
      chipColorClass: 'bg-gray-700'
    },
    {
      tooth: { id: 6, clinicalId: '1.6', quadrant: 1, position: 6, status: 'root_canal', surfaces: { mesial: 'root_canal', distal: 'root_canal', buccal: 'root_canal', lingual: 'root_canal', occlusal: 'root_canal' } },
      label: 'Endodoncia',
      chipColorClass: 'bg-indigo-600'
    },
    {
      tooth: { id: 7, clinicalId: '1.7', quadrant: 1, position: 7, status: 'implant', surfaces: { mesial: 'implant', distal: 'implant', buccal: 'implant', lingual: 'implant', occlusal: 'implant' } },
      label: 'Implante',
      chipColorClass: 'bg-blue-600'
    },
    {
      tooth: { id: 8, clinicalId: '1.8', quadrant: 1, position: 8, status: 'fracture', surfaces: { mesial: 'fracture', distal: 'fracture', buccal: 'fracture', lingual: 'fracture', occlusal: 'fracture' } },
      label: 'Fractura',
      chipColorClass: 'bg-orange-600'
    },
    {
      tooth: { id: 9, clinicalId: '2.1', quadrant: 2, position: 1, status: 'not_erupted', surfaces: { mesial: 'not_erupted', distal: 'not_erupted', buccal: 'not_erupted', lingual: 'not_erupted', occlusal: 'not_erupted' } },
      label: 'No erupcionado',
      chipColorClass: 'bg-teal-600'
    }
  ];

  return (
    // Contenedor Principal del Panel de Leyenda
    // Fondo: Blanco en modo claro, gris-900 en modo oscuro (o el color de tu fondo de app oscuro)
    // Sombra: Más pronunciada en ambos modos
    // Borde: Visible en ambos modos
    <div className={`${className} 
      ${isDarkMode ? 'bg-gray-900 shadow-xl border-gray-700' : 'bg-white shadow-lg border-gray-200'}
      rounded-lg border`}> 
      
      {/* Botón Toggle del Panel */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold 
          ${isDarkMode ? 'text-gray-200 hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-50'}
          transition-colors rounded-t-lg`}
        aria-label={isExpanded ? 'Ocultar leyenda' : 'Mostrar leyenda'}
      >
        <div className="flex items-center gap-2">
          <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} /> 
          <span>Leyenda de estados dentales</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Contenido Expandible */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 pt-0"> 
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {sampleTeeth.map(({ tooth, label, chipColorClass }) => (
              // Mini-card individual para cada diente de la leyenda
              // Fondo: Blanco en modo claro, gris-850 en modo oscuro
              // Borde: Adaptable
              <div
                key={tooth.id}
                className={`flex flex-col items-center justify-between 
                           ${isDarkMode ? 'bg-gray-800 border-gray-700 shadow-md' : 'bg-white border-gray-200 shadow-sm'}
                           rounded-lg border p-2`} 
              >
                <div className="flex-grow flex items-center justify-center py-1"> 
                  <div className="scale-[0.75] origin-center mb-3" style={{ width: '50px', height: '60px' }}> 
                    <DetailedToothComponent
                      tooth={tooth}
                      isSelected={false}
                      onToothClick={() => {}}
                      isUpper={true}
                      isTemporary={false} 
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
                {/* Chip de label con color definido por prop */}
                <div className={`w-full px-1 py-0.5 mt-2 rounded-md text-white text-center text-[10px] font-medium leading-none ${chipColorClass}`}> 
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Nota informativa */}
          <div className="mt-5 pt-4 border-t 
            ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
            <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Sistema FDI • Pasa el cursor sobre cualquier diente para ver información detallada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};