import { BehaviorSubject } from "rxjs";
import { GCO } from "../GlobalCompositeOperations";
import { brushPatterns } from "../brushPatterns";

class _BrushService {
  #strokeStyle = new BehaviorSubject("#2dd7c3");
  #lineCap = new BehaviorSubject("round");
  #lineJoin = new BehaviorSubject("round");
  #lineWidth = new BehaviorSubject(1);
  #rotationIncrement = new BehaviorSubject(0);
  #blendingMode = new BehaviorSubject(GCO[0]);
  #lineColour = new BehaviorSubject("#2dd7c3");
  #brushPattern = new BehaviorSubject(Object.keys(brushPatterns)[0]);

  get lineColour() {
    return this.#lineColour.asObservable();
  }
  set lineColour(col) {
    this.#lineColour.next(col);
    this.#strokeStyle.next(this.brushPattern);
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
  set lineWidth(width) {
    this.#lineWidth.next(width);
  }

  get strokeStyle() {
    return this.#strokeStyle.asObservable();
  }
  set strokeStyle(style) {
    this.#strokeStyle.next(this.brushPattern);
  }

  get brushPattern() {
    return brushPatterns[this.#brushPattern.value](
      this.#lineWidth.value,
      this.#lineColour.value
    );
  }
  set brushPattern(_brushPattern) {
    this.#brushPattern.next(_brushPattern);
    this.#strokeStyle.next(this.brushPattern);
  }

  get rotationIncrement() {
    return this.#rotationIncrement.asObservable();
  }
  set rotationIncrement(angle) {
    this.#rotationIncrement.next(angle);
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
