import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PixelSprite from "@/components/PixelSprite";
import PixelButton from "@/components/PixelButton";
import Starfield from "@/components/Starfield";
import astronautSvg from "@/src_assets/cosmo_astronaut.svg";
import asteroidSvg from "@/src_assets/new_asteroid_ultra_thick_outline.svg";
import starSvg from "@/src_assets/star_exact.svg";
import ufoSvg from "@/src_assets/ufo final.png";
import blackholeSvg from "@/src_assets/cosmo_planet_exact.svg";
import arrowLeftSvg from "@/src_assets/new_arrow_left.svg";
import trackSvg from "@/src_assets/new_track.svg";
import SvgNav from "@/components/SvgNav";
import {
  star,
  type Sprite,
} from "@/data/sprites";
import { pad } from "@/lib/score";

type Status = "ready" | "playing" | "over";
type EntityType = "asteroid" | "ufo" | "blackhole" | "star";

type Entity = {
  id: number;
  lane: number; // 0,1,2
  p: number; // progress 0 (far) -> 1 (near)
  type: EntityType;
  resolved: boolean;
  scale: number; // visual-only size multiplier
  driftLane: number; // lane drift speed (units/sec), 0 = stationary
  laneF: number; // fractional lane position for drifting obstacles
};

type Toast = { id: number; text: string; kind: "hit" | "collect"; lane: number; born: number };

const PLAYER_P = 0.82;
const HIT_BAND = 0.055;
const TRACK_ASPECT = 1145 / 1374;
const LANE_TOP_X = [45, 50, 55];
const LANE_BOT_X = [17, 50, 83];
const Y_TOP = 14;
const Y_BOT = 92;

const LABELS: Record<EntityType, string> = {
  asteroid: "Asteroid",
  ufo: "UFO",
  blackhole: "Black hole",
  star: "Star",
};

const heart: Sprite = {
  rows: [".HH.HH.", "HHHHHHH", "HHHHHHH", ".HHHHH.", "..HHH..", "...H..."],
  palette: { H: "#ff4f9a" },
};
const heartLost: Sprite = { ...heart, palette: { H: "#3a3350" } };

function laneX(laneF: number, p: number): number {
  const topX = LANE_TOP_X[0] + (LANE_TOP_X[2] - LANE_TOP_X[0]) * (laneF / 2);
  const botX = LANE_BOT_X[0] + (LANE_BOT_X[2] - LANE_BOT_X[0]) * (laneF / 2);
  return topX + (botX - topX) * p;
}
function laneY(p: number): number {
  return Y_TOP + (Y_BOT - Y_TOP) * p;
}
function trackBounds(width: number, height: number) {
  const trackWidth = Math.min(width, height * TRACK_ASPECT);
  const trackHeight = trackWidth / TRACK_ASPECT;
  return {
    left: (width - trackWidth) / 2,
    top: (height - trackHeight) / 2,
    width: trackWidth,
    height: trackHeight,
  };
}
// ── Difficulty helpers ──────────────────────────────────────────────────────

/** Speed multiplier: +8% per star collected, capped at 3× for playability. */
function speedMult(stars: number): number {
  return Math.min(3.0, 1 + stars * 0.08);
}

/** Tier: 0-4 stars=1, 5-9=2, 10-14=3, 15-19=4, 20+=5 */
function tier(stars: number): number {
  if (stars < 5) return 1;
  if (stars < 10) return 2;
  if (stars < 15) return 3;
  if (stars < 20) return 4;
  return 5;
}

function pickObstacleType(stars: number): EntityType {
  const t = tier(stars);
  // At higher tiers, blackhole/ufo become more common
  const starChance = 0.28;
  const bhChance = t >= 3 ? 0.18 : 0.12;
  const ufoChance = t >= 2 ? 0.22 : 0.12;
  const r = Math.random();
  if (r < starChance) return "star";
  if (r < starChance + bhChance) return "blackhole";
  if (r < starChance + bhChance + ufoChance) return "ufo";
  return "asteroid";
}

