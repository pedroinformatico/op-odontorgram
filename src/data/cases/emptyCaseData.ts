import { Tooth } from '../../lib/odontograma/types';

export const emptyCaseData = {
  id: 'empty',
  name: 'Por defecto',
  description: 'Todos los dientes sanos',
  category: 'basic' as const,
  permanentTeeth: [] as Partial<Tooth>[],
  temporaryTeeth: [] as Partial<Tooth>[]
};