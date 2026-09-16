const KEY = "cosmo-trippin-best";

export function loadBest(): number {
  try {
    const raw = localStorage.getItem(KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

export function saveBest(value: number): void {
  try {
    localStorage.setItem(KEY, String(value));
  } catch {
    /* ignore storage failures */
  }
}

// Zero-padded arcade-style score, e.g. 1240 -> "01240".
export function pad(n: number, len = 5): string {
  return String(Math.max(0, Math.floor(n))).padStart(len, "0");
}
