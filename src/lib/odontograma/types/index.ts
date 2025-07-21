/**
 * Interface que define la estructura completa de datos de un diente
 * Esta estructura contiene SOLO datos clínicos que pueden ser almacenados en base de datos
 * NO incluye información de presentación visual (como verticalOffset)
 */
export interface Tooth {
  // === Identificación ===
  /** ID único del diente (ej: 11 para diente 1.1, 85 para temporal 8.5) */
  id: number;
  
  /** Notación clínica según sistema FDI: "cuadrante.posición" (ej: "1.8", "2.1") */
  clinicalId?: string;
  
  // === Ubicación en el odontograma ===
  /** Cuadrante dental (1: superior derecho, 2: superior izquierdo, 3: inferior izquierdo, 4: inferior derecho) */
  quadrant: 1 | 2 | 3 | 4;
  
  /** Posición dentro del cuadrante (1-8 para permanentes, 1-5 para temporales) */
  position: number;
  
  // === Estado clínico ===
  /** Estado actual del diente (sano, caries, obturado, etc.) */
  status: ToothStatus;
  
  /** Notas clínicas adicionales del odontólogo */
  notes?: string;
  
  /** Indica si es un diente temporal (de leche) */
  isTemporary?: boolean;
  
  // === Propiedades anatómicas ===
  /** Tipo de diente según su morfología */
  toothType?: 'incisor' | 'canine' | 'premolar' | 'molar';
  
  /** Número de raíces del diente */
  rootCount?: 1 | 2 | 3;
  
  /** Tipo de configuración radicular */
  rootType?: 'single' | 'bifurcated' | 'trifurcated';
  
  // === Propiedades clínicas periodontales ===
  /** Grado de movilidad dental (0: sin movilidad, 3: movilidad severa) */
  mobilityGrade?: 0 | 1 | 2 | 3;
  
  /** Grado de afectación de furca en molares (0: sin afectación, 3: afectación completa) */
  furcationGrade?: 0 | 1 | 2 | 3;
  
  /** Recesión gingival en milímetros */
  gingivalRecession?: number;
  
  /** Profundidad de bolsa periodontal en milímetros */
  pocketDepth?: number;
  
  // === Personalización visual (NO para posicionamiento) ===
  /** Altura personalizada de la corona (para casos especiales) */
  crownHeight?: number;
  
  /** Longitud personalizada de la raíz (para casos especiales) */
  rootLength?: number;
  
  // === Condiciones por superficie ===
  /** Estados específicos de cada superficie dental */
  surfaces?: {
    /** Superficie oclusal (masticatoria) */
    oclusal?: ToothStatus;
    /** Superficie vestibular (hacia el labio/mejilla) */
    vestibular?: ToothStatus;
    /** Superficie lingual/palatina (hacia la lengua) */
    lingual?: ToothStatus;
    /** Superficie mesial (hacia la línea media) */
    mesial?: ToothStatus;
    /** Superficie distal (alejada de la línea media) */
    distal?: ToothStatus;
  };
  
  // === Metadatos ===
  /** Fecha de última actualización del registro */
  lastUpdate?: string;
  
  /** Historial de procedimientos realizados en el diente */
  procedures?: ToothProcedure[];
}

/**
 * Estados posibles de un diente
 * Cada estado tiene una representación visual específica (color, icono, opacidad)
 */
export type ToothStatus = 
  | 'healthy'              // Diente sano sin patologías
  | 'caries'              // Diente con caries activa
  | 'filled'              // Diente obturado/empastado
  | 'crown'               // Diente con corona protésica
  | 'extracted'           // Diente extraído/ausente
  | 'implant'             // Implante dental
  | 'root_canal'          // Diente con tratamiento de conducto/endodoncia
  | 'fracture'            // Diente fracturado
  | 'bridge'              // Diente pilar de puente
  | 'extraction_indicated' // Diente con indicación de extracción
  | 'not_erupted';        // Diente no erupcionado (común en casos pediátricos)

/**
 * Registro de procedimiento dental realizado
 */
export interface ToothProcedure {
  /** Identificador único del procedimiento */
  id: string;
  
  /** Tipo de procedimiento (ej: "obturación", "endodoncia", "limpieza") */
  type: string;
  
  /** Fecha de realización en formato ISO */
  date: string;
  
  /** Descripción detallada del procedimiento */
  description?: string;
  
  /** Costo del procedimiento */
  cost?: number;
}

/**
 * Representa una superficie específica del diente
 */
export interface ToothSurface {
  /** Nombre de la superficie dental */
  name: 'oclusal' | 'vestibular' | 'lingual' | 'mesial' | 'distal';
  
  /** Estado de esa superficie específica */
  status: ToothStatus;
}

/**
 * Props necesarias para renderizar un componente de diente
 * Esta interface define qué información necesita el componente visual
 */
export interface ToothRenderProps {
  /** Datos clínicos del diente */
  tooth: Tooth;
  
  /** Si el diente está actualmente seleccionado */
  isSelected: boolean;
  
  /** Callback cuando se hace clic en el diente */
  onToothClick: (tooth: Tooth, event?: React.MouseEvent) => void;
  
  /** Si el diente pertenece al maxilar superior (afecta la orientación visual) */
  isUpper: boolean;
  
  /** Si es un diente temporal (afecta el tamaño y color) */
  isTemporary?: boolean;
  
  /** Si mostrar el efecto de mordida (animación visual) */
  showBiteEffect?: boolean;
}