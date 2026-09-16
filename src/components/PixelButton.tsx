import type { ButtonHTMLAttributes } from "react";

type Variant = "pink" | "cyan" | "yellow";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const STYLES: Record<Variant, string> = {
  pink: "bg-cosmo-pink text-cosmo-void",
  cyan: "bg-cosmo-cyan text-cosmo-void",
  yellow: "bg-cosmo-yellow text-cosmo-void",
};

// Chunky arcade button with a hard drop-shadow that "presses" on active.
export default function PixelButton({
  variant = "pink",
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`pixel-focus inline-flex items-center justify-center gap-2 border-[3px] border-cosmo-void font-display text-[11px] uppercase leading-none tracking-wider transition-transform duration-75 active:translate-x-[4px] active:translate-y-[4px] ${STYLES[variant]} ${className ?? ""}`}
      style={{ boxShadow: "4px 4px 0 0 #07040f, 4px 4px 0 3px #f8f8f8" }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 0 0 0 #07040f, 0 0 0 3px #f8f8f8";
        rest.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "4px 4px 0 0 #07040f, 4px 4px 0 3px #f8f8f8";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "4px 4px 0 0 #07040f, 4px 4px 0 3px #f8f8f8";
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
