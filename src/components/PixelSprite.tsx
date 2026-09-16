import type { CSSProperties, ReactElement } from "react";
import type { Sprite } from "@/data/sprites";

type Props = {
  sprite: Sprite;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

// Renders a character-grid sprite as crisp 1x1 SVG rects.
export default function PixelSprite({ sprite, className, style, title }: Props) {
  const { rows, palette } = sprite;
  const h = rows.length;
  const w = rows[0].length;
  const rects: ReactElement[] = [];

  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      const fill = palette[ch];
      if (!fill) continue;
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />,
      );
    }
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={`pixel ${className ?? ""}`}
      style={style}
      preserveAspectRatio="xMidYMid meet"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {rects}
    </svg>
  );
}
