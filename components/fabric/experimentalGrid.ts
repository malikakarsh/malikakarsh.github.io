// Separate experimental renderer. Do not tune the approved baseline here.
type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
export type ExperimentalGridLayout = {
  width: number;
  height: number;
  bottom: number;
  ratio: number;
  quiet: (Bounds & {
    padding: number;
    strength: number;
  })[];
};
type Cell = {
  x: number;
  y: number;
  row: number;
  column: number;
  mask: number;
};
export type GridPattern = "row-fill" | "lanes" | "column-fill";
type Tile = {
  cells: Cell[];
  rows: number;
  columns: number;
  pattern: GridPattern;
  start: number;
  occupancy: number;
  depth: number;
};
const smooth = (value: number) => { const t = Math.max(0, Math.min(1, value)); return t * t * (3 - 2 * t); };
// A cell fills, holds, then softly recovers. There are no independent oscillators.
export function computeCellState(age: number, row: number, column: number, rows: number, columns: number, pattern: GridPattern, occupancy: number) {
  if (age < 0 || age > 5)
    return { level: 0, fill: 0 };
  const order = pattern === "row-fill" ? (row * columns + column) / (rows * columns - 1)
    : pattern === "column-fill" ? column / Math.max(1, columns - 1)
      : Math.floor(row / 2) / Math.max(1, Math.ceil(rows / 2) - 1);
  // Occupancy is contiguous work, not a random subset of flashing dots.
  const lane = pattern === "column-fill" ? row / rows : column / columns;
  if (lane >= occupancy)
    return { level: 0, fill: 0 };
  const progress = (age - 0.25) / 2.75;
  const fill = smooth((progress - order + 0.10) / 0.16);
  const front = Math.exp(-Math.pow((order - progress) / 0.16, 2));
  const recovery = 1 - smooth((age - 3.45) / 1.45);
  return { level: (fill * 0.24 + front * 0.42) * smooth(age / 0.45) * recovery, fill };
}
// All placements snap to the SAME fixed lattice. Only the scheduled regions
// change between layouts; the last seven blocks form the serial chain.
const tilePlan: [
  number,
  number,
  number,
  number,
  GridPattern,
  number,
  number
][] = [
  [0.12, 0.15, 8, 4, "row-fill", 1.1, 0.75],
  [0.38, 0.11, 6, 4, "lanes", 1.3, 1],
  [0.54, 0.32, 4, 6, "column-fill", 1.5, 0.75],
  [0.89, 0.18, 6, 4, "lanes", 1.15, 0.6],
  [0.27, 0.83, 8, 3, "column-fill", 1.45, 0.75],
  [0.46, 0.72, 6, 4, "row-fill", 2.8, 1],
  [0.55, 0.60, 4, 6, "lanes", 3.15, 0.75],
  [0.55, 0.42, 4, 5, "column-fill", 3.5, 1],
  [0.61, 0.14, 8, 3, "row-fill", 3.85, 0.75],
  [0.78, 0.10, 6, 4, "lanes", 4.2, 1],
  [0.94, 0.43, 4, 6, "column-fill", 4.55, 0.7],
  [0.83, 0.87, 8, 3, "row-fill", 4.9, 1],
];
// A is the approved experimental arrangement. B and C schedule the same work
// at different fixed cells, without moving the lattice or changing its speed.
const placements: [number, number][][] = [
  tilePlan.map(([x, y]) => [x, y]),
  [
    [0.24, 0.12], [0.63, 0.13], [0.88, 0.36], [0.09, 0.25],
    [0.72, 0.84], [0.16, 0.78], [0.88, 0.67], [0.73, 0.40],
    [0.44, 0.18], [0.82, 0.10], [0.96, 0.48], [0.47, 0.88],
  ],
  [
    [0.46, 0.12], [0.16, 0.21], [0.78, 0.30], [0.93, 0.15],
    [0.40, 0.85], [0.77, 0.79], [0.95, 0.58], [0.90, 0.40],
    [0.28, 0.12], [0.64, 0.18], [0.08, 0.39], [0.17, 0.88],
  ],
];
const firstDispatch = Math.min(...tilePlan.map(tile => tile[5]));
const executionEnd = Math.max(...tilePlan.map(tile => tile[5])) + 4.9;
export const experimentalPlaybackSpeed = 0.8;
export const experimentalQuietSeconds = 0.3;
const activeSeconds = (executionEnd - firstDispatch) / experimentalPlaybackSpeed;
export const experimentalCycleSeconds = activeSeconds + experimentalQuietSeconds;
export function experimentalPhase(time: number) {
  const cycle = Math.floor(time / experimentalCycleSeconds);
  const elapsed = ((time % experimentalCycleSeconds) + experimentalCycleSeconds) % experimentalCycleSeconds;
  const phase = elapsed * experimentalPlaybackSpeed + firstDispatch;
  const layout = cycle % placements.length;
  // Slow execution only; the dark interval stays at its real-time duration.
  const isQuiet = elapsed >= activeSeconds;
  // Six repeating phases: A / dark / B / dark / C / dark.
  return {
    cycle, phase, layout, isQuiet, step: layout * 2 + (isQuiet ? 1 : 0),
  };
}
export function createExperimentalGrid(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context)
    return null;
  const idle = document.createElement("canvas"), idleContext = idle.getContext("2d")!;
  const glow = document.createElement("canvas");
  glow.width = glow.height = 40;
  const glowContext = glow.getContext("2d")!;
  glowContext.fillStyle = "#b4d89e";
  glowContext.shadowColor = "#b4d89e";
  glowContext.shadowBlur = 8;
  glowContext.fillRect(16, 16, 8, 8);
  let layout: ExperimentalGridLayout;
  let pitch = 13, size = 6, columns = 0, rows = 0, offsetX = 0, offsetY = 0;
  let tileLayouts: Tile[][] = [];
  let lattice: Cell[] = [];
  function cellMask(x: number, y: number) {
    let weight = smooth(y / 38) * (1 - smooth((y - layout.bottom + 62) / 58));
    // Fade only near text; card bounds never create a background visibility hole.
    for (const b of layout.quiet) {
      const d = Math.hypot(Math.max(b.left - x, 0, x - b.right), Math.max(b.top - y, 0, y - b.bottom));
      weight = Math.min(weight, b.strength + (1 - b.strength) * smooth((d - b.padding) / 24));
    }
    return weight;
  }
  return {
    resize(next: ExperimentalGridLayout) {
      layout = next;
      canvas.width = idle.width = Math.round(next.width * next.ratio);
      canvas.height = idle.height = Math.round(next.height * next.ratio);
      context.setTransform(next.ratio, 0, 0, next.ratio, 0, 0);
      idleContext.setTransform(next.ratio, 0, 0, next.ratio, 0, 0);
      pitch = next.width < 600 ? 11 : 13;
      size = next.width < 600 ? 4.5 : 6;
      columns = Math.ceil(next.width / pitch);
      rows = Math.ceil(next.bottom / pitch);
      offsetX = (next.width - (columns - 1) * pitch) / 2;
      offsetY = 8;
      lattice = [];
      idleContext.clearRect(0, 0, next.width, next.height);
      idleContext.strokeStyle = "#82918a";
      idleContext.lineWidth = 0.5;
      for (let row = 0; row < rows; row++)
        for (let column = 0; column < columns; column++) {
          const x = offsetX + column * pitch, y = offsetY + row * pitch;
          const cell = { x, y, row, column, mask: cellMask(x, y) };
          lattice.push(cell);
          idleContext.globalAlpha = 0.035 * cell.mask;
          idleContext.strokeRect(x - size / 2, y - size / 2, size, size);
        }
      idleContext.globalAlpha = 1;
      tileLayouts = placements.map(placement => tilePlan.map(([, , tileColumns, tileRows, pattern, start, occupancy], index) => {
        const [nx, ny] = placement[index];
        const firstColumn = Math.max(0, Math.min(columns - tileColumns, Math.round(nx * columns - tileColumns / 2)));
        const firstRow = Math.max(0, Math.min(rows - tileRows, Math.round(ny * rows - tileRows / 2)));
        const cells: Cell[] = [];
        for (let row = 0; row < tileRows; row++)
          for (let column = 0; column < tileColumns; column++) {
            const cell = lattice[(firstRow + row) * columns + firstColumn + column];
            if (cell)
              cells.push({ ...cell, row, column });
          }
        return { cells, rows: tileRows, columns: tileColumns, pattern, start, occupancy, depth: [0.72, 0.86, 1][index % 3] };
      }));
    },
    draw(time: number, cursor: {
      x: number;
      y: number;
      active: number;
    }, reduced: boolean) {
      if (!layout)
        return;
      const { layout: layoutIndex, phase, isQuiet } = experimentalPhase(reduced ? 3.6 / experimentalPlaybackSpeed : time);
      context.clearRect(0, 0, layout.width, layout.height);
      if (isQuiet) return;
      // Fade the faint substrate into/out of each dark interval.
      context.globalAlpha = smooth((phase - firstDispatch) / 0.2) * smooth((executionEnd - phase) / 0.2);
      context.drawImage(idle, 0, 0, layout.width, layout.height);
      context.globalAlpha = 1;
      // Only hardware units react to the cursor: no painted spotlight or drift.
      if (cursor.active > 0.01) {
        const col = Math.round((cursor.x - offsetX) / pitch), row = Math.round((cursor.y - offsetY) / pitch);
        context.strokeStyle = "#a3ada5";
        context.lineWidth = 0.65;
        for (let r = Math.max(0, row - 5); r <= Math.min(rows - 1, row + 5); r++)
          for (let c = Math.max(0, col - 5); c <= Math.min(columns - 1, col + 5); c++) {
            const cell = lattice[r * columns + c];
            const distance = Math.hypot(cell.x - cursor.x, cell.y - cursor.y);
            context.globalAlpha = Math.exp(-distance * distance / (2 * 42 * 42)) * 0.075 * cursor.active * cell.mask;
            context.strokeRect(cell.x - size / 2, cell.y - size / 2, size, size);
          }
      }
      const tiles = tileLayouts[layoutIndex];
      for (let index = 0; index < tiles.length; index++) {
        const tile = tiles[index];
        const age = phase - tile.start;
        for (const cell of tile.cells) {
          const { level, fill } = computeCellState(age, cell.row, cell.column, tile.rows, tile.columns, tile.pattern, tile.occupancy);
          const alpha = level * tile.depth * cell.mask;
          if (alpha < 0.003)
            continue;
          // Glow varies with depth, while every filled square stays lattice-aligned.
          const spread = size * (2.8 + (1 - tile.depth) * 1.2);
          context.globalAlpha = alpha * 0.25;
          context.drawImage(glow, cell.x - spread / 2, cell.y - spread / 2, spread, spread);
          context.globalAlpha = alpha;
          context.fillStyle = "#b4d89e";
          const extent = size * (0.3 + 0.7 * fill);
          context.fillRect(cell.x - extent / 2, cell.y - extent / 2, extent, extent);
          context.globalAlpha = alpha * 0.35;
          context.strokeStyle = "#b4d89e";
          context.strokeRect(cell.x - size / 2, cell.y - size / 2, size, size);
        }
      }
      context.globalAlpha = 1;
    },
    dispose() { idle.width = idle.height = glow.width = glow.height = 0; },
  };
}
