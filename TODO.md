# TODO - OP Odontogram

Este documento contiene todas las mejoras, sugerencias y características pendientes para la librería OP Odontogram.

## 🦷 Sistema de Numeración Dental

### Problema Actual
- La librería solo utiliza el sistema FDI (Federación Dental Internacional) con formato `cuadrante.posición` (ej: 1.8, 2.1)
- No hay indicación clara de qué sistema se está usando
- Puede causar confusión para dentistas acostumbrados a otros sistemas

### Mejoras Propuestas

#### 1. Soporte Multi-Sistema
Implementar soporte para los tres sistemas principales:

**Sistema FDI (actual):**
- Formato: `cuadrante.posición`
- Cuadrantes permanentes: 1-4
- Cuadrantes temporales: 5-8
- Ejemplo: 1.8 = tercer molar superior derecho

**Sistema Universal (USA):**
- Dientes permanentes: números 1-32
- Dientes temporales: letras A-T
- Ejemplo: 1 = tercer molar superior derecho

**Sistema Palmer (UK):**
- Números 1-8 con símbolos de cuadrante
- Usa símbolos ┘└┐┌ para indicar cuadrantes
- Ejemplo: 8┐ = tercer molar superior derecho

#### 2. Implementación Técnica
- [ ] Crear utilidades de conversión entre sistemas
- [ ] Actualizar interfaz `Tooth` para soportar múltiples notaciones
- [ ] Añadir campo `preferredNotation` configurable
- [ ] Crear funciones de conversión:
  - `fdiToUniversal()`
  - `fdiToPalmer()`
  - `universalToFdi()`
  - `palmerToFdi()`

#### 3. Interfaz de Usuario
- [ ] Añadir selector de sistema de numeración preferido
- [ ] Mostrar etiqueta "Sistema FDI" (o el sistema activo)
- [ ] Tooltip con equivalencias en otros sistemas al hover
- [ ] Opción para mostrar múltiples sistemas simultáneamente

#### 4. Documentación
- [ ] Tabla de equivalencias entre sistemas
- [ ] Guía de uso para cada sistema
- [ ] Ejemplos de conversión

## 🎨 Leyenda de Símbolos y Colores

### Problema Actual
- No existe una leyenda visible que explique los símbolos y colores usados
- Los usuarios deben hacer hover para entender qué significa cada símbolo ("U", "II", "X", etc.)
- No hay una guía visual general para interpretar el odontograma de un vistazo

### Mejoras Propuestas

#### Implementación de Panel de Leyenda
- [ ] Crear botón "Info" o ícono de información junto al odontograma
- [ ] Al hacer clic, expandir panel debajo del odontograma con animación suave
- [ ] Panel debe contener:
  - Esquema de colores (verde = sano, amarillo = caries, etc.)
  - Símbolos y sus significados ("U", "II", "X", etc.)
  - Diseño elegante y minimalista
- [ ] Botón de cerrar (X) o clic fuera para colapsar el panel
- [ ] Estado persistente (recordar si estaba abierto/cerrado)
- [ ] Diseño responsive para móviles

#### Contenido de la Leyenda
- [ ] **Colores básicos:**
  - Verde: Diente sano
  - Amarillo: Caries
  - Azul: Obturado/Empastado
  - Naranja: Corona
  - Gris: Extraído
  - Rojo: Fractura
- [ ] **Símbolos especiales:**
  - "U": [Definir significado]
  - "II": [Definir significado] 
  - "X": Extraído/Missing
  - [Otros símbolos a documentar]

## 🏥 Condiciones Clínicas Adicionales

### Problema Actual
- La interfaz cubre condiciones básicas pero faltan muchas patologías comunes
- No hay representación visual para todas las condiciones disponibles
- Falta soporte para registros periodontales y otras especialidades

### Mejoras Propuestas

#### 1. Condiciones Periodontales
- [ ] Movilidad dental (grados I, II, III)
- [ ] Recesiones gingivales
- [ ] Bolsas periodontales con mediciones
- [ ] Furca (afectación de furcación)
- [ ] Sangrado al sondaje

#### 2. Patologías Adicionales
- [ ] Lesiones periapicales
- [ ] Quistes y tumores
- [ ] Patologías de tejidos blandos
- [ ] Lesiones endodónticas

#### 3. Registros de Ortodoncia
- [ ] Brackets y bandas
- [ ] Aparatos removibles
- [ ] Retenedores
- [ ] Plan de tratamiento ortodóntico

#### 4. Representaciones Visuales Faltantes
- [ ] Corona (representación visual distintiva)
- [ ] Fractura (líneas de fractura visibles)
- [ ] Endodoncia (representación del conducto)
- [ ] Implantes (diferenciación visual clara)
- [ ] Puentes y prótesis

## 🎯 Selector de Demos / Casos Clínicos

### Mejoras Propuestas

- [ ] Crear selector dropdown con las siguientes opciones:
  - **"Por defecto"**: Odontograma vacío/limpio
  - **"Demo 1 - Caso básico adulto"**: Algunas caries y obturaciones simples
  - **"Demo 2 - Caso periodontal"**: Incluye movilidad, recesiones, bolsas
  - **"Demo 3 - Caso complejo"**: Coronas, implantes, endodoncias, fracturas
  - **"Demo 4 - Caso ortodóntico"**: Brackets, bandas, aparatos
  - **"Demo 5 - Caso pediátrico (6-8 años)"**: 
    - Dentición mixta con dientes temporales y permanentes
    - Caries de biberón en anteriores
    - Sellantes en primeros molares permanentes
    - Dientes en erupción
    - Espacios de desarrollo normal
  - **"Demo 6 - Caso infantil (3-5 años)"**:
    - Solo dientes temporales (20 dientes)
    - Caries temprana de la infancia
    - Coronas de acero en molares
    - Pulpotomías
    - Mantenedores de espacio

- [ ] Cada demo debe mostrar:
  - Variedad de condiciones para demostrar capacidades
  - Representaciones visuales de todos los estados disponibles
  - Notas clínicas de ejemplo
  - Diferentes colores y símbolos en uso

- [ ] Beneficios:
  - Permite a nuevos usuarios ver todas las funcionalidades
  - Facilita pruebas y demostraciones
  - Ayuda a entender la simbología sin necesidad de crear datos
  - Útil para capacitación y documentación

## 📝 Otras Mejoras Pendientes

### Funcionalidades
- [ ] Confirmación formal de numeración: etiqueta "Numeración FDI" en cabecera
- [ ] Historial de cambios por diente
- [ ] Exportación de odontograma (PDF, imagen)
- [ ] Modo comparación (antes/después)

### UI/UX
- [ ] Modo oscuro/claro mejorado
- [ ] Zoom para mejor visualización
- [ ] Vista 3D opcional de los dientes
- [ ] Atajos de teclado para cambiar estados rápidamente

### Rendimiento
- [ ] (Agregar aquí optimizaciones conforme se identifiquen)

### Documentación
- [ ] (Agregar aquí mejoras de documentación conforme se identifiquen)

## 🐛 Bugs Conocidos
- [ ] (Agregar aquí bugs conforme se descubran)

## 💡 Ideas Futuras
- [ ] (Agregar aquí ideas para versiones futuras)

---

**Nota:** Este documento se actualizará continuamente conforme se reciba feedback y se identifiquen nuevas áreas de mejora.