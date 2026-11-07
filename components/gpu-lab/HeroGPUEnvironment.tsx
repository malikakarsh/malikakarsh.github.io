"use client";

import { useEffect, useRef } from "react";
import { createScene, sceneState } from "./scene";
import { CUBE_SIZE, createLattice, projectLattice } from "./referenceLattice";
import { gpuLabReviewStage } from "@/data/hero-variant";
import styles from "./GPUKernelLab.module.css";

const description = "Illustrative GPU execution: a transparent three-dimensional lattice with illuminated cell planes and four parallel data paths. This is not live benchmark telemetry.";
const still = createLattice(true);
const stillLayout = { width: 1000, height: 500, contentLeft: 80, contentWidth: 840, compact: true };
const stillPoints = Array.from({ length: still.vertices.length / 7 }, (_, index) => {
  const p = projectLattice(still.vertices[index * 7], still.vertices[index * 7 + 1], still.vertices[index * 7 + 2], stillLayout, 0, still.vertices[index * 7 + 3], still.vertices.slice(index * 7 + 4, index * 7 + 7));
  return { x: +p.x.toFixed(3), y: +p.y.toFixed(3) };
});
const stillPaths = Array.from({ length: still.edges.length / 2 }, (_, index) => {
  const a = stillPoints[still.edges[index * 2]], b = stillPoints[still.edges[index * 2 + 1]];
  return `M${a.x},${a.y}L${b.x},${b.y}`;
}).join(" ");
const stillCubePaths = Array.from({ length: (still.edges.length-still.gridEdgeCount)/2 }, (_, i) => {
  const edge=still.gridEdgeCount+i*2, a=stillPoints[still.edges[edge]], b=stillPoints[still.edges[edge+1]];
  return `M${a.x},${a.y}L${b.x},${b.y}`;
}).join(" ");
const stillFaces = Array.from({ length: still.faces.length / 42 }, (_, i) => {
  const kind=still.faces[i*42+3], anchor=still.faces.slice(i*42+4,i*42+7);
  const cameraV=(-.08+.06*(.76/.13))/.27;
  const visible=kind!==3||Math.abs(anchor[1]-cameraV)>=CUBE_SIZE/2;
  const points=[0,7,14,35].map(offset=>{const start=i*42+offset;const p=projectLattice(still.faces[start],still.faces[start+1],still.faces[start+2],stillLayout,0,kind,anchor);return `${p.x.toFixed(3)},${p.y.toFixed(3)}`;}).join(" ");
  return {points,kind,visible};
});

