import { blobToDataURL } from "./utilities";

export async function setCursor(size, target) {
  const clip = (_ctx) => {
    _ctx.save();
    _ctx.clip();
    _ctx.lineWidth *= 2;
    _ctx.stroke();
    _ctx.restore();
  };
  const canvas = new OffscreenCanvas(size, size);
  const cursorRad = size / 2;
  const ctx = canvas.getContext("2d");
  ctx.arc(cursorRad, cursorRad, cursorRad, 0, 2 * Math.PI);
  clip(ctx);

  const blob = await canvas.convertToBlob();
  const dataURL = await blobToDataURL(blob);
  target.style.cursor = `url(${dataURL}) ${cursorRad} ${cursorRad}, crosshair`;
}
