type Bounds = { left: number; top: number; right: number; bottom: number };
export type FabricLayout = {
  width: number; height: number; top: number; bottom: number; ratio: number;
  paragraph?: Bounds;
  microtext: Bounds[];
  region: Bounds;
};

type Cell = { x: number; y: number; row: number; column: number; mask: number };
type MemorySegment = { x1: number; y1: number; x2: number; y2: number; mask: number };
type Cluster = {
  x: number; y: number; depth: number; layer: number; size: number;
  rows: number; columns: number; occupancy: number; cells: Cell[];
};


const smooth = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t*t*(3-2*t);
};

// Retain the composed tile locations and dimensions of the existing fabric.
const placements = [
  [0.05,0.12,4,8], [0.24,0.07,4,16], [0.44,0.16,8,8], [0.60,0.05,4,8],
  [0.80,0.10,4,16], [0.96,0.18,8,8], [0.12,0.31,8,8], [0.35,0.34,4,8],
  [0.53,0.29,4,16], [0.69,0.36,8,8], [0.89,0.40,4,8], [0.02,0.52,4,16],
  [0.25,0.57,4,8], [0.46,0.50,8,8], [0.60,0.57,4,8], [0.98,0.61,4,16],
  [0.09,0.77,8,8], [0.32,0.82,4,16], [0.51,0.75,4,8], [0.74,0.83,8,8],
  [0.91,0.86,4,8], [0.40,0.94,4,8],
  [0.16,0.18,4,8], [0.56,0.43,4,8], [0.42,0.74,4,8],
  [0.37,0.11,4,8], [0.49,0.36,4,8], [0.57,0.17,4,8], [0.15,0.89,4,8],
  [0.39,0.68,4,8], [0.57,0.86,4,8], [0.84,0.27,4,8], [0.93,0.67,4,8],
  [0.09,0.05,4,8], [0.31,0.23,4,8], [0.68,0.13,4,8], [0.91,0.07,4,8],
  [0.19,0.42,4,8], [0.43,0.47,4,8], [0.73,0.49,4,8], [0.91,0.37,4,8],
  [0.12,0.61,4,8], [0.32,0.64,4,8], [0.71,0.65,4,8], [0.84,0.77,4,8],
  [0.24,0.94,4,8], [0.62,0.94,4,8], [0.97,0.91,4,8],
];

// A second composed arrangement, not a random placement on every dispatch.
const alternatePlacements = [
  [0.10,0.19,4,8], [0.30,0.13,4,16], [0.49,0.09,8,8], [0.65,0.19,4,8],
  [0.86,0.07,4,16], [0.98,0.30,8,8], [0.06,0.43,8,8], [0.29,0.36,4,8],
  [0.54,0.40,4,16], [0.75,0.28,8,8], [0.94,0.52,4,8], [0.08,0.66,4,16],
  [0.32,0.69,4,8], [0.48,0.60,8,8], [0.64,0.47,4,8], [0.95,0.78,4,16],
  [0.18,0.86,8,8], [0.40,0.87,4,16], [0.58,0.70,4,8], [0.80,0.73,8,8],
  [0.90,0.94,4,8], [0.51,0.92,4,8],
  [0.20,0.29,4,8], [0.57,0.23,4,8], [0.37,0.53,4,8],
  [0.34,0.06,4,8], [0.47,0.26,4,8], [0.58,0.56,4,8], [0.10,0.90,4,8],
  [0.35,0.77,4,8], [0.59,0.09,4,8], [0.81,0.48,4,8], [0.90,0.84,4,8],
  [0.04,0.10,4,8], [0.23,0.05,4,8], [0.43,0.17,4,8], [0.77,0.16,4,8],
  [0.17,0.35,4,8], [0.39,0.41,4,8], [0.69,0.39,4,8], [0.88,0.33,4,8],
  [0.20,0.59,4,8], [0.48,0.75,4,8], [0.73,0.60,4,8], [0.97,0.62,4,8],
  [0.05,0.83,4,8], [0.29,0.91,4,8], [0.69,0.88,4,8],
];

