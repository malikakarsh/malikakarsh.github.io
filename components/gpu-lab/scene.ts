import { CUBE_SIZE, createLattice, latticeViewport, type LatticeLayout } from "./referenceLattice";
export const CYCLE = 8.4;
export function sceneState(time: number) {
  const t = time % CYCLE;
  return { t, completion: Math.exp(-Math.pow((t - 5.5) / .65, 2)) };
}
const quadVertex = `attribute vec2 position;varying vec2 uv;
void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`;
const atmosphereFragment = `precision mediump float;
varying vec2 uv;uniform float time;uniform float completion;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
void main(){
 vec2 p=uv*vec2(5.,3.);float t=time*.035;
 vec2 drift=vec2(noise(p+vec2(t,2.)),noise(p+vec2(5.,-t)));
 float density=noise(p+drift*1.8);
 float region=exp(-length((uv-vec2(.64,.49))*vec2(2.5,3.3)));
 float veil=smoothstep(0.,.12,uv.y)*(1.-smoothstep(.86,1.,uv.y));
 vec3 color=vec3(.05,.13,.075)*density*region*(.24+completion*.1);
 gl_FragColor=vec4(color*veil,0.);
}`;
const latticeVertex = `precision highp float;
attribute vec4 position;attribute vec3 anchor;
uniform float time;uniform float phase;uniform float ratio;uniform vec2 resolution;uniform vec2 content;uniform vec2 vertical;uniform vec3 flowInfo;uniform vec4 flowRows;uniform vec2 pointer;uniform float completion;uniform highp float glow;
varying float energy;varying float depth;varying float kind;varying float visibility;varying float along;varying float lane;varying vec2 faceUV;varying float flowAmount;
vec2 curve(vec2 a,vec2 b,vec2 c,vec2 d,float t){float q=1.-t;return q*q*q*a+3.*q*q*t*b+3.*q*t*t*c+t*t*t*d;}
float flowRow(float layer){return layer<.5?flowRows.x:(layer<1.5?flowRows.y:(layer<2.5?flowRows.z:flowRows.w));}
vec2 gridNode(float index,float layer){
 float u=index*16./(flowInfo.y-1.),v=flowRow(layer),w=(layer/(flowInfo.z-1.)-.5)*1.3;
 float d=1.+u*.23;
 float ripple=sin(u*.55-time*.6)*.018*sin(v*1.2);
 return vec2(content.x+content.y*(1.22-.76/d+w*.13/d),vertical.x+vertical.y*(.42+((v+ripple)*.27-w*.06+.08)/d));
}
vec2 entryRoute(float t,float index){
 vec2 end=gridNode(0.,index),next=gridNode(1.,index),far=gridNode(flowInfo.y-1.,index);
 vec2 tangent=normalize(next-end);
 float reach=length(far-end)*.3/(3.*.7);
 vec2 start=vec2(content.x+.02*content.y,vertical.x+(1.02-index*.028)*vertical.y);
 vec2 control=vec2(content.x+.22*content.y,vertical.x+(.94-index*.028)*vertical.y);
 vec2 p=curve(start,control,end-tangent*reach,end,t);
 float envelope=sin(t*3.14159265);
 p.y+=envelope*envelope*.018*vertical.y*sin(t*3.14159265*2.*1.35-time*.70);
 return p;
}
float outputU(float progress){return (1./(1.-progress*(1.-1./(1.+16.*.23)))-1.)/.23;}
vec2 packetRoute(float progress,float index){
 if(progress<.3)return entryRoute(progress/.3,index);
 float u=outputU((progress-.3)/.7);
 float point=u/16.*(flowInfo.y-1.);
 float low=min(flowInfo.y-2.,floor(point));
 return mix(gridNode(low,index),gridNode(low+1.,index),min(1.,point-low));
}
float cellHash(float n){return fract(sin(n*127.1+311.7)*43758.5453);}
void main(){
 float u=position.x,v=position.y,w=position.z;kind=position.w;visibility=1.;
 bool cube=kind>1.5&&kind<4.5;
 bool packet=kind>5.5;
 bool path=(kind>.5&&kind<1.5)||packet;
 flowAmount=0.;
 float maxLayer=-.65+3.*1.3/(flowInfo.z-1.);
 float gridLane=floor((w+.65)*(flowInfo.z-1.)/1.3+.5);
 if(kind<.5&&gridLane<3.5&&abs(v-flowRow(gridLane))<.0001&&w<=maxLayer+.0001)flowAmount=1.;
 if(path)flowAmount=1.;
 float pathT=packet?fract(position.x+time*.18):position.x;
 vec3 cubeCenter=anchor;
 if(cube){
   float seed=dot(anchor,vec3(13.7,7.1,31.3));
   float duration=4.8+cellHash(seed+1.)*2.;
   float tick=time/duration+cellHash(seed+2.)*.9;
   float generation=floor(tick),age=fract(tick);
   visibility=smoothstep(.01,.16,age)*(1.-smoothstep(.76,.99,age));
   vec3 destination=anchor;
   if(generation>.5){
     float h=seed+generation*19.7;
     float band=anchor.x<2.?0.:(anchor.x<8.?1.:2.);
     float column=band<.5?floor(cellHash(h+1.)*3.):(band<1.5?6.+floor(cellHash(h+1.)*8.):14.+floor(cellHash(h+1.)*13.));
     destination=vec3(column*(16./28.),(floor(cellHash(h+2.)*9.)-4.)*.32,(floor(cellHash(h+3.)*3.)-1.)*.325);
   }
   // Independent cells appear at different positions, then continue flowing.
   // Each gets its own speed; positions reset only during zero-opacity intervals.
   destination.x+=age*duration*(.30+cellHash(seed+4.)*.15);
   destination.y-=.10*exp(-pow((destination.x-2.4)/3.,2.));
   visibility*=1.-smoothstep(15.5,16.6,destination.x);
   cubeCenter=destination;
   vec3 modelLocal=position.xyz-anchor;
   vec3 local=modelLocal;
   if(kind>2.5&&kind<3.5){
     float cameraV=(-.08+.06*(.76/.13))/.27;
     local.y=(destination.y>cameraV?-1.:1.)*abs(local.y);
     if(abs(destination.y-cameraV)<${(CUBE_SIZE/2).toFixed(3)})visibility=0.;
   }
   u=destination.x+local.x;v=destination.y+local.y;w=destination.z+local.z;
   faceUV=(kind<2.5?modelLocal.zy:(kind<3.5?modelLocal.xz:modelLocal.xy))/${CUBE_SIZE.toFixed(2)}+.5;
 }
 if(path){
   u=packet?(pathT<.3?-1.4+(pathT/.3)*1.4:outputU((pathT-.3)/.7)):-1.4+pathT*1.4;
   v=flowRow(position.y);w=(position.y/(flowInfo.z-1.)-.5)*1.3;
   visibility=packet?smoothstep(0.,.025,pathT)*(1.-smoothstep(.965,1.,pathT)):1.;
 }
 float d=1.+u*.23;
 float ripple=cube?0.:sin(u*.55-time*.6)*.018*sin(v*1.2);

 vec2 pixel=vec2(content.x+content.y*(1.22-.76/d+w*.13/d),vertical.x+vertical.y*(.42+((v+ripple)*.27-w*.06+.08)/d));
 if(!cube)faceUV=vec2(.5);
 if(path)pixel=packet?packetRoute(pathT,position.y):entryRoute(pathT,position.y);
 along=u;lane=flowAmount>.5?(w+.65)*(flowInfo.z-1.)/1.3:v;
 pixel+=pointer*1.7;
 gl_Position=vec4(pixel/resolution*vec2(2.,-2.)+vec2(-1.,1.),0.,1.);
 float front=(phase-1.)*6.;
 float wave=exp(-pow((u-front)/1.6,2.))+.65*exp(-pow((u-front+4.)/1.3,2.));
 float window=smoothstep(.2,1.2,phase)*(1.-smoothstep(4.,4.8,phase));
 float afterglow=exp(-max(0.,front-u)*.095)*smoothstep(0.,1.,front-u);
 float reduce=exp(-pow((u-(phase-3.7)*12.)/2.,2.))*smoothstep(3.7,4.,phase)*(1.-smoothstep(5.,5.5,phase));
 float parallel=.65+.35*cos(v*3.1+w*2.);
 energy=.12+wave*window*parallel*.7+afterglow*window*.15+reduce*.55+completion*.15;
 // Input traces stay continuously alive; short coordinated fronts travel along them.
 if(flowAmount>.5)energy+=.23+wave*window*.5;
 if(cube)energy+=.48+.16*sin(v*2.+u*.3+time*.35);
 if(packet)energy=1.25;
 depth=1./d;
 gl_PointSize=(packet?1.7:(1.25+depth*.7+energy*.75))*ratio*(1.+glow*.8);
}`;
const lineFragment = `precision mediump float;
varying float energy;varying float depth;varying float kind;varying float visibility;varying float along;varying float lane;varying vec2 faceUV;varying float flowAmount;uniform highp float glow;uniform highp float time;
void main(){
 float trace=max(step(.5,kind)*(1.-step(1.5,kind)),smoothstep(.95,1.,flowAmount));
 float travelling=pow(max(0.,cos((along-time*1.6)*4.2+lane*2.)),24.);
 float a=(.045+energy*.14)*(.38+depth*.62);
 if(trace>.5)a=(.22+energy*.24+travelling*.18)*(.38+depth*.62);
 if(kind>1.5&&kind<4.5)a=(.12+energy*.35)*(.55+depth*.45);
 vec3 color=mix(vec3(.18,.43,.27),vec3(.77,.96,.68),clamp(energy*.9+trace*.2,0.,1.));
 a*=(1.+glow*.25)*visibility;
 if(glow>.5)a*=smoothstep(.2,.8,energy);gl_FragColor=vec4(color*a,a);
}`;
const pointFragment = `precision mediump float;
varying float energy;varying float depth;varying float kind;varying float visibility;varying float along;varying float lane;varying vec2 faceUV;varying float flowAmount;uniform highp float glow;uniform highp float time;
void main(){
 vec2 p=gl_PointCoord-.5;float r=length(p);
 float core=1.-smoothstep(.15,.45,r);float halo=exp(-r*r*10.)*.22;
 float a=(core+halo)*(.24+energy*.65)*(.4+depth*.6)*visibility;
 if(glow>.5)a*=.25*smoothstep(.35,.9,energy);
 vec3 color=mix(vec3(.56,.81,.49),vec3(.82,.98,.72),clamp(energy,0.,1.));
 gl_FragColor=vec4(color*a,a);
}`;
const faceFragment = `precision mediump float;
varying float energy;varying float depth;varying float kind;varying float visibility;varying float along;varying float lane;varying vec2 faceUV;varying float flowAmount;uniform highp float glow;uniform highp float time;
void main(){
 float highlight=exp(-dot(faceUV-vec2(.55,.45),faceUV-vec2(.55,.45))*9.);
 bool front=kind<2.5;bool top=kind>2.5&&kind<3.5;
 float a=front?.95:(top?.78:.58);
 // Full-visibility tones reproduce the reference's green luminance bands:
 // luminous front, softer horizontal face, and a darker green side.
 vec3 color=front?mix(vec3(.56,.78,.50),vec3(.80,.98,.70),highlight):(top?vec3(.65,.89,.58):vec3(.50,.77,.47));
 a*=visibility*mix(1.,.12,glow);
 gl_FragColor=vec4(color*a,a);
}`;
const compositeFragment = `precision mediump float;
varying vec2 uv;uniform sampler2D image;uniform vec2 texel;
void main(){vec4 c=texture2D(image,uv)*.18;
 c+=texture2D(image,uv+texel*vec2(1.,0.))*.12;c+=texture2D(image,uv-texel*vec2(1.,0.))*.12;
 c+=texture2D(image,uv+texel*vec2(0.,1.))*.12;c+=texture2D(image,uv-texel*vec2(0.,1.))*.12;
 c+=texture2D(image,uv+texel*vec2(1.,1.))*.085;c+=texture2D(image,uv-texel*vec2(1.,1.))*.085;
 c+=texture2D(image,uv+texel*vec2(1.,-1.))*.085;c+=texture2D(image,uv+texel*vec2(-1.,1.))*.085;
 gl_FragColor=c;}`;