export default function HeroGPUEnvironment() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fallback = useRef<SVGSVGElement>(null);
  const shield = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const surface = canvas.current, hero = surface?.parentElement;
    if (!surface || !hero) return;
    const scene = createScene(surface);
    if (!scene) {
      const resizeFallback=()=>{
        const h=hero.getBoundingClientRect(),stats=hero.querySelector(".credibility")?.getBoundingClientRect();
        for(const layer of [surface,fallback.current,shield.current])if(layer){layer.style.width=`${document.documentElement.clientWidth}px`;layer.style.left=`${-h.left}px`;layer.style.setProperty("--scene-right",`${h.right}px`);layer.style.height=`${Math.max(1,(stats?.top??h.bottom)-h.top)}px`;}
      };
      const sizes=new ResizeObserver(resizeFallback);sizes.observe(hero);resizeFallback();
      return()=>sizes.disconnect();
    }
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, last = 0, paint = 0, time = 0, visible = false, lost = false;
    const pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    hero.dataset.gpuReady = "true";
    function draw() {
      const t = motion.matches || gpuLabReviewStage === "geometry" ? 0 : time;
      scene!.draw(t, pointer, gpuLabReviewStage === "integrated");
      hero!.style.setProperty("--completion", String(motion.matches ? 0 : sceneState(t).completion));
      hero!.dataset.phase = String(t % 8.4 < 1 ? 0 : t % 8.4 < 3.8 ? 1 : t % 8.4 < 5.1 ? 2 : t % 8.4 < 6.5 ? 3 : 4);
    }
    function resize() {
      const h = hero!.getBoundingClientRect();
      const stats = hero!.querySelector(".credibility")?.getBoundingClientRect();
      const height = Math.max(1, (stats?.top ?? h.bottom) - h.top);
      // The canvas belongs to the full-width hero, independent of both columns.
      const width = document.documentElement.clientWidth;
      for (const layer of [surface, fallback.current, shield.current]) if (layer) {
        layer.style.height = `${height}px`;
        layer.style.width = `${width}px`;
        layer.style.left = `${-h.left}px`;
        layer.style.setProperty("--scene-right", `${h.right}px`);
      }
      scene!.resize({ width, height, contentLeft: h.left, contentWidth: h.width, compact: h.width < 600 });
      if (!lost) draw();
    }
    function animate(now: number) {
      frame = 0;
      if (!visible || document.hidden || motion.matches || gpuLabReviewStage === "geometry" || lost) { last = 0; return; }
      const delta = last ? Math.min((now - last) / 1000, .1) : 0;
      last = now; time += delta;
      if (now - paint >= 32) {
        paint = now;
        pointer.x += (target.x - pointer.x) * .07;
        pointer.y += (target.y - pointer.y) * .07;
        draw();
      }
      frame = requestAnimationFrame(animate);
    }
    function sync() {
      cancelAnimationFrame(frame); last = 0;
      if (!lost) draw();
      if (visible && !document.hidden && !motion.matches && gpuLabReviewStage !== "geometry" && !lost) frame = requestAnimationFrame(animate);
    }
    function move(e: PointerEvent) {
      if (!fine.matches || motion.matches || e.pointerType !== "mouse") return;
      const b = hero!.getBoundingClientRect();
      target.x = (e.clientX - b.left) / b.width * 2 - 1;
      target.y = (e.clientY - b.top) / b.height * 2 - 1;
    }
    function leave() { target.x = target.y = 0; }
    function preference() { leave(); pointer.x = pointer.y = 0; sync(); }
    function contextLost(e: Event) {
      e.preventDefault(); lost = true; cancelAnimationFrame(frame);
      delete hero!.dataset.gpuReady; hero!.style.setProperty("--completion", "0");
    }
    const sizes = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    sizes.observe(hero); observer.observe(hero); resize();
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", preference); fine.addEventListener("change", preference);
    hero.addEventListener("pointermove", move, { passive: true }); hero.addEventListener("pointerleave", leave);
    surface.addEventListener("webglcontextlost", contextLost);
    return () => {
      cancelAnimationFrame(frame); sizes.disconnect(); observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", preference); fine.removeEventListener("change", preference);
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
      surface.removeEventListener("webglcontextlost", contextLost);
      scene.dispose(); delete hero.dataset.gpuReady; hero.style.removeProperty("--completion");
    };
  }, []);
  return <>
    <svg ref={fallback} className={`gpu-execution-fabric ${styles.environment} ${styles.surfaceFallback}`} viewBox="0 0 1000 500" role="img" aria-label={description}>
      <g fill="none" stroke="#9bc39e" strokeWidth=".8" opacity=".35"><path d={stillPaths}/></g>
      <g fill="#b6daa9" opacity=".4">{stillPoints.slice(0,still.basePointCount).map((p,index)=><circle key={index} cx={p.x} cy={p.y} r="1"/>)}</g>
      <g>{stillFaces.filter(face=>face.visible).map((face,i)=><polygon key={i} points={face.points} fill={face.kind===2?"#bedd9f":face.kind===3?"#82ad70":"#4a7145"} fillOpacity={face.kind===2?.9:face.kind===3?.78:.58}/>)}</g>
      <g fill="none" stroke="#c9eab7" strokeWidth=".8" opacity=".55"><path d={stillCubePaths}/></g>
      <g fill="#cfebbd" opacity=".6">{stillPoints.slice(still.basePointCount).map((p,index)=><circle key={index} cx={p.x} cy={p.y} r="1"/>)}</g>
    </svg>
    <canvas ref={canvas} className={`gpu-execution-fabric ${styles.environment}`} aria-hidden="true"/>
    <div ref={shield} className={`gpu-execution-fabric ${styles.readability}`} aria-hidden="true"/>
  </>;
}
