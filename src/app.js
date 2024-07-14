import { DrawingTool } from "./DrawingTool";
import { TransformationService } from "./TransformationService";
import { setCursor } from "./setCursor";

export default function app(_w) {
  const canvas = _w.document.getElementById("canvas");
  const transformationService = new TransformationService(_w, canvas);
  const ctx = canvas.getContext("2d");
  const inputCol = _w.document.getElementById("input_col");
  const inputLineWidth = _w.document.getElementById("input_lineWidth");
  const inputSpinSpeed = _w.document.getElementById("input_spinSpeed");
  const btnGetImage = _w.document.getElementById("btn_getImage");
  const btnResetCanvas = _w.document.getElementById("btn_resetCanvas");
  const gallery = _w.document.getElementById("gallery");

  const _draw = (_ctx, x, y) => {
    _ctx.lineTo(x, y);
    _ctx.stroke();
  };

  const drawTransformed = (_e) => {
    const tc = transformationService.getTransformedCoords(_e.layerX, _e.layerY);
    if (_e.movementX + _e.movementY === 0) {
      _draw(ctx, tc.x, tc.y);
    }
  };

  const holdLine = (_e) => {
    transformationService.tickFns.clear();
    transformationService.tickFns.add(() => drawTransformed(_e));
  };

  const drawStart = (_e) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = inputLineWidth.value;
    ctx.strokeStyle = inputCol.value;
    ctx.beginPath();
    holdLine(_e);
  };

  const draw = (_e) => {
    transformationService.tickFns.clear();
    _draw(ctx, _e.offsetX, _e.offsetY);
    holdLine(_e);
  };

  const drawEnd = (_e) => {
    ctx.closePath();
    transformationService.tickFns.clear();
  };

  btnGetImage.addEventListener("click", (_e) => {
    _e.preventDefault();
    const newImgEl = _w.document.createElement("img");
    newImgEl.src = canvas.toDataURL();
    gallery.appendChild(newImgEl);
  });

  btnResetCanvas.addEventListener("click", (_e) => {
    _e.preventDefault();
    ctx.reset();
  });

  inputSpinSpeed.addEventListener("change", (_e) => {
    transformationService.rotationIncrement = _e.target.value / 100;
  });

  inputLineWidth.addEventListener("change", (_e) =>
    setCursor(Number(_e.target.value), canvas)
  );

  _w.addEventListener("keydown", (_e) => {
    const val = Number(inputLineWidth.value);
    if (_e.keyCode === 219) {
      inputLineWidth.value = String(val - 5);
    }
    if (_e.keyCode === 221) {
      inputLineWidth.value = String(val + 5);
    }
    inputLineWidth.dispatchEvent(new Event("change"));
  });

  setCursor(Number(inputLineWidth.value), canvas);
  new DrawingTool(canvas, drawStart, draw, drawEnd);
}