// A third fixed composition completes the A / dark / B / dark / C / dark loop.
const thirdPlacements = [
  [0.08,0.23,4,8], [0.20,0.16,4,16], [0.40,0.08,8,8], [0.62,0.12,4,8],
  [0.78,0.20,4,16], [0.95,0.10,8,8], [0.16,0.38,8,8], [0.33,0.27,4,8],
  [0.51,0.32,4,16], [0.74,0.43,8,8], [0.92,0.31,4,8], [0.03,0.60,4,16],
  [0.28,0.51,4,8], [0.43,0.64,8,8], [0.65,0.54,4,8], [0.98,0.72,4,16],
  [0.11,0.81,8,8], [0.30,0.90,4,16], [0.53,0.81,4,8], [0.76,0.91,8,8],
  [0.88,0.74,4,8], [0.42,0.96,4,8], [0.24,0.05,4,8], [0.59,0.25,4,8],
  [0.39,0.43,4,8], [0.35,0.15,4,8], [0.48,0.24,4,8], [0.69,0.06,4,8],
  [0.16,0.94,4,8], [0.37,0.75,4,8], [0.61,0.91,4,8], [0.84,0.39,4,8],
  [0.95,0.56,4,8], [0.04,0.08,4,8], [0.28,0.34,4,8], [0.48,0.45,4,8],
  [0.83,0.09,4,8], [0.14,0.55,4,8], [0.35,0.59,4,8], [0.71,0.72,4,8],
  [0.86,0.62,4,8], [0.06,0.71,4,8], [0.46,0.86,4,8], [0.58,0.66,4,8],
  [0.97,0.91,4,8], [0.23,0.73,4,8], [0.66,0.38,4,8], [0.88,0.95,4,8],
];

const fabricLayouts=[placements,alternatePlacements,thirdPlacements];

// The active window is 2.27 clock seconds; at 0.448x playback, 0.224 clock
// seconds of idle produces a 0.5-second quiet interval on screen.
export function flightPhase(time: number) {
  const period=2.494;
  const cycle=Math.floor(time/period);
  const phase=((time%period)+period)%period+0.7056;
  return {phase,variant:cycle%fabricLayouts.length,stage:phase>=0.88 && phase<3.15 ? "execution" : "idle"};
}

export function tileSchedule(phase: number,index: number,x: number,y: number,depth: number) {
  const arrival=0.96+x*0.24+y*0.08+(index%3)*0.035;
  return {
    age:phase-arrival,
    duration:1.28+(1-depth)*0.3+(index%4)*0.07,
  };
}

export function scanActivity(age: number,duration: number,row: number,column: number,rows: number,columns: number,mode: number,bandSize=16) {
  if (age<0 || age>duration+0.25) return 0;
  const bands=Math.ceil(rows*columns/bandSize);
  // Horizontal 8/16-cell lanes, paired vertical columns, or tile-major bands.
  const coordinate=mode===0 ? (row+0.5)/rows : mode===1 ? (Math.floor(column/2)+0.5)/Math.ceil(columns/2)
    : bands===1 ? 0.5 : Math.floor((row*columns+column)/bandSize)/(bands-1);
  const front=age/duration*1.5-0.25;
  const distance=front-coordinate;
  const head=Math.exp(-Math.pow(distance/0.19,2));
  const processed=smooth(distance/0.12)*(1-smooth(distance/0.4))*0.22;
  return (head+processed)*smooth(age/0.24)*(1-smooth((age-duration)/0.25));
}

