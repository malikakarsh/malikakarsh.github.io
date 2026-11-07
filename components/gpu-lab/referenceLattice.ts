/** Reference composition: a regular perspective lattice, equal-edge transparent
 * cubes, and four curved data paths. Independent cells fade at changing lattice
 * locations; they never move as fixed columns.
 */
export type LatticeLayout = { width: number; height: number; contentLeft: number; contentWidth: number; compact: boolean };
export const CUBE_SIZE = .24;
export function latticeViewport(layout: LatticeLayout) {
  // Keep the three projected axis scales proportional at every viewport width.
  const height = Math.min(layout.height, layout.contentWidth * (layout.compact ? .85 : .46));
  return { top: layout.compact ? 56 : (layout.height - height) * .5, height };
}
export const ENTRY_SHARE = .3;
export function flowGrid(compact: boolean) {
  const slices = compact ? 22 : 29, rows = compact ? 9 : 11, layers = compact ? 4 : 5;
  const row = Math.round((rows - 1) * .6);
  const laneRows = [row, row, row, row];
  return { slices, rows, layers, row, laneRows, v: (row / (rows - 1) - .5) * 3.2 };
}
/** The approach ends at an actual front grid vertex. Past that junction,
 * packets interpolate the same indexed grid edges used by the renderer.
 */
