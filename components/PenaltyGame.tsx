
import React, { useState } from 'react';
import { Target, Trophy, Play, Info } from 'lucide-react';

interface PenaltyProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const PenaltyGame: React.FC<PenaltyProps> = ({ balance, onWin, onBet }) => {
  const [betAmount, setBetAmount] = useState(100);
  const [gameState, setGameState] = useState<'IDLE' | 'SHOOTING' | 'GOAL' | 'SAVED'>('IDLE');
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);

  const spots = [
    { id: 0, label: 'Top Left' },
    { id: 1, label: 'Top Center' },
    { id: 2, label: 'Top Right' },
    { id: 3, label: 'Bottom Left' },
    { id: 4, label: 'Bottom Right' }
  ];

  const shoot = (spotId: number) => {
    if (balance < betAmount) return alert("টাকা নেই! আগে ডিপোজিট করুন।");
    if (gameState === 'SHOOTING') return;

    onBet(betAmount);
    setGameState('SHOOTING');
    setSelectedSpot(spotId);

    // AI Keeper Logic
    setTimeout(() => {
      const keeperSaved = Math.random() > 0.6; // 60% goal probability
      if (keeperSaved) {
        setGameState('SAVED');
      } else {
        setGameState('GOAL');
        onWin(betAmount * 1.95);
      }
    }, 1200);
  };

  const reset = () => {
    setGameState('IDLE');
    setSelectedSpot(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-goldman gold-text uppercase">Penalty Shootout</h2>
        <p className="text-gray-400">গোল করুন আর ডাবল টাকা জিতুন!</p>
      </div>

      <div className="relative bg-gradient-to-b from-blue-900 to-green-900 rounded-[3rem] h-[450px] overflow-hidden border-8 border-white/5 shadow-2xl flex items-center justify-center">
        {/* Goal Net UI */}
        <div className="absolute inset-x-20 top-10 h-64 border-l-8 border-t-8 border-r-8 border-white/90 shadow-[0_-20px_50px_rgba(255,255,255,0.1)]">
           <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.05)_10px,rgba(255,255,255,0.05)_20px)]"></div>
        </div>

        {/* Shoot Spots */}
        <div className="absolute inset-x-20 top-10 h-64 grid grid-cols-3 gap-4 p-4 z-20">
          {spots.map(spot => (
            <button
              key={spot.id}
              disabled={gameState !== 'IDLE'}
              onClick={() => shoot(spot.id)}
              className={`
                rounded-full border-2 border-dashed border-white/30 flex items-center justify-center transition-all hover:bg-white/10 group
                ${gameState !== 'IDLE' && selectedSpot !== spot.id ? 'opacity-0 scale-0' : ''}
                ${selectedSpot === spot.id && gameState === 'GOAL' ? 'bg-green-500 border-green-500 animate-ping' : ''}
                ${selectedSpot === spot.id && gameState === 'SAVED' ? 'bg-red-500 border-red-500 animate-shake' : ''}
              `}
            >
              {gameState === 'IDLE' && <Target size={32} className="text-white opacity-20 group-hover:opacity-100 transition-opacity" />}
            </button>
          ))}
        </div>

        {/* Status Overlays */}
        {gameState === 'GOAL' && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in zoom-in">
             <div className="text-7xl font-goldman gold-text animate-bounce">GOAL!!!</div>
             <div className="text-3xl font-bold text-white mt-4">WIN: ৳{betAmount * 1.95}</div>
             <button onClick={reset} className="mt-8 px-12 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all">TRY AGAIN</button>
          </div>
        )}

        {gameState === 'SAVED' && (
          <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in zoom-in">
             <div className="text-7xl font-goldman text-red-500 uppercase">SAVED!</div>
             <p className="text-white mt-4 font-bold">কিপার বল ঠেকিয়ে দিয়েছে!</p>
             <button onClick={reset} className="mt-8 px-12 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all">TRY AGAIN</button>
          </div>
        )}

        {/* Grass Decoration */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-green-800/50"></div>
      </div>

      {/* Controls */}
      <div className="glass-card p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-xs text-gray-500 font-black uppercase tracking-widest">বেট এমাউন্ট সিলেনক্ট করুন</label>
          <div className="grid grid-cols-4 gap-2">
            {[100, 500, 1000, 5000].map(val => (
              <button 
                key={val} 
                onClick={() => setBetAmount(val)}
                className={`py-3 rounded-xl border-2 transition-all font-bold ${betAmount === val ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-white/5 bg-white/5 text-gray-500'}`}
              >
                ৳{val}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center min-w-[200px]">
           <div className="text-xs text-gray-500 uppercase font-black">সম্ভাব্য জয়</div>
           <div className="text-3xl font-goldman gold-text">৳ {(betAmount * 1.95).toFixed(0)}</div>
        </div>
      </div>
    </div>
  );
};

export default PenaltyGame;
