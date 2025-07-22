# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-22

### Agregado
- 🛠️ Modo desarrollador para visualizar estructura del layout con bordes y etiquetas
- 📏 Sistema de auto-layout con contenedores de altura fija diferenciada
- 🎯 Altura condicional en AlignedToothContainer según tipo de diente
- 🔧 Constante TEMPORARY_TOOTH_SLOT_HEIGHT para manejar altura de dientes temporales

### Cambiado
- 📐 Alturas optimizadas: 130px para dientes permanentes, 100px para temporales
- 🔧 Refactorización completa del sistema de layout usando offsets positivos
- 📊 Espaciado mejorado entre dientes y grupos (gap-2)
- 🎨 Márgenes agregados a etiquetas de grupos para mejor legibilidad (mb-2 superiores, mt-2 inferiores)
- 📦 Ancho de dientes ahora es dinámico para mejor distribución del espacio
- 🎯 Eliminación de anchos fijos en favor de min-width para flexibilidad

### Corregido
- 🦷 Restaurada animación de mordida (boca abierta/cerrada) con showBiteEffect
- 🐛 Eliminados márgenes internos redundantes (mb-1) que causaban espaciado excesivo
- 🎯 Alineación vertical mejorada usando offsets consistentes
- 🔄 Corregida lógica de showBiteEffect en filas temporales para mostrar espacio cuando está activo

## [1.1.1] - 2024-01-21

### Documentación
- Mejorada la documentación con nuevas capturas de pantalla
- Agregadas imágenes ilustrativas en README.md y README-LIBRARY.md
- Actualizados ejemplos de código con mejor formato
- Añadidas imágenes de: panel de detalles, leyenda de colores, modo oscuro
- Mejorada la presentación visual de la documentación

## [1.1.0] - 2024-01-21

### Agregado
- 🎨 Nuevo componente `ColorLegend` con panel expandible mostrando todos los estados dentales
- 🎯 Componente `CompactCaseSelector` con 6 casos clínicos predefinidos
- 📚 Directorio `examples/` con 5 ejemplos prácticos de implementación
- 📋 Documentación API completa en `API.md`
- 🪝 Nuevos hooks: `useBiteAnimation`, `useClinicalCases`, `useOdontogramState`
- 🏗️ Configuración de layout independiente para offsets verticales
- ✨ Estado `not_erupted` para casos pediátricos

### Cambiado
- 🌓 Mejorada la sincronización del tema entre componentes
- 🦷 Terminología actualizada: "dientes de leche" → "dientes temporales"
- 📁 Casos clínicos separados en archivos individuales para mejor mantenibilidad
- 🎯 Tooltips ahora aparecen al hacer hover en todo el diente, no solo el número
- 🔧 Simplificación de la UI ocultando botones de animación de mordida

### Corregido
- 🌑 Problemas de visualización en modo oscuro completamente resueltos
- 🎨 Clase CSS inválida `bg-gray-850` reemplazada por `bg-gray-800`
- 🔍 Mejor contraste para el estado "Extraído" en ambos modos
- 🎯 Adaptación correcta de bordes de superficies dentales en modo oscuro
- 🐛 Corrección del indicador de notas usando `tooth.notes` en lugar de `tooth.demoLabel`

### Eliminado
- 💾 Eliminación completa del uso de localStorage
- 🔄 Botón de resetear odontograma (ahora solo se resetea con caso "Por defecto")

### Documentación
- 📖 README actualizado con indicador de estado beta
- 📝 URLs del repositorio corregidas de "op-odontogram-public" a "op-odontorgram"
- 📚 Nueva documentación exhaustiva en README-LIBRARY.md

## [1.0.1] - 2024-01-15

### Corregido
- Correcciones menores de estilo
- Mejoras en la documentación

## [1.0.0] - 2024-01-10

### Agregado
- 🦷 Versión inicial de la librería
- 32 dientes permanentes y 20 temporales
- 11 estados dentales predefinidos
- Sistema de numeración FDI
- Visualización de superficies dentales
- Animaciones de mordida
- Soporte completo para TypeScript