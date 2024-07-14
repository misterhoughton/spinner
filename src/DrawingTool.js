const noOp = () => {};

export class DrawingTool {
  constructor(element, drawStart = noOp, draw = noOp, drawEnd = noOp) {
    const _mousedownHandler = (e) => {
      drawStart(e);
      element.addEventListener("mousemove", draw);
      element.addEventListener("mouseup", _mouseupHandler);
      element.addEventListener("mouseleave", _mouseleaveHandler);
    };
    const _mouseupHandler = (_e) => {
      drawEnd(_e);
      element.removeEventListener("mousemove", draw);
      element.removeEventListener("mouseup", _mouseupHandler);
      element.removeEventListener("mouseleave", _mouseleaveHandler);
    };
    const _mouseleaveHandler = (e) => {
      _mouseupHandler(e);
    };
    const _mouseenterHandler = (e) => {
      if (e.buttons === 1) {
        _mousedownHandler(e);
      }
    };
    element.addEventListener("mousedown", _mousedownHandler);
    element.addEventListener("mouseenter", _mouseenterHandler);
  }
}
