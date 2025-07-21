import React, { useState, useEffect } from 'react';
import { Info, X, ChevronUp, ChevronDown } from 'lucide-react';
import { DetailedToothComponent } from '../lib/odontograma/components/DetailedToothComponent';
import { Tooth } from '../lib/odontograma/types';

interface ColorLegendProps {
  className?: string;
}

export const ColorLegend: React.FC<ColorLegendProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem('colorLegendExpanded');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('colorLegendExpanded', JSON.stringify(isExpanded));
  }, [isExpanded]);

  // Crear dientes de ejemplo para la leyenda
  const sampleTeeth: { tooth: Tooth; label: string }[] = [
    {
      tooth: { id: 1, clinicalId: '1.1', quadrant: 1, position: 1, status: 'healthy' },
      label: 'Sano'
    },
    {
      tooth: { id: 2, clinicalId: '1.2', quadrant: 1, position: 2, status: 'caries' },
      label: 'Caries'
    },
    {
      tooth: { id: 3, clinicalId: '1.3', quadrant: 1, position: 3, status: 'filled' },
      label: 'Obturado'
    },
    {
      tooth: { id: 4, clinicalId: '1.4', quadrant: 1, position: 4, status: 'crown' },
      label: 'Corona'
    },
    {
      tooth: { id: 5, clinicalId: '1.5', quadrant: 1, position: 5, status: 'extracted' },
      label: 'Extraído'
    },
    {
      tooth: { id: 6, clinicalId: '1.6', quadrant: 1, position: 6, status: 'root_canal' },
      label: 'Endodoncia'
    },
    {
      tooth: { id: 7, clinicalId: '1.7', quadrant: 1, position: 7, status: 'implant' },
      label: 'Implante'
    },
    {
      tooth: { id: 8, clinicalId: '1.8', quadrant: 1, position: 8, status: 'fracture' },
      label: 'Fractura'
    },
    {
      tooth: { id: 9, clinicalId: '2.1', quadrant: 2, position: 1, status: 'not_erupted' },
      label: 'No erupcionado'
    }
  ];

  return (
    <div className={`${className}`}>
      {/* Panel expandible fijo */}
      <div className={`transition-all duration-300 rounded-lg overflow-hidden ${
        isExpanded ? 'bg-gray-100 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700' : ''
      }`}>
        {/* Botón toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 transition-colors text-xs font-medium ${
            isExpanded 
              ? 'bg-gray-200 dark:bg-gray-700/30 hover:bg-gray-300 dark:hover:bg-gray-700/50' 
              : 'bg-base-200 hover:bg-base-300'
          } rounded-lg`}
          aria-label={isExpanded ? 'Ocultar leyenda' : 'Mostrar leyenda'}
        >
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            <span>Leyenda de estados dentales</span>
          </div>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Contenido expandible */}
        <div className={`transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4">
            {/* Grid de dientes reales */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {sampleTeeth.map(({ tooth, label }) => (
                <div key={tooth.id} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/20 transition-colors">
                  <div className="scale-[0.65] origin-center" style={{ width: '45px', height: '55px' }}>
                    <DetailedToothComponent
                      tooth={tooth}
                      isSelected={false}
                      onClick={() => {}}
                      showBiteEffect={false}
                      isTemporary={false}
                    />
                  </div>
                  <span className="text-[11px] text-center font-medium text-base-content/80">{label}</span>
                </div>
              ))}
            </div>

            {/* Nota informativa */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-base-content/60 text-center">
                Sistema FDI • Pasa el cursor sobre cualquier diente para ver información detallada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};