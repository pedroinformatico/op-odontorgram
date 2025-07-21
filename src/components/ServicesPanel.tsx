import React, { useState } from 'react';
import { Search, Plus, Clock, User } from 'lucide-react';
import { Tooth } from '../types/dental';

interface ServicesPanelProps {
  selectedTooth: Tooth | null;
  onApplyService: (serviceCode: string, serviceName: string) => void;
}

interface Service {
  id: string;
  description: string;
  tooth: string;
  date: string;
  status: 'completed' | 'pending' | 'in-progress';
}

// Servicios aplicados de ejemplo
const appliedServices: Service[] = [
  {
    id: '1',
    description: 'Reparación diente 1.3',
    tooth: '13',
    date: '2025-01-14',
    status: 'completed'
  },
  {
    id: '2',
    description: 'Limpieza dental general',
    tooth: 'General',
    date: '2025-01-10',
    status: 'completed'
  },
  {
    id: '3',
    description: 'Obturación diente 2.6',
    tooth: '26',
    date: '2025-01-08',
    status: 'in-progress'
  }
];

export const ServicesPanel: React.FC<ServicesPanelProps> = ({ selectedTooth, onApplyService }) => {
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceDescription, setNewServiceDescription] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En progreso';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const handleAddService = () => {
    if (newServiceDescription.trim()) {
      // Aquí agregarías el servicio a la lista
      console.log('Agregando servicio:', newServiceDescription);
      setNewServiceDescription('');
      setIsAddingService(false);
    }
  };

  return (
    <div className="bg-surface-primary flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-border-color">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-text-primary text-base">Servicios del Paciente</h3>
          <button 
            onClick={() => setIsAddingService(!isAddingService)}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
            title="Agregar servicio"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Formulario para agregar servicio */}
      {isAddingService && (
        <div className="p-3 border-b border-border-color bg-surface-secondary">
          <textarea
            value={newServiceDescription}
            onChange={(e) => setNewServiceDescription(e.target.value)}
            placeholder="Descripción del servicio..."
            className="w-full p-2 bg-white border border-border-color rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddService}
              className="px-3 py-1 bg-accent text-white rounded text-xs hover:bg-accent-hover transition-colors"
            >
              Agregar
            </button>
            <button
              onClick={() => {
                setIsAddingService(false);
                setNewServiceDescription('');
              }}
              className="px-3 py-1 bg-surface-tertiary text-text-primary rounded text-xs hover:bg-surface-secondary transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Servicios */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {appliedServices.map((service) => (
            <div
              key={service.id}
              className="bg-surface-secondary rounded-lg p-2 hover:bg-surface-tertiary transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <h4 className="font-medium text-text-primary text-sm">
                    {service.description}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-secondary">
                      Diente: {service.tooth}
                    </span>
                    <span className="text-xs text-text-secondary">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-text-secondary" />
                      <span className="text-xs text-text-secondary">
                        {new Date(service.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
                
                {service.status === 'in-progress' && (
                  <button className="text-xs text-accent hover:text-accent-hover font-medium">
                    Continuar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};