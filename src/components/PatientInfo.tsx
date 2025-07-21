import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { Patient } from '../types/dental';

interface PatientInfoProps {
  patient: Patient;
  onPatientChange: (patient: Patient) => void;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient, onPatientChange }) => {
  const handleInputChange = (field: keyof Patient, value: string | number) => {
    onPatientChange({ ...patient, [field]: value });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-6 h-6 text-primary" />
          <h2 className="card-title text-primary">Información del Paciente</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nombre</span>
            </label>
            <input
              type="text"
              placeholder="Nombre del paciente"
              className="input input-bordered input-primary"
              value={patient.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Edad</span>
            </label>
            <input
              type="number"
              placeholder="Edad"
              className="input input-bordered input-primary"
              value={patient.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Última Visita</span>
            </label>
            <input
              type="date"
              className="input input-bordered input-primary"
              value={patient.lastVisit}
              onChange={(e) => handleInputChange('lastVisit', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 text-sm text-base-content/70">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Última visita: {patient.lastVisit || 'No registrada'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Actualizado: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};