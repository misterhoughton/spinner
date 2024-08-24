import { DrawingTool } from "./DrawingTool";
import { RotationService } from "./RotationService";
import { setCursor } from "./setCursor";
import { brushPatterns } from "./brushPatterns";
import { GCO } from "./globalCompositeOperations";
import { blobToDataURL } from "./utilities";
import { UndoManager } from "./UndoManager";
import BrushService from "./services/brush.service";
import UndoService from "./services/undo.service";
import GalleryService from "./services/gallery.service";
import BackgroundService from "./services/background.service";

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
  const btnUndo = _w.document.getElementById("btn_undo");
  const gallery = _w.document.getElementById("gallery");
  const thumbBrushStyle = _w.document.getElementById("thumb_brushPattern");
  const undoManager = new UndoManager();

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
    setBrushPatternThumbnail();
  };

  const initCanvas = (_canvas) => {
    const h = _w.screen.height * 0.75;
    _canvas.width = h;
    _canvas.height = h;
  };

  const resetLine = (_ctx) => {
    setStrokeStyle();
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
    canvas.toBlob((b) => {
      undoManager.addToStack(b);
    });
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

  const setStrokeStyle = () => {
    const strokeStyle = brushPatterns[selectBrushPattern.value](
      inputLineWidth.value,
      inputCol.value
    );
    const lineWidth = inputLineWidth.value;

    ctx.lineCap = "round";
    BrushService.lineCap = "round";
    ctx.lineJoin = "round";
    BrushService.lineJoin = "round";

    BrushService.lineWidth = lineWidth;
    BrushService.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
  };

  btnGetImage.addEventListener("click", (e) => {
    e.preventDefault();
    // const wrapperEl = _w.document.createElement("div");
    // const newImgEl = _w.document.createElement("img");
    // const btnDelete = _w.document.createElement("button");
    // btnDelete.innerHTML = "Delete";
    // btnDelete.classList.add("btn-delete");
    // wrapperEl.classList.add("gallery-item");
    // newImgEl.src = canvas.toDataURL();

    // newImgEl.addEventListener("click", (_e) => {
    //   ctx.drawImage(newImgEl, 0, 0, canvas.width, canvas.height);
    // });
    // btnDelete.addEventListener("click", (_e) => {
    //   wrapperEl.remove();
    //   // TODO: Remove the listeners!
    // });
    // wrapperEl.append(newImgEl, btnDelete);
    // gallery.appendChild(wrapperEl);

    if (UndoService.thumbnail) {
      // newImgEl.src = UndoService.thumbnail;
      GalleryService.addImage(UndoService.thumbnail);
    }
  });

  btnResetCanvas.addEventListener("click", (_e) => {
    _e.preventDefault();
    ctx.reset();
    resetLine(ctx);
    BackgroundService.reset();
  });

  btnUndo.addEventListener("click", (_e) => {
    _e.preventDefault();

    UndoService.undo();

    if (undoManager.length) {
      const b = undoManager.pop();
      blobToDataURL(b).then((dataUrl) => {
        const image = new Image(60, 45);
        image.src = dataUrl;
        ctx.save();
        ctx.fillStyle = "aliceblue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        image.onload = () => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        };
      });
    }
  });

  inputSpinSpeed.addEventListener("change", (_e) => {
    transformationService.rotationIncrement = _e.target.value * 0.025;
    BrushService.rotationIncrement = _e.target.value * 0.025;
  });

  inputBlur.addEventListener("change", (_e) => {
    ctx.filter = `blur(${_e.target.value}px)`;
  });

  inputCol.addEventListener("change", (_e) => {
    const headings = _w.document.getElementsByTagName("h1");
    for (let h of headings) {
      h.style.color = _e.target.value;
    }
    setStrokeStyle();
    setBrushPatternThumbnail();
  });

  inputLineWidth.addEventListener("change", (_e) => {
    setStrokeStyle();
    setCursor(Number(_e.target.value), canvas);
  });

  inputLineDash.addEventListener("change", (_e) => {
    let pattern = inputLineDash.value.split(" ");
    ctx.setLineDash(pattern);
  });

  selectBrushPattern.addEventListener("change", (_e) => {
    setStrokeStyle();
    setBrushPatternThumbnail();
  });

  selectGco.addEventListener("change", (_e) => {
    BrushService.blendingMode = _e.target.value;
    ctx.globalCompositeOperation = _e.target.value;
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

  // Go go go!
  initForm();
  initCanvas(canvas);
  resetLine(ctx);
  setCursor(Number(inputLineWidth.value), canvas);
  new DrawingTool(canvas, drawStart, draw, drawEnd);

  function setBrushPatternThumbnail() {
    const thumbBrushStyleCtx = thumbBrushStyle.getContext("2d");
    const thumbParams = [0, 0, thumbBrushStyle.width, thumbBrushStyle.height];
    thumbBrushStyleCtx.clearRect(...thumbParams);
    thumbBrushStyleCtx.fillStyle = brushPatterns[selectBrushPattern.value](
      thumbBrushStyle.width,
      inputCol.value
    );
    thumbBrushStyleCtx.fillRect(...thumbParams);
  }
}
