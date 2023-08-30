import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

export type IntersectionObserverOptions = IntersectionObserverInit & {
  once?: boolean;
  callback?: IntersectionObserverCallback;
};

export const useIntersectionObserver = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T>,
  options: IntersectionObserverOptions = {}
) => {
  const { callback, once, ...observerInit } = options;

  const targetRef = ref || useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const callbackMemo: IntersectionObserverCallback = useCallback(
    (entries, observer) => {
      const { isIntersecting } = entries[0];
      setIsIntersecting(isIntersecting);
      if (callback) callback(entries, observer);
      if (isIntersecting && once) observer.unobserve(targetRef.current!);
    },
    [options]
  );

  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callbackMemo, observerInit);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [callbackMemo]);

  return { targetRef, isIntersecting };
};