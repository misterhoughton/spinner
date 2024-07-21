import { rotatePoint, degreesToRadians } from "./transformation.utilities";

export class RotationService {
  constructor(_window, _canvas, _framerate = 30, _rotationIncrement = 0) {
    this.window = _window;
    this.canvas = _canvas;
    this.ctx = this.canvas.getContext("2d");
    this.framerate = _framerate;
    this.rotationIncrement = _rotationIncrement;
    this.start();
  }
  #frame = 0;
  #rotationAngle = 0;
  #previousTimeStamp;
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
    if (this.#previousTimeStamp === undefined) {
      this.#previousTimeStamp = timeStamp;
    }
    if (timeStamp > this.#previousTimeStamp + this.framerate) {
      this.#previousTimeStamp = timeStamp;
      if (newRotationAngle !== this.#rotationAngle) {
        this.tickFns.forEach((fn) => fn());
        this.canvas.style.transform = `rotate(${this.#rotationAngle}deg)`;
        this.#rotationAngle = newRotationAngle;
        this.#frame += this.framerate;
      }
    }
    this.window.requestAnimationFrame(this.tick.bind(this));
  }

  start() {
    this.window.requestAnimationFrame(this.tick.bind(this));
  }

  stop() {}
}
