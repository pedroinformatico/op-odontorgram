import { Tooth } from "../types/dental";
import { initialTeeth, temporaryTeeth as initialTempTeeth } from "./dentalData";

/**
 * Demo teeth data showcasing various clinical conditions and configurations
 * Uses FDI notation (quadrant.position) for clinical IDs
 */

// Helper function to determine tooth type based on position
const getToothType = (
  position: number
): "incisor" | "canine" | "premolar" | "molar" => {
  if (position <= 2) return "incisor";
  if (position === 3) return "canine";
  if (position <= 5) return "premolar";
  return "molar";
};

// Helper function to determine root count based on tooth type and position
const getRootInfo = (quadrant: number, position: number) => {
  const isUpper = quadrant === 1 || quadrant === 2;
  const toothType = getToothType(position);

  if (toothType === "incisor" || toothType === "canine") {
    return { rootCount: 1, rootType: "single" as const };
  }

  if (toothType === "premolar") {
    // Upper first premolar often has 2 roots
    if (isUpper && position === 4) {
      return { rootCount: 2, rootType: "bifurcated" as const };
    }
    return { rootCount: 1, rootType: "single" as const };
  }

  // Molars
  if (isUpper) {
    return { rootCount: 3, rootType: "trifurcated" as const };
  } else {
    return { rootCount: 2, rootType: "bifurcated" as const };
  }
};

/**
 * Demo examples showing different clinical conditions
 */
export const clinicalDemoExamples: Record<string, Tooth> = {
  // Healthy teeth examples
  healthyMolarUpper: {
    id: 16,
    clinicalId: "1.6",
    quadrant: 1,
    position: 6,
    status: "healthy",
    toothType: "molar",
    rootCount: 3,
    rootType: "trifurcated",
    demoLabel: "Molar superior sano - 3 raíces",
  },

  healthyIncisor: {
    id: 11,
    clinicalId: "1.1",
    quadrant: 1,
    position: 1,
    status: "healthy",
    toothType: "incisor",
    rootCount: 1,
    rootType: "single",
    demoLabel: "Incisivo central sano",
  },

  // Caries examples
  cariesMultipleSurfaces: {
    id: 36,
    clinicalId: "3.6",
    quadrant: 3,
    position: 6,
    status: "caries",
    toothType: "molar",
    rootCount: 2,
    rootType: "bifurcated",
    surfaces: {
      oclusal: "caries",
      vestibular: "caries",
      mesial: "healthy",
      distal: "healthy",
      lingual: "healthy",
    },
    demoLabel: "Molar con caries oclusal y vestibular",
  },

  // Root canal treatment
  rootCanalPremolar: {
    id: 24,
    clinicalId: "2.4",
    quadrant: 2,
    position: 4,
    status: "root_canal",
    toothType: "premolar",
    rootCount: 2,
    rootType: "bifurcated",
    surfaces: {
      oclusal: "filled",
    },
    demoLabel: "Premolar con endodoncia y obturación",
  },

  // Crown examples
  crownMolar: {
    id: 46,
    clinicalId: "4.6",
    quadrant: 4,
    position: 6,
    status: "crown",
    toothType: "molar",
    rootCount: 2,
    rootType: "bifurcated",
    demoLabel: "Molar con corona completa",
  },

  // Bridge configuration
  bridgePontic: {
    id: 25,
    clinicalId: "2.5",
    quadrant: 2,
    position: 5,
    status: "extracted",
    toothType: "premolar",
    demoLabel: "Póntico de puente",
  },

  bridgeAbutment1: {
    id: 24,
    clinicalId: "2.4",
    quadrant: 2,
    position: 4,
    status: "crown",
    toothType: "premolar",
    rootCount: 2,
    rootType: "bifurcated",
    demoLabel: "Pilar de puente mesial",
  },

  bridgeAbutment2: {
    id: 26,
    clinicalId: "2.6",
    quadrant: 2,
    position: 6,
    status: "crown",
    toothType: "molar",
    rootCount: 3,
    rootType: "trifurcated",
    demoLabel: "Pilar de puente distal",
  },

  // Implant
  implantMolar: {
    id: 36,
    clinicalId: "3.6",
    quadrant: 3,
    position: 6,
    status: "implant",
    toothType: "molar",
    demoLabel: "Implante dental",
  },

  // Fracture
  fracturedIncisor: {
    id: 21,
    clinicalId: "2.1",
    quadrant: 2,
    position: 1,
    status: "fracture",
    toothType: "incisor",
    rootCount: 1,
    rootType: "single",
    demoLabel: "Incisivo fracturado",
  },

  // Extracted tooth
  extractedMolar: {
    id: 38,
    clinicalId: "3.8",
    quadrant: 3,
    position: 8,
    status: "extracted",
    toothType: "molar",
    demoLabel: "Tercer molar extraído",
  },

  // Tooth with mobility and periodontal issues
  mobileToothPerio: {
    id: 31,
    clinicalId: "3.1",
    quadrant: 3,
    position: 1,
    status: "healthy",
    toothType: "incisor",
    rootCount: 1,
    rootType: "single",
    mobilityGrade: 2,
    gingivalRecession: 4,
    pocketDepth: 6,
    demoLabel: "Incisivo con movilidad grado II y recesión",
  },

  // Temporary tooth examples
  temporaryMolarHealthy: {
    id: 55,
    clinicalId: "5.5",
    quadrant: 1,
    position: 5,
    status: "healthy",
    isTemporary: true,
    toothType: "molar",
    rootCount: 3,
    rootType: "trifurcated",
    demoLabel: "Segundo molar temporal sano",
  },

  temporaryWithCaries: {
    id: 74,
    clinicalId: "7.4",
    quadrant: 3,
    position: 4,
    status: "caries",
    isTemporary: true,
    toothType: "molar",
    rootCount: 2,
    rootType: "bifurcated",
    surfaces: {
      oclusal: "caries",
      distal: "caries",
    },
    demoLabel: "Molar temporal con caries",
  },

  // Extraction indicated
  extractionIndicated: {
    id: 48,
    clinicalId: "4.8",
    quadrant: 4,
    position: 8,
    status: "extraction_indicated",
    toothType: "molar",
    rootCount: 2,
    rootType: "bifurcated",
    demoLabel: "Tercer molar con indicación de extracción",
  },
};

