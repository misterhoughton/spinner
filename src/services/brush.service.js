import { BehaviorSubject } from "rxjs";
import { GCO } from "../GlobalCompositeOperations";
import { brushPatterns } from "../brushPatterns";

const defaults = {
  col: "#000",
  cap: "round",
  join: "round",
  width: 10,
  blendMode: GCO[0],
  pattern: Object.keys(brushPatterns)[0],
};

class _BrushService {
  #strokeStyle = new BehaviorSubject(defaults.col);
  #lineCap = new BehaviorSubject(defaults.cap);
  #lineJoin = new BehaviorSubject(defaults.join);
  #lineWidth = new BehaviorSubject(defaults.width);
  #blendingMode = new BehaviorSubject(defaults.blendMode);
  #lineColour = new BehaviorSubject(defaults.col);
  #brushPattern = new BehaviorSubject(defaults.pattern);

  get lineColour() {
    return this.#lineColour.asObservable();
  }
  set lineColour(col) {
    this.#lineColour.next(col);
    this.strokeStyle = brushPatterns[this.#brushPattern.value](
      this.#lineWidth.value,
      col
    );
  }

  get lineCap() {
    return this.#lineCap.asObservable();
  }
  set lineCap(style) {
    this.#lineCap.next(style);
  }

  get lineJoin() {
    return this.#lineJoin.asObservable();
  }
  set lineJoin(style) {
    this.#lineJoin.next(style);
  }

  get lineWidth() {
    return this.#lineWidth.asObservable();
  }
  set lineWidth(lineWidth) {
    this.#lineWidth.next(lineWidth);
    this.strokeStyle = brushPatterns[this.#brushPattern.value](
      lineWidth,
      this.#lineColour.value
    );
  }

  get strokeStyle() {
    return this.#strokeStyle.asObservable();
  }
  set strokeStyle(style) {
    this.#strokeStyle.next(style);
  }

  get brushPattern() {
    return this.#brushPattern.asObservable();
  }
  set brushPattern(_brushPattern) {
    this.#brushPattern.next(_brushPattern);
    this.strokeStyle = brushPatterns[this.#brushPattern.value](
      this.#lineWidth.value,
      this.#lineColour.value
    );
  }

  get blendingMode() {
    return this.#blendingMode.asObservable();
  }
  set blendingMode(mode) {
    this.#blendingMode.next(mode);
  }
}

const BrushService = Object.freeze(new _BrushService());
export default BrushService;
