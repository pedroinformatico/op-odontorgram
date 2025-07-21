import { useState, useCallback } from 'react';

interface UseBiteAnimationReturn {
  showBiteEffect: boolean;
  isAnimatingBite: boolean;
  setShowBiteEffect: (show: boolean) => void;
  simulateBite: () => void;
}

export function useBiteAnimation(): UseBiteAnimationReturn {
  const [showBiteEffect, setShowBiteEffect] = useState(false);
  const [isAnimatingBite, setIsAnimatingBite] = useState(false);

  const simulateBite = useCallback(() => {
    if (isAnimatingBite) return;

    setIsAnimatingBite(true);
    setShowBiteEffect(false); // Cerrar boca

    setTimeout(() => {
      setShowBiteEffect(true); // Abrir boca
    }, 300);

    setTimeout(() => {
      setShowBiteEffect(false); // Morder
    }, 1000);

    setTimeout(() => {
      setIsAnimatingBite(false); // Finalizar animación
    }, 1500);
  }, [isAnimatingBite]);

  return {
    showBiteEffect,
    isAnimatingBite,
    setShowBiteEffect,
    simulateBite
  };
}