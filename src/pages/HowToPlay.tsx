import Starfield from "@/components/Starfield";
import SvgNav from "@/components/SvgNav";
import { type Page } from "@/components/Nav";
import homeLogoSvg from "@/src_assets/home_logo.svg";
import astronautSvg from "@/src_assets/cosmo_astronaut.svg";
import blackHoleSvg from "@/src_assets/cosmo_black_hole_exact.svg";
import asteroidSvg from "@/src_assets/new_asteroid_ultra_thick_outline.svg";
import starSvg from "@/src_assets/star_exact.svg";
import ufoSvg from "@/src_assets/cosmo_ufo_exact.svg";
import planetSvg from "@/src_assets/cosmo_planet_exact.svg";
import arrowLeftSvg from "@/src_assets/new_arrow_left.svg";

type Props = { onPlay: () => void; onNavigate: (p: Page) => void; currentPage: Page };

/* ─── Inline SVG primitives ─────────────────────────────────────── */

const Heart = () => (
  <svg viewBox="0 0 20 18" className="h-8 w-8 shrink-0" aria-hidden="true">
    <path
      fill="#ff4f9a"
      d="M10 17 C10 17 1 11 1 5 C1 2.2 3.2 0 6 0 C7.8 0 9.3 0.9 10 2.2 C10.7 0.9 12.2 0 14 0 C16.8 0 19 2.2 19 5 C19 11 10 17 10 17Z"
    />
  </svg>
);

const BarChart = () => (
  <svg viewBox="0 0 44 40" className="h-14 w-14 shrink-0" aria-hidden="true">
    <rect x="1"  y="30" width="8" height="10" fill="#ff4f9a" />
    <rect x="13" y="22" width="8" height="18" fill="#ff4f9a" />
    <rect x="25" y="14" width="8" height="26" fill="#ff4f9a" />
    <rect x="37" y="4"  width="7" height="36" fill="#ff4f9a" />
  </svg>
);

