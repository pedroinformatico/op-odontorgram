/**
 * Layout constants for the odontogram
 * These values ensure consistent spacing and alignment across all tooth types
 */

// Universal height for all tooth slot containers
// This height accommodates the largest tooth (molar with roots) plus spacing
export const TOOTH_SLOT_HEIGHT = 'h-[160px]';

// Fixed height for individual tooth components
export const TOOTH_HEIGHT = 'h-[105px]';

// Consistent tooth container widths
export const TOOTH_SLOT_WIDTH = {
  mobile: 'w-[50px]',
  tablet: 'w-[55px]',
  desktop: 'w-[60px]'
};

// Spacing between teeth
export const TOOTH_SPACING = {
  mobile: 'gap-1',
  tablet: 'gap-1.5', 
  desktop: 'gap-2'
};

// Row spacing
export const ROW_SPACING = {
  withTemporary: 'mb-4',
  withoutTemporary: 'mb-8'
};

// Developer mode colors
export const DEV_COLORS = {
  container: 'border-yellow-500',
  row: 'border-purple-500',
  offset: 'border-red-500',
  alignment: 'border-cyan-500'
};