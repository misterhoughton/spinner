import { DrawingTool } from "./DrawingTool";
import { TransformationService } from "./TransformationService";
import { setCursor } from "./setCursor";
import { GCO } from "./globalCompositeOperations";

export default function app(_w) {
  const canvas = _w.document.getElementById("canvas");
  const transformationService = new TransformationService(_w, canvas);
  const ctx = canvas.getContext("2d");
  const inputCol = _w.document.getElementById("input_col");
  const inputLineWidth = _w.document.getElementById("input_lineWidth");
  const inputSpinSpeed = _w.document.getElementById("input_spinSpeed");
  const inputLineDash = _w.document.getElementById("input_lineDash");
  const inputBlur = _w.document.getElementById("input_blur");
  const selectGco = _w.document.getElementById("select_gco");
  const btnGetImage = _w.document.getElementById("btn_getImage");
  const btnResetCanvas = _w.document.getElementById("btn_resetCanvas");
  const gallery = _w.document.getElementById("gallery");

  const initForm = () => {
    GCO.forEach((op) => {
      const optionEl = document.createElement("option");
      optionEl.value = op;
      optionEl.innerHTML = op;
      selectGco.appendChild(optionEl);
    });
  };

  const initCanvas = (_canvas) => {
    const w = _w.document.body.offsetWidth * 0.35;
    _canvas.width = w;
    _canvas.height = w;
  };

  const initLine = (_ctx) => {
    _ctx.lineCap = "round";
    _ctx.lineJoin = "round";
    ctx.lineWidth = inputLineWidth.value;
  };

  const _draw = (_ctx, x, y) => {
    _ctx.lineTo(x, y);
    _ctx.stroke();
  };

  const drawTransformed = (_e) => {
    const tc = transformationService.getTransformedCoords(_e.layerX, _e.layerY);
    _draw(ctx, tc.x, tc.y);
  };

  const holdLine = (_e) => {
    const isStationery = (_e) => {
      return _e.movementX + _e.movementY === 0;
    };
    if (isStationery(_e)) {
      transformationService.tickFns.add(() => drawTransformed(_e));
    } else {
      transformationService.tickFns.clear();
    }
  };

  const drawStart = (_e) => {
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
    transformationService.rotationIncrement = _e.target.value * 0.01;
  });

  inputBlur.addEventListener("change", (_e) => {
    ctx.filter = `blur(${_e.target.value}px)`;
  });

  inputLineWidth.addEventListener("change", (_e) => {
    ctx.lineWidth = inputLineWidth.value;
    setCursor(Number(_e.target.value), canvas);
  });

  inputLineDash.addEventListener("change", (_e) => {
    let pattern = inputLineDash.value.split(" ");
    ctx.setLineDash(pattern);
  });

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

  selectGco.addEventListener("change", (_e) => {
    ctx.globalCompositeOperation = _e.target.value;
  });

  // Go go go!
  initForm();
  initCanvas(canvas);
  initLine(ctx);
  setCursor(Number(inputLineWidth.value), canvas);
  new DrawingTool(canvas, drawStart, draw, drawEnd);
}
