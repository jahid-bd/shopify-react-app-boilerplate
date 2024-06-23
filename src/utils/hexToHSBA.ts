interface HSBAColor {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  b: number; // Brightness (0-100)
  a: number; // Alpha (0-1)
}

export function hexToHSBA(hex: string): HSBAColor | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
  hex = hex.replace(shorthandRegex, (_m, r, g, b, a) => {
    return r + r + g + g + b + b + (a ? a + a : '');
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hex
  );
  if (!result) {
    return null;
  }

  const [, r, g, b, a] = result.map((x) => parseInt(x, 16));

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const v = max / 255;

  if (delta !== 0) {
    s = delta / max;
    const deltaR = ((max - r) / 6 + delta / 2) / delta;
    const deltaG = ((max - g) / 6 + delta / 2) / delta;
    const deltaB = ((max - b) / 6 + delta / 2) / delta;

    if (r === max) {
      h = deltaB - deltaG;
    } else if (g === max) {
      h = 1 / 3 + deltaR - deltaB;
    } else {
      h = 2 / 3 + deltaG - deltaR;
    }

    if (h < 0) {
      h += 1;
    }
    if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    b: Math.round(v * 100),
    a: a ? parseFloat((a / 255).toFixed(2)) : 1,
  };
}