export function referencePath(t: number, lane: number, mode: number, layout: LatticeLayout, time = 0): { x: number; y: number; depth: number } {
  const grid = flowGrid(layout.compact), w = (lane / (grid.layers - 1) - .5) * 1.3;
  const node = (index: number) => projectLattice(index / (grid.slices - 1) * 16, (grid.laneRows[lane] / (grid.rows - 1) - .5) * 3.2, w, layout, time);
  if (mode === 1) {
    if (t < ENTRY_SHARE) return referencePath(t / ENTRY_SHARE, lane, 0, layout, time);
    const progress = (t - ENTRY_SHARE) / (1 - ENTRY_SHARE);
    // Compensate perspective so packets don't accelerate abruptly at the join.
    const u = (1 / (1 - progress * (1 - 1 / (1 + 16 * .23))) - 1) / .23;
    const index = Math.min(grid.slices - 2, Math.floor(u / 16 * (grid.slices - 1)));
    const fraction = Math.min(1, u / 16 * (grid.slices - 1) - index);
    const a = node(index), b = node(index + 1);
    return { x: a.x + (b.x - a.x) * fraction, y: a.y + (b.y - a.y) * fraction, depth: 1 + u * .23 };
  }
  const vertical = latticeViewport(layout), end = node(0), next = node(1), far = node(grid.slices - 1);
  const dx = next.x - end.x, dy = next.y - end.y, length = Math.hypot(dx, dy);
  const reach = Math.hypot(far.x - end.x, far.y - end.y) * ENTRY_SHARE / (3 * (1 - ENTRY_SHARE));
  const p = [
    {x: layout.contentLeft + .02 * layout.contentWidth, y: vertical.top + (1.02 - lane * .028) * vertical.height},
    {x: layout.contentLeft + .22 * layout.contentWidth, y: vertical.top + (.94 - lane * .028) * vertical.height},
    {x: end.x - dx / length * reach, y: end.y - dy / length * reach}, end,
  ];
  const q = 1 - t;
  const x = q*q*q*p[0].x + 3*q*q*t*p[1].x + 3*q*t*t*p[2].x + t*t*t*p[3].x;
  let y = q*q*q*p[0].y + 3*q*q*t*p[1].y + 3*q*t*t*p[2].y + t*t*t*p[3].y;
  // Zero displacement AND zero slope at both ends preserve the shared junction.
  y += Math.sin(t*Math.PI)**2 * .018 * vertical.height * Math.sin(t*Math.PI*2*1.35-time*.70);
  return { x, y, depth: 1 + (-1.4 + t * 1.4) * .23 };
}
export function projectLattice(u: number, v: number, w: number, layout: LatticeLayout, time = 0, kind = 0, anchor?: number[]): { x: number; y: number; depth: number } {
  if (kind >= 2 && kind <= 4 && anchor) {
    // Cube faces use the very same perspective and axis units as the grid.
    const local = [u-anchor[0], v-anchor[1], w-anchor[2]];
    const cameraV = (-.08 + .06 * (.76 / .13)) / .27;
    if (kind === 3) local[1] = (anchor[1]>cameraV?-1:1)*Math.abs(local[1]);
    u=anchor[0]+local[0];v=anchor[1]+local[1];w=anchor[2]+local[2];
  }
  if (kind === 1 || kind === 6) return referencePath(kind === 6 ? (u+time*.18)%1 : u, v, w, layout, time);
  const depth = 1 + u * .23;
  const vertical = latticeViewport(layout);
  const ripple = kind >= 2 && kind <= 4 ? 0 : Math.sin(u * .55 - time * .6) * .018 * Math.sin(v * 1.2);
  return {
    x: layout.contentLeft + layout.contentWidth * (1.22 - .76 / depth + w * .13 / depth),
    y: vertical.top + vertical.height * (.42 + ((v + ripple) * .27 - w * .06 + .08) / depth),
    depth,
  };
}
export function createLattice(compact: boolean) {
  const { slices, rows, layers, laneRows, v: flowV } = flowGrid(compact);
  // xyz, material kind, rigid cube anchor xyz. Grid/path vertices have no anchor.
  const vertices: number[] = [], edges: number[] = [], faces: number[] = [];
  const at = (u: number, row: number, layer: number) => (u * rows + row) * layers + layer;
  const point = (u: number, v: number, w: number, kind = 0, anchor = [-100, 0, 0]) => vertices.push(u, v, w, kind, ...anchor);
  for (let u = 0; u < slices; u++) for (let row = 0; row < rows; row++) for (let layer = 0; layer < layers; layer++) {
    point(u / (slices - 1) * 16, (row / (rows - 1) - .5) * 3.2, (layer / (layers - 1) - .5) * 1.3);
    const i = at(u, row, layer);
    if (u + 1 < slices) edges.push(i, at(u + 1, row, layer));
    if (u % 2 === 0 || u === slices - 1) {
      if (row + 1 < rows) edges.push(i, at(u, row + 1, layer));
      if (layer + 1 < layers) edges.push(i, at(u, row, layer + 1));
    }
  }
  const gridCount = vertices.length / 7;
  const flowNodeIndices = Array.from({ length: 4 }, (_, lane) => Array.from({ length: slices }, (_, u) => at(u, laneRows[lane], lane)));
  const inputJoinIndices: number[] = [];
  for (let lane = 0; lane < 4; lane++) {
    const samples = compact ? 48 : 80;
    let previous = -1;
    for (let i = 0; i < samples - 1; i++) {
      const index = vertices.length / 7;
      point(i / (samples - 1), lane, 0, 1);
      if (previous >= 0) edges.push(previous, index);
      previous = index;
    }
    // Reuse the grid vertex itself rather than a coincident overlay endpoint.
    const join = flowNodeIndices[lane][0];
    edges.push(previous, join); inputJoinIndices.push(join);
  }
  const gridEdgeCount = edges.length, basePointCount = vertices.length / 7;
  const faceEdges: number[] = [];
  function quad(corners: number[][], kind: number, anchor: number[]) {
    for (const i of [0, 1, 2, 0, 2, 3]) faces.push(...corners[i], kind, ...anchor);
    const start = vertices.length / 7;
    for (const p of corners) point(p[0], p[1], p[2], kind, anchor);
    for (let i = 0; i < 4; i++) faceEdges.push(start + i, start + (i + 1) % 4);
  }
  const cubeAnchors: number[][] = [];
  const h = CUBE_SIZE / 2;
  let seed = 63571;
  function random() { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }
  const occupied = new Set<string>();
  const count = compact ? 18 : 28;
  for (let cell = 0; cell < count; cell++) {
    // More near cells establish the focal volume; every position is sampled
    // independently on the lattice, without repeated planes or column patterns.
    const band = cell % 4;
    let u: number, v: number, w: number, key: string;
    do {
      const column = band < 2 ? Math.floor(random() * 3) : band === 2 ? 6 + Math.floor(random() * 8) : 14 + Math.floor(random() * 13);
      u = column * (16 / 28); v = (Math.floor(random() * 9) - 4) * .32; w = (Math.floor(random() * 3) - 1) * .325;
      key = `${u}:${v}:${w}`;
    } while (occupied.has(key));
    occupied.add(key);
    const anchor = [u, v, w]; cubeAnchors.push(anchor);
    // The lattice camera sees U- and W+. Horizontal walls are selected in
    // the shader from the camera height, so every face uses the grid perspective.
    quad([[u-h,v-h,w-h],[u-h,v+h,w-h],[u-h,v+h,w+h],[u-h,v-h,w+h]], 2, anchor);
    quad([[u-h,v-h,w-h],[u+h,v-h,w-h],[u+h,v-h,w+h],[u-h,v-h,w+h]], 3, anchor);
    quad([[u-h,v-h,w+h],[u-h,v+h,w+h],[u+h,v+h,w+h],[u+h,v-h,w+h]], 4, anchor);
  }
  edges.push(...faceEdges);
  // These are transported data packets constrained to the four existing paths,
  // not free particles. They make line direction and speed clearly visible.
  for (let lane = 0; lane < 4; lane++) for (let packet = 0; packet < 20; packet++) {
    point((packet / 20 + lane * .071) % 1, lane, 1, 6);
  }
  return { vertices, edges, faces, cubeAnchors, gridCount, gridEdgeCount, cubeEdgeCount: faceEdges.length, basePointCount, flowV, flowRowValues: laneRows.map(row => (row / (rows - 1) - .5) * 3.2), flowNodeIndices, inputJoinIndices, slices, rows, layers };
}
