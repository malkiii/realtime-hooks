import { RefObject, useCallback, useState } from 'react';
import { useEventListener } from '..';
import { getCurrentMousePosition } from '../utils';
import { useNewRef } from '../utils/useNewRef';

export const useMousePosition = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T>) => {
  const targetRef = useNewRef<T>(ref);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setPosition(getCurrentMousePosition(event));
  }, []);

  useEventListener('mousemove', handleMouseMove, { target: () => targetRef.current ?? window });

  return { ref: targetRef, ...position };
};
