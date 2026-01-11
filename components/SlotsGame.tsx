
import React, { useState, useEffect } from 'react';
import { SLOT_SYMBOLS } from '../constants';
import { Coins, ChevronLeft } from 'lucide-react';

interface SlotsProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const SlotsGame: React.FC<SlotsProps> = ({ balance, onWin, onBet }) => {
  const [reels, setReels] = useState<string[]>(['💎', '💎', '💎']);
  const [spinning, setSpinning] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const spin = () => {
    if (balance < betAmount) return alert("Insufficient balance!");
    if (spinning) return;

    onBet(betAmount);
    setSpinning(true);
    setLastWin(null);

    let counter = 0;
    const interval = setInterval(() => {
      setReels([
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
        SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      ]);
      counter++;
      if (counter > 20) {
        clearInterval(interval);
        finalizeSpin();
      }
    }, 50);
  };

  const finalizeSpin = () => {
    const finalReels = [
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
      SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)],
    ];
    setReels(finalReels);
    setSpinning(false);

    // Logic
    const [r1, r2, r3] = finalReels;
    let multiplier = 0;
    if (r1 === r2 && r2 === r3) {
      if (r1 === '💎') multiplier = 50;
      else if (r1 === '7️⃣') multiplier = 100;
      else multiplier = 10;
    } else if (r1 === r2 || r2 === r3 || r1 === r3) {
      multiplier = 2;
    }

    if (multiplier > 0) {
      const win = betAmount * multiplier;
      onWin(win);
      setLastWin(win);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-300">
      <div className="text-center">
        <h2 className="text-3xl font-goldman gold-text">MEGA JACKPOT SLOTS</h2>
        <p className="text-gray-400">Match 3 to win up to 100x!</p>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-black p-8 rounded-3xl border-4 border-yellow-600 shadow-2xl relative overflow-hidden">
        {/* Lights */}
        <div className="absolute top-0 left-0 right-0 h-4 flex justify-around">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${spinning ? 'animate-pulse bg-yellow-400' : 'bg-yellow-700'}`}></div>
          ))}
        </div>

        <div className="flex justify-center gap-4 py-8">
          {reels.map((symbol, idx) => (
            <div 
              key={idx} 
              className={`w-24 h-32 sm:w-32 sm:h-44 bg-white rounded-xl flex items-center justify-center text-5xl sm:text-7xl shadow-inner border-2 border-gray-300 ${spinning ? 'animate-bounce' : ''}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {symbol}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 bg-black/50 p-6 rounded-xl">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-bold">Bet Amount</span>
            <div className="flex items-center gap-2">
              {[10, 50, 100, 500].map(amt => (
                <button 
                  key={amt}
                  onClick={() => setBetAmount(amt)}
                  className={`px-3 py-1 rounded border transition-colors ${betAmount === amt ? 'bg-yellow-500 text-black border-yellow-500' : 'border-gray-600 text-gray-400 hover:text-white'}`}
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>

          <button 
            disabled={spinning}
            onClick={spin}
            className={`flex-1 min-w-[150px] py-4 rounded-xl font-extrabold text-2xl transition-all shadow-lg ${spinning ? 'bg-gray-700 cursor-not-allowed' : 'gold-gradient text-black hover:scale-105 active:scale-95 animate-pulse-gold'}`}
          >
            {spinning ? 'SPINNING...' : 'SPIN'}
          </button>
        </div>
        
        {lastWin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 animate-in zoom-in">
            <div className="text-center">
              <div className="text-yellow-500 text-xl font-bold mb-2">YOU WON!</div>
              <div className="text-6xl font-goldman text-white">৳ {lastWin}</div>
              <button onClick={() => setLastWin(null)} className="mt-4 text-gray-400 hover:text-white underline">Cool!</button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-gray-500 text-xs">PAYOUT ODDS</div>
          <div className="text-white font-bold">96.5% RTP</div>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="text-gray-500 text-xs">TOTAL BETS</div>
          <div className="text-white font-bold">1,245,000+</div>
        </div>
      </div>
    </div>
  );
};

export default SlotsGame;
