'use client';
import { useLayoutEffect, useRef, useState, ReactNode } from 'react';

/**
 * Scales its content down to fit the viewport height on large screens.
 *
 * On a tall desktop display the scale stays 1 (no visual change). On a short
 * screen - e.g. a 13" MacBook Air where the layout would otherwise be clipped
 * by the `lg:h-screen lg:overflow-hidden` container - the content is uniformly
 * scaled down just enough to fit, so nothing gets cut off and no scroll is
 * needed. Below the `lg` breakpoint the layout scrolls normally (scale 1).
 */
export default function FitToScreen({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const compute = () => {
      const inner = innerRef.current;
      const outer = outerRef.current;
      if (!inner || !outer) return;

      // Only fit-to-screen on `lg` and up, where the container is height-locked.
      if (window.innerWidth < 1024) {
        setScale(1);
        return;
      }

      // Vertical padding of the page container (lg:p-6 => 1.5rem top + bottom).
      const verticalPadding = 48;
      const availH = window.innerHeight - verticalPadding;
      const availW = outer.clientWidth;

      // offsetWidth/Height are the untransformed layout box, so measuring here
      // is stable and does not feed back into the ResizeObserver.
      const contentH = inner.offsetHeight;
      const contentW = inner.offsetWidth;
      if (contentH === 0 || contentW === 0) return;

      setScale(Math.min(1, availH / contentH, availW / contentW));
    };

    compute();

    const ro = new ResizeObserver(compute);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <div ref={outerRef} className="w-full relative z-10">
      <div
        ref={innerRef}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
      >
        {children}
      </div>
    </div>
  );
}
