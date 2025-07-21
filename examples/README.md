# Ejemplos de OP Odontogram

Este directorio contiene ejemplos de implementación de la librería op-odontogram para diferentes casos de uso.

## 📚 Ejemplos Disponibles

### 1. BasicOdontogram.tsx
Ejemplo básico de uso del odontograma con todas las props requeridas.
- Configuración mínima
- Manejo de clicks en dientes
- Animación de mordida

### 2. OdontogramWithEditor.tsx
Odontograma con herramientas de edición para cambiar estados dentales.
- Barra de herramientas con diferentes estados
- Actualización de dientes al hacer clic
- Función de reseteo

### 3. OdontogramWithClinicalCases.tsx
Implementación con casos clínicos predefinidos.
- Selector de casos clínicos
- Aplicación de casos preservando estructura
- Casos pediátricos con dientes temporales

### 4. OdontogramWithPersistence.tsx
Odontograma con persistencia automática en localStorage.
- Guardado automático de cambios
- Exportación/importación de datos JSON
- Estadísticas de estados dentales

### 5. OdontogramWithSurfaces.tsx
Editor avanzado de superficies dentales individuales.
- Edición de 5 superficies por diente
- Panel lateral de edición
- Vista previa del diente

## 🚀 Cómo usar estos ejemplos

1. **Instalación de dependencias**
```bash
npm install op-odontogram
```

2. **Importar estilos CSS**
```typescript
import 'op-odontogram/styles/odontogram.css';
```

3. **Copiar el ejemplo deseado**
Copia el archivo del ejemplo que necesites a tu proyecto y ajústalo según tus necesidades.

## 🎯 Casos de Uso Comunes

### Historia Clínica Digital
Usa `OdontogramWithPersistence.tsx` como base para integrar con tu sistema de historias clínicas.

### Herramienta de Diagnóstico
`OdontogramWithEditor.tsx` es ideal para crear herramientas de diagnóstico interactivas.

### Educación y Demostración
`OdontogramWithClinicalCases.tsx` es perfecto para mostrar diferentes condiciones dentales.

### Análisis Detallado
`OdontogramWithSurfaces.tsx` permite un análisis minucioso de cada superficie dental.

## 💡 Tips de Implementación

1. **Estados personalizados**: Puedes extender los estados disponibles según tus necesidades
2. **Validación**: Implementa validación de datos antes de guardar
3. **Integración API**: Los ejemplos pueden adaptarse fácilmente para trabajar con APIs REST
4. **Accesibilidad**: Considera agregar labels ARIA para mejorar la accesibilidad

## 📝 Notas

- Todos los ejemplos usan TypeScript para mejor type safety
- Los estilos están basados en Tailwind CSS
- Los datos se estructuran siguiendo el estándar FDI