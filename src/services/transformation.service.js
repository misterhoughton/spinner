import { BehaviorSubject } from "rxjs";

class _TransformationService {
  #rotationIncrement = new BehaviorSubject(0);
  get rotationIncrement() {
    return this.#rotationIncrement.asObservable();
  }
  set rotationIncrement(angle) {
    this.#rotationIncrement.next(angle);
  }
}

const TransformationService = Object.freeze(new _TransformationService());
export default TransformationService;
