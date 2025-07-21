# OP Odontogram - API Reference

Esta es la referencia completa de la API de op-odontogram, una librería React para crear odontogramas dentales interactivos.

## 📦 Instalación

```bash
npm install op-odontogram
```

## 🧩 Componentes

### Odontogram

Componente principal que renderiza el odontograma completo con soporte para dientes permanentes y temporales.

```typescript
import { Odontogram } from 'op-odontogram';
```

#### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `teeth` | `Tooth[]` | ✅ | Array de dientes permanentes |
| `temporaryTeeth` | `Tooth[]` | ✅ | Array de dientes temporales |
| `showTemporaryTeeth` | `boolean` | ✅ | Mostrar/ocultar dientes temporales |
| `onToggleTemporaryTeeth` | `(show: boolean) => void` | ✅ | Callback para toggle de dientes temporales |
| `selectedTooth` | `Tooth \| null` | ✅ | Diente actualmente seleccionado |
| `onToothClick` | `(tooth: Tooth) => void` | ✅ | Callback al hacer clic en un diente |
| `showBiteEffect` | `boolean` | ✅ | Mostrar efecto de mordida |
| `onToggleBiteEffect` | `(show: boolean) => void` | ✅ | Toggle efecto de mordida |
| `isAnimatingBite` | `boolean` | ✅ | Estado de animación de mordida |
| `onSimulateBite` | `() => void` | ✅ | Simular animación de mordida |
| `selectedCaseId` | `string` | ❌ | ID del caso clínico seleccionado |
| `onCaseSelect` | `(caseId: string) => void` | ❌ | Callback para selección de caso |

#### Ejemplo de uso

```tsx
<Odontogram
  teeth={teeth}
  temporaryTeeth={temporaryTeeth}
  showTemporaryTeeth={showTemporary}
  onToggleTemporaryTeeth={setShowTemporary}
  selectedTooth={selected}
  onToothClick={handleToothClick}
  showBiteEffect={biteEffect}
  onToggleBiteEffect={setBiteEffect}
  isAnimatingBite={animating}
  onSimulateBite={simulateBite}
  selectedCaseId="basic"
  onCaseSelect={handleCaseSelect}
/>
```

### DetailedToothComponent

Componente que renderiza un diente individual con toda su información visual y superficies.

```typescript
import { DetailedToothComponent } from 'op-odontogram';
```

#### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `tooth` | `Tooth` | ✅ | Datos del diente a renderizar |
| `isSelected` | `boolean` | ✅ | Si el diente está seleccionado |
| `onToothClick` | `(tooth: Tooth) => void` | ✅ | Callback al hacer clic |
| `isUpper` | `boolean` | ✅ | Si es un diente superior |
| `isTemporary` | `boolean` | ❌ | Si es un diente temporal |
| `showBiteEffect` | `boolean` | ❌ | Mostrar efecto de mordida |

## 📊 Tipos

### Tooth

Interface principal que define la estructura de datos de un diente.

```typescript
interface Tooth {
  // Identificación
  id: number;                // ID único (ej: 11 para diente 1.1)
  clinicalId?: string;       // Notación FDI: "1.8", "2.1", etc.
  
  // Ubicación
  quadrant: 1 | 2 | 3 | 4;  // Cuadrante dental
  position: number;          // Posición en el cuadrante (1-8)
  
  // Estado clínico
  status: ToothStatus;       // Estado actual del diente
  notes?: string;            // Notas clínicas
  isTemporary?: boolean;     // Si es diente temporal
  
  // Propiedades anatómicas
  toothType?: 'incisor' | 'canine' | 'premolar' | 'molar';
  rootCount?: 1 | 2 | 3;
  rootType?: 'single' | 'bifurcated' | 'trifurcated';
  
  // Propiedades periodontales
  mobilityGrade?: 0 | 1 | 2 | 3;    // Grado de movilidad
  furcationGrade?: 0 | 1 | 2 | 3;   // Afectación de furca
  gingivalRecession?: number;        // Recesión en mm
  pocketDepth?: number;              // Profundidad de bolsa en mm
  
  // Superficies dentales
  surfaces?: {
    oclusal?: ToothStatus;    // Superficie masticatoria
    vestibular?: ToothStatus; // Hacia labio/mejilla
    lingual?: ToothStatus;    // Hacia lengua
    mesial?: ToothStatus;     // Hacia línea media
    distal?: ToothStatus;     // Alejada de línea media
  };
  
  // Metadatos
  lastUpdate?: string;             // Fecha última actualización
  procedures?: ToothProcedure[];   // Historial de procedimientos
}
```

### ToothStatus

Enum que define los posibles estados de un diente o superficie.

```typescript
type ToothStatus = 
  | 'healthy'              // Sano
  | 'caries'              // Caries activa
  | 'filled'              // Obturado
  | 'crown'               // Corona protésica
  | 'extracted'           // Extraído
  | 'implant'             // Implante dental
  | 'root_canal'          // Endodoncia
  | 'fracture'            // Fracturado
  | 'bridge'              // Puente
  | 'extraction_indicated' // Indicado para extracción
  | 'not_erupted';        // No erupcionado
```