/**
 * Generate a complete demo teeth set
 */
export const generateDemoTeeth = (): Tooth[] => {
  const demoTeeth: Tooth[] = [];

  // Create a mix of normal and demo teeth for each quadrant
  for (let quadrant = 1; quadrant <= 4; quadrant++) {
    for (let position = 1; position <= 8; position++) {
      const id = quadrant * 10 + position;
      const clinicalId = `${quadrant}.${position}`;
      const { rootCount, rootType } = getRootInfo(quadrant, position);
      const toothType = getToothType(position);

      // Get the original verticalOffset from all teeth data
      const baseTeeth = [...initialTeeth];
      const baseTooth = baseTeeth.find((t) => t.id === id);
      const verticalOffset = baseTooth ? baseTooth.verticalOffset : 0;

      // Default healthy tooth
      let tooth: Tooth = {
        id,
        clinicalId,
        quadrant: quadrant as 1 | 2 | 3 | 4,
        position,
        status: "healthy",
        toothType,
        rootCount: rootCount as 1 | 2 | 3,
        rootType,
        verticalOffset,
      };

      // Replace some teeth with demo examples
      // Upper right: show various conditions
      if (quadrant === 1) {
        if (position === 3)
          tooth = {
            ...tooth,
            status: "filled",
            surfaces: { vestibular: "filled" },
            demoLabel: "Canino con obturación vestibular",
          };
        if (position === 6)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.healthyMolarUpper,
            id,
            verticalOffset,
          };
      }

      // Upper left: show bridge
      if (quadrant === 2) {
        if (position === 4)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.bridgeAbutment1,
            id,
            verticalOffset,
          };
        if (position === 5)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.bridgePontic,
            id,
            verticalOffset,
          };
        if (position === 6)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.bridgeAbutment2,
            id,
            verticalOffset,
          };
      }

      // Lower left: show various pathologies
      if (quadrant === 3) {
        if (position === 1)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.mobileToothPerio,
            id,
            verticalOffset,
          };
        if (position === 6)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.cariesMultipleSurfaces,
            id,
            verticalOffset,
          };
        if (position === 8)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.extractedMolar,
            id,
            verticalOffset,
          };
      }

      // Lower right: show treatments
      if (quadrant === 4) {
        if (position === 6)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.crownMolar,
            id,
            verticalOffset,
          };
        if (position === 8)
          tooth = {
            ...tooth,
            ...clinicalDemoExamples.extractionIndicated,
            id,
            verticalOffset,
          };
      }

      demoTeeth.push(tooth);
    }
  }

  return demoTeeth;
};

