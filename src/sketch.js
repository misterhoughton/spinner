import p5 from "p5";

const sketch = (p) => {
  let x = 20;
  let y = 20;

  let sliders = {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
  };
  let sliderConfig = {
    range: [-100, 100],
    size: 300,
  };

  p.setup = function () {
    let sliderY = 0;
    p.createCanvas(p.windowWidth, p.windowHeight, 410);
    for (const k in sliders) {
      sliders[k] = p.createSlider(...sliderConfig.range);
      sliders[k].size(sliderConfig.size);
      sliders[k].position(0, (sliderY += 30));
    }
  };

  p.draw = function () {
    const getSliderVal = (slider, factor) => slider.value() * factor;
    const t = {
      a: getSliderVal(sliders.a, 0.01),
      b: getSliderVal(sliders.b, 0.01),
      c: getSliderVal(sliders.c, 0.01),
      d: getSliderVal(sliders.d, 0.01),
      e: getSliderVal(sliders.e, 10),
      f: getSliderVal(sliders.f, 10),
    };

    let angle = 0.1;
    let ca = Math.cos(angle);
    let sa = Math.sin(angle);
    p.clear();
    p.push();
    p.applyMatrix(t.a, t.b, t.c, t.d, t.e, t.f);
    p.rect(0, 0, 500);
    p.pop();

    // p.fill(255);
    // p.text(angle);
    // p.noLoop();
    // c.rotate(p.QUARTER_PI);
    // p.pop();
    let sliderLabelX = sliderConfig.size + 10;
    for (const k in t) {
      p.text(t.a, sliderLabelX, 40);
      p.text(t.b, sliderLabelX, 70);
      p.text(t.c, sliderLabelX, 100);
      p.text(t.d, sliderLabelX, 130);
      p.text(t.e, sliderLabelX, 160);
      p.text(t.f, sliderLabelX, 190);
    }
  };

  p.mouseMoved = function () {};
};

new p5(sketch);
