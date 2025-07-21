import React, { useState } from 'react';
import { Save, Edit3, Plus } from 'lucide-react';

interface NotesSectionProps {
  notes: string;
  onNotesUpdate: (notes: string) => void;
}

const quickNotes = [
  'Sensibilidad al frío',
  'Dolor al masticar',
  'Movilidad grado 1',
  'Sangrado gingival',
  'Requiere radiografía',
  'Revisar en próxima cita',
  'Tratamiento en progreso',
  'Observar evolución'
];

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onNotesUpdate
}) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onNotesUpdate(localNotes);
    setIsEditing(false);
  };

  const handleAddQuickNote = (quickNote: string) => {
    const newNotes = localNotes 
      ? `${localNotes}\n${quickNote} - ${new Date().toLocaleDateString()}`
      : `${quickNote} - ${new Date().toLocaleDateString()}`;
    setLocalNotes(newNotes);
    setIsEditing(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-secondary">
          Notas y observaciones
        </h4>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-ghost btn-xs"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Editar
          </button>
        )}
      </div>

      {/* Editor de notas */}
      <div className="space-y-2">
        <textarea
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Agregar notas sobre este diente..."
          className={`
            w-full min-h-[120px] p-3 rounded-lg border-2 text-sm
            transition-all duration-200 resize-none
            ${isEditing 
              ? 'border-accent bg-white' 
              : 'border-border-color bg-surface-secondary cursor-not-allowed'
            }
          `}
          disabled={!isEditing}
        />
        
        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="btn btn-primary btn-sm flex-1"
            >
              <Save className="w-3 h-3 mr-1" />
              Guardar
            </button>
            <button
              onClick={() => {
                setLocalNotes(notes);
                setIsEditing(false);
              }}
              className="btn btn-ghost btn-sm"
            >
              Cancelar
            </button>
          </div>
        )}
        
        {isEditing && (
          <p className="text-xs text-text-secondary">
            Presiona Ctrl+Enter para guardar rápidamente
          </p>
        )}
      </div>

      {/* Notas rápidas */}
      <div>
        <p className="text-xs font-semibold text-text-secondary mb-2">
          Notas rápidas:
        </p>
        <div className="flex flex-wrap gap-1">
          {quickNotes.map((note) => (
            <button
              key={note}
              onClick={() => handleAddQuickNote(note)}
              className="btn btn-ghost btn-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Historial de notas */}
      {notes && !isEditing && (
        <div className="p-3 bg-surface-secondary rounded-lg">
          <p className="text-xs font-semibold text-text-secondary mb-2">
            Notas actuales:
          </p>
          <div className="text-sm text-text-primary whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      )}
    </div>
  );
};