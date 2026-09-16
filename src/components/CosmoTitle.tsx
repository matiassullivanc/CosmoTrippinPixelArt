type Props = { className?: string; size?: string };

// Layered multi-colour pixel wordmark (white face + cyan/pink/yellow offsets).
export default function CosmoTitle({ className, size }: Props) {
  const shadow = [
    "3px 3px 0 #07040f",
    "6px 6px 0 #00e0ff",
    "9px 9px 0 #ff4f9a",
    "12px 12px 0 #ffd04d",
  ].join(", ");

  return (
    <h1
      className={`font-display leading-[1.15] text-cosmo-white ${className ?? ""}`}
      style={{ fontSize: size ?? "clamp(1.6rem, 7vw, 3.4rem)", textShadow: shadow }}
    >
      <span className="block">COSMO</span>
      <span className="block">
        TRIPPIN<span className="text-cosmo-pink">'</span>
      </span>
    </h1>
  );
}
