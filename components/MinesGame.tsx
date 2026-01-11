
import React, { useState } from 'react';
import { Bomb, Gem, Play, Trash2 } from 'lucide-react';

interface MinesProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const MinesGame: React.FC<MinesProps> = ({ balance, onWin, onBet }) => {
  const [betAmount, setBetAmount] = useState(50);
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'LOST' | 'CASHED'>('IDLE');
  const [grid, setGrid] = useState<{ isMine: boolean; revealed: boolean }[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  const initGame = () => {
    if (balance < betAmount) return alert("Insufficient balance!");
    onBet(betAmount);
    
    const newGrid = Array(25).fill(null).map(() => ({ isMine: false, revealed: false }));
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const idx = Math.floor(Math.random() * 25);
      if (!newGrid[idx].isMine) {
        newGrid[idx].isMine = true;
        minesPlaced++;
      }
    }
    setGrid(newGrid);
    setGameState('PLAYING');
    setRevealedCount(0);
  };

  const handleTileClick = (idx: number) => {
    if (gameState !== 'PLAYING' || grid[idx].revealed) return;

    const newGrid = [...grid];
    newGrid[idx].revealed = true;
    setGrid(newGrid);

    if (newGrid[idx].isMine) {
      setGameState('LOST');
    } else {
      setRevealedCount(prev => prev + 1);
    }
  };

  const calculateMultiplier = () => {
    if (revealedCount === 0) return 1;
    // Simple multiplier logic: more mines + more gems = higher mult
    return Number((1 + (revealedCount * (mineCount / 5))).toFixed(2));
  };

  const cashOut = () => {
    const win = betAmount * calculateMultiplier();
    onWin(win);
    setGameState('CASHED');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 glass-card p-6 rounded-2xl h-fit space-y-6 border-l-4 border-yellow-500">
        <h2 className="text-2xl font-goldman gold-text">TREASURE MINES</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Bet Amount</label>
            <input 
              type="number" 
              value={betAmount} 
              onChange={e => setBetAmount(Number(e.target.value))}
              disabled={gameState === 'PLAYING'}
              className="w-full bg-black/40 border border-gray-700 p-3 rounded-lg outline-none focus:border-yellow-500 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 font-bold uppercase block mb-1">Mines ({mineCount})</label>
            <input 
              type="range" min="1" max="20" 
              value={mineCount} 
              onChange={e => setMineCount(Number(e.target.value))}
              disabled={gameState === 'PLAYING'}
              className="w-full accent-yellow-500"
            />
          </div>

          {gameState !== 'PLAYING' ? (
            <button 
              onClick={initGame}
              className="w-full py-4 gold-gradient text-black font-extrabold rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              BET NOW
            </button>
          ) : (
            <button 
              onClick={cashOut}
              className="w-full py-4 bg-green-500 text-black font-extrabold rounded-xl shadow-lg hover:scale-105 transition-all flex flex-col items-center leading-none"
            >
              <span>CASH OUT</span>
              <span className="text-sm mt-1">৳ {(betAmount * calculateMultiplier()).toFixed(0)}</span>
            </button>
          )}
        </div>

        <div className="bg-black/40 p-4 rounded-xl space-y-2">
           <div className="flex justify-between text-sm">
             <span className="text-gray-400">Current Multiplier:</span>
             <span className="text-yellow-500 font-bold">{calculateMultiplier()}x</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-gray-400">Gems Found:</span>
             <span className="text-white font-bold">{revealedCount}</span>
           </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="grid grid-cols-5 gap-3 aspect-square max-w-[500px] mx-auto">
          {grid.length === 0 ? (
            Array(25).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-center opacity-30">
                <Trash2 size={24} className="text-gray-700" />
              </div>
            ))
          ) : (
            grid.map((tile, i) => (
              <button
                key={i}
                onClick={() => handleTileClick(i)}
                className={`
                  aspect-square rounded-xl flex items-center justify-center transition-all transform
                  ${!tile.revealed ? 'bg-gray-800 hover:bg-gray-700 shadow-lg' : ''}
                  ${tile.revealed && tile.isMine ? 'bg-red-500/80 scale-95 shadow-[0_0_20px_#ef4444]' : ''}
                  ${tile.revealed && !tile.isMine ? 'bg-yellow-500/20 border-2 border-yellow-500 scale-95' : ''}
                  ${gameState === 'IDLE' ? 'cursor-not-allowed opacity-50' : ''}
                `}
              >
                {tile.revealed && tile.isMine && <Bomb size={24} className="text-black" />}
                {tile.revealed && !tile.isMine && <Gem size={24} className="text-yellow-500 animate-bounce" />}
              </button>
            ))
          )}
        </div>

        {gameState === 'LOST' && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-center text-red-500 font-bold uppercase tracking-widest animate-pulse">
            BOMB HIT! BETTER LUCK NEXT TIME.
          </div>
        )}
        {gameState === 'CASHED' && (
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-center text-green-500 font-bold uppercase tracking-widest animate-bounce">
            VICTORY! YOU CASHED OUT {calculateMultiplier()}X
          </div>
        )}
      </div>
    </div>
  );
};

export default MinesGame;
