# OP Odontogram

Una librería de React para crear odontogramas dentales interactivos. Permite visualizar y gestionar el estado de 32 dientes permanentes y 20 dientes temporales con una interfaz intuitiva y personalizable.

## 🦷 Características

- Visualización completa de dentadura adulta (32 dientes) y temporal (20 dientes)
- Estados predefinidos para cada diente (sano, caries, obturado, corona, etc.)
- Visualización de superficies dentales (oclusal, vestibular, lingual, mesial, distal)
- Sistema de numeración FDI internacional
- Totalmente personalizable con CSS
- TypeScript incluido
- Sin dependencias externas (solo React)

## 📦 Instalación

```bash
npm install op-odontogram
```

o

```bash
yarn add op-odontogram
```

## 🚀 Uso Básico

```jsx
import React, { useState } from 'react';
import { Odontogram, initialPermanentTeeth, initialTemporaryTeeth } from 'op-odontogram';
import 'op-odontogram/styles/odontogram.css';

function App() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [temporaryTeeth, setTemporaryTeeth] = useState(initialTemporaryTeeth);
  const [selectedTooth, setSelectedTooth] = useState(null);

  const handleToothClick = (tooth) => {
    setSelectedTooth(tooth);
    console.log('Diente seleccionado:', tooth);
  };

  return (
    <div style={{ height: '600px' }}>
      <Odontogram
        teeth={teeth}
        temporaryTeeth={temporaryTeeth}
        showTemporaryTeeth={true}
        selectedTooth={selectedTooth}
        onToothClick={handleToothClick}
      />
    </div>
  );
}
```

## 📋 Props del Componente

### Odontogram

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `teeth` | `Tooth[]` | requerido | Array de dientes permanentes |
| `temporaryTeeth` | `Tooth[]` | `[]` | Array de dientes temporales |
| `showTemporaryTeeth` | `boolean` | `false` | Mostrar/ocultar dientes temporales |
| `selectedTooth` | `Tooth \| null` | `null` | Diente actualmente seleccionado |
| `onToothClick` | `(tooth: Tooth) => void` | `() => {}` | Callback al hacer clic en un diente |
| `onToothUpdate` | `(tooth: Tooth) => void` | - | Callback para actualizar un diente |
| `className` | `string` | `''` | Clases CSS adicionales |

## 🦷 Estructura del Tipo Tooth

```typescript
interface Tooth {
  id: number;
  clinicalId?: string;              // Notación FDI: "1.8", "2.1", etc.
  quadrant: 1 | 2 | 3 | 4;
  position: number;
  status: ToothStatus;
  notes?: string;
  isTemporary?: boolean;
  verticalOffset?: number;
  
  // Propiedades clínicas opcionales
  surfaces?: {
    oclusal?: ToothStatus;
    vestibular?: ToothStatus;
    lingual?: ToothStatus;
    mesial?: ToothStatus;
    distal?: ToothStatus;
  };
}

type ToothStatus = 
  | 'healthy'
  | 'caries'
  | 'filled'
  | 'crown'
  | 'extracted'
  | 'implant'
  | 'root_canal'
  | 'fracture'
  | 'bridge'
  | 'extraction_indicated';
```

## 🎨 Personalización de Estilos

La librería incluye un archivo CSS con estilos predeterminados. Puedes sobrescribir estos estilos usando las siguientes clases:

```css
/* Contenedor principal */
.odontogram-container { }

/* Estados de los dientes */
.tooth-status-healthy { }
.tooth-status-caries { }
.tooth-status-filled { }
/* ... otros estados */

/* Diente seleccionado */
.tooth-selected { }

/* Dientes temporales */
.tooth-temporary { }

/* Superficies dentales */
.tooth-surface-oclusal { }
.tooth-surface-vestibular { }
/* ... otras superficies */
```

## 💡 Ejemplo Avanzado

```jsx
import React, { useState } from 'react';
import { 
  Odontogram, 
  initialPermanentTeeth,
  initialTemporaryTeeth,
  ToothStatus 
} from 'op-odontogram';

function DentalChart() {
  const [teeth, setTeeth] = useState(initialPermanentTeeth);
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [currentTool, setCurrentTool] = useState<ToothStatus>('healthy');

  const handleToothClick = (tooth) => {
    // Actualizar el estado del diente con la herramienta actual
    const updatedTeeth = teeth.map(t => 
      t.id === tooth.id 
        ? { ...t, status: currentTool }
        : t
    );
    setTeeth(updatedTeeth);
    setSelectedTooth(tooth);
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
      <div style={{ marginBottom: '20px' }}>
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
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Odontograma */}
      <div style={{ height: '600px' }}>
        <Odontogram
          teeth={teeth}
          selectedTooth={selectedTooth}
          onToothClick={handleToothClick}
        />
      </div>

      {/* Información del diente seleccionado */}
      {selectedTooth && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f3f4f6' }}>
          <h3>Diente {selectedTooth.clinicalId}</h3>
          <p>Estado: {selectedTooth.status}</p>
          <p>Cuadrante: {selectedTooth.quadrant}</p>
          <p>Posición: {selectedTooth.position}</p>
        </div>
      )}
    </div>
  );
}
```

## 🔧 Utilidades Incluidas

```javascript
import { createTooth, TOOTH_TYPES } from 'op-odontogram';

// Crear un nuevo diente
const newTooth = createTooth(11, 1, 1, {
  status: 'caries',
  notes: 'Caries oclusal'
});

// Obtener el nombre del tipo de diente
const toothName = TOOTH_TYPES.PERMANENT[1]; // "Incisivo central"
```

## 📝 Licencia

MIT © Pedro Hernández Letelier

## 🙏 Atribución

Si usas esta librería en tu proyecto, se agradece (pero no es obligatorio) incluir una referencia:

```
Odontograma creado con op-odontogram
https://github.com/tu-usuario/op-odontogram
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 🐛 Reportar Problemas

Si encuentras algún problema, por favor abre un issue en GitHub describiendo:
- El comportamiento esperado
- El comportamiento actual
- Pasos para reproducir el problema
- Tu entorno (versión de React, navegador, etc.)

## 📧 Contacto

Pedro Hernández Letelier - [@tu-twitter](https://twitter.com/tu-twitter)

Link del Proyecto: [https://github.com/tu-usuario/op-odontogram](https://github.com/tu-usuario/op-odontogram)