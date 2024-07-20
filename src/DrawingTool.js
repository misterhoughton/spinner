const noop = () => {};

export class DrawingTool {
  constructor(element, drawStart = noop, draw = noop, drawEnd = noop) {
    const _downHandler = (e) => {
      drawStart(e);
      element.addEventListener("mousemove", draw);
      element.addEventListener("mouseup", _upHandler);
      element.addEventListener("mouseleave", _leaveHandler);
      element.addEventListener("touchstart", draw);
      element.addEventListener("touchend", _upHandler);
    };
    const _upHandler = (_e) => {
      drawEnd(_e);
      element.removeEventListener("mousemove", draw);
      element.removeEventListener("mouseup", _upHandler);
      element.removeEventListener("mouseleave", _leaveHandler);
      element.removeEventListener("touchstart", draw);
      element.removeEventListener("touchend", _upHandler);
    };
    const _leaveHandler = (e) => {
      _upHandler(e);
    };
    const _enterHandler = (e) => {
      if (e.buttons === 1) {
        _downHandler(e);
      }
    };
    element.addEventListener("mousedown", _downHandler);
    element.addEventListener("mouseenter", _enterHandler);
    element.addEventListener("touchstart", _downHandler);
    element.addEventListener("touchend", _enterHandler);
  }
}
