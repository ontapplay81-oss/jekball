
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface CrashProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const CrashGame: React.FC<CrashProps> = ({ balance, onWin, onBet }) => {
  const [multiplier, setMultiplier] = useState(1.00);
  const [gameState, setGameState] = useState<'WAITING' | 'RUNNING' | 'CRASHED'>('WAITING');
  const [betAmount, setBetAmount] = useState(50);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startGame = () => {
    if (balance < betAmount) return alert("Low balance!");
    onBet(betAmount);
    setGameState('RUNNING');
    setMultiplier(1.00);
    setHasCashedOut(false);
    setWinAmount(0);

    const crashPoint = 1 + Math.random() * 5; // Simulating a crash point between 1 and 6

    timerRef.current = window.setInterval(() => {
      setMultiplier(prev => {
        const next = prev + 0.01 + (prev * 0.01);
        if (next >= crashPoint) {
          clearInterval(timerRef.current!);
          setGameState('CRASHED');
          return crashPoint;
        }
        return next;
      });
    }, 100);
  };

  const cashOut = () => {
    if (gameState !== 'RUNNING' || hasCashedOut) return;
    const win = betAmount * multiplier;
    onWin(win);
    setWinAmount(win);
    setHasCashedOut(true);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-goldman gold-text">JEKBALL CRASH</h2>
        <p className="text-gray-400">Cash out before the ball bursts!</p>
      </div>

      <div className="glass-card h-80 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-yellow-500/20">
        <div className={`text-7xl sm:text-9xl font-goldman transition-colors ${gameState === 'CRASHED' ? 'text-red-500' : hasCashedOut ? 'text-green-500' : 'text-white'}`}>
          {multiplier.toFixed(2)}x
        </div>
        
        {gameState === 'CRASHED' && (
          <div className="mt-4 text-red-500 font-bold animate-bounce uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={20} /> CRASHED!
          </div>
        )}

        {hasCashedOut && (
          <div className="mt-4 text-green-500 font-bold animate-pulse text-xl">
            CASHED OUT: ৳ {winAmount.toFixed(0)}
          </div>
        )}

        {/* Animation background grid or something simple */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="flex gap-4 p-4 glass-card rounded-2xl">
        <div className="flex-1">
          <label className="text-xs text-gray-500 uppercase block mb-1">Bet Amount</label>
          <input 
            type="number" 
            value={betAmount} 
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 outline-none focus:border-yellow-500 transition-colors"
          />
        </div>
        
        {gameState !== 'RUNNING' ? (
          <button 
            onClick={startGame}
            className="flex-[2] gold-gradient text-black font-extrabold rounded-lg text-xl hover:scale-105 transition-transform"
          >
            PLAY
          </button>
        ) : (
          <button 
            onClick={cashOut}
            disabled={hasCashedOut}
            className={`flex-[2] font-extrabold rounded-lg text-xl transition-all ${hasCashedOut ? 'bg-gray-800 text-gray-500' : 'bg-green-500 text-black hover:bg-green-400'}`}
          >
            {hasCashedOut ? 'WAITING...' : `CASH OUT (৳ ${(betAmount * multiplier).toFixed(0)})`}
          </button>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {[1.2, 1.5, 2.0, 5.0, 10.0].map(m => (
          <div key={m} className="px-3 py-1 bg-black/40 rounded text-xs text-gray-400">
            {m}x
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrashGame;
