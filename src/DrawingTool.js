const noop = () => {};

export class DrawingTool {
  constructor(canvas, drawStart = noop, draw = noop, drawEnd = noop) {
    const _downHandler = (e) => {
      drawStart(e);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("touchmove", draw, { passive: true });
      canvas.addEventListener("mouseup", _upHandler);
      canvas.addEventListener("touchend", _upHandler, { passive: true });
      canvas.addEventListener("mouseleave", _leaveHandler);
    };
    const _upHandler = (_e) => {
      drawEnd(_e);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("mouseup", _upHandler);
      canvas.removeEventListener("touchend", _upHandler);
      canvas.removeEventListener("mouseleave", _leaveHandler);
    };
    const _leaveHandler = (e) => {
      _upHandler(e);
    };
    const _enterHandler = (e) => {
      if (e.buttons === 1) {
        _downHandler(e);
      }
    };
    canvas.addEventListener("mousedown", _downHandler);
    canvas.addEventListener("mouseenter", _enterHandler);
    canvas.addEventListener("touchstart", _downHandler, { passive: true });
    canvas.addEventListener("touchend", _enterHandler, { passive: true });
  }
}
