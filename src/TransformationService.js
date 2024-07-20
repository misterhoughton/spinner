import { rotatePoint } from "./transformation.utilities";

export class RotationService {
  constructor(_window, _element, _framerate = 1, _rotationIncrement = 0) {
    this.window = _window;
    this.element = _element;
    this.framerate = _framerate;
    this.rotationIncrement = _rotationIncrement;
    this.start();
  }
  #frame = 0;
  #rotationAngle = 0;
  #interval = null;
  tickFns = new Set();

  getRotatedCoords(x, y) {
    const cx = this.element.width / 2;
    const cy = this.element.height / 2;
    return rotatePoint(cx, cy, x, y, this.#rotationAngle);
  }

  tick() {
    const newRotationAngle = Math.floor(
      (this.#rotationAngle + this.rotationIncrement) % 360
    );
    if (newRotationAngle !== this.#rotationAngle) {
      this.tickFns.forEach((fn) => fn());
      this.element.style.transform = `rotate(${this.#rotationAngle}deg)`;
      this.#rotationAngle = newRotationAngle;
      this.#frame += this.framerate;
    }
  }

  start() {
    this.#interval = this.window.setInterval(
      this.tick.bind(this),
      this.framerate
    );
  }

  stop() {
    this.window.clearInterval(this.#interval);
  }
}
