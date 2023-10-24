import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useEventListener } from '..';

export const useSelection = <T extends HTMLElement = HTMLDivElement>(ref?: RefObject<T> | null) => {
  const targetRef = ref ?? useRef<T>(null);

  const [text, setText] = useState<string>('');
  const [rect, setRect] = useState<DOMRect>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleSelectionChange = useCallback(() => {
    const currentSelection = document.getSelection();
    const target = currentSelection?.focusNode?.parentElement;
    const isSelecting = !currentSelection?.isCollapsed;

    if (targetRef.current && !targetRef.current.contains(target!)) return;

    setIsSelecting(isSelecting);
    setText(currentSelection?.toString() ?? '');
    if (isSelecting) setRect(currentSelection?.getRangeAt(0).getBoundingClientRect());
  }, [targetRef]);

  const eventOptions = { ref: document, passive: true };

  useEffect(handleSelectionChange, []);
  useEventListener('selectionchange', handleSelectionChange, eventOptions);
  useEventListener(['mouseup', 'touchend'], () => setIsSelecting(false), eventOptions);

  return { ref: targetRef, text, rect, isSelecting };
};