### ToothProcedure

Interface para el historial de procedimientos dentales.

```typescript
interface ToothProcedure {
  date: string;           // Fecha del procedimiento
  type: string;           // Tipo de procedimiento
  description?: string;   // Descripción adicional
  dentist?: string;       // Odontólogo que realizó el procedimiento
}
```

### ToothSurface

Tipo para las superficies dentales.

```typescript
type ToothSurface = 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';
```

### ToothRenderProps

Props internas para renderizado de componentes.

```typescript
interface ToothRenderProps {
  tooth: Tooth;
  isSelected: boolean;
  onClick: () => void;
  showBiteEffect?: boolean;
  isTemporary?: boolean;
  isUpper?: boolean;
}
```

### OdontogramProps

Props del componente Odontogram (ver sección de componentes).

## 🎨 Constantes

### TOOTH_TYPES

Nombres de los tipos de dientes en español.

```typescript
const TOOTH_TYPES = {
  PERMANENT: {
    1: 'Incisivo central',
    2: 'Incisivo lateral',
    3: 'Canino',
    4: 'Primer premolar',
    5: 'Segundo premolar',
    6: 'Primer molar',
    7: 'Segundo molar',
    8: 'Tercer molar'
  },
  TEMPORARY: {
    1: 'Incisivo central',
    2: 'Incisivo lateral',
    3: 'Canino',
    4: 'Primer molar',
    5: 'Segundo molar'
  }
};
```

### TOOTH_GROUPS

Agrupación de dientes por categoría.

```typescript
const TOOTH_GROUPS = {
  UPPER_RIGHT: [11, 12, 13, 14, 15, 16, 17, 18],
  UPPER_LEFT: [21, 22, 23, 24, 25, 26, 27, 28],
  LOWER_LEFT: [31, 32, 33, 34, 35, 36, 37, 38],
  LOWER_RIGHT: [41, 42, 43, 44, 45, 46, 47, 48]
};
```

## 🔧 Funciones Utilitarias

### createTooth

Crea un nuevo diente con valores por defecto.

```typescript
function createTooth(
  id: number,
  quadrant: 1 | 2 | 3 | 4,
  position: number,
  overrides?: Partial<Tooth>
): Tooth
```

#### Parámetros

- `id`: ID único del diente
- `quadrant`: Cuadrante (1-4)
- `position`: Posición en el cuadrante (1-8)
- `overrides`: Propiedades adicionales opcionales

#### Ejemplo

```typescript
const newTooth = createTooth(11, 1, 1, {
  status: 'caries',
  notes: 'Caries oclusal profunda',
  surfaces: {
    oclusal: 'caries'
  }
});
```

### getToothVerticalOffset

Obtiene el offset vertical de un diente para su posicionamiento.

```typescript
function getToothVerticalOffset(toothId: number): number
```

#### Ejemplo

```typescript
const offset = getToothVerticalOffset(11); // retorna 20
```

## 📁 Datos Iniciales

### initialPermanentTeeth

Array con los 32 dientes permanentes inicializados.

```typescript
import { initialPermanentTeeth } from 'op-odontogram';

// Array de 32 objetos Tooth
console.log(initialPermanentTeeth.length); // 32
```

### initialTemporaryTeeth

Array con los 20 dientes temporales inicializados.

```typescript
import { initialTemporaryTeeth } from 'op-odontogram';

// Array de 20 objetos Tooth
console.log(initialTemporaryTeeth.length); // 20
```

## 🏥 Casos Clínicos

### clinicalCases

Array con casos clínicos predefinidos (próximamente exportado).

```typescript
interface ClinicalCase {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'periodontal' | 'orthodontic' | 'pediatric' | 'complex';
  permanentTeeth: Tooth[];
  temporaryTeeth: Tooth[];
}
```

### getClinicalCaseById

Obtiene un caso clínico por su ID.

```typescript
function getClinicalCaseById(id: string): ClinicalCase | undefined
```

### getClinicalCasesByCategory

Obtiene casos clínicos por categoría.

```typescript
function getClinicalCasesByCategory(
  category: string
): ClinicalCase[]
```

## 🎨 Configuración de Layout

### toothLayoutConfig

Configuración de posicionamiento vertical para cada diente.

```typescript
import { toothLayoutConfig } from 'op-odontogram';

// Objeto con offsets verticales
console.log(toothLayoutConfig[11]); // { verticalOffset: 20 }
```

## 🎯 Ejemplos Completos

### Odontograma Básico

```tsx
import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth 
} from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

function BasicOdontogram() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [showTemporary, setShowTemporary] = useState(false);
  const [showBite, setShowBite] = useState(false);
  const [animating, setAnimating] = useState(false);

  const simulateBite = () => {
    setAnimating(true);
    setShowBite(false);
    setTimeout(() => setShowBite(true), 300);
    setTimeout(() => setShowBite(false), 1000);
    setTimeout(() => setAnimating(false), 1500);
  };

  return (
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
  );
}
```

