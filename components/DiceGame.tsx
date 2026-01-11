
import React, { useState } from 'react';

interface DiceProps {
  balance: number;
  onWin: (amount: number) => void;
  onBet: (amount: number) => void;
}

const DiceGame: React.FC<DiceProps> = ({ balance, onWin, onBet }) => {
  const [betAmount, setBetAmount] = useState(10);
  const [prediction, setPrediction] = useState<'OVER' | 'UNDER'>('OVER');
  const [diceResult, setDiceResult] = useState(3);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (balance < betAmount) return;
    onBet(betAmount);
    setRolling(true);

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDiceResult(result);
      setRolling(false);

      if (prediction === 'OVER' && result >= 4) onWin(betAmount * 1.9);
      if (prediction === 'UNDER' && result <= 3) onWin(betAmount * 1.9);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto glass-card p-8 rounded-2xl border border-yellow-500/20 text-center space-y-6">
      <h2 className="text-2xl font-goldman gold-text">LUCKY DICE</h2>
      
      <div className="flex justify-center py-10">
        <div className={`w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl text-black font-bold shadow-2xl transition-transform ${rolling ? 'animate-spin' : ''}`}>
          {diceResult}
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setPrediction('UNDER')}
          className={`flex-1 py-3 rounded-lg font-bold border ${prediction === 'UNDER' ? 'bg-blue-600 border-blue-600' : 'border-gray-700 hover:border-gray-500'}`}
        >
          UNDER (1-3)
        </button>
        <button 
          onClick={() => setPrediction('OVER')}
          className={`flex-1 py-3 rounded-lg font-bold border ${prediction === 'OVER' ? 'bg-red-600 border-red-600' : 'border-gray-700 hover:border-gray-500'}`}
        >
          OVER (4-6)
        </button>
      </div>

      <div className="bg-black/40 p-4 rounded-xl">
        <input 
          type="number" 
          value={betAmount} 
          onChange={(e) => setBetAmount(Math.max(1, Number(e.target.value)))}
          className="w-full bg-transparent text-center text-xl font-bold outline-none"
        />
        <div className="text-[10px] text-gray-500 mt-1">BET AMOUNT (৳)</div>
      </div>

      <button 
        onClick={roll}
        disabled={rolling}
        className="w-full py-4 gold-gradient text-black font-extrabold rounded-xl text-xl shadow-lg hover:scale-[1.02]"
      >
        {rolling ? 'ROLLING...' : 'ROLL DICE'}
      </button>
    </div>
  );
};

export default DiceGame;
