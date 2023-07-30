export function getPlural(num: number, word: string) {
  return num === 1 ? word : `${word}s`;
}
