
import React from 'react';
import { GameView, UserProfile } from '../types';
import { Wallet, Home, History, User } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  currentView: GameView;
  setView: (view: GameView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 glass-card px-4 py-3 flex items-center justify-between border-b border-yellow-500/30">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setView(GameView.LOBBY)}
      >
        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black shadow-lg shadow-yellow-500/20">
          JB
        </div>
        <h1 className="font-goldman text-2xl gold-text hidden sm:block">JekBall</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <button 
          onClick={() => setView(GameView.LOBBY)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === GameView.LOBBY ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
        >
          <Home size={20} />
          <span className="text-[10px] uppercase font-bold mt-1">Lobby</span>
        </button>

        <button 
          onClick={() => setView(GameView.HISTORY)}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === GameView.HISTORY ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
        >
          <History size={20} />
          <span className="text-[10px] uppercase font-bold mt-1">Logs</span>
        </button>

        <div className="h-10 w-px bg-gray-700 hidden sm:block"></div>

        <div className="flex items-center bg-black/40 px-4 py-1.5 rounded-full border border-yellow-500/40">
          <span className="text-yellow-500 font-bold mr-2">৳</span>
          <span className="font-goldman text-lg">{user.balance.toLocaleString()}</span>
        </div>

        <button 
          onClick={() => setView(GameView.WALLET)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Wallet size={18} />
          <span className="hidden sm:inline">Deposit</span>
        </button>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-xs text-gray-400">VIP {user.vipLevel}</span>
          <span className="text-sm font-bold truncate max-w-[100px]">{user.username}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