const TapIcon = () => (
  <svg viewBox="0 0 36 44" className="h-14 w-12 shrink-0" aria-hidden="true">
    {/* Pointer finger */}
    <rect x="14" y="0"  width="8" height="22" rx="4" fill="#f8f8f8" />
    {/* Hand palm */}
    <rect x="6"  y="16" width="8" height="20" rx="4" fill="#f8f8f8" />
    <rect x="22" y="16" width="8" height="20" rx="4" fill="#f8f8f8" />
    <rect x="6"  y="28" width="24" height="14" rx="4" fill="#f8f8f8" />
    {/* Tap ripple */}
    <circle cx="18" cy="38" r="5" fill="none" stroke="#00e0ff" strokeWidth="2" opacity="0.8" />
    <circle cx="18" cy="38" r="9" fill="none" stroke="#00e0ff" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

const Key = ({ label }: { label: string }) => (
  <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded border-[2px] border-white/60 bg-white/10 px-1.5 font-display text-[7px] text-cosmo-white">
    {label}
  </span>
);

const Sparkle = ({ color = "#ff4f9a", size = 10 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
    <path fill={color} d="M4 0h2v4h4v2h-4v4h-2v-4h-4v-2h4z" />
  </svg>
);

/* ─── Panel wrapper ─────────────────────────────────────────────── */
const Panel = ({
  children,
  borderColor = "border-cosmo-cyan",
  className = "",
}: {
  children: React.ReactNode;
  borderColor?: string;
  className?: string;
}) => (
  <div
    className={`rounded-xl border-[2px] bg-[#06040e] ${borderColor} ${className}`}
  >
    {children}
  </div>
);

/* ─── Main component ────────────────────────────────────────────── */
export default function HowToPlay({ onPlay, onNavigate, currentPage }: Props) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#05030c]">
      {/* Thin cyan viewport border */}
      <div className="pointer-events-none fixed inset-0 z-40 border-[2px] border-cosmo-cyan" />

      {/* Stars background */}
      <Starfield count={80} />

      {/* ── Scattered sparkle decorations ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[8%]  top-[7%]">  <Sparkle color="#ff4f9a" size={10} /></div>
        <div className="absolute left-[40%] top-[5%]">  <Sparkle color="#ffd04d" size={8}  /></div>
        <div className="absolute right-[14%] top-[12%]"><Sparkle color="#ff4f9a" size={12} /></div>
        <div className="absolute left-[6%]  top-[28%]"><Sparkle color="#ffd04d" size={9}  /></div>
        <div className="absolute right-[8%] top-[35%]"><Sparkle color="#ff4f9a" size={10} /></div>
        <div className="absolute left-[3%]  top-[50%]"><Sparkle color="#00e0ff" size={8}  /></div>
        <div className="absolute right-[5%] top-[58%]"><Sparkle color="#ffd04d" size={11} /></div>
        <div className="absolute left-[12%] top-[68%]"><Sparkle color="#ff4f9a" size={9}  /></div>
        <div className="absolute right-[12%] top-[75%]"><Sparkle color="#ffd04d" size={8} /></div>
        <div className="absolute left-[20%] top-[82%]"><Sparkle color="#ff4f9a" size={10} /></div>
      </div>

      {/* ── Main scrollable content ── */}
      <div className="relative z-10 flex flex-1 flex-col px-4 pb-6 pt-5 sm:px-6 sm:pt-6">

        {/* ── Header: logo + INSERT COIN + black hole + title ── */}
        <div className="relative mb-4">
          {/* Top row */}
          <div className="flex items-start justify-between">
            <img
              src={homeLogoSvg}
              alt="Cosmo Trippin'"
              className="pixel h-12 w-auto sm:h-14"
            />
            <span className="animate-blink font-display text-[8px] text-cosmo-yellow sm:text-[9px]">
              INSERT COIN
            </span>
          </div>

          {/* Black hole — top-right corner decoration */}
          <img
            src={blackHoleSvg}
            alt=""
            aria-hidden="true"
            className="pixel absolute -right-2 -top-1 h-16 w-16 object-contain opacity-90 sm:h-20 sm:w-20"
          />

          {/* HOW TO PLAY pill */}
          <div className="mt-3 flex items-center justify-center">
            <div className="rounded-[14px] border-[3px] border-cosmo-cyan bg-cosmo-void px-6 py-2.5 text-center shadow-[0_0_16px_#00e0ff55]">
              <h1 className="font-display text-[13px] tracking-wide text-cosmo-white sm:text-[15px]">
                HOW TO PLAY
              </h1>
            </div>
          </div>
        </div>

        {/* ── Instruction panels ── */}
        <div className="space-y-3">

          {/* MOVE */}
          <Panel>
            <div className="flex items-center gap-4 p-4">
              <div className="flex w-24 shrink-0 items-center justify-center gap-2">
                <img
                  src={arrowLeftSvg}
                  alt="Left"
                  className="pixel h-10 w-10 object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(40%) sepia(90%) saturate(800%) hue-rotate(290deg) brightness(120%)" }}
                />
                <img
                  src={arrowLeftSvg}
                  alt="Right"
                  className="pixel h-10 w-10 -scale-x-100 object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(80%) sepia(100%) saturate(400%) hue-rotate(155deg) brightness(115%)" }}
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-[10px] text-cosmo-cyan sm:text-[11px]">MOVE</h2>
                <p className="mt-2 font-display text-[7px] leading-[2] text-cosmo-white/85 sm:text-[8px]">
                  SWITCH BETWEEN THE LEFT<br className="hidden xs:block" /> AND RIGHT LANES.
                </p>
              </div>
            </div>
          </Panel>

          {/* DODGE */}
          <Panel>
            <div className="flex items-center gap-4 p-4">
              <div className="flex w-24 shrink-0 items-center justify-center gap-1.5">
                <img src={asteroidSvg} alt="Asteroid" className="pixel h-9 w-9 object-contain" />
                <img src={ufoSvg}      alt="UFO"      className="pixel h-9 w-9 object-contain" />
                <img src={blackHoleSvg} alt="Black hole" className="pixel h-9 w-9 object-contain" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-[10px] text-cosmo-pink sm:text-[11px]">DODGE</h2>
                <p className="mt-2 font-display text-[7px] leading-[2] text-cosmo-white/85 sm:text-[8px]">
                  AVOID ASTEROIDS, UFOS<br />AND BLACK HOLES.<br />EACH HIT COSTS ONE LIFE.
                </p>
              </div>
            </div>
          </Panel>

          {/* COLLECT */}
          <Panel>
            <div className="flex items-center gap-4 p-4">
              <div className="relative flex w-24 shrink-0 items-center justify-center">
                <img src={starSvg} alt="Star" className="pixel h-12 w-12 object-contain" />
                {/* sparkle crosses around star */}
                <span className="absolute -left-0.5 -top-0.5"><Sparkle color="#ffd04d" size={8} /></span>
                <span className="absolute -right-0.5 top-0"><Sparkle color="#ffd04d" size={7} /></span>
                <span className="absolute bottom-0 -left-1"><Sparkle color="#ffffff" size={6} /></span>
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-[10px] text-cosmo-yellow sm:text-[11px]">COLLECT</h2>
                <p className="mt-2 font-display text-[7px] leading-[2] text-cosmo-white/85 sm:text-[8px]">
                  GRAB YELLOW STARS.<br />EACH STAR IS WORTH 100 POINTS
                </p>
                <p className="font-display text-[7px] leading-[2] text-cosmo-yellow sm:text-[8px]">
                  AND MAKES THE GAME FASTER!
                </p>
              </div>
            </div>
          </Panel>

          {/* SURVIVE */}
          <Panel>
            <div className="flex items-center gap-4 p-4">
              <div className="flex w-24 shrink-0 items-center justify-center gap-1">
                <Heart />
                <Heart />
                <Heart />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-[10px] text-cosmo-pink sm:text-[11px]">SURVIVE</h2>
                <p className="mt-2 font-display text-[7px] leading-[2] text-cosmo-white/85 sm:text-[8px]">
                  YOU HAVE THREE LIVES.<br />SURVIVE AS LONG AS YOU CAN —<br />THE GAME GETS FASTER AND HARDER<br />THE LONGER YOU LAST.
                </p>
              </div>
            </div>
          </Panel>

          {/* Controls row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Desktop */}
            <Panel borderColor="border-cosmo-pink">
              <div className="p-3">
                <h3 className="font-display text-[8px] text-cosmo-pink sm:text-[9px]">
                  CONTROLS<br />(DESKTOP)
                </h3>
                <div className="mt-3 flex items-center gap-1 flex-wrap">
                  <Key label="A" />
                  <Key label="D" />
                  <span className="font-display text-[6px] text-white/50">OR</span>
                  <Key label="←" />
                  <Key label="→" />
                </div>
                <p className="mt-2 font-display text-[6px] leading-[2] text-cosmo-white/70 sm:text-[7px]">
                  USE <span className="text-cosmo-yellow">A / D</span> OR{" "}
                  <span className="text-cosmo-yellow">← →</span><br />TO CHANGE LANES.
                </p>
              </div>
            </Panel>

            {/* Mobile */}
            <Panel borderColor="border-cosmo-cyan">
              <div className="p-3">
                <h3 className="font-display text-[8px] text-cosmo-cyan sm:text-[9px]">
                  CONTROLS<br />(MOBILE)
                </h3>
                <div className="mt-2 flex items-center justify-center">
                  <TapIcon />
                </div>
                <p className="mt-1 font-display text-[6px] leading-[2] text-cosmo-white/70 sm:text-[7px]">
                  TAP THE LEFT AND RIGHT<br />BUTTONS UNDER THE TRACK<br />TO CHANGE{" "}
                  <span className="text-cosmo-cyan">LANES.</span>
                </p>
              </div>
            </Panel>
          </div>

          {/* Score & Speed */}
          <Panel borderColor="border-cosmo-cyan">
            <div className="flex items-center gap-4 p-4">
              <div className="flex w-16 shrink-0 items-center justify-center">
                <BarChart />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[10px] text-cosmo-yellow sm:text-[11px]">
                  SCORE &amp; SPEED
                </h3>
                <p className="mt-2 font-display text-[7px] leading-[2] text-cosmo-white/85 sm:text-[8px]">
                  EVERY STAR ADDS{" "}
                  <span className="text-cosmo-yellow">100 POINTS</span>{" "}
                  TO YOUR SCORE.<br />THE TRACK SCROLLS FASTER OVER TIME,<br />
                  SO HAZARDS ARRIVE QUICKER!
                </p>
              </div>
            </div>
          </Panel>
        </div>

        {/* ── START GAME button ── */}
        <button
          onClick={onPlay}
          className="pixel-focus group relative mx-auto mt-5 w-full max-w-[320px] cursor-pointer overflow-hidden rounded-full border-[3px] border-cosmo-pink bg-cosmo-pink px-8 py-3.5 text-center transition-all active:scale-95 hover:bg-cosmo-pink/90 hover:shadow-[0_0_24px_#ff4f9a88] shadow-[0_4px_0_#c03070,0_0_12px_#ff4f9a55]"
        >
          <span className="font-display text-[13px] text-cosmo-white sm:text-[14px]">
            START GAME ▶
          </span>
        </button>

        {/* ── Bottom moon + astronaut ── */}
        <div className="relative mt-6 flex flex-col items-center">
          {/* Astronaut floating above moon */}
          <img
            src={astronautSvg}
            alt="Cosmo Trippin' Astronaut"
            className="pixel relative z-10 h-20 w-20 animate-float object-contain sm:h-24 sm:w-24"
          />
          {/* Moon/planet surface — teal gradient crescent */}
          <div
            className="relative -mt-4 h-28 w-full overflow-hidden rounded-[50%] sm:h-36"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, #1af5e0 0%, #00b8cc 25%, #006d80 55%, #003345 80%, #001820 100%)",
              boxShadow: "0 -6px 32px #00e0ff55, inset 0 8px 24px #003345",
            }}
          >
            {/* Crater dots */}
            {[
              { left: "12%", top: "35%", r: 14 },
              { left: "28%", top: "55%", r: 9 },
              { left: "45%", top: "30%", r: 18 },
              { left: "62%", top: "50%", r: 11 },
              { left: "78%", top: "38%", r: 15 },
              { left: "88%", top: "58%", r: 8 },
              { left: "5%",  top: "60%", r: 7 },
              { left: "52%", top: "60%", r: 7 },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: c.left,
                  top: c.top,
                  width: c.r * 2,
                  height: c.r * 2,
                  background: "radial-gradient(circle at 35% 35%, #008899, #003344)",
                  border: "1px solid #00aabb44",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Planet decorations (sides) ── */}
        <img
          src={planetSvg}
          alt=""
          aria-hidden="true"
          className="pixel pointer-events-none absolute -left-10 bottom-[30%] h-24 w-24 object-contain opacity-70 sm:h-32 sm:w-32"
        />
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="relative z-50">
        <SvgNav
          activePage={currentPage}
          onNavigate={onNavigate}
          className="sm:hidden"
        />
      </div>
    </div>
  );
}
