import { Tooth } from '../../lib/odontograma/types';

export const orthodonticCaseData = {
  id: 'orthodontic',
  name: 'Ortodoncia activa',
  description: 'Paciente adolescente con tratamiento de ortodoncia en curso',
  category: 'orthodontic' as const,
  permanentTeeth: [
    { id: 14, status: 'extracted', notes: 'Extraído por indicación ortodóncica' },
    { id: 24, status: 'extracted', notes: 'Extraído por indicación ortodóncica' },
    { id: 34, status: 'extracted', notes: 'Extraído por indicación ortodóncica' },
    { id: 44, status: 'extracted', notes: 'Extraído por indicación ortodóncica' },
    { id: 13, status: 'healthy', notes: 'Bracket metálico' },
    { id: 12, status: 'healthy', notes: 'Bracket metálico' },
    { id: 11, status: 'healthy', notes: 'Bracket metálico' },
    { id: 21, status: 'healthy', notes: 'Bracket metálico' },
    { id: 22, status: 'healthy', notes: 'Bracket metálico' },
    { id: 23, status: 'healthy', notes: 'Bracket metálico' },
    { id: 15, status: 'healthy', notes: 'Bracket metálico - en movimiento' },
    { id: 25, status: 'healthy', notes: 'Bracket metálico - en movimiento' },
    { id: 35, status: 'healthy', notes: 'Bracket metálico - en movimiento' },
    { id: 45, status: 'healthy', notes: 'Bracket metálico - en movimiento' },
    { id: 16, status: 'healthy', notes: 'Banda ortodóncica' },
    { id: 26, status: 'healthy', notes: 'Banda ortodóncica' },
    { id: 36, status: 'healthy', notes: 'Banda ortodóncica' },
    { id: 46, status: 'healthy', notes: 'Banda ortodóncica' }
  ] as Partial<Tooth>[],
  temporaryTeeth: [] as Partial<Tooth>[]
};