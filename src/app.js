import { DrawingTool } from "./DrawingTool";
import { RotationService } from "./RotationService";
import { setCursor } from "./setCursor";
import { brushPatterns } from "./strokeStyles/patterns";
import { GCO } from "./globalCompositeOperations";

export default function app(_w) {
  const canvas = _w.document.getElementById("canvas");
  const transformationService = new RotationService(_w, canvas);
  const ctx = canvas.getContext("2d");
  const inputCol = _w.document.getElementById("input_col");
  const inputLineWidth = _w.document.getElementById("input_lineWidth");
  const inputSpinSpeed = _w.document.getElementById("input_spinSpeed");
  const inputLineDash = _w.document.getElementById("input_lineDash");
  const inputBlur = _w.document.getElementById("input_blur");
  const selectGco = _w.document.getElementById("select_gco");
  const selectBrushPattern = _w.document.getElementById("select_brushPattern");
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
    for (let bp in brushPatterns) {
      const optionEl = document.createElement("option");
      optionEl.value = bp;
      optionEl.innerHTML = bp;
      selectBrushPattern.appendChild(optionEl);
    }
  };

  const initCanvas = (_canvas) => {
    const h = _w.document.body.offsetHeight * 0.8;
    _canvas.width = h;
    _canvas.height = h;
  };

  const resetLine = (_ctx) => {
    _ctx.lineCap = "round";
    _ctx.lineJoin = "round";
    ctx.lineWidth = inputLineWidth.value;
  };

  const _draw = (_ctx, x, y) => {
    _ctx.lineTo(x, y);
    _ctx.stroke();
  };

  const drawTransformed = (x, y) => {
    const tc = transformationService.getRotatedCoords(x, y);
    _draw(ctx, tc.x, tc.y);
  };

  let previousTouch;
  const holdLine = (_e) => {
    const isHolding = (_e) => {
      return _e.movementX + _e.movementY === 0;
    };
    const touch = _e.touches ? _e.touches.item(0) : null;
    const changedTouch = _e.changedTouches ? _e.changedTouches.item(0) : null;
    if (touch && changedTouch) {
      _e.movementX = touch.pageX - changedTouch.pageX;
      _e.movementY = touch.pageY - changedTouch.pageY;
      _e.layerX = touch.clientX - touch.target.offsetLeft;
      _e.layerY = touch.clientY - touch.target.offsetTop;
    }
    previousTouch = touch;
    if (isHolding(_e)) {
      transformationService.tickFns.add(() =>
        drawTransformed(_e.layerX, _e.layerY)
      );
    } else {
      transformationService.tickFns.clear();
    }
  };

  const drawStart = (_e) => {
    ctx.strokeStyle = brushPatterns[selectBrushPattern.value](
      inputLineWidth.value,
      inputCol.value
    );
    ctx.beginPath();
    holdLine(_e);
  };

  const draw = (_e) => {
    const touch = _e.touches ? _e.touches.item(0) : null;
    if (touch) {
      _e.offsetX = touch.clientX - touch.target.offsetLeft;
      _e.offsetY = touch.clientY - touch.target.offsetTop;
    }
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
    resetLine(ctx);
  });

  inputSpinSpeed.addEventListener("change", (_e) => {
    transformationService.rotationIncrement = _e.target.value * 0.025;
  });

  inputBlur.addEventListener("change", (_e) => {
    ctx.filter = `blur(${_e.target.value}px)`;
  });

  inputLineWidth.addEventListener("change", (_e) => {
    ctx.lineWidth = _e.target.value;
    setCursor(Number(_e.target.value), canvas);
  });

  inputLineDash.addEventListener("change", (_e) => {
    let pattern = inputLineDash.value.split(" ");
    ctx.setLineDash(pattern);
  });

  selectBrushPattern.addEventListener("change", (_e) => {
    const thumbBrushStyle = _w.document.getElementById("thumb_brushPattern");
    const thumbBrushStyleCtx = thumbBrushStyle.getContext("2d");
    const thumbParams = [0, 0, thumbBrushStyle.width, thumbBrushStyle.height];
    thumbBrushStyleCtx.clearRect(...thumbParams);
    thumbBrushStyleCtx.fillStyle = brushPatterns[_e.target.value](
      thumbBrushStyle.width,
      inputCol.value
    );
    thumbBrushStyleCtx.fillRect(...thumbParams);
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
  resetLine(ctx);
  setCursor(Number(inputLineWidth.value), canvas);
  new DrawingTool(canvas, drawStart, draw, drawEnd);
}
