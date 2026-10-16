"use client";
import { useEffect, useRef } from "react";
import { createExperimentalGrid } from "./fabric/experimentalGrid";
// Independent lifecycle and geometry: baseline code is intentionally untouched.
export default function HeroExperimentalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, hero = canvas?.parentElement;
    if (!canvas || !hero)
      return;
    const grid = createExperimentalGrid(canvas);
    if (!grid)
      return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let time = 0, frame = 0, last = 0, visible = false, resizeFrame = 0;
    const cursor = { x: 0, y: 0, active: 0 }, target = { x: 0, y: 0, active: 0 };
    function draw() { grid?.draw(time, cursor, reduced.matches); }
    function resize() {
      resizeFrame = 0;
      if (!hero || !canvas || !grid)
        return;
      const b = hero.getBoundingClientRect();
      const heroGrid = hero.querySelector(".hero-grid")?.getBoundingClientRect();
      const copy = hero.querySelector(".hero-copy")?.getBoundingClientRect();
      const card = hero.querySelector(".hero-performance")?.getBoundingClientRect();
      const stats = hero.querySelector(".credibility")?.getBoundingClientRect();
      if (!heroGrid || !copy) return;
      const sideBySide = card && card.left >= copy.right - 1;
      // Restrict the lattice to the left hero block, including its empty space.
      // On stacked layouts it stops before the benchmark card begins.
      const left = heroGrid.left;
      const top = heroGrid.top;
      const right = sideBySide ? card.left - 12 : heroGrid.right;
      const bottomEdge = !sideBySide && card ? card.top - 16 : (stats?.top ?? heroGrid.bottom) - 12;
      const width = Math.max(1, right - left);
      const bottom = Math.max(1, bottomEdge - top);
      const quiet = Array.from(hero.querySelectorAll(".hero-description, .hero-location, .hero-actions, .hero-topline .eyebrow, .availability, .hero-direction"))
        .map(e => ({ element: e, rect: e.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && rect.height > 0)
        .map(({ element, rect }) => ({ left: rect.left - left, top: rect.top - top, right: rect.right - left, bottom: rect.bottom - top,
        padding: element.matches(".hero-description, .hero-actions") ? 16 : 36, strength: 0.07 }));
      Object.assign(canvas.style, {
        left: `${left - b.left}px`, top: `${top - b.top}px`, right: "auto", bottom: "auto",
        width: `${width}px`, height: `${bottom}px`,
      });
      canvas.style.maskImage = `linear-gradient(to bottom, #000 ${Math.max(0, bottom - 68)}px, transparent ${bottom - 4}px)`;
      grid.resize({ width, height: bottom, bottom, ratio: Math.min(window.devicePixelRatio || 1, 1.5), quiet });
      draw();
    }
    function queueResize() { if (!resizeFrame)
      resizeFrame = requestAnimationFrame(resize); }
    function animate(timestamp: number) {
      if (reduced.matches || !visible || document.hidden) {
        sync();
        return;
      }
      const delta = last ? Math.min((timestamp - last) / 1000, 0.05) : 0;
      last = timestamp;
      time += delta;
      const ease = 1 - Math.exp(-delta * 3);
      cursor.x += (target.x - cursor.x) * ease;
      cursor.y += (target.y - cursor.y) * ease;
      cursor.active += (target.active - cursor.active) * ease;
      draw();
      frame = requestAnimationFrame(animate);
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (reduced.matches || !pointer.matches)
        cursor.active = target.active = 0;
      if (visible && !document.hidden) {
        draw();
        if (!reduced.matches)
          frame = requestAnimationFrame(animate);
      }
    }
    function move(event: PointerEvent) {
      if (!hero || !canvas || !pointer.matches || reduced.matches || event.pointerType !== "mouse")
        return;
      const b = canvas.getBoundingClientRect();
      target.x = event.clientX - b.left;
      target.y = event.clientY - b.top;
      target.active = 1;
    }
    function leave() { target.active = 0; }
    const sizes = new ResizeObserver(queueResize), visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    sizes.observe(hero);
    const heroGrid = hero.querySelector(".hero-grid");
    if (heroGrid)
      sizes.observe(heroGrid);
    visibility.observe(hero);
    resize();
    window.addEventListener("resize", queueResize, { passive: true });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      sizes.disconnect();
      visibility.disconnect();
      window.removeEventListener("resize", queueResize);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      grid.dispose();
    };
  }, []);
  return <canvas ref={canvasRef} className="gpu-execution-fabric experimental-grid-canvas" aria-hidden="true"/>;
}
