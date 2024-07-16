export const brushPatterns = {
  hatchPattern,
  starPattern,
  scratchyPattern,
};

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