/** Build 1-3 entities for a single spawn event. Guarantees at least one free lane for obstacles. */
function buildSpawnGroup(
  stars: number,
  playerLane: number,
  nextId: number,
  elapsed: number,
): Entity[] {
  const t = tier(stars);

  // Probability of spawning a 2nd or 3rd obstacle in the same wave
  const twoObs  = t >= 2 ? [0, 0, 0.15, 0.28, 0.42, 0.55][t] : 0;
  const threeObs = t >= 4 ? [0, 0, 0, 0, 0.10, 0.22][t] : 0;

  // Probability that an obstacle drifts across lanes (moving obstacle)
  const movingChance = [0, 0, 0.10, 0.22, 0.36, 0.50][t];

  const count = Math.random() < threeObs ? 3
              : Math.random() < twoObs   ? 2
              : 1;

  // Choose lanes — ensure at least one lane is free for multi-obstacle waves
  let lanes: number[] = [];
  if (count === 1) {
    // Single obstacle: avoid spawning directly on player if possible
    const candidates = [0,1,2].filter(l => l !== playerLane);
    lanes = [Math.random() < 0.35 ? playerLane : candidates[Math.floor(Math.random() * 2)]];
  } else if (count === 2) {
    // Block exactly 2 lanes, always leave one free
    const freeLane = Math.floor(Math.random() * 3);
    lanes = [0,1,2].filter(l => l !== freeLane);
  } else {
    // 3 obstacles: still block all 3 but stagger their p so player can slip through
    // Actually — keep max 2 blocking, add a star in the 3rd
    const freeLane = Math.floor(Math.random() * 3);
    lanes = [0,1,2].filter(l => l !== freeLane);
    // third slot: star in the free lane
    const starEntity: Entity = {
      id: nextId + 2,
      lane: freeLane,
      p: 0,
      type: "star",
      resolved: false,
      scale: 1,
      driftLane: 0,
      laneF: freeLane,
    };
    const obs = lanes.slice(0,2).map((ln, i): Entity => {
      const drifts = Math.random() < movingChance;
      const dir = Math.random() < 0.5 ? 1 : -1;
      return {
        id: nextId + i,
        lane: ln,
        p: 0,
        type: pickObstacleType(stars),
        resolved: false,
        scale: pickObstacleType(stars) === "asteroid" ? 0.5 + Math.random()
             : pickObstacleType(stars) === "ufo"      ? 1 + Math.random()
             : 1,
        driftLane: drifts ? dir * (0.3 + Math.random() * 0.5) : 0,
        laneF: ln,
      };
    });
    return [...obs, starEntity];
  }

  return lanes.map((ln, i): Entity => {
    const drifts = count === 1 && Math.random() < movingChance;
    const driftDir = Math.random() < 0.5 ? 1 : -1;
    const typ = count > 1 && i === 0 ? pickObstacleType(stars) : pickObstacleType(stars);
    return {
      id: nextId + i,
      lane: ln,
      p: 0,
      type: typ,
      resolved: false,
      scale: typ === "asteroid" ? 0.5 + Math.random()
           : typ === "ufo"      ? 1 + Math.random()
           : 1,
      driftLane: drifts ? driftDir * (0.3 + Math.random() * 0.5) : 0,
      laneF: ln,
    };
  });
}

type Props = {
  best: number;
  onBest: (score: number) => void;
  startSignal: number;
  onNavigate: (p: import("@/components/Nav").Page) => void;
  currentPage: import("@/components/Nav").Page;
};