export function createExecutionFabric(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha:true });
  if (!context) return null;
  let layout: FabricLayout;
  let clusterLayouts: Cluster[][] = [];
  let memory: MemorySegment[] = [];
  const idle=fabricLayouts.map(() => document.createElement("canvas"));
  const idleContexts=idle.map(tile => tile.getContext("2d")!);
  const sprites: HTMLCanvasElement[] = [];

  function sprite(color: string, blur: number, glow: boolean) {
    const tile=document.createElement("canvas");
    tile.width=tile.height=48;
    const ctx=tile.getContext("2d")!;
    ctx.filter=`blur(${blur}px)`;
    ctx.fillStyle=color;
    if (glow) { ctx.shadowColor=color;ctx.shadowBlur=6; }
    ctx.fillRect(19,19,10,10);
    sprites.push(tile);
    return tile;
  }
  // Three cached depth layers: muted slate-green at rest, pale green processing.
  const activeTiles=[sprite("#b4d89e",2.2,true),sprite("#b4d89e",0.8,true),sprite("#b4d89e",0,true)];
  const idleTiles=[sprite("#82918a",2.2,false),sprite("#82918a",0.8,false),sprite("#a3ada5",0,false)];

  function textWeight(x: number,y: number,b: Bounds,padding: number,strength: number) {
    const distance=Math.hypot(Math.max(b.left-x,0,x-b.right),Math.max(b.top-y,0,y-b.bottom));
    return strength+(1-strength)*smooth((distance-padding)/24);
  }
  function mask(x: number,y: number) {
    let readability=layout.paragraph ? textWeight(x,y,layout.paragraph,12,0.08) : 1;
    for (const bounds of layout.microtext) readability=Math.min(readability,textWeight(x,y,bounds,48,0.06));
    const fadeStart=layout.region.bottom-48;
    return (1-smooth((y-fadeStart)/(layout.bottom-2-fadeStart)))*readability;
  }

  return {
    resize(next: FabricLayout) {
      layout=next;
      canvas.width=Math.round(next.width*next.ratio);
      canvas.height=Math.round(next.height*next.ratio);
      idle.forEach(tile => { tile.width=canvas.width;tile.height=canvas.height; });
      context.setTransform(next.ratio,0,0,next.ratio,0,0);
      idleContexts.forEach(ctx => ctx.setTransform(next.ratio,0,0,next.ratio,0,0));
      const mobile=next.width<600;
      clusterLayouts=fabricLayouts.map(positions => positions.map(([nx,ny,rows,columns],index) => {
        const layer=index%8===2 ? 2 : index%3===0 ? 0 : 1,depth=[0.35,0.62,0.9][layer];
        const pitch=(mobile ? 5.5 : 7.5)*(0.8+depth*0.35);
        const x=next.region.left+nx*(next.region.right-next.region.left);
        const y=next.region.top+ny*(next.region.bottom-next.region.top);
        const cells: Cell[]=[];
        for (let row=0;row<rows;row++) for (let column=0;column<columns;column++) {
          // Trim whole corner blocks and edge rows, not random individual dots.
          if (index%4===0 && column>=columns-4 && row<rows/2) continue;
          if (index%5===1 && row===rows-1) continue;
          // A tiny keystone/shear gives each tile a plane in the compute surface.
          const plane=1+(row/rows-0.5)*0.045;
          const cellX=x+(column-columns/2)*pitch*plane;
          const cellY=y+(row-rows/2)*pitch+(column-columns/2)*pitch*(1-depth)*0.045;
          const edge=Math.min(row+0.5,rows-row-0.5,column+0.5,columns-column-0.5);
          cells.push({x:cellX,y:cellY,row,column,mask:mask(cellX,cellY)*(0.45+0.55*smooth(edge/1.5))});
        }
        return {x,y,depth,layer,size:pitch*0.46,rows,columns,occupancy:[0.45,0.75,0.6,1,0.7][index%5],cells};
      }));
      memory=[];
      for (const [bus,fraction] of [0.19,0.53,0.84].entries()) {
        const base=next.region.top+(next.region.bottom-next.region.top)*fraction;
        for (let x=next.region.left;x<next.region.right;x+=24) {
          const route=(v: number) => base+Math.max(0,Math.min(1,((v-next.region.left)/(next.region.right-next.region.left)-0.32)/0.22))*(bus===1 ? -13 : 10);
          const x2=Math.min(next.region.right,x+24),y1=route(x),y2=route(x2);
          memory.push({x1:x,y1,x2,y2,mask:mask((x+x2)/2,(y1+y2)/2)});
        }
      }
      clusterLayouts.forEach((clusters,variant) => {
        const idleContext=idleContexts[variant];
        idleContext.clearRect(0,0,next.width,next.height);
        for (const cluster of clusters) for (const cell of cluster.cells) {
          const spread=cluster.size*4.8;
          idleContext.globalAlpha=(0.003+cluster.depth*0.006)*cell.mask;
          idleContext.drawImage(idleTiles[cluster.layer],cell.x-(spread-cluster.size)/2,cell.y-(spread-cluster.size)/2,spread,spread);
        }
        idleContext.globalAlpha=1;
      });
    },
    draw(time: number,cursor: { x:number; y:number; active:number },reduced: boolean) {
      if (!layout) return;
      const {phase,variant}=flightPhase(reduced ? 1.95 : time);
      context.clearRect(0,0,layout.width,layout.height);
      context.save();
      context.beginPath();
      context.rect(layout.region.left,layout.region.top,layout.region.right-layout.region.left,layout.region.bottom-layout.region.top);
      context.clip();
      const clusters=clusterLayouts[variant];
      context.drawImage(idle[variant],0,0,layout.width,layout.height);
      // Dormant routing is only revealed gently by cursor proximity.
      context.strokeStyle="#82918a";
      context.lineWidth=0.55;
      for (const lane of memory) {
        const x=(lane.x1+lane.x2)/2,y=(lane.y1+lane.y2)/2;
        const proximity=Math.exp(-Math.pow(Math.hypot(cursor.x-x,cursor.y-y)/130,2))*cursor.active;
        context.globalAlpha=(0.002+proximity*0.018)*lane.mask;
        context.beginPath();context.moveTo(lane.x1,lane.y1);context.lineTo(lane.x2,lane.y2);context.stroke();
      }
      for (let index=0;index<clusters.length;index++) {
        const cluster=clusters[index];
        const distance=Math.hypot(cursor.x-cluster.x,cursor.y-cluster.y);
        const reveal=Math.exp(-distance*distance/(2*150*150))*cursor.active;
        const dx=reduced ? 0 : (cursor.x/layout.width-0.5)*cluster.depth*6*cursor.active;
        const dy=reduced ? 0 : (cursor.y/layout.height-0.5)*cluster.depth*4*cursor.active;
        const schedule=tileSchedule(phase,index,(cluster.x-layout.region.left)/(layout.region.right-layout.region.left),(cluster.y-layout.region.top)/(layout.region.bottom-layout.region.top),cluster.depth);
        const mode=index%3,spread=cluster.size*4.8;
        const bandSize=index%8===2 ? 32 : 16;
        for (const cell of cluster.cells) {
          const lane=mode===1 ? Math.floor(cell.column/2) : Math.floor((cell.row*cluster.columns+cell.column)/8);
          const lanes=mode===1 ? Math.ceil(cluster.columns/2) : Math.ceil(cluster.rows*cluster.columns/8);
          const occupied=lane<Math.ceil(lanes*cluster.occupancy);
          const execution=occupied ? scanActivity(schedule.age,schedule.duration,cell.row,cell.column,cluster.rows,cluster.columns,mode,bandSize) : 0;
          const finishing=1-smooth((phase-2.65)/0.5);
          // The low scheduling envelope is visible only on the compute substrate.
          const substrate=(cell.x-layout.region.left)/(layout.region.right-layout.region.left)+(cell.y-layout.region.top)/(layout.region.bottom-layout.region.top)*0.14;
          const dispatch=phase<0.88 ? 0 : Math.exp(-Math.pow((substrate-(phase-0.9)/0.62)/0.23,2))
            *smooth((phase-0.88)/0.12)*(1-smooth((phase-1.4)/0.25))*0.055;
          const processing=execution*finishing*(0.34+cluster.depth*0.27)+dispatch;
          // Cursor lifts dormant cells in slate, without creating a drawn spotlight.
          const revealStrength=reveal*0.045*cell.mask;
          if (revealStrength>0.002) {
            context.globalAlpha=revealStrength;
            context.drawImage(idleTiles[cluster.layer],cell.x+dx-(spread-cluster.size)/2,cell.y+dy-(spread-cluster.size)/2,spread,spread);
          }
          const strength=Math.min(0.72,processing)*cell.mask;
          if (strength<0.003) continue;
          context.globalAlpha=strength;
          context.drawImage(activeTiles[cluster.layer],cell.x+dx-(spread-cluster.size)/2,cell.y+dy-(spread-cluster.size)/2,spread,spread);
        }
      }
      context.globalAlpha=1;
      context.restore();
    },
    dispose() {
      idle.forEach(tile => { tile.width=tile.height=0; });
      sprites.forEach(tile => { tile.width=tile.height=0; });
    },
  };
}
