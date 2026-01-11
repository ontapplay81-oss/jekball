
import React, { useState } from 'react';
import { ArrowUpCircle, Trophy, Play, AlertCircle } from 'lucide-react';

interface TowerProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const TowerGame: React.FC<TowerProps> = ({ balance, onWin, onBet }) => {
  const [betAmount, setBetAmount] = useState(100);
  const [currentLevel, setCurrentLevel] = useState(0); // 0 to 8
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'LOST' | 'CASHED'>('IDLE');
  
  const levels = [1.2, 1.8, 3.0, 5.5, 12, 25, 60, 150];

  const startGame = () => {
    if (balance < betAmount) return alert("Low balance!");
    onBet(betAmount);
    setGameState('PLAYING');
    setCurrentLevel(0);
  };

  const nextStep = () => {
    if (gameState !== 'PLAYING') return;
    
    // Harder logic: 50/50 chance
    const success = Math.random() > 0.55; // 45% success rate
    if (success) {
      if (currentLevel === levels.length - 1) {
        cashOut();
      } else {
        setCurrentLevel(prev => prev + 1);
      }
    } else {
      setGameState('LOST');
    }
  };

  const cashOut = () => {
    if (currentLevel === 0) return;
    const win = betAmount * levels[currentLevel - 1];
    onWin(win);
    setGameState('CASHED');
  };

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right duration-500">
      {/* Tower Column */}
      <div className="flex flex-col-reverse gap-2">
        {levels.map((mult, idx) => (
          <div 
            key={idx}
            className={`
              h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-300 font-black
              ${currentLevel === idx + 1 ? 'bg-yellow-500 border-yellow-300 text-black scale-105 shadow-[0_0_20px_rgba(212,175,55,0.5)]' : ''}
              ${currentLevel > idx + 1 ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-500' : 'bg-black/40 border-white/5 text-gray-700'}
            `}
          >
            {mult}x
          </div>
        ))}
        <div className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-500 font-bold uppercase text-xs">
          Starting Point
        </div>
      </div>

      {/* Control Column */}
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-3xl border-l-4 border-yellow-500 space-y-2">
          <h2 className="text-2xl font-goldman gold-text">MEGA TOWER</h2>
          <p className="text-gray-400 text-xs">উপরে উঠুন এবং বড় জ্যাকপট জিতুন!</p>
        </div>

        <div className="space-y-4">
          <div className="bg-black/60 p-5 rounded-2xl border border-white/5">
             <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-2">Bet Amount</label>
             <input 
               type="number" 
               value={betAmount} 
               onChange={e => setBetAmount(Number(e.target.value))}
               disabled={gameState === 'PLAYING'}
               className="w-full bg-transparent text-3xl font-goldman outline-none focus:text-yellow-500 transition-colors"
             />
          </div>

          {gameState !== 'PLAYING' ? (
            <button 
              onClick={startGame}
              className="w-full py-6 gold-gradient text-black font-black rounded-2xl text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              খেলুন
            </button>
          ) : (
            <div className="grid grid-cols-1 gap-3">
               <button 
                onClick={nextStep}
                className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl text-xl shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
              >
                <ArrowUpCircle size={24} /> এক ধাপ উপরে
              </button>
              <button 
                onClick={cashOut}
                disabled={currentLevel === 0}
                className="w-full py-4 bg-green-500 text-black font-black rounded-2xl text-lg hover:bg-green-400 transition-all disabled:opacity-50"
              >
                টাকা তুলে নিন (৳ {(betAmount * (levels[currentLevel - 1] || 1)).toFixed(0)})
              </button>
            </div>
          )}
        </div>

        {gameState === 'LOST' && (
          <div className="p-6 bg-red-500/10 border border-red-500/40 rounded-2xl text-center space-y-2 animate-in zoom-in">
             <AlertCircle className="mx-auto text-red-500" size={32} />
             <div className="text-red-500 font-black uppercase">আপনি হেরেছেন!</div>
             <p className="text-gray-400 text-sm">আবার চেষ্টা করুন। জিতার সুযোগ সব সময় আছে।</p>
             <button onClick={() => setGameState('IDLE')} className="text-white text-xs underline mt-2 block mx-auto">পুনরায় শুরু করুন</button>
          </div>
        )}

        {gameState === 'CASHED' && (
          <div className="p-6 bg-green-500/10 border border-green-500/40 rounded-2xl text-center space-y-2 animate-in zoom-in">
             <Trophy className="mx-auto text-green-500" size={32} />
             <div className="text-green-500 font-black uppercase">অভিনন্দন!</div>
             <div className="text-3xl font-goldman text-white">৳ {(betAmount * levels[currentLevel - 1]).toFixed(0)}</div>
             <button onClick={() => setGameState('IDLE')} className="text-white text-xs underline mt-2 block mx-auto">পরের গেম</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TowerGame;
