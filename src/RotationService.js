import { rotatePoint } from "./transformation.utilities";

export class RotationService {
  constructor(
    _window,
    _canvas,
    _framerate = 1000 / 200,
    _rotationIncrement = 0
  ) {
    this.window = _window;
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext("2d");
    this.framerate = _framerate;
    this.rotationIncrement = _rotationIncrement;
    this.start();
  }
  #frame = 0;
  #rotationAngle = 0;
  #previousTimeStamp = 0;
  tickFns = new Set();

  getRotatedCoords(x, y) {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    return rotatePoint(cx, cy, x, y, this.#rotationAngle);
  }

  tick(timeStamp) {
    const newRotationAngle = Math.floor(
      (this.#rotationAngle + this.rotationIncrement) % 360
    );
    if (timeStamp > this.#previousTimeStamp + this.framerate) {
      this.#previousTimeStamp = timeStamp;
      this.tickFns.forEach((fn) => fn());
      this.canvas.style.transform = `rotate(${this.#rotationAngle}deg)`;
      this.#rotationAngle = newRotationAngle;
      this.#frame += this.framerate;
    }
    this.start();
  }

  start() {
    this.window.requestAnimationFrame(this.tick.bind(this));
  }

  stop() {}
}
