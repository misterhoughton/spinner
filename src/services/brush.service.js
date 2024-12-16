import { BehaviorSubject } from "rxjs";
import { GCO } from "../GlobalCompositeOperations";
import { brushPatterns } from "../brushPatterns";

class _BrushService {
  #strokeStyle = new BehaviorSubject("#000");
  #lineCap = new BehaviorSubject("round");
  #lineJoin = new BehaviorSubject("round");
  #lineWidth = new BehaviorSubject(10);
  #blendingMode = new BehaviorSubject(GCO[0]);
  #lineColour = new BehaviorSubject("#000");
  #brushPattern = new BehaviorSubject(Object.keys(brushPatterns)[0]);

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
