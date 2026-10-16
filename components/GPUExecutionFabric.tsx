"use client";

import { useEffect, useRef } from "react";
import { createExecutionFabric } from "./fabric/executionFabric";

export default function GPUExecutionFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const fabric = createExecutionFabric(canvas);
    if (!fabric) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 761px) and (hover: hover) and (pointer: fine)");
    let frame=0,lastTime=0,time=0,resizeFrame=0,visible=false;
    const cursor = { x:0,y:0,active:0 };
    const target = { x:0,y:0,active:0 };

    function draw() { fabric?.draw(time,cursor,motion.matches); }
    function resize() {
      resizeFrame=0;
      if (!fabric || !hero || !canvas) return;
      const bounds=hero.getBoundingClientRect();
      const grid=hero.querySelector(".hero-grid")?.getBoundingClientRect() ?? bounds;
      const stats=hero.querySelector(".credibility")?.getBoundingClientRect();
      const paragraph=hero.querySelector(".hero-description")?.getBoundingClientRect();
      const card=hero.querySelector(".hero-performance")?.getBoundingClientRect();
      const copy=hero.querySelector(".hero-copy")?.getBoundingClientRect();
      const microtext=Array.from(hero.querySelectorAll(".hero-topline .eyebrow, .availability, .hero-location, .hero-direction"))
        .map(element => element.getBoundingClientRect()).filter(rect => rect.width>0 && rect.height>0)
        .map(rect => ({ left:rect.left-bounds.left,top:rect.top-bounds.top,right:rect.right-bounds.left,bottom:rect.bottom-bounds.top }));
      const sideBySide=card && copy && card.left>=copy.right-1;
      const region={
        left:grid.left-bounds.left,
        right:sideBySide ? card.left-bounds.left-12 : grid.right-bounds.left,
        top:grid.top-bounds.top,
        bottom:!sideBySide && card ? card.top-bounds.top-16 : (stats?.top ?? grid.bottom)-bounds.top-12,
      };
      const bottom=region.bottom;
      const fadeStart=bottom-48;
      // Fade the rendered glow as well as the cells before the statistics strip.
      canvas.style.maskImage=`linear-gradient(to bottom, #000 ${Math.max(0,fadeStart)}px, transparent ${bottom-2}px)`;
      const ratio=Math.min(window.devicePixelRatio || 1,1.5);
      fabric.resize({ width:bounds.width,height:bounds.height,top:grid.top-bounds.top,bottom,
        paragraph:paragraph ? { left:paragraph.left-bounds.left,top:paragraph.top-bounds.top,right:paragraph.right-bounds.left,bottom:paragraph.bottom-bounds.top } : undefined,
        ratio,microtext,region,
      });
      draw();
    }
    function queueResize() {
      if (!resizeFrame) resizeFrame=window.requestAnimationFrame(resize);
    }
    function animate(timestamp: number) {
      if (motion.matches || !visible || document.hidden) { sync();return; }
      const delta=lastTime ? Math.min((timestamp-lastTime)/1000,0.05) : 0;
      lastTime=timestamp;
      time+=delta*0.448;
      const easing=1-Math.exp(-delta*3);
      cursor.x+=(target.x-cursor.x)*easing;
      cursor.y+=(target.y-cursor.y)*easing;
      cursor.active+=(target.active-cursor.active)*easing;
      draw();
      frame=window.requestAnimationFrame(animate);
    }
    function sync() {
      window.cancelAnimationFrame(frame);
      frame=0;lastTime=0;
      if (motion.matches || !desktop.matches) cursor.active=target.active=0;
      if (visible && !document.hidden) {
        draw();
        if (!motion.matches) frame=window.requestAnimationFrame(animate);
      }
    }
    function move(event: PointerEvent) {
      if (!hero || !desktop.matches || motion.matches || event.pointerType!=="mouse") return;
      const bounds=hero.getBoundingClientRect();
      target.x=event.clientX-bounds.left;
      target.y=event.clientY-bounds.top;
      target.active=1;
    }
    function leave() { target.active=0; }
    const sizes=new ResizeObserver(queueResize);
    const visibility=new IntersectionObserver(([entry]) => { visible=entry.isIntersecting;sync(); });
    sizes.observe(hero);
    const grid=hero.querySelector(".hero-grid");
    if (grid) sizes.observe(grid);
    visibility.observe(hero);
    resize();
    window.addEventListener("resize",queueResize,{ passive:true });
    document.addEventListener("visibilitychange",sync);
    motion.addEventListener("change",sync);
    desktop.addEventListener("change",sync);
    hero.addEventListener("pointermove",move,{ passive:true });
    hero.addEventListener("pointerleave",leave);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(resizeFrame);
      sizes.disconnect();visibility.disconnect();
      window.removeEventListener("resize",queueResize);
      document.removeEventListener("visibilitychange",sync);
      motion.removeEventListener("change",sync);
      desktop.removeEventListener("change",sync);
      hero.removeEventListener("pointermove",move);
      hero.removeEventListener("pointerleave",leave);
      fabric.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="gpu-execution-fabric" aria-hidden="true" />;
}
