import React, { useState, useEffect } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  Tooth 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

/**
 * Ejemplo de odontograma con persistencia en localStorage
 * Los cambios se guardan automáticamente y se recuperan al recargar la página
 */
export function OdontogramWithPersistence() {
  const [teeth, setTeeth] = useState<Tooth[]>(() => {
    const saved = localStorage.getItem('odontogramData');
    return saved ? JSON.parse(saved) : initialPermanentTeeth;
  });
  
  const [temporaryTeeth, setTemporaryTeeth] = useState<Tooth[]>(() => {
    const saved = localStorage.getItem('odontogramTemporaryData');
    return saved ? JSON.parse(saved) : initialTemporaryTeeth;
  });

  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(null);
  const [showTemporary, setShowTemporary] = useState(() => {
    const saved = localStorage.getItem('showTemporaryTeeth');
    return saved ? JSON.parse(saved) : false;
  });
  const [showBite, setShowBite] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Guardar cambios automáticamente
  useEffect(() => {
    localStorage.setItem('odontogramData', JSON.stringify(teeth));
  }, [teeth]);

  useEffect(() => {
    localStorage.setItem('odontogramTemporaryData', JSON.stringify(temporaryTeeth));
  }, [temporaryTeeth]);

  useEffect(() => {
    localStorage.setItem('showTemporaryTeeth', JSON.stringify(showTemporary));
  }, [showTemporary]);

  const simulateBite = () => {
    setAnimating(true);
    setShowBite(false);
    setTimeout(() => setShowBite(true), 300);
    setTimeout(() => setShowBite(false), 1000);
    setTimeout(() => setAnimating(false), 1500);
  };

  const exportData = () => {
    const data = {
      date: new Date().toISOString(),
      permanentTeeth: teeth,
      temporaryTeeth: temporaryTeeth,
      showTemporaryTeeth: showTemporary
    };
    
    const blob = new Blob(
      [JSON.stringify(data, null, 2)], 
      { type: 'application/json' }
    );
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `odontogram-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.permanentTeeth) setTeeth(data.permanentTeeth);
        if (data.temporaryTeeth) setTemporaryTeeth(data.temporaryTeeth);
        if (data.showTemporaryTeeth !== undefined) setShowTemporary(data.showTemporaryTeeth);
        alert('Datos importados correctamente');
      } catch (error) {
        alert('Error al importar los datos');
      }
    };
    reader.readAsText(file);
  };

  const clearData = () => {
    if (confirm('¿Estás seguro de que deseas borrar todos los datos?')) {
      localStorage.removeItem('odontogramData');
      localStorage.removeItem('odontogramTemporaryData');
      localStorage.removeItem('showTemporaryTeeth');
      setTeeth(initialPermanentTeeth);
      setTemporaryTeeth(initialTemporaryTeeth);
      setShowTemporary(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Odontograma con Persistencia</h1>
      
      {/* Controles de datos */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={exportData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📥 Exportar Datos
        </button>
        
        <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          📤 Importar Datos
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
        
        <button
          onClick={clearData}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Borrar Datos
        </button>
      </div>

      <div className="mb-4 p-3 bg-yellow-100 rounded">
        <p className="text-sm">
          💾 Los cambios se guardan automáticamente en el navegador
        </p>
      </div>

      {/* Odontograma */}
      <div style={{ height: '600px' }}>
        <Odontogram
          teeth={teeth}
          temporaryTeeth={temporaryTeeth}
          showTemporaryTeeth={showTemporary}
          onToggleTemporaryTeeth={setShowTemporary}
          selectedTooth={selectedTooth}
          onToothClick={setSelectedTooth}
          showBiteEffect={showBite}
          onToggleBiteEffect={setShowBite}
          isAnimatingBite={animating}
          onSimulateBite={simulateBite}
        />
      </div>

      {/* Estadísticas */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold text-lg mb-2">Estadísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-semibold">Dientes sanos:</span>{' '}
            {teeth.filter(t => t.status === 'healthy').length}
          </div>
          <div>
            <span className="font-semibold">Con caries:</span>{' '}
            {teeth.filter(t => t.status === 'caries').length}
          </div>
          <div>
            <span className="font-semibold">Obturados:</span>{' '}
            {teeth.filter(t => t.status === 'filled').length}
          </div>
          <div>
            <span className="font-semibold">Extraídos:</span>{' '}
            {teeth.filter(t => t.status === 'extracted').length}
          </div>
        </div>
      </div>
    </div>
  );
}