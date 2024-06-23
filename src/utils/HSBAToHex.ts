interface HSBAColor {
  h: number; // Hue (0-360)
  s: number; // Saturation (0-100)
  b: number; // Brightness (0-100)
  a: number; // Alpha (0-1)
}

export function HSBAtoHex(hsba: HSBAColor): string {
  const { h, s, b, a } = hsba;
  const hsbToRgb = (
    h: number,
    s: number,
    v: number
  ): [number, number, number] => {
    const f = (n: number, k = (n + h / 60) % 6) =>
      v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)].map((v) => Math.round(v * 255)) as [
      number,
      number,
      number
    ];
  };

  const [r, g, blue] = hsbToRgb(h / 360, s / 100, b / 100);
  const hex = ((1 << 24) + (r << 16) + (g << 8) + blue).toString(16).slice(1);
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');
  return `#${hex}${alphaHex}`;
}