export type SceneLayout = LatticeLayout;
export function createScene(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [], programs: WebGLProgram[] = [], buffers: WebGLBuffer[] = [];
  let texture: WebGLTexture | null = null, target: WebGLFramebuffer | null = null;
  function dispose() { gl!.deleteTexture(texture); gl!.deleteFramebuffer(target); buffers.forEach(b => gl!.deleteBuffer(b)); programs.forEach(p => gl!.deleteProgram(p)); shaders.forEach(s => gl!.deleteShader(s)); }
  function program(v: string, f: string) {
    const p = gl!.createProgram(); if (!p) return null; programs.push(p);
    for (const [type, source] of [[gl!.VERTEX_SHADER, v], [gl!.FRAGMENT_SHADER, f]] as const) {
      const s = gl!.createShader(type); if (!s) return null; shaders.push(s); gl!.shaderSource(s, source); gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) { console.error("GPU Lab shader:", gl!.getShaderInfoLog(s)); return null; } gl!.attachShader(p, s);
    }
    gl!.linkProgram(p); if (!gl!.getProgramParameter(p, gl!.LINK_STATUS)) { console.error("GPU Lab program:", gl!.getProgramInfoLog(p)); return null; } return p;
  }
  const atmosphere = program(quadVertex, atmosphereFragment), lines = program(latticeVertex, lineFragment), points = program(latticeVertex, pointFragment), walls = program(latticeVertex, faceFragment), composite = program(quadVertex, compositeFragment);
  if (!atmosphere || !lines || !points || !walls || !composite) { dispose(); return null; }
  const uniforms = new Map<WebGLProgram, Record<string, WebGLUniformLocation | null>>();
  const attributes = new Map<WebGLProgram, number>();
  const anchors = new Map<WebGLProgram, number>();
  for (const p of programs) {
    const u: Record<string, WebGLUniformLocation | null> = {};
    for (const key of ["time", "phase", "ratio", "resolution", "content", "vertical", "flowInfo", "flowRows", "pointer", "completion", "glow", "image", "texel"]) u[key] = gl.getUniformLocation(p, key);
    uniforms.set(p, u); attributes.set(p, gl.getAttribLocation(p, "position")); anchors.set(p, gl.getAttribLocation(p, "anchor"));
  }
  function buffer(data: number[], element = false) {
    const b = gl!.createBuffer(); if (!b) return null; buffers.push(b);
    const type = element ? gl!.ELEMENT_ARRAY_BUFFER : gl!.ARRAY_BUFFER;
    gl!.bindBuffer(type, b); gl!.bufferData(type, element ? new Uint16Array(data) : new Float32Array(data), gl!.STATIC_DRAW); return b;
  }
  const quad = buffer([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);
  let vertices: WebGLBuffer | null = null, edges: WebGLBuffer | null = null, faces: WebGLBuffer | null = null;
  let flowRowValues = [.64,.32,.32,0];
  let flowV = .32, flowSlices = 29, flowLayers = 5;
  let edgeCount = 0, gridEdgeCount = 0, cubeEdgeCount = 0, basePointCount = 0, pointCount = 0, faceCount = 0, compact: boolean | undefined, ratio = 1, glowWidth = 1, glowHeight = 1;
  let layout: SceneLayout = { width: 1, height: 1, contentLeft: 0, contentWidth: 1, compact: false };
  texture = gl.createTexture(); target = gl.createFramebuffer(); if (!texture || !target) { dispose(); return null; }
  gl.bindTexture(gl.TEXTURE_2D, texture); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  function bind(p: WebGLProgram, b: WebGLBuffer | null, size: number) {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, b); const a = attributes.get(p)!; gl!.enableVertexAttribArray(a);
    gl!.vertexAttribPointer(a, size, gl!.FLOAT, false, size === 4 ? 28 : 0, 0);
    const anchor = anchors.get(p)!; if (anchor >= 0) { gl!.enableVertexAttribArray(anchor); gl!.vertexAttribPointer(anchor, 3, gl!.FLOAT, false, 28, 16); }
  }
  return {
    resize(next: SceneLayout) {
      layout = next; ratio = Math.min(devicePixelRatio || 1, next.compact ? 1 : 1.25);
      canvas.width = Math.round(next.width * ratio); canvas.height = Math.round(next.height * ratio); gl.viewport(0, 0, canvas.width, canvas.height);
      if (compact !== next.compact) {
        compact = next.compact; for (const b of [vertices, edges, faces]) if (b) { gl.deleteBuffer(b); buffers.splice(buffers.indexOf(b), 1); }
        const g = createLattice(compact); flowV = g.flowV; flowRowValues = g.flowRowValues; flowSlices = g.slices; flowLayers = g.layers; vertices = buffer(g.vertices); edges = buffer(g.edges, true); faces = buffer(g.faces);
        edgeCount = g.edges.length; gridEdgeCount = g.gridEdgeCount; cubeEdgeCount = g.cubeEdgeCount; basePointCount = g.basePointCount; pointCount = g.vertices.length / 7; faceCount = g.faces.length / 7;
      }
      glowWidth = Math.max(1, Math.round(next.width * .45)); glowHeight = Math.max(1, Math.round(next.height * .45));
      gl.bindTexture(gl.TEXTURE_2D, texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, glowWidth, glowHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0); gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    },
    draw(time: number, pointer: { x: number; y: number }, integrated = true) {
      const state = sceneState(time); gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.disable(gl.BLEND);
      if (integrated) {
        gl.useProgram(atmosphere); const u = uniforms.get(atmosphere)!; gl.uniform1f(u.time, time); gl.uniform1f(u.completion, state.completion); bind(atmosphere, quad, 2); gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      function lattice(glow: number) {
        gl!.enable(gl!.BLEND); gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
        for (const [p, foreground] of [[lines!, false], [points!, false], [walls!, true], [lines!, true], [points!, true]] as const) {
          gl!.useProgram(p); const u = uniforms.get(p)!;
          gl!.uniform1f(u.time, time); gl!.uniform1f(u.phase, state.t); gl!.uniform1f(u.ratio, glow > .5 ? glowWidth/layout.width : ratio); gl!.uniform1f(u.glow, glow); gl!.uniform1f(u.completion, state.completion);
          const vertical = latticeViewport(layout);
          gl!.uniform2f(u.vertical, vertical.top, vertical.height);
          gl!.uniform3f(u.flowInfo, flowV, flowSlices, flowLayers);
          gl!.uniform4fv(u.flowRows,flowRowValues);
          gl!.uniform2f(u.resolution, layout.width, layout.height); gl!.uniform2f(u.content, layout.contentLeft, layout.contentWidth); gl!.uniform2f(u.pointer, pointer.x, pointer.y);
          bind(p, p === walls ? faces : vertices, 4);
          if (p === walls) gl!.drawArrays(gl!.TRIANGLES, 0, faceCount);
          else if (p === points) gl!.drawArrays(gl!.POINTS, foreground ? basePointCount : 0, foreground ? pointCount-basePointCount : basePointCount);
          else { gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, edges); gl!.drawElements(gl!.LINES, foreground ? cubeEdgeCount : gridEdgeCount, gl!.UNSIGNED_SHORT, foreground ? gridEdgeCount*2 : 0); }
        }
      }
      lattice(0);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target); gl.viewport(0, 0, glowWidth, glowHeight); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); lattice(1);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
      gl.useProgram(composite); const u = uniforms.get(composite)!; gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texture); gl.uniform1i(u.image, 0); gl.uniform2f(u.texel, 1.7 / glowWidth, 1.7 / glowHeight); bind(composite, quad, 2); gl.drawArrays(gl.TRIANGLES, 0, 6);
    }, dispose,
  };
}
