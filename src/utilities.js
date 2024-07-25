// Geometry

export function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function rotatePoint(cx, cy, x, y, degrees) {
  const radians = degreesToRadians(degrees);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return { x: Math.round(nx), y: Math.round(ny) };
}

// gets hexagon incircle from circumcircle
// https://calcresource.com/geom-hexagon.html
export function polyCircToIncirc(circ) {
  const sin = Math.sin(degreesToRadians(60));
  return circ / (2 * sin);
}

// Data wrangling

export async function blobToDataURL(_blob) {
  return new Promise((res, _) => {
    const fr = new FileReader();
    fr.onload = (e) => {
      res(e.target.result);
    };
    fr.readAsDataURL(_blob);
  });
}
