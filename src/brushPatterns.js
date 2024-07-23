import { rotatePoint, degreesToRadians } from "./transformation.utilities";

export const brushPatterns = {
  defaultPattern,
  chequerPattern,
  stripesNWPattern,
  stripesNEPattern,
  gridPattern,
  hatchPattern,
  starPattern,
  scratchyPattern,
};

function defaultPattern(size, col) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = col;
  ctx.fillRect(0, 0, size, size);
  return ctx.createPattern(canvas, "repeat");
}

function chequerPattern(size, colour) {
  const colTransparent = "rgba(255, 255, 255, 0)";
  const gridRows = 2;
  const gridSize = Math.floor(size / gridRows);
  const actualSize = gridRows * gridSize;
  const canvas = new OffscreenCanvas(actualSize, actualSize);
  const ctx = canvas.getContext("2d");

  for (let row = 0; row < gridRows; row++) {
    for (let column = 0; column < gridRows; column++) {
      ctx.fillStyle = (row + column) % 2 === 0 ? colour : colTransparent;
      ctx.fillRect(column * gridSize, row * gridSize, gridSize, gridSize);
    }
  }

  return ctx.createPattern(canvas, "repeat");
}

function stripesNWPattern(size, col) {
  const stripeCount = 10;
  const stripeWidth = Math.floor(size / stripeCount);
  const actualSize = stripeCount * stripeWidth;
  const canvas = new OffscreenCanvas(actualSize, actualSize);
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.beginPath();

  drawDiagonalStripes(stripeCount, ctx, stripeWidth, actualSize);

  ctx.strokeStyle = col;
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}

function stripesNEPattern(size, col) {
  const stripeCount = 10;
  const stripeWidth = Math.floor(size / stripeCount);
  const actualSize = stripeCount * stripeWidth;
  const canvas = new OffscreenCanvas(actualSize, actualSize);
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.beginPath();

  ctx.translate(actualSize, 0);
  ctx.scale(-1, 1);

  drawDiagonalStripes(stripeCount, ctx, stripeWidth, actualSize);

  ctx.strokeStyle = col;
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}

function drawDiagonalStripes(stripeCount, ctx, stripeWidth, size) {
  for (let i = 0; i < stripeCount; i++) {
    ctx.moveTo(i * stripeWidth, 0);
    ctx.lineTo(size, size - i * stripeWidth);
    ctx.moveTo(0, i * stripeWidth);
    ctx.lineTo(size - i * stripeWidth, size);
  }
}

function gridPattern(size, col) {
  const gridRows = 3;
  const gridSize = Math.floor(size / gridRows);
  const actualSize = gridRows * gridSize;
  const canvas = new OffscreenCanvas(actualSize, actualSize);

  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  for (let i = 0; i < gridRows; i++) {
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, actualSize);
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(actualSize, i * gridSize);
  }

  ctx.closePath();
  ctx.strokeStyle = col;
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}

function hatchPattern(size, col) {
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size, size);
  ctx.moveTo(size, 0);
  ctx.lineTo(0, size);
  ctx.strokeStyle = col;
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}

function starPattern(size, col) {
  strokeStar = (x, y, r, n, inset) => {
    ctx.lineWidth = 1;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - r);
    for (var i = 0; i < n; i++) {
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - r * inset);
      ctx.rotate(Math.PI / n);
      ctx.lineTo(0, 0 - r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");
  strokeStar(size / 2, size / 2, size / 5, 5, 3);
  return ctx.createPattern(canvas, "repeat");
}

function scratchyPattern(size, col) {
  const rnd = () => Math.floor(Math.random() * size);
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.strokeStyle = col;
  ctx.beginPath();
  for (let i = 0; i < rnd(); i++) {
    ctx.moveTo(0, rnd());
    ctx.lineTo(size, rnd());
    ctx.moveTo(rnd(), 0);
    ctx.lineTo(rnd(), size);
  }
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}
