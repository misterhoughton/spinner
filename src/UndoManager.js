export class UndoManager {
  constructor() {}
  #stack = [];
  get length() {
    return this.#stack.length;
  }

  addToStack(item) {
    this.#stack.push(item);
  }

  pop() {
    return this.#stack.pop();
  }
}
