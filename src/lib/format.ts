export function formatCityName(name: string | undefined): string | undefined {
  if (!name) return undefined
  return name
    .toLowerCase()
    .replace(/\bkab\.\s*/g, 'Kabupaten ')
    .replace(/\bkota\s*/g, 'Kota ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}
