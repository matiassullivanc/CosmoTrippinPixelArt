import { useCallback, useEffect, useState } from "react";
import { type Page } from "@/components/Nav";
import SvgNav from "@/components/SvgNav";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import HowToPlay from "@/pages/HowToPlay";
import { loadBest, saveBest } from "@/lib/score";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [best, setBest] = useState(0);
  const [startSignal, setStartSignal] = useState(0);

  useEffect(() => {
    setBest(loadBest());
  }, []);

  const handleBest = useCallback((score: number) => {
    setBest((prev) => {
      if (score > prev) {
        saveBest(score);
        return score;
      }
      return prev;
    });
  }, []);

  const startFreshGame = useCallback(() => {
    setStartSignal((s) => s + 1);
    setPage("game");
  }, []);

  return (
    <div className="flex h-full flex-col bg-cosmo-void text-cosmo-white">
      <main className="flex-1 overflow-y-auto">
        {page === "home" && <Home best={best} onStart={startFreshGame} onNavigate={setPage} currentPage={page} />}
        {page === "game" && (
          <Game best={best} onBest={handleBest} startSignal={startSignal} onNavigate={setPage} currentPage={page} />
        )}
        {page === "howto" && <HowToPlay onPlay={startFreshGame} onNavigate={setPage} currentPage={page} />}
      </main>

      {/* Desktop-only SVG nav */}
      {page !== "home" && (
        <footer className="hidden sm:block sm:shrink-0 sm:px-2 sm:py-3">
          <SvgNav activePage={page} onNavigate={setPage} className="mx-auto w-full max-w-5xl" />
        </footer>
      )}
    </div>
  );
}