### Odontograma con Editor de Estados

```tsx
import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  ToothStatus 
} from 'op-odontogram';

function OdontogramEditor() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [currentTool, setCurrentTool] = useState<ToothStatus>('healthy');

  const handleToothClick = (tooth) => {
    const updatedTeeth = teeth.map(t => 
      t.id === tooth.id 
        ? { ...t, status: currentTool }
        : t
    );
    setTeeth(updatedTeeth);
  };

  const tools = [
    { status: 'healthy', label: 'Sano', color: '#10b981' },
    { status: 'caries', label: 'Caries', color: '#ef4444' },
    { status: 'filled', label: 'Obturado', color: '#3b82f6' },
    { status: 'crown', label: 'Corona', color: '#f59e0b' },
    { status: 'extracted', label: 'Extraído', color: '#6b7280' },
  ];

  return (
    <div>
      {/* Barra de herramientas */}
      <div className="mb-4">
        {tools.map(tool => (
          <button
            key={tool.status}
            onClick={() => setCurrentTool(tool.status)}
            style={{
              backgroundColor: tool.status === currentTool ? tool.color : '#e5e7eb',
              color: tool.status === currentTool ? 'white' : 'black',
              padding: '8px 16px',
              margin: '0 4px',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Odontograma */}
      <Odontogram
        teeth={teeth}
        onToothClick={handleToothClick}
        // ... otras props requeridas
      />
    </div>
  );
}
```

### Integración con Casos Clínicos

```tsx
import React, { useState } from 'react';
import { 
  Odontogram,
  getClinicalCaseById 
} from 'op-odontogram';

function ClinicalOdontogram() {
  const [selectedCase, setSelectedCase] = useState('empty');
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState(initialTemporaryTeeth);

  const handleCaseSelect = (caseId) => {
    const clinicalCase = getClinicalCaseById(caseId);
    if (clinicalCase) {
      setTeeth(clinicalCase.permanentTeeth);
      setTemporaryTeeth(clinicalCase.temporaryTeeth);
      setSelectedCase(caseId);
    }
  };

  return (
    <Odontogram
      teeth={teeth}
      temporaryTeeth={temporaryTeeth}
      selectedCaseId={selectedCase}
      onCaseSelect={handleCaseSelect}
      // ... otras props
    />
  );
}
```

## 🚀 Mejores Prácticas

### 1. Persistencia de Datos

```typescript
// Guardar en localStorage
useEffect(() => {
  localStorage.setItem('odontogramData', JSON.stringify(teeth));
}, [teeth]);

// Cargar de localStorage
const [teeth, setTeeth] = useState(() => {
  const saved = localStorage.getItem('odontogramData');
  return saved ? JSON.parse(saved) : initialPermanentTeeth;
});
```

### 2. Validación de Datos

```typescript
function validateTooth(tooth: any): tooth is Tooth {
  return (
    typeof tooth.id === 'number' &&
    [1, 2, 3, 4].includes(tooth.quadrant) &&
    tooth.position >= 1 && tooth.position <= 8 &&
    ['healthy', 'caries', /* ... */].includes(tooth.status)
  );
}
```

### 3. Actualización de Estados

```typescript
// Actualizar un diente específico
const updateTooth = (toothId: number, updates: Partial<Tooth>) => {
  setTeeth(teeth.map(tooth => 
    tooth.id === toothId 
      ? { ...tooth, ...updates }
      : tooth
  ));
};

// Actualizar superficie específica
const updateToothSurface = (
  toothId: number, 
  surface: ToothSurface, 
  status: ToothStatus
) => {
  setTeeth(teeth.map(tooth => 
    tooth.id === toothId 
      ? {
          ...tooth,
          surfaces: {
            ...tooth.surfaces,
            [surface]: status
          }
        }
      : tooth
  ));
};
```

### 4. Exportación de Datos

```typescript
// Exportar a JSON
const exportData = () => {
  const data = {
    date: new Date().toISOString(),
    permanentTeeth: teeth,
    temporaryTeeth: temporaryTeeth
  };
  
  const blob = new Blob(
    [JSON.stringify(data, null, 2)], 
    { type: 'application/json' }
  );
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `odontogram-${Date.now()}.json`;
  a.click();
};
```

## 📝 Notas de Migración

Si estás actualizando desde una versión anterior:

1. **verticalOffset removido**: Ahora usa `getToothVerticalOffset(toothId)`
2. **not_erupted agregado**: Nuevo estado para dientes no erupcionados
3. **Props requeridas**: Verifica que pasas todas las props requeridas a Odontogram
4. **Casos clínicos**: Ahora requieren funciones de utilidad para acceso

## 🔗 Enlaces

- [Documentación de Uso](README-LIBRARY.md)
- [GitHub Repository](https://github.com/pedroinformatico/op-odontorgram)
- [npm Package](https://www.npmjs.com/package/op-odontogram)
- [Ejemplos en Vivo](https://github.com/pedroinformatico/op-odontorgram/tree/main/examples)