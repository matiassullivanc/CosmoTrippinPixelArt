import Starfield from "@/components/Starfield";
import cosmoAstronautSvg from "@/src_assets/new_astronaut_exact.svg";
import howToPlayBtnSvg from "@/src_assets/how_to_play_button_exact.svg";
import taglineSvg from "@/src_assets/small_astronaut_big_universe_cyan.svg";
import SvgNav from "@/components/SvgNav";
import startGameBtnSvg from "@/src_assets/start_game_button_exact.svg";
import cosmoHomeAssetSvg from "@/src_assets/planet home page.svg";
import homeLogoSvg from "@/src_assets/home_logo.svg";
import ufoSvg from "@/src_assets/ufo final.png";
import blackHoleSvg from "@/src_assets/cosmo_planet_exact.svg";
import asteroidSvg from "@/src_assets/new_asteroid_ultra_thick_outline.svg";
import starSvg from "@/src_assets/star_exact.svg";
import { type Page } from "@/components/Nav";

type Props = { best: number; onStart: () => void; onNavigate: (p: Page) => void; currentPage: Page };

export default function Home({ onStart, onNavigate, currentPage }: Props) {

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden sm:px-4 sm:py-4">
      <Starfield count={70} />

      <section className="relative mx-auto flex h-dvh w-full max-w-[48rem] flex-col overflow-hidden border-[3px] border-cosmo-white bg-cosmo-void/90 shadow-[4px_4px_0_#00e0ff] sm:h-[calc(100dvh-2rem)] sm:border-[4px]">
        <Starfield count={42} />

        {/* Black hole — upper-left, large, behind logo (z-10 < logo z-20) */}
        <img
          src={blackHoleSvg}
          className="absolute left-[-5%] top-[5%] z-10 w-52 animate-pulse opacity-90 sm:w-56"
          alt=""
          aria-hidden="true"
        />

        {/* UFO — upper-right, tilted, behind logo (z-10 < logo z-20) */}
        <img
          src={ufoSvg}
          className="absolute right-[-8%] top-[4%] z-10 w-44 opacity-95 sm:w-64"
          style={{ transform: "rotate(-28deg)" }}
          alt=""
          aria-hidden="true"
        />

        {/* Large asteroid — left side, below logo, beside astronaut */}
        <img
          src={asteroidSvg}
          className="absolute left-[2%] top-[56%] z-10 w-20 animate-spin-slow opacity-90 sm:top-[42%] sm:w-32"
          style={{ animationDuration: "12s" }}
          alt=""
          aria-hidden="true"
        />

        {/* Small asteroid — just right of large asteroid */}
        <img
          src={asteroidSvg}
          className="absolute left-[23%] top-[63%] z-10 w-7 animate-spin-slow opacity-85 sm:left-[14%] sm:top-[52%] sm:w-12"
          style={{ animationDuration: "20s" }}
          alt=""
          aria-hidden="true"
        />

        {/* Star — tight to astronaut's raised hand */}
        <img
          src={starSvg}
          className="absolute left-[59%] top-[40%] z-20 w-10 animate-float opacity-95 sm:left-[55%] sm:top-[50%] sm:w-14"
          alt=""
          aria-hidden="true"
        />

        {/* Star — lower-right accent */}
        <img
          src={starSvg}
          className="absolute right-[11%] top-[65%] z-20 w-5 animate-pulse opacity-80 sm:right-[10%] sm:top-[58%] sm:w-8"
          alt=""
          aria-hidden="true"
        />

        <div className="relative z-20 flex flex-1 flex-col items-center justify-start pt-[12%] sm:pt-8">
          {/* Logo */}
          <div className="mb-2 flex w-full max-w-[280px] flex-col items-center justify-center sm:max-w-[360px]">
            <img
              src={homeLogoSvg}
              className="w-full object-contain"
              alt="Cosmo Trippin Logo"
            />
          </div>

          <p className="font-display text-[10px] tracking-[0.2em] text-cosmo-yellow sm:text-xs">
            DODGE &bull; COLLECT &bull; SURVIVE
          </p>

          {/* Central Astronaut */}
          <div className="relative mt-8 mb-6 flex flex-1 items-center justify-center">
            <img
              src={cosmoAstronautSvg}
              className="pixel relative z-20 h-48 w-48 -rotate-[15deg] object-contain drop-shadow-[0_0_24px_rgba(0,224,255,0.4)] sm:h-64 sm:w-64"
              alt="Cosmo the astronaut floating diagonally"
            />
          </div>

          {/* Action Buttons */}
          <div className="z-30 flex w-full flex-col items-center gap-4 px-6 pb-36 sm:gap-5 sm:pb-52">
            <button
              onClick={onStart}
              className="pixel-focus w-full max-w-[16rem] sm:max-w-[18rem]"
              aria-label="Start Game"
            >
              <img
                src={startGameBtnSvg}
                className="pixel w-full object-contain"
                alt="START GAME"
              />
            </button>

            <button
              onClick={() => onNavigate("howto")}
              className="pixel-focus w-full max-w-[16rem] sm:max-w-[18rem]"
              aria-label="How To Play"
            >
              <img
                src={howToPlayBtnSvg}
                className="pixel w-full object-contain"
                alt="HOW TO PLAY"
              />
            </button>
            
            {/* Tagline SVG — shown on both mobile and desktop */}
            <img
              src={taglineSvg}
              className="pixel mt-3 w-48 object-contain sm:mt-2 sm:w-56"
              alt="A SMALL ASTRONAUT. A BIG UNIVERSE."
            />
          </div>
        </div>

        {/* Planet surface */}
        <img
          src={cosmoHomeAssetSvg}
          className="pixel absolute inset-x-0 bottom-[52px] z-10 w-full object-contain object-bottom sm:bottom-0"
          alt=""
          aria-hidden="true"
        />

        {/* Bottom nav */}
        <SvgNav activePage={currentPage} onNavigate={onNavigate} className="relative z-40 mt-auto shrink-0" />
      </section>
    </div>
  );
}