export default function Game({ best, onBest, startSignal, onNavigate, currentPage }: Props) {
  const [status, setStatus] = useState<Status>("ready");
  const [, setTick] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [stage, setStage] = useState({ width: 0, height: 0, scale: 1 });

  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  // All mutable gameplay state lives here to keep the rAF loop closure-safe.
  const game = useRef({
    entities: [] as Entity[],
    toasts: [] as Toast[],
    lane: 1,
    score: 0,
    stars: 0,
    lives: 3,
    elapsed: 0,
    spawnTimer: 0,
    nextId: 1,
    over: false,
  });

  const rerender = useCallback(() => setTick((t) => (t + 1) % 1_000_000), []);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (el) setDims({ w: el.clientWidth, h: el.clientHeight });
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Desktop keeps the game's established proportions by scaling the complete
  // panel as one stage. Mobile remains at its original, fluid layout size.
  useLayoutEffect(() => {
    const measureStage = () => {
      const panel = panelRef.current;
      const gameArea = gameRef.current;
      if (!panel || !gameArea || window.innerWidth < 1024) {
        setStage({ width: 0, height: 0, scale: 1 });
        return;
      }

      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const availableWidth = gameArea.clientWidth - 48;
      const availableHeight = gameArea.clientHeight - 32;
      const scale = Math.min(1.6, availableWidth / width, availableHeight / height);

      setStage({ width, height, scale });
    };

    measureStage();
    const observer = new ResizeObserver(measureStage);
    if (panelRef.current) observer.observe(panelRef.current);
    if (gameRef.current) observer.observe(gameRef.current);
    window.addEventListener("resize", measureStage);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureStage);
    };
  }, []);

  const resetGame = useCallback(() => {
    game.current = {
      entities: [],
      toasts: [],
      lane: 1,
      score: 0,
      stars: 0,
      lives: 3,
      elapsed: 0,
      spawnTimer: 0.4,
      nextId: 1,
      over: false,
    };
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setStatus("playing");
  }, [resetGame]);

  // Respond to a start request coming from another page.
  useEffect(() => {
    if (startSignal > 0) startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startSignal]);

  const move = useCallback(
    (dir: -1 | 1) => {
      if (status !== "playing") return;
      const g = game.current;
      const next = Math.min(2, Math.max(0, g.lane + dir));
      if (next !== g.lane) {
        g.lane = next;
        rerender();
      }
    },
    [status, rerender],
  );

  // Keyboard controls (desktop).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move(1);
      } else if ((e.key === "Enter" || e.key === " ") && status !== "playing") {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, status, startGame]);

  const shake = useCallback(() => {
    trackRef.current?.animate(
      [
        { transform: "translate(0,0)" },
        { transform: "translate(-6px,3px)" },
        { transform: "translate(6px,-4px)" },
        { transform: "translate(-4px,-2px)" },
        { transform: "translate(0,0)" },
      ],
      { duration: 320, easing: "steps(4)" },
    );
  }, []);

  // Main game loop.
  useEffect(() => {
    if (status !== "playing") return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const g = game.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      g.elapsed += dt;

      // ── Star-driven difficulty ──
      const mult = speedMult(g.stars);
      const baseSpeed = 0.34 * mult;
      // Spawn interval: starts at 1.4s, shrinks to 0.45s at tier 5
      const spawnEvery = Math.max(0.45, 1.4 - g.stars * 0.038);

      // Advance entities (progress + lateral drift).
      for (const e of g.entities) {
        e.p += baseSpeed * dt;
        if (e.driftLane !== 0) {
          e.laneF += e.driftLane * dt;
          // Bounce off walls
          if (e.laneF < 0) { e.laneF = 0; e.driftLane = Math.abs(e.driftLane); }
          if (e.laneF > 2) { e.laneF = 2; e.driftLane = -Math.abs(e.driftLane); }
          e.lane = Math.round(e.laneF);
        }
      }

      // Collision / collection resolution near the player row.
      for (const e of g.entities) {
        if (e.resolved) continue;
        if (e.lane === g.lane && Math.abs(e.p - PLAYER_P) <= HIT_BAND) {
          e.resolved = true;
          if (e.type === "star") {
            g.score += 100;
            g.stars += 1;
            g.toasts.push({
              id: g.nextId++,
              text: "+100",
              kind: "collect",
              lane: e.lane,
              born: g.elapsed,
            });
          } else {
            g.lives -= 1;
            g.toasts.push({
              id: g.nextId++,
              text: "HIT!",
              kind: "hit",
              lane: e.lane,
              born: g.elapsed,
            });
            shake();
            if (g.lives <= 0) g.over = true;
          }
        }
      }

      // Cull off-screen entities & resolved ones past the player, expire toasts.
      g.entities = g.entities.filter((e) => e.p < 1.08 && !(e.resolved && e.p > PLAYER_P));
      g.toasts = g.toasts.filter((t) => g.elapsed - t.born < 0.9);

      // Spawn.
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        g.spawnTimer = spawnEvery + (Math.random() - 0.5) * 0.2; // slight jitter
        const group = buildSpawnGroup(g.stars, g.lane, g.nextId, g.elapsed);
        g.nextId += group.length;
        g.entities.push(...group);
      }

      if (g.over) {
        if (g.score > best) onBest(g.score);
        setStatus("over");
        rerender();
        return;
      }

      rerender();
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const g = game.current;
  const H = dims.h;
  const track = trackBounds(dims.w, dims.h);
  const currentSpeedMult = speedMult(g.stars).toFixed(2);

  return (
    <div ref={gameRef} className="relative flex min-h-full flex-col lg:h-full">
      <Starfield count={50} />
      <div
        className="relative flex flex-1 items-center justify-center w-full max-w-none px-2 py-2 sm:px-4 lg:absolute lg:flex-none lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 lg:p-0"
        style={
          stage.width > 0
            ? { width: stage.width * stage.scale, height: stage.height * stage.scale }
            : undefined
        }
      >
        {/* Game panel */}
        <div
          ref={panelRef}
          className="pixel-panel overflow-hidden w-full lg:absolute lg:top-0 lg:w-[36rem]"
          style={
  stage.width > 0
    ? {
        transform: `scale(${stage.scale})`,
        transformOrigin: "top left",
        top: "0px",
        left: "0px",
        right: "auto",
        bottom: "auto",
      }
    : undefined
}
        >
          {/* HUD */}
          <div className="flex items-start justify-between gap-2 border-b-[3px] border-cosmo-white/25 bg-cosmo-void/60 px-3 py-1.5">
            <div>
              <p className="font-display text-[8px] uppercase tracking-widest text-cosmo-pink">
                Score
              </p>
              <p className="font-display text-base text-cosmo-white">{pad(g.score)}</p>
              <div className="mt-1 flex items-center gap-1" aria-label={`${g.lives} lives remaining`}>
                {[0, 1, 2].map((i) => {
                  const alive = i < g.lives;
                  return (
                    <span key={i} className="relative inline-flex h-4 w-4 items-center justify-center">
                      <PixelSprite
                        sprite={alive ? heart : heartLost}
                        className="h-4 w-4"
                        title={alive ? "Life" : "Lost life"}
                      />
                      {!alive && (
                        <span
                          aria-hidden="true"
                          className="absolute font-display text-[10px] leading-none text-cosmo-white"
                        >
                          ×
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="text-right">
              <p className="font-display text-[8px] uppercase tracking-widest text-cosmo-yellow">
                Best
              </p>
              <p className="font-display text-base text-cosmo-white">{pad(best)}</p>
              <p className="mt-1 font-display text-[8px] uppercase tracking-widest text-cosmo-cyan">
                Speed ×{currentSpeedMult}
              </p>
            </div>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="game-track relative w-full bg-cosmo-void"
          >
            <Starfield count={40} />

            <img
              src={trackSvg}
              className="pixel absolute inset-0 h-full w-full object-contain"
              alt=""
              aria-hidden="true"
            />

            {/* Entities */}
            {H > 0 &&
              g.entities.map((e) => {
                const size = H * (0.075 + 0.14 * e.p);
                return (
                  <div
                    key={e.id}
                    className="absolute"
                    style={{
                      left: track.left + (track.width * laneX(e.laneF, e.p)) / 100,
                      top: track.top + (track.height * laneY(e.p)) / 100,
                      width: size,
                      height: size,
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <img
                      src={
                        e.type === "asteroid" ? asteroidSvg
                        : e.type === "ufo" ? ufoSvg
                        : e.type === "blackhole" ? blackholeSvg
                        : starSvg
                      }
                      className="pixel object-contain"
                      style={e.type === "asteroid" ? {
                        width: `${e.scale * 100}%`,
                        height: `${e.scale * 100}%`,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      } : e.type === "ufo" ? {
                        width: `${e.scale * 100}%`,
                        height: `${e.scale * 100}%`,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      } : e.type === "blackhole" ? {
                        width: "450%",
                        height: "450%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      } : e.type === "star" ? {
                        width: "60%",
                        height: "60%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      } : { width: "100%", height: "100%" }}
                      alt={LABELS[e.type]}
                    />
                  </div>
                );
              })}

            {/* Player */}
            {H > 0 && (
              <div
                className="absolute transition-[left] duration-100 ease-out"
                style={{
                  left: track.left + (track.width * laneX(g.lane, PLAYER_P)) / 100,
                  top: track.top + (track.height * laneY(PLAYER_P)) / 100,
                  width: H * 0.316,
                  height: H * 0.316,
                  transform: "translate(-50%,-50%)",
                }}
              >
                <img
                  src={astronautSvg}
                  className={`pixel object-contain h-full w-full ${status === "playing" ? "animate-float" : ""}`}
                  alt="Your astronaut"
                />
              </div>
            )}

            {/* Feedback toasts */}
            {g.toasts.map((t) => (
              <div
                key={t.id}
                className="animate-rise pointer-events-none absolute z-10 font-display text-sm"
                style={{
                  left: track.left + (track.width * laneX(t.lane, PLAYER_P)) / 100,
                  top: track.top + (track.height * (laneY(PLAYER_P) - 8)) / 100,
                  transform: "translate(-50%,0)",
                  color: t.kind === "hit" ? "#ff4f9a" : "#ffd04d",
                  textShadow: "2px 2px 0 #07040f",
                }}
              >
                {t.kind === "hit" ? "✖ HIT!" : "★ +100"}
              </div>
            ))}

            {/* In-track corner arrows */}
            {status === "playing" && (
              <>
                <TrackArrow side="left" onClick={() => move(-1)} />
                <TrackArrow side="right" onClick={() => move(1)} />
              </>
            )}

            {/* READY overlay */}
            {status === "ready" && (
              <Overlay>
                <p className="font-display text-sm text-cosmo-cyan">READY?</p>
                <p className="max-w-[16rem] text-center text-lg text-cosmo-white/80">
                  Dodge hazards, grab stars, survive as long as you can.
                </p>
                <PixelButton variant="pink" onClick={startGame} className="px-6 py-4">
                  ► START GAME
                </PixelButton>
              </Overlay>
            )}

            {/* GAME OVER overlay */}
            {status === "over" && (
              <Overlay>
                <p className="animate-blink font-display text-xl text-cosmo-pink pixel-outline">
                  GAME OVER
                </p>
                <div className="pixel-panel w-64 max-w-full px-4 py-4 text-center" style={{ background: "#1a1330" }}>
                  <p className="font-display text-[9px] uppercase tracking-widest text-cosmo-white/70">
                    Final Score
                  </p>
                  <p className="mt-1 font-display text-2xl text-cosmo-white">{pad(g.score)}</p>
                  <div className="my-3 border-b-2 border-dashed border-cosmo-white/25" />
                  <p className="font-display text-[9px] uppercase tracking-widest text-cosmo-white/70">
                    Best Score
                  </p>
                  <p className="mt-1 font-display text-2xl text-cosmo-yellow">{pad(best)}</p>
                  {g.score >= best && g.score > 0 && (
                    <p className="mt-2 font-display text-[9px] text-cosmo-cyan">★ NEW BEST! ★</p>
                  )}
                </div>
                <PixelButton variant="yellow" onClick={startGame} className="px-6 py-4">
                  ↻ PLAY AGAIN
                </PixelButton>
              </Overlay>
            )}
          </div>

        </div>

      </div>

      {/* Mobile SVG nav */}
      <SvgNav activePage={currentPage} onNavigate={onNavigate} className="relative z-40 mt-auto shrink-0 sm:hidden" />
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-cosmo-void/80 px-4">
      {children}
    </div>
  );
}

function TrackArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Move left" : "Move right"}
      className={`pixel-focus absolute bottom-3 z-10 flex h-12 w-12 items-center justify-center border-[3px] border-cosmo-void bg-cosmo-panel/90 ${
        side === "left" ? "left-3" : "right-3"
      }`}
      style={{ boxShadow: "3px 3px 0 0 #07040f" }}
    >
      <img
        src={arrowLeftSvg}
        className="pixel h-6 w-6 object-contain"
        alt={side === "left" ? "Move left" : "Move right"}
        style={{
          transform: side === "right" ? "scaleX(-1)" : undefined,
          filter: side === "right" ? "hue-rotate(213deg)" : undefined,
        }}
      />
    </button>
  );
}
