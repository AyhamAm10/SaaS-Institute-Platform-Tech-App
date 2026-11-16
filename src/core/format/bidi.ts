/** Keeps a left-to-right run (e.g. a school year "2026 - 2027") in reading order inside RTL text. */
export function isolateLtr(text: string): string {
  return `⁦${text}⁩`;
}
