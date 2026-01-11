
import React, { useState, useEffect, useRef } from 'react';
import { CircleDot, Play } from 'lucide-react';

interface PlinkoProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const PlinkoGame: React.FC<PlinkoProps> = ({ balance, onWin, onBet }) => {
  const [betAmount, setBetAmount] = useState(10);
  const [balls, setBalls] = useState<{ id: number; x: number; y: number; finished: boolean }[]>([]);
  const [isDropping, setIsDropping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const multipliers = [10, 5, 2, 0.5, 0.2, 0.5, 2, 5, 10];

  const dropBall = () => {
    if (balance < betAmount) return alert("Low balance!");
    onBet(betAmount);
    
    const newBall = {
      id: Date.now(),
      x: 150, // Center of 300px canvas
      y: 20,
      finished: false
    };
    
    setBalls(prev => [...prev, newBall]);
    simulateBall(newBall);
  };

  const simulateBall = (ball: any) => {
    let currentX = ball.x;
    let currentY = ball.y;
    const gravity = 2;
    const layers = 8;
    const layerHeight = 30;

    const interval = setInterval(() => {
      currentY += gravity;
      
      // Hit a peg?
      if (Math.floor(currentY) % layerHeight === 0) {
        currentX += (Math.random() > 0.5 ? 15 : -15);
      }

      setBalls(prev => prev.map(b => b.id === ball.id ? { ...b, x: currentX, y: currentY } : b));

      if (currentY > 260) {
        clearInterval(interval);
        const bucketIndex = Math.min(Math.floor((currentX / 300) * multipliers.length), multipliers.length - 1);
        const winMult = multipliers[Math.max(0, bucketIndex)];
        onWin(betAmount * winMult);
        
        setTimeout(() => {
          setBalls(prev => prev.filter(b => b.id !== ball.id));
        }, 1000);
      }
    }, 30);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in zoom-in duration-300">
      <div className="text-center">
        <h2 className="text-3xl font-goldman gold-text">PLINKO BALLS</h2>
        <p className="text-gray-400">Watch the balls fall for massive multipliers!</p>
      </div>

      <div className="relative bg-black/60 rounded-3xl border-4 border-yellow-600/30 p-4 h-[400px] flex flex-col items-center shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        {/* Pegs */}
        <div className="absolute inset-0 p-8 grid grid-rows-8 gap-y-4 pointer-events-none opacity-20">
          {[...Array(8)].map((_, r) => (
            <div key={r} className="flex justify-around px-4">
              {[...Array(r + 3)].map((_, c) => (
                <div key={c} className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_5px_#f9f295]"></div>
              ))}
            </div>
          ))}
        </div>

        {/* Dynamic Balls */}
        <div className="relative w-[300px] h-[300px] mt-4">
           {balls.map(ball => (
             <div 
               key={ball.id}
               className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white] transition-all duration-30"
               style={{ left: ball.x, top: ball.y }}
             ></div>
           ))}
        </div>

        {/* Buckets */}
        <div className="w-full flex justify-between mt-auto px-2 pb-4">
          {multipliers.map((m, i) => (
            <div key={i} className={`flex-1 mx-0.5 text-center rounded py-1 text-[10px] font-bold ${m >= 1 ? 'bg-yellow-600 text-black' : 'bg-gray-800 text-gray-500'}`}>
              {m}x
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">BET AMOUNT</label>
          <div className="flex gap-2">
            {[10, 50, 100, 200].map(val => (
              <button 
                key={val} 
                onClick={() => setBetAmount(val)}
                className={`flex-1 py-2 rounded-lg border transition-all ${betAmount === val ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={dropBall}
          className="w-full sm:w-auto px-12 py-4 gold-gradient text-black font-extrabold rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Play fill="black" size={20} /> DROP BALL
        </button>
      </div>
    </div>
  );
};

export default PlinkoGame;
