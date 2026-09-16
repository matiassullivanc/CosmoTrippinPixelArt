import PixelSprite from "@/components/PixelSprite";
import { iconHome, iconRocket, iconHelp, type Sprite } from "@/data/sprites";

export type Page = "home" | "game" | "howto";

type Item = { key: Page; label: string; icon: Sprite; color: string };

const ITEMS: Item[] = [
  { key: "home", label: "HOME", icon: iconHome, color: "#ff4f9a" },
  { key: "game", label: "GAME", icon: iconRocket, color: "#ffd04d" },
  { key: "howto", label: "HOW TO PLAY", icon: iconHelp, color: "#00e0ff" },
];

type Props = { page: Page; onNavigate: (p: Page) => void };

export default function Nav({ page, onNavigate }: Props) {
  return (
    <nav
      aria-label="Primary"
      className="pixel-panel z-30 mx-auto flex w-full max-w-5xl items-stretch justify-around gap-1 px-2 py-3 sm:gap-2 sm:px-4"
    >
      {ITEMS.map((item) => {
        const active = page === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            aria-current={active ? "page" : undefined}
            className={`pixel-focus group flex flex-1 flex-col items-center justify-center gap-1.5 border-[3px] px-1 py-2 transition-colors ${
              active
                ? "border-cosmo-white bg-cosmo-void"
                : "border-transparent hover:border-cosmo-white/40"
            }`}
          >
            <span className="flex items-center gap-1">
              {active && (
                <span
                  aria-hidden="true"
                  className="animate-blink font-display text-[9px]"
                  style={{ color: item.color }}
                >
                  &gt;
                </span>
              )}
              <PixelSprite
                sprite={{
                  ...item.icon,
                  palette: { I: active ? item.color : "#8a86a8" },
                }}
                className="h-5 w-5"
              />
            </span>
            <span
              className="font-display text-[7px] uppercase tracking-wide sm:text-[8px]"
              style={{ color: active ? item.color : "#8a86a8" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
