import { Tooth } from '../../lib/odontograma/types';

export const periodontalCaseData = {
  id: 'periodontal',
  name: 'Enfermedad periodontal',
  description: 'Paciente con periodontitis crónica generalizada',
  category: 'periodontal' as const,
  permanentTeeth: [
    { id: 11, status: 'healthy', mobilityGrade: 2, pocketDepth: 5, gingivalRecession: 2, notes: 'Movilidad grado II' },
    { id: 12, status: 'healthy', mobilityGrade: 1, pocketDepth: 4, gingivalRecession: 1, notes: 'Recesión gingival' },
    { id: 13, status: 'healthy', mobilityGrade: 1, pocketDepth: 4, notes: 'Bolsa periodontal 4mm' },
    { id: 21, status: 'healthy', mobilityGrade: 2, pocketDepth: 5, gingivalRecession: 2, notes: 'Movilidad grado II' },
    { id: 22, status: 'healthy', mobilityGrade: 1, pocketDepth: 4, gingivalRecession: 1, notes: 'Recesión gingival' },
    { id: 31, status: 'extraction_indicated', mobilityGrade: 3, pocketDepth: 8, notes: 'Movilidad grado III - Indicado para extracción' },
    { id: 32, status: 'healthy', mobilityGrade: 2, pocketDepth: 6, gingivalRecession: 3, notes: 'Recesión severa' },
    { id: 41, status: 'healthy', mobilityGrade: 2, pocketDepth: 5, gingivalRecession: 2, notes: 'Movilidad grado II' },
    { id: 42, status: 'healthy', mobilityGrade: 2, pocketDepth: 6, gingivalRecession: 3, notes: 'Recesión severa' },
    { id: 16, status: 'filled', furcationGrade: 2, pocketDepth: 6, notes: 'Lesión de furca grado II' },
    { id: 26, status: 'filled', furcationGrade: 2, pocketDepth: 6, notes: 'Lesión de furca grado II' },
    { id: 36, status: 'healthy', furcationGrade: 1, pocketDepth: 5, notes: 'Lesión de furca grado I' },
    { id: 46, status: 'healthy', furcationGrade: 1, pocketDepth: 5, notes: 'Lesión de furca grado I' }
  ] as Partial<Tooth>[],
  temporaryTeeth: [] as Partial<Tooth>[]
};