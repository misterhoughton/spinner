import { Subject } from "rxjs";
import { UndoManager } from "../UndoManager";

class _UndoService {
  #undoManager = new UndoManager();
  #$stack = new Subject();

  get stack() {
    return this.#$stack.asObservable();
  }

  addToStack(item) {
    this.#undoManager.addToStack(item);
  }

  undo() {
    this.#$stack.next(this.#undoManager.pop());
  }
}

const UndoService = Object.freeze(new _UndoService());
export default UndoService;
