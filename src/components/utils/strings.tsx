export const MONTHS = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
// const hexToRgb = (hex: string) => {
//   const cleaned = hex.replace("#", "");
//   const bigint = parseInt(cleaned, 16);
//   const r = (bigint >> 16) & 255;
//   const g = (bigint >> 8) & 255;
//   const b = bigint & 255;
//   return { r, g, b };
// };

// const getLuminance = (r: number, g: number, b: number) => {
//   const [R, G, B] = [r, g, b].map((c) => {
//     const channel = c / 255;
//     return channel <= 0.03928
//       ? channel / 12.92
//       : Math.pow((channel + 0.055) / 1.055, 2.4);
//   });
//   return 0.2126 * R + 0.7152 * G + 0.0722 * B;
// };
// export const isLightColor = (hexColor: string) => {
//   const { r, g, b } = hexToRgb(hexColor);
//   const luminance = getLuminance(r, g, b);
//   return luminance > 0.6; // Umbral: > 0.6 es claro
// };
