import { Tooth } from '../lib/odontograma';

export interface ClinicalCase {
  id: string;
  name: string;
  category: 'empty' | 'basic' | 'periodontal' | 'complex' | 'orthodontic' | 'pediatric' | 'infant';
  description: string;
  permanentTeeth: Tooth[];
  temporaryTeeth: Tooth[];
  clinicalNotes: string;
  patientAge?: number;
}

// Helper function to create a tooth with specific status
const createTooth = (quadrant: number, position: number, status: string, notes?: string): Tooth => {
  const id = quadrant * 10 + position;
  return {
    id,
    clinicalId: `${quadrant}.${position}`,
    quadrant: quadrant as 1 | 2 | 3 | 4,
    position,
    status: status as any,
    notes,
    isTemporary: false,
  };
};

const createTempTooth = (quadrant: number, position: number, status: string, notes?: string): Tooth => {
  // Temporary teeth IDs follow the pattern 51-55, 61-65, 71-75, 81-85
  const tempQuadrantMap: Record<number, number> = { 1: 5, 2: 6, 3: 7, 4: 8 };
  const id = tempQuadrantMap[quadrant] * 10 + position;
  
  return {
    id,
    clinicalId: `${tempQuadrantMap[quadrant]}.${position}`,
    quadrant: quadrant as 1 | 2 | 3 | 4,
    position,
    status: status as any,
    notes,
    isTemporary: true,
  };
};

// Dientes permanentes base (32 dientes)
const createBasePermanentTeeth = (): Tooth[] => {
  const teeth: Tooth[] = [];
  const quadrants = [1, 2, 3, 4];
  
  quadrants.forEach(quadrant => {
    for (let position = 1; position <= 8; position++) {
      teeth.push(createTooth(quadrant, position, 'healthy'));
    }
  });
  
  return teeth;
};

// Dientes temporales base (20 dientes)
const createBaseTemporaryTeeth = (): Tooth[] => {
  const teeth: Tooth[] = [];
  const quadrants = [1, 2, 3, 4];
  
  quadrants.forEach(quadrant => {
    for (let position = 1; position <= 5; position++) {
      teeth.push(createTempTooth(quadrant, position, 'healthy'));
    }
  });
  
  return teeth;
};

// Helper function to update teeth by clinicalId
const updateTeeth = (teeth: Tooth[], updates: { clinicalId: string, status: string, notes?: string }[]) => {
  updates.forEach(({ clinicalId, status, notes }) => {
    const tooth = teeth.find(t => t.clinicalId === clinicalId);
    if (tooth) {
      tooth.status = status as any;
      if (notes) tooth.notes = notes;
    }
  });
  return teeth;
};

