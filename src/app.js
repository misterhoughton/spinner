import draw from "./paint";

async function setCursor(size, target) {
  const blobToDataURL = async (_blob) => {
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = (e) => {
        res(e.target.result);
      };
      fr.readAsDataURL(blob);
    });
  };
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

class RotationService {
  constructor(_window, _element) {
    this._w = _window;
    this.element = _element;
  }
  interval = 0;
  rotation = 0;
  speed = 0;

  rotate(deg) {
    if (deg > 360) {
      deg = deg - 360;
    }
    this.rotation += deg;
    this.element.style.transform = `rotate(${this.rotation}deg)`;
  }
  tick() {
    this.rotate(2);
  }
  animate() {
    this.interval = this._w.setInterval(this.tick.bind(this), 50);
  }
  stop() {
    this._w.clearInterval(this.interval);
  }
}

export default function app(_w) {
  const canvas = _w.document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const inputCol = _w.document.getElementById("input_col");
  const inputLineWidth = _w.document.getElementById("input_lineWidth");
  const inputSpinSpeed = _w.document.getElementById("input_spinSpeed");
  const btnGetImage = _w.document.getElementById("btn_getImage");
  const btnResetCanvas = _w.document.getElementById("btn_resetCanvas");

  const __draw = (_e, _ctx) => {
    _ctx.lineTo(_e.offsetX, _e.offsetY);
    _ctx.stroke();
  };
  const _drawStart = (_e) => {
    console.log(_e);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = inputLineWidth.value;
    ctx.strokeStyle = inputCol.value;
    ctx.beginPath();
    __draw(_e, ctx);
  };
  const _draw = (_e) => {
    __draw(_e, ctx);
  };
  const _drawEnd = (_e) => {
    ctx.closePath();
  };

  btnGetImage.addEventListener("click", (_e) => {
    _e.preventDefault();
    const newImgEl = _w.document.createElement("img");
    newImgEl.src = canvas.toDataURL();
    _w.document.body.appendChild(newImgEl);
  });

  btnResetCanvas.addEventListener("click", (_e) => {
    _e.preventDefault();
    ctx.reset();
  });

  canvas.addEventListener("animationstart", (_e) => {});

  rs = new RotationService(window, canvas);
  inputSpinSpeed.addEventListener("change", (_e) => {
    // canvas.style.animationDuration = `${_e.target.value}ms`;
    rs.animate();
  });

  inputLineWidth.addEventListener("change", (_e) =>
    setCursor(Number(_e.target.value), canvas)
  );

  setCursor(Number(inputLineWidth.value), canvas);
  draw(canvas, _drawStart, _draw, _drawEnd);
}