/**
 * Generate demo temporary teeth
 */
export const generateDemoTemporaryTeeth = (): Tooth[] => {
  const demoTemporaryTeeth: Tooth[] = [];
  const temporaryPositions = [1, 2, 3, 4, 5]; // Only 5 teeth per quadrant

  for (let quadrant = 1; quadrant <= 4; quadrant++) {
    for (const position of temporaryPositions) {
      // Use quadrants 5-8 for temporary teeth clinical notation
      const tempQuadrant = quadrant + 4;
      const id = tempQuadrant * 10 + position;
      const clinicalId = `${tempQuadrant}.${position}`;
      const toothType = position <= 3 ? "incisor" : "molar";

      // Get the original verticalOffset from all teeth data
      const baseTempTeeth = [...initialTeeth, ...initialTempTeeth];
      const baseTooth = baseTempTeeth.find((t) => t.id === id);
      const verticalOffset = baseTooth ? baseTooth.verticalOffset : 0;

      let tooth: Tooth = {
        id,
        clinicalId,
        quadrant: quadrant as 1 | 2 | 3 | 4,
        position,
        status: "healthy",
        isTemporary: true,
        toothType,
        rootCount: (toothType === "molar" && (quadrant === 1 || quadrant === 2)
          ? 3
          : toothType === "molar"
          ? 2
          : 1) as 1 | 2 | 3,
        rootType:
          toothType === "molar" && (quadrant === 1 || quadrant === 2)
            ? "trifurcated"
            : toothType === "molar"
            ? "bifurcated"
            : "single",
        verticalOffset,
      };

      // Add some demo conditions to temporary teeth
      if (quadrant === 1 && position === 5) {
        tooth = {
          ...clinicalDemoExamples.temporaryMolarHealthy,
          id,
          quadrant: 1,
          verticalOffset,
        };
      }
      if (quadrant === 3 && position === 4) {
        tooth = {
          ...clinicalDemoExamples.temporaryWithCaries,
          id,
          quadrant: 3,
          verticalOffset,
        };
      }

      demoTemporaryTeeth.push(tooth);
    }
  }

  return demoTemporaryTeeth;
};

/**
 * Documentation for tooth structure and clinical notation
 */
export const toothDocumentation = {
  clinicalNotation: {
    FDI: {
      description: "Sistema FDI (Federación Dental Internacional)",
      permanent:
        "Cuadrantes 1-4, posiciones 1-8 (ej: 1.8 = tercer molar superior derecho)",
      temporary:
        "Cuadrantes 5-8, posiciones 1-5 (ej: 5.5 = segundo molar temporal superior derecho)",
    },
  },

  anatomy: {
    incisor: {
      description: "Dientes anteriores para cortar",
      rootCount: 1,
      positions: [1, 2],
    },
    canine: {
      description: "Dientes puntiagudos para desgarrar",
      rootCount: 1,
      positions: [3],
    },
    premolar: {
      description: "Dientes para triturar",
      rootCount: "1-2 (primer premolar superior frecuentemente tiene 2)",
      positions: [4, 5],
    },
    molar: {
      description: "Dientes posteriores para moler",
      rootCount: "2-3 (superiores: 3, inferiores: 2)",
      positions: [6, 7, 8],
    },
  },

  statuses: {
    healthy: "Diente sano sin patología",
    caries: "Caries dental activa",
    filled: "Diente obturado/restaurado",
    crown: "Corona protésica",
    extracted: "Diente extraído/ausente",
    implant: "Implante dental",
    root_canal: "Tratamiento de conducto/endodoncia",
    fracture: "Fractura dental",
    bridge: "Puente dental",
    extraction_indicated: "Indicado para extracción",
  },

  surfaces: {
    oclusal: "Superficie masticatoria (premolares y molares)",
    vestibular: "Superficie hacia el labio/mejilla",
    lingual: "Superficie hacia la lengua",
    mesial: "Superficie hacia la línea media",
    distal: "Superficie alejada de la línea media",
  },
};