export const clinicalCases: ClinicalCase[] = [
  {
    id: 'empty',
    name: 'Por defecto',
    category: 'empty',
    description: 'Odontograma limpio sin condiciones patológicas',
    permanentTeeth: createBasePermanentTeeth(),
    temporaryTeeth: createBaseTemporaryTeeth(),
    clinicalNotes: 'Paciente sin historial dental registrado.',
    patientAge: 30
  },
  
  {
    id: 'basic-adult',
    name: 'Caso básico adulto',
    category: 'basic',
    description: 'Adulto con algunas caries y obturaciones simples',
    permanentTeeth: updateTeeth(createBasePermanentTeeth(), [
      // Caries
      { clinicalId: '1.7', status: 'caries', notes: 'Caries oclusal' },
      { clinicalId: '2.7', status: 'caries', notes: 'Caries oclusal profunda' },
      { clinicalId: '3.7', status: 'caries' },
      // Obturaciones
      { clinicalId: '1.6', status: 'filled', notes: 'Obturación de amalgama antigua' },
      { clinicalId: '2.6', status: 'filled' },
      { clinicalId: '3.6', status: 'filled' },
      { clinicalId: '4.6', status: 'filled' },
      // Extraído
      { clinicalId: '4.8', status: 'extracted', notes: 'Extraído por pericoronaritis recurrente' }
    ]),
    temporaryTeeth: createBaseTemporaryTeeth(),
    clinicalNotes: 'Paciente con higiene regular. Necesita tratamiento de caries activas. Revisión cada 6 meses.',
    patientAge: 35
  },
  
  {
    id: 'periodontal',
    name: 'Caso periodontal',
    category: 'periodontal',
    description: 'Paciente con enfermedad periodontal avanzada',
    permanentTeeth: updateTeeth(createBasePermanentTeeth(), [
      // Problemas periodontales
      { clinicalId: '1.1', status: 'filled', notes: 'Movilidad grado II, bolsa de 5mm' },
      { clinicalId: '1.2', status: 'filled', notes: 'Movilidad grado I, recesión 3mm' },
      { clinicalId: '2.1', status: 'extraction_indicated', notes: 'Movilidad grado III, pronóstico sin esperanza' },
      { clinicalId: '4.1', status: 'extraction_indicated', notes: 'Movilidad grado III, lesión de furca' },
      // Extraídos
      { clinicalId: '1.8', status: 'extracted' },
      { clinicalId: '2.8', status: 'extracted' },
      { clinicalId: '3.8', status: 'extracted' },
      // Corona
      { clinicalId: '1.6', status: 'crown', notes: 'Corona por fractura, bolsas de 4mm' }
    ]),
    temporaryTeeth: createBaseTemporaryTeeth(),
    clinicalNotes: 'Periodontitis crónica generalizada severa. Requiere fase higiénica urgente y reevaluación periodontal.',
    patientAge: 55
  },
  
  {
    id: 'complex',
    name: 'Caso complejo',
    category: 'complex',
    description: 'Múltiples coronas, implantes, endodoncias y fracturas',
    permanentTeeth: updateTeeth(createBasePermanentTeeth(), [
      // Coronas
      { clinicalId: '1.1', status: 'crown', notes: 'Corona de porcelana por fractura' },
      { clinicalId: '2.1', status: 'crown', notes: 'Corona metal-porcelana' },
      // Implantes
      { clinicalId: '1.6', status: 'implant', notes: 'Implante osteointegrado hace 2 años' },
      { clinicalId: '2.6', status: 'implant' },
      // Endodoncias
      { clinicalId: '1.3', status: 'root_canal', notes: 'Endodoncia + perno + corona pendiente' },
      { clinicalId: '2.3', status: 'root_canal' },
      // Fracturas
      { clinicalId: '2.2', status: 'fracture', notes: 'Fractura coronaria, requiere corona' },
      // Puente
      { clinicalId: '3.5', status: 'bridge', notes: 'Puente 3.4-3.5-3.6' },
      { clinicalId: '3.6', status: 'bridge' },
      { clinicalId: '3.4', status: 'extracted' },
      // Extraídos
      { clinicalId: '1.8', status: 'extracted' },
      { clinicalId: '2.8', status: 'extracted' },
      { clinicalId: '3.8', status: 'extracted' },
      { clinicalId: '4.8', status: 'extracted' }
    ]),
    temporaryTeeth: createBaseTemporaryTeeth(),
    clinicalNotes: 'Rehabilitación oral extensa. Mantener controles trimestrales. Higiene con cepillos interdentales.',
    patientAge: 60
  },
  
  {
    id: 'orthodontic',
    name: 'Caso ortodóntico',
    category: 'orthodontic',
    description: 'Tratamiento de ortodoncia activo con brackets',
    permanentTeeth: (() => {
      const teeth = createBasePermanentTeeth();
      // Brackets en todos los dientes anteriores y premolares
      const updates: any[] = [];
      for (let q = 1; q <= 4; q++) {
        for (let p = 1; p <= 5; p++) {
          updates.push({ clinicalId: `${q}.${p}`, status: 'healthy', notes: 'Bracket metálico' });
        }
      }
      // Extracciones ortodónticas
      updates.push(
        { clinicalId: '1.4', status: 'extracted', notes: 'Extracción terapéutica ortodoncia' },
        { clinicalId: '2.4', status: 'extracted', notes: 'Extracción terapéutica ortodoncia' },
        { clinicalId: '3.4', status: 'extracted', notes: 'Extracción terapéutica ortodoncia' },
        { clinicalId: '4.4', status: 'extracted', notes: 'Extracción terapéutica ortodoncia' },
        // Caries por mala higiene
        { clinicalId: '1.2', status: 'caries', notes: 'Caries por brackets, descalcificación' }
      );
      return updateTeeth(teeth, updates);
    })(),
    temporaryTeeth: createBaseTemporaryTeeth(),
    clinicalNotes: 'Tratamiento ortodóntico activo. Reforzar higiene oral. Uso de enjuague fluorado.',
    patientAge: 16
  },
  
  {
    id: 'pediatric',
    name: 'Caso pediátrico (6-8 años)',
    category: 'pediatric',
    description: 'Dentición mixta con problemas típicos de la edad',
    permanentTeeth: (() => {
      const teeth = createBasePermanentTeeth();
      const updates: any[] = [];
      
      // Solo han erupcionado algunos permanentes
      // Primeros molares con sellantes
      updates.push(
        { clinicalId: '1.6', status: 'healthy', notes: 'Sellante de fosas y fisuras' },
        { clinicalId: '2.6', status: 'healthy', notes: 'Sellante de fosas y fisuras' },
        { clinicalId: '3.6', status: 'healthy', notes: 'Sellante de fosas y fisuras' },
        { clinicalId: '4.6', status: 'healthy', notes: 'Sellante de fosas y fisuras' }
      );
      
      // Los demás no han erupcionado
      for (let q = 1; q <= 4; q++) {
        for (let p = 3; p <= 5; p++) {
          updates.push({ clinicalId: `${q}.${p}`, status: 'not_erupted', notes: 'No erupcionado' });
        }
        for (let p = 7; p <= 8; p++) {
          updates.push({ clinicalId: `${q}.${p}`, status: 'not_erupted', notes: 'No erupcionado' });
        }
      }
      
      return updateTeeth(teeth, updates);
    })(),
    temporaryTeeth: updateTeeth(createBaseTemporaryTeeth(), [
      // Caries de infancia temprana
      { clinicalId: '5.3', status: 'caries', notes: 'Caries de infancia temprana' },
      { clinicalId: '6.3', status: 'caries', notes: 'Caries de infancia temprana' },
      // Obturaciones
      { clinicalId: '5.4', status: 'filled' },
      { clinicalId: '5.5', status: 'filled' },
      { clinicalId: '6.4', status: 'filled' },
      // Corona de acero
      { clinicalId: '6.5', status: 'crown', notes: 'Corona de acero inoxidable' },
      // Exfoliados
      { clinicalId: '5.1', status: 'extracted', notes: 'Exfoliado naturalmente' },
      { clinicalId: '5.2', status: 'extracted', notes: 'Exfoliado naturalmente' },
      { clinicalId: '6.1', status: 'extracted', notes: 'Exfoliado naturalmente' },
      { clinicalId: '6.2', status: 'extracted', notes: 'Exfoliado naturalmente' }
    ]),
    clinicalNotes: 'Dentición mixta. Aplicar flúor tópico. Educación en higiene. Control cada 4 meses.',
    patientAge: 7
  },
  
  {
    id: 'infant',
    name: 'Caso infantil (3-5 años)',
    category: 'infant',
    description: 'Solo dentición temporal con caries temprana',
    permanentTeeth: (() => {
      const teeth = createBasePermanentTeeth();
      // Ningún permanente ha erupcionado
      return teeth.map(t => ({ ...t, status: 'not_erupted' as any, notes: 'No erupcionado' }));
    })(),
    temporaryTeeth: updateTeeth(createBaseTemporaryTeeth(), [
      // Caries de biberón
      { clinicalId: '5.1', status: 'caries', notes: 'Caries de biberón' },
      { clinicalId: '5.2', status: 'caries', notes: 'Caries de biberón' },
      { clinicalId: '6.1', status: 'caries', notes: 'Caries de biberón severa' },
      { clinicalId: '6.2', status: 'caries', notes: 'Caries de biberón severa' },
      // Pulpotomías
      { clinicalId: '5.4', status: 'root_canal', notes: 'Pulpotomía + corona acero' },
      { clinicalId: '5.5', status: 'root_canal', notes: 'Pulpotomía + corona acero' },
      // Coronas de acero
      { clinicalId: '7.4', status: 'crown', notes: 'Corona de acero inoxidable' },
      { clinicalId: '7.5', status: 'crown', notes: 'Corona de acero inoxidable' },
      // Extraído con mantenedor
      { clinicalId: '8.5', status: 'extracted', notes: 'Extraído, mantenedor de espacio colocado' }
    ]),
    clinicalNotes: 'Caries temprana de la infancia severa. Tratamiento bajo sedación. Educación a padres urgente.',
    patientAge: 4
  }
];

// Función helper para obtener un caso por ID
export const getClinicalCaseById = (id: string): ClinicalCase | undefined => {
  return clinicalCases.find(c => c.id === id);
};

// Función helper para obtener casos por categoría
export const getClinicalCasesByCategory = (category: ClinicalCase['category']): ClinicalCase[] => {
  return clinicalCases.filter(c => c.category === category);
};