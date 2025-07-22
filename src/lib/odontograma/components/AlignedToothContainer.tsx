import React from 'react';
import { TOOTH_SLOT_HEIGHT, TOOTH_SLOT_WIDTH, DEV_COLORS } from '../constants/layout';

export interface AlignedToothContainerProps {
  children: React.ReactNode;
  isUpper: boolean;
  isTemporary?: boolean; // Kept for future use, but doesn't affect container height
  developerMode?: boolean;
  toothId?: string; // For debug labeling
}

export const AlignedToothContainer: React.FC<AlignedToothContainerProps> = ({
  children,
  isUpper,
  isTemporary = false,
  developerMode = false,
  toothId
}) => {
  // CRITICAL: All containers have the same height - no conditional logic!
  const containerHeight = TOOTH_SLOT_HEIGHT;
  
  // Vertical alignment: upper teeth align to top, lower teeth align to bottom
  // This creates the natural occlusal line alignment
  const alignment = isUpper ? 'justify-start' : 'justify-end';
  
  return (
    <div 
      className={`
        ${containerHeight}
        flex-shrink-0
        flex flex-col
        ${alignment}
        relative
        ${developerMode ? `bg-yellow-500/5 outline outline-1 outline-yellow-300 outline-dashed` : ''}
      `}
      title={developerMode ? `Slot ${toothId || ''}: ${isUpper ? 'Upper' : 'Lower'} (Fixed: ${TOOTH_SLOT_HEIGHT})` : ''}
    >
      {/* Developer mode labels */}
      {developerMode && (
        <>
          {/* Tooth slot label */}
          <span className="absolute -left-2 top-0 text-[10px] text-yellow-600 font-mono bg-white px-1 z-10">
            Diente
          </span>
          
          {/* Alignment reference line */}
          {isUpper ? (
            <div className={`absolute top-0 left-0 right-0 border-t-2 ${DEV_COLORS.alignment} border-dotted`}>
              <span className="absolute -right-16 top-0 text-[10px] text-cyan-500 font-mono">base</span>
            </div>
          ) : (
            <div className={`absolute bottom-0 left-0 right-0 border-b-2 ${DEV_COLORS.alignment} border-dotted`}>
              <span className="absolute -right-16 bottom-0 text-[10px] text-cyan-500 font-mono">base</span>
            </div>
          )}
        </>
      )}
      
      {children}
    </div>
  );
};