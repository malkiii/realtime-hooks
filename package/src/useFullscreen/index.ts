import { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useEventListener } from '..';
import { browserPrefixes, getPrefixedProperty } from '../utils';

const fullscreenEvents = browserPrefixes.map(pref => pref + 'fullscreenchange') as any[];

export const useFullscreen = <T extends HTMLElement = HTMLDivElement>(
  ref?: RefObject<T> | null
) => {
  const targetRef = ref ?? useRef<T>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const methods = useMemo(
    () => ({
      async enter(options: FullscreenOptions = {}) {
        if (!targetRef.current) return;

        const requestFullscreen = getPrefixedProperty(targetRef.current, 'requestFullscreen');
        if (!requestFullscreen) return;

        await requestFullscreen(options);

        setIsEnabled(true);
      },
      async exit() {
        if (!targetRef.current) return;

        const exitFullscreen = getPrefixedProperty(document, 'exitFullscreen');
        if (!exitFullscreen) return;

        await exitFullscreen();

        setIsEnabled(false);
      },
      toggle(enable?: boolean) {
        setIsEnabled(curr => {
          const shouldEnable = enable ?? !curr;
          shouldEnable ? this.enter() : this.exit();
          return shouldEnable;
        });
      }
    }),
    []
  );

  const handleFullScreenChange = useCallback(() => {
    if (!targetRef.current) return;
    setIsEnabled(getPrefixedProperty(document, 'fullscreenElement') === targetRef.current);
  }, []);

  useEventListener(fullscreenEvents, handleFullScreenChange, { ref: document });

  return { ref: targetRef, ...methods, isEnabled };
};
