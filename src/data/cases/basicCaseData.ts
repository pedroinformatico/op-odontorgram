import { Tooth } from '../../lib/odontograma/types';

export const basicCaseData = {
  id: 'basic',
  name: 'Caso básico adulto',
  description: 'Paciente adulto con caries y obturaciones comunes',
  category: 'basic' as const,
  permanentTeeth: [
    { id: 16, status: 'filled', notes: 'Obturación oclusal antigua' },
    { id: 14, status: 'caries', notes: 'Caries oclusal' },
    { id: 12, status: 'filled', notes: 'Obturación vestibular' },
    { id: 26, status: 'filled', notes: 'Obturación oclusal' },
    { id: 27, status: 'caries', notes: 'Caries mesial' },
    { id: 36, status: 'filled', notes: 'Obturación MOD extensa' },
    { id: 37, status: 'root_canal', notes: 'Endodoncia realizada hace 2 años' },
    { id: 46, status: 'crown', notes: 'Corona metal-porcelana' },
    { id: 47, status: 'caries', notes: 'Caries distal' }
  ] as Partial<Tooth>[],
  temporaryTeeth: [] as Partial<Tooth>[]
};