import { Subject } from "rxjs";

class _BackgroundService {
  #$backgroundImg = new Subject();
  #$onReset = new Subject();

  get $backgroundImg() {
    return this.#$backgroundImg.asObservable();
  }
  setBackgroundImage(img) {
    this.#$backgroundImg.next(img);
  }

  get $onReset() {
    return this.#$onReset.asObservable();
  }
  reset() {
    this.#$onReset.next();
  }
}

const BackgroundService = Object.freeze(new _BackgroundService());
export default BackgroundService;
