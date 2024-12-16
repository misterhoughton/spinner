import { Subject } from "rxjs";

class _UndoService {
  #$stack = new Subject<[]>();
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
}

const UndoService = new _UndoService();
export default UndoService;
