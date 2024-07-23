const noop = () => {};

export class DrawingTool {
  constructor(canvas, drawStart = noop, draw = noop, drawEnd = noop) {
    const touchEventConfig = { passive: true };
    const _downHandler = (e) => {
      drawStart(e);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("touchmove", draw, touchEventConfig);
      canvas.addEventListener("mouseup", _upHandler);
      canvas.addEventListener("touchend", _upHandler, touchEventConfig);
      canvas.addEventListener("mouseleave", _leaveHandler);
    };
    const _upHandler = (_e) => {
      drawEnd(_e);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("touchmove", draw, touchEventConfig);
      canvas.removeEventListener("mouseup", _upHandler);
      canvas.removeEventListener("touchend", _upHandler, touchEventConfig);
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
