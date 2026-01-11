
import React, { useState, useEffect } from 'react';
import { GameView, UserProfile, Transaction } from './types';
import Navbar from './components/Navbar';
import Lobby from './components/Lobby';
import SlotsGame from './components/SlotsGame';
import CrashGame from './components/CrashGame';
import DiceGame from './components/DiceGame';
import PlinkoGame from './components/PlinkoGame';
import MinesGame from './components/MinesGame';
import PenaltyGame from './components/PenaltyGame';
import TowerGame from './components/TowerGame';
import Wallet from './components/Wallet';
import BettingHistory from './components/BettingHistory';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<GameView>(GameView.LOBBY);
  const [user, setUser] = useState<UserProfile>({
    username: "Player_" + Math.floor(Math.random() * 9000),
    balance: 0, // Initial balance set to 0 as requested
    vipLevel: 1
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [luckyTip, setLuckyTip] = useState<string>("Loading your fortune...");

  // AI Dealer Fortune
  useEffect(() => {
    const fetchLuckyTip = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Give a short, exciting one-sentence casino tip or lucky fortune for a player at JekBall Casino. Keep it punchy and atmospheric. Mention winning big.",
        });
        setLuckyTip(response.text || "Tonight is your lucky night at JekBall! Spin to win big.");
      } catch (error) {
        setLuckyTip("টাকা জিতার সুবর্ণ সুযোগ! এখনই খেলুন।");
      }
    };
    fetchLuckyTip();
  }, [currentView]);

  const updateBalance = (amount: number) => {
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
  };

  const addTransaction = (tx: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTx: Transaction = {
      ...tx,
      id: 'TX-' + Date.now(),
      date: new Date().toLocaleString(),
      status: 'SUCCESS'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const renderView = () => {
    switch (currentView) {
      case GameView.SLOTS:
        return <SlotsGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.CRASH:
        return <CrashGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.DICE:
        return <DiceGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.PLINKO:
        return <PlinkoGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.MINES:
        return <MinesGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.PENALTY:
        return <PenaltyGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.TOWER:
        return <TowerGame balance={user.balance} onWin={updateBalance} onBet={(amt) => updateBalance(-amt)} />;
      case GameView.WALLET:
        return <Wallet 
                balance={user.balance} 
                onDeposit={(amt) => {
                  updateBalance(amt);
                  addTransaction({ type: 'DEPOSIT', amount: amt, method: 'Manual' });
                }} 
              />;
      case GameView.HISTORY:
        return <BettingHistory transactions={transactions} />;
      case GameView.LOBBY:
      default:
        return <Lobby setView={setCurrentView} luckyTip={luckyTip} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar 
        user={user} 
        currentView={currentView} 
        setView={setCurrentView} 
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {renderView()}
      </main>

      <footer className="bg-black/90 p-8 text-center border-t border-yellow-500/20">
        <div className="flex justify-center gap-8 mb-6">
          <div className="text-gray-500 text-xs flex items-center gap-1 uppercase tracking-widest"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Certified Fair</div>
          <div className="text-gray-500 text-xs flex items-center gap-1 uppercase tracking-widest"><span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> SSL Secured</div>
          <div className="text-gray-500 text-xs flex items-center gap-1 uppercase tracking-widest"><span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span> 24/7 Support</div>
        </div>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          &copy; 2024 JekBall Casino. জিতার সেরা সুযোগ আপনার হাতের মুঠোয়। Play Responsibly. 18+ Only.
        </p>
      </footer>
    </div>
  );
};

export default App;
