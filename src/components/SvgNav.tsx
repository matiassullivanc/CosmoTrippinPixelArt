import navHomeSvg from "@/src_assets/nav_home_active.svg";
import navGameSvg from "@/src_assets/nav_game_active.svg";
import navHowToPlaySvg from "@/src_assets/nav_how_to_play_active.svg";
import { type Page } from "@/components/Nav";

const NAV_ASSET: Record<Page, string> = {
  home:  navHomeSvg,
  game:  navGameSvg,
  howto: navHowToPlaySvg,
};

// Left-to-right zone order in all three nav assets: HOME | GAME | HOW TO PLAY
const ZONES: { page: Page; label: string }[] = [
  { page: "home",  label: "Home" },
  { page: "game",  label: "Game" },
  { page: "howto", label: "How To Play" },
];

type Props = {
  activePage: Page;
  onNavigate: (p: Page) => void;
  className?: string;
};

export default function SvgNav({ activePage, onNavigate, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={NAV_ASSET[activePage]}
        className="pixel w-full object-contain block"
        alt="Navigation"
      />
      <div className="absolute inset-0 flex">
        {ZONES.map(({ page, label }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            aria-label={label}
            aria-current={activePage === page ? "page" : undefined}
            className="flex-1 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
