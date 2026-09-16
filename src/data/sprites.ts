// Pixel-art sprites defined as character grids + palette maps.
// "." = transparent. Each other char maps to a fill colour.

export type Sprite = {
  rows: string[];
  palette: Record<string, string>;
};

const C = {
  pink: "#ff4f9a",
  pinkDark: "#c02e6e",
  pinkLite: "#ff9ac5",
  yellow: "#ffd04d",
  yellowDark: "#e0a500",
  cyan: "#00e0ff",
  teal: "#2ed7c3",
  white: "#f8f8f8",
  ink: "#12122b",
  black: "#050510",
  gray: "#d8d8e8",
  grayShade: "#9a9ab0",
  crater: "#5a5a72",
  visor: "#00e0ff",
  visorDark: "#0a3a4a",
};

export const astronaut: Sprite = {
  rows: [
    "..KKKKKKK..",
    ".KWWWWWWWK.",
    ".KWKKKKKWK.",
    ".KWVVVVVWK.",
    ".KWVPPPVWK.",
    ".KWKKKKKWK.",
    "KKWWWWWWWKK",
    "KWWWWRWWWWK",
    "KWWWWWWWWWK",
    ".KWWWWWWWK.",
    ".KWK...KWK.",
    ".KWK...KWK.",
    "..KK...KK..",
    "...F...F...",
  ],
  palette: {
    K: C.ink,
    W: C.white,
    V: C.visor,
    P: C.visorDark,
    R: C.pink,
    F: C.yellow,
  },
};

export const asteroid: Sprite = {
  rows: [
    "...KKKK...",
    "..KGGGGK..",
    ".KGGGGGGK.",
    "KGGDDGGGGK",
    "KGGDDGGSGK",
    "KGGGGGSSGK",
    ".KGGGGSGK.",
    "..KGSGGK..",
    "...KKKK...",
  ],
  palette: { K: C.ink, G: C.gray, D: C.crater, S: C.grayShade },
};

export const ufo: Sprite = {
  rows: [
    "....KKKKK....",
    "...KWWWWWK...",
    "..KWVVVVVWK..",
    ".KTTTTTTTTTK.",
    "KTYTTYTTYTTTK",
    ".KTTTTTTTTTK.",
    "...BB.B.BB...",
    "..B..B.B..B..",
    ".B...B.B...B.",
  ],
  palette: {
    K: C.ink,
    W: C.white,
    V: C.cyan,
    T: C.teal,
    Y: C.yellow,
    B: C.pink,
  },
};

export const blackhole: Sprite = {
  rows: [
    "...KKKKK...",
    ".KKCCCCCKK.",
    "KCCTTTTTCCK",
    "KCTTKKKTTCK",
    "KCTTKBKTTCK",
    "KCTTKKKTTCK",
    "KCCTTTTTCCK",
    ".KKCCCCCKK.",
    "...KKKKK...",
  ],
  palette: { K: C.ink, C: C.cyan, T: C.teal, B: C.black },
};

export const star: Sprite = {
  rows: [
    "....Y....",
    "...YOY...",
    "...YOY...",
    "YYYYYYYYY",
    ".YYYYYYY.",
    "..YYOYY..",
    ".YYY.YYY.",
    ".YO...OY.",
    "Y.......Y",
  ],
  palette: { Y: C.yellow, O: C.yellowDark },
};

export const planet: Sprite = {
  rows: [
    "...KKKKK...",
    ".KMMMMMMMK.",
    "KMMLLMMMMMK",
    "KMMMMMMMMMK",
    "YYYYYYYYYYY",
    "KMMMMMMMMMK",
    "KMMMMMMDMMK",
    ".KMMMMMMMK.",
    "...KKKKK...",
  ],
  palette: {
    K: C.ink,
    M: C.pink,
    L: C.pinkLite,
    D: C.pinkDark,
    Y: C.yellow,
  },
};

// Small nav / UI icons ------------------------------------------------------

export const iconHome: Sprite = {
  rows: [
    "...I...",
    "..III..",
    ".IIIII.",
    "IIIIIII",
    ".IIIII.",
    ".I.I.I.",
    ".I.I.I.",
  ],
  palette: { I: "#f8f8f8" },
};

export const iconRocket: Sprite = {
  rows: [
    "...I...",
    "..III..",
    "..III..",
    "..III..",
    ".IIIII.",
    ".IIIII.",
    ".I.I.I.",
    "I.....I",
  ],
  palette: { I: "#f8f8f8" },
};

export const iconHelp: Sprite = {
  rows: [
    ".IIIII.",
    "II...II",
    "....II.",
    "...II..",
    "..II...",
    ".......",
    "..II...",
  ],
  palette: { I: "#f8f8f8" },
};

export const iconArrow: Sprite = {
  rows: [
    "....I....",
    "...II....",
    "..IIIIIII",
    ".IIIIIIII",
    "..IIIIIII",
    "...II....",
    "....I....",
  ],
  palette: { I: "#f8f8f8" },
};
