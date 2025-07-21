import React from 'react';
import { ToothStatus } from '../../../types/dental';

type ToothSurface = 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';

interface SurfacesSectionProps {
  surfaces?: Record<string, ToothStatus>;
  selectedTool: ToothStatus;
  onSurfaceUpdate: (surface: ToothSurface, status: ToothStatus) => void;
  onWholeToothUpdate: () => void;
}

export const SurfacesSection: React.FC<SurfacesSectionProps> = ({
  surfaces = {},
  selectedTool,
  onSurfaceUpdate,
  onWholeToothUpdate
}) => {
  const getSurfaceColor = (surface: ToothSurface) => {
    const status = surfaces[surface] || 'healthy';
    const colors: Record<string, string> = {
      healthy: '#10b981',
      caries: '#ef4444',
      filled: '#3b82f6',
      crown: '#f59e0b',
      root_canal: '#8b5cf6',
      implant: '#6366f1',
      extracted: '#6b7280',
      fracture: '#f97316',
      bridge: '#8b5cf6',
      extraction_indicated: '#dc2626'
    };
    return colors[status] || '#10b981';
  };

  const getSurfaceLabel = (surface: string) => {
    const labels: Record<string, string> = {
      vestibular: 'V',
      mesial: 'M',
      oclusal: 'O',
      distal: 'D',
      lingual: 'L'
    };
    return labels[surface] || surface[0].toUpperCase();
  };

  const handleSurfaceClick = (surface: ToothSurface) => {
    onSurfaceUpdate(surface, selectedTool);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Superficies del diente:
        </h4>
        <p className="text-xs text-text-secondary/70 mb-4">
          Haz clic en cada superficie para aplicar el estado seleccionado
        </p>
      </div>

      {/* SVG del diente ampliado */}
      <div className="flex justify-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200" className="border border-border-color rounded-lg bg-surface-secondary">
            {/* Superficie Vestibular (arriba) */}
            <rect
              x="60"
              y="20"
              width="80"
              height="30"
              rx="8"
              fill={getSurfaceColor('vestibular')}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => handleSurfaceClick('vestibular')}
            />
            <text x="100" y="40" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
              {getSurfaceLabel('vestibular')}
            </text>

            {/* Superficie Mesial (izquierda) */}
            <rect
              x="20"
              y="60"
              width="30"
              height="80"
              rx="8"
              fill={getSurfaceColor('mesial')}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => handleSurfaceClick('mesial')}
            />
            <text x="35" y="105" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
              {getSurfaceLabel('mesial')}
            </text>

            {/* Superficie Oclusal (centro) */}
            <rect
              x="60"
              y="60"
              width="80"
              height="80"
              rx="12"
              fill={getSurfaceColor('oclusal')}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => handleSurfaceClick('oclusal')}
            />
            <text x="100" y="105" textAnchor="middle" fontSize="16" fill="white" className="pointer-events-none font-semibold">
              {getSurfaceLabel('oclusal')}
            </text>

            {/* Superficie Distal (derecha) */}
            <rect
              x="150"
              y="60"
              width="30"
              height="80"
              rx="8"
              fill={getSurfaceColor('distal')}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => handleSurfaceClick('distal')}
            />
            <text x="165" y="105" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
              {getSurfaceLabel('distal')}
            </text>

            {/* Superficie Lingual (abajo) */}
            <rect
              x="60"
              y="150"
              width="80"
              height="30"
              rx="8"
              fill={getSurfaceColor('lingual')}
              stroke="#e5e7eb"
              strokeWidth="2"
              className="cursor-pointer hover:opacity-80 transition-all duration-200"
              onClick={() => handleSurfaceClick('lingual')}
            />
            <text x="100" y="170" textAnchor="middle" fontSize="12" fill="white" className="pointer-events-none">
              {getSurfaceLabel('lingual')}
            </text>
          </svg>
        </div>
      </div>

      {/* Botón para aplicar a todo el diente */}
      <button
        onClick={onWholeToothUpdate}
        className="btn btn-primary btn-block"
      >
        Aplicar estado a todo el diente
      </button>

      {/* Leyenda */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-text-secondary">Referencias:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success rounded" />
            <span>Sano</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-error rounded" />
            <span>Caries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-info rounded" />
            <span>Obturado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning rounded" />
            <span>Corona</span>
          </div>
        </div>
      </div>
    </div>
  );
};