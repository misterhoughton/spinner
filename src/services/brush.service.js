import { BehaviorSubject } from "rxjs";

class _BrushService {
  #strokeStyle = new BehaviorSubject("#ccc");
  #lineCap = new BehaviorSubject("round");
  #lineJoin = new BehaviorSubject("round");
  #lineWidth = new BehaviorSubject(1);
  #rotationIncrement = new BehaviorSubject(0);

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
    this.#strokeStyle.next(style);
  }

  get rotationIncrement() {
    return this.#rotationIncrement.asObservable();
  }
  set rotationIncrement(angle) {
    this.#rotationIncrement.next(angle);
  }
}

const BrushService = Object.freeze(new _BrushService());
export default BrushService;
