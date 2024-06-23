import { RefObject, useEffect } from 'react';

type EventListener = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventListener
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener: EventListener = (event) => {
      if (startedInside || !startedWhenMounted) return;
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    const validateEventStart: EventListener = (event) => {
      startedWhenMounted = Boolean(ref.current);
      startedInside = Boolean(
        ref.current && ref.current.contains(event.target as Node)
      );
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
