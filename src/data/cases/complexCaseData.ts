import { Tooth } from '../../lib/odontograma/types';

export const complexCaseData = {
  id: 'complex',
  name: 'Caso complejo',
  description: 'Paciente con múltiples tratamientos y rehabilitación oral',
  category: 'complex' as const,
  permanentTeeth: [
    { id: 11, status: 'crown', notes: 'Corona de porcelana' },
    { id: 12, status: 'crown', notes: 'Corona de porcelana' },
    { id: 13, status: 'root_canal', notes: 'Endodoncia + corona pendiente' },
    { id: 14, status: 'extracted', notes: 'Extraído hace 6 meses' },
    { id: 15, status: 'bridge', notes: 'Póntico de puente 13-15-17' },
    { id: 16, status: 'crown', notes: 'Corona metal-porcelana' },
    { id: 17, status: 'bridge', notes: 'Pilar de puente 13-15-17' },
    { id: 18, status: 'extracted', notes: 'Tercer molar extraído' },
    { id: 21, status: 'crown', notes: 'Corona de porcelana' },
    { id: 22, status: 'crown', notes: 'Corona de porcelana' },
    { id: 23, status: 'filled', notes: 'Obturación estética' },
    { id: 24, status: 'implant', notes: 'Implante oseointegrado' },
    { id: 25, status: 'implant', notes: 'Implante oseointegrado' },
    { id: 26, status: 'root_canal', notes: 'Endodoncia + corona metal-porcelana' },
    { id: 27, status: 'filled', notes: 'Obturación MOD' },
    { id: 28, status: 'extracted', notes: 'Tercer molar extraído' },
    { id: 31, status: 'healthy', notes: 'Conservado' },
    { id: 32, status: 'healthy', notes: 'Conservado' },
    { id: 33, status: 'filled', notes: 'Obturación vestibular' },
    { id: 34, status: 'crown', notes: 'Corona metal-porcelana' },
    { id: 35, status: 'extracted', notes: 'Extraído - planificado implante' },
    { id: 36, status: 'crown', notes: 'Corona metal-porcelana sobre endodoncia' },
    { id: 37, status: 'fracture', notes: 'Fractura coronaria - requiere extracción' },
    { id: 38, status: 'extracted', notes: 'Tercer molar extraído' },
    { id: 41, status: 'healthy', notes: 'Conservado' },
    { id: 42, status: 'healthy', notes: 'Conservado' },
    { id: 43, status: 'filled', notes: 'Obturación vestibular' },
    { id: 44, status: 'crown', notes: 'Corona metal-porcelana' },
    { id: 45, status: 'bridge', notes: 'Póntico de puente 44-45-46' },
    { id: 46, status: 'bridge', notes: 'Pilar de puente 44-45-46' },
    { id: 47, status: 'filled', notes: 'Obturación MOD extensa' },
    { id: 48, status: 'extracted', notes: 'Tercer molar extraído' }
  ] as Partial<Tooth>[],
  temporaryTeeth: [] as Partial<Tooth>[]
};