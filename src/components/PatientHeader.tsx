import React, { useState } from 'react';
import { User, Calendar, Clock, Sun, Moon, Edit3, Check, X } from 'lucide-react';
import { Patient } from '../types/dental';

interface PatientHeaderProps {
  patient: Patient;
  onPatientChange: (patient: Patient) => void;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ patient, onPatientChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSave = () => {
    onPatientChange(editedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const generateNHC = () => {
    return `NHC-${Date.now().toString().slice(-6)}`;
  };

  return (
    <header className="h-15 bg-surface-primary border-b border-border-color px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Logo/Título */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h1 className="text-xl font-semibold text-text-primary">DentalPro</h1>
        </div>

        {/* Información del Paciente */}
        <div className="flex items-center gap-8">
          {isEditing ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  value={editedPatient.name}
                  onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                  className="bg-surface-secondary border border-border-color rounded px-2 py-1 text-sm"
                  placeholder="Nombre del paciente"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <input
                  type="number"
                  value={editedPatient.age}
                  onChange={(e) => setEditedPatient({ ...editedPatient, age: parseInt(e.target.value) || 0 })}
                  className="bg-surface-secondary border border-border-color rounded px-2 py-1 text-sm w-16"
                  placeholder="Edad"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-text-secondary" />
                <span className="font-medium">
                  {patient.name || 'Sin nombre'}
                </span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-text-secondary hover:text-text-primary"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>NHC: {generateNHC()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>Edad: {patient.age || 0} años</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Clock className="w-4 h-4" />
                <span>Última visita: {patient.lastVisit || 'No registrada'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controles de la derecha */}
      <div className="flex items-center gap-4">
        <div className="text-sm text-text-secondary">
          Actualizado: {new Date().toLocaleDateString()}
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
          aria-label="Cambiar tema"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-text-secondary" />
          ) : (
            <Sun className="w-5 h-5 text-text-secondary" />
          )}
        </button>
      </div>
    </header>
  );
};