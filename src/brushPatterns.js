import { rotatePoint, degreesToRadians } from "./transformation.utilities";

export const brushPatterns = {
  defaultPattern,
  chequerPattern,
  stripesPattern,
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

function stripesPattern(size, col) {
  const stripeCount = 10;
  const stripeWidth = Math.floor(size / stripeCount);
  const actualSize = stripeCount * stripeWidth;
  const canvas = new OffscreenCanvas(actualSize, actualSize);
  const ctx = canvas.getContext("2d");
  const s = size;
  const count = 10;
  ctx.lineWidth = 1;
  ctx.beginPath();

  ctx.rotate(degreesToRadians());

  for (let i = 0; i < stripeCount; i++) {
    ctx.moveTo(i * stripeWidth, 0);
    ctx.lineTo(actualSize, actualSize - i * stripeWidth);
    ctx.moveTo(0, i * stripeWidth);
    ctx.lineTo(actualSize - i * stripeWidth, actualSize);
  }

  ctx.strokeStyle = col;
  ctx.stroke();
  return ctx.createPattern(canvas, "repeat");
}

function gridPattern(size, col) {
  const gridRows = 3;
  const gridSize = Math.floor(size / gridRows);
  const actualSize = gridRows * gridSize;
  const canvas = new OffscreenCanvas(actualSize, actualSize);

  const ctx = canvas.getContext("2d");
  const c = Math.floor(size / 2);
  const sides = 6;

  ctx.beginPath();
  for (let column = 0; column < gridRows; column++) {
    ctx.moveTo(column * gridSize, 0);
    ctx.lineTo(column * gridSize, actualSize);
  }
  for (let row = 0; row < gridRows; row++) {
    ctx.moveTo(0, row * gridSize, 0);
    ctx.lineTo(actualSize, row * gridSize);
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
