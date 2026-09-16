import { useMemo } from "react";

type Props = { count?: number; className?: string };

const COLORS = ["#f8f8f8", "#00e0ff", "#ffd04d", "#ff4f9a"];

// Decorative pixel starfield. Deterministic-ish random per mount.
export default function Starfield({ count = 60, className }: Props) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() < 0.75 ? 2 : 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
      })),
    [count],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            animation: `cosmo-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
