import { Subject } from "rxjs";
import { blobToDataURL } from "../utilities";

class _UndoService {
  #thumbnail;
  #$stack = new Subject();
  #stack = [];
  get $undoNotifier() {
    return this.#$stack.asObservable();
  }

  addToStack(item) {
    this.#stack.push(item);
  }

  undo() {
    this.#$stack.next(this.#stack.pop());
  }

  set thumbnail(t) {
    this.#thumbnail = t;
  }

  get thumbnail() {
    return this.#thumbnail;
  }
}

const UndoService = Object.freeze(new _UndoService());
export default UndoService;
