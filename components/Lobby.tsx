
import React from 'react';
import { GameView } from '../types';
import { GAMES } from '../constants';
import { Sparkles, Trophy, Play, Zap, Flame, ShieldCheck, Star } from 'lucide-react';

interface LobbyProps {
  setView: (view: GameView) => void;
  luckyTip: string;
}

const Lobby: React.FC<LobbyProps> = ({ setView, luckyTip }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* aggressive Luxury Banner */}
      <div className="relative overflow-hidden rounded-[3rem] h-[30rem] sm:h-[35rem] flex items-center bg-[#050505] border-2 border-yellow-500/20 group">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] group-hover:bg-yellow-500/20 transition-all duration-1000"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 px-8 sm:px-20 w-full max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-5 py-2 rounded-full text-xs font-black border border-yellow-500/30 animate-pulse-gold tracking-widest uppercase">
            <Star size={14} fill="currentColor" />
            টাকা জিতার সুবর্ণ সুযোগ
          </div>
          
          <h2 className="text-6xl sm:text-8xl font-goldman leading-none tracking-tight">
            <span className="block text-white opacity-90">JEKBALL</span>
            <span className="block gold-text drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">CASINO</span>
          </h2>
          
          <p className="text-2xl sm:text-3xl font-bold text-gray-200 leading-relaxed max-w-xl">
            ঘরে বসে <span className="text-yellow-500">লাখ টাকা</span> জেতার সেরা প্ল্যাটফর্ম!
          </p>

          <p className="text-gray-500 text-lg italic border-l-4 border-yellow-600 pl-6 py-2">
            "{luckyTip}"
          </p>
          
          <div className="flex flex-wrap gap-5 pt-4">
            <button 
              onClick={() => setView(GameView.SLOTS)}
              className="gold-gradient text-black font-black px-12 py-5 rounded-2xl text-xl shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Play fill="black" size={24} />
              এখনই খেলুন
            </button>
            <button 
              onClick={() => setView(GameView.WALLET)}
              className="bg-white/5 text-white font-bold px-12 py-5 rounded-2xl text-xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-xl"
            >
              ডিপোজিট করুন
            </button>
          </div>
        </div>

        {/* Floating Graphics */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block animate-bounce duration-[3000ms]">
          <div className="relative">
             <Trophy size={400} className="text-yellow-500 opacity-10" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-yellow-500/20 blur-3xl animate-pulse"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Featured Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {[
          { label: 'Total Players', val: '2.5M+', color: 'text-blue-500' },
          { label: 'Paid Out', val: '৳450M+', color: 'text-green-500' },
          { label: 'Jackpots', val: '150+', color: 'text-yellow-500' },
          { label: 'Active Bets', val: '12.4K', color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border-white/5 text-center">
            <div className={`text-2xl font-goldman ${stat.color}`}>{stat.val}</div>
            <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Game Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h3 className="text-3xl font-bold flex items-center gap-3">
            <Flame className="text-orange-500 animate-pulse" /> জনপ্রিয় গেমসমূহ
          </h3>
          <p className="text-gray-500 text-sm mt-1">আপনার পছন্দের গেমটি বেছে নিন এবং জিতা শুরু করুন</p>
        </div>
        <div className="flex gap-2">
          {['Hot', 'Slots', 'Balls', 'Cards'].map(tab => (
            <button key={tab} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-yellow-500 hover:text-black transition-all">
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* High-End Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {GAMES.map((game) => (
          <div 
            key={game.id} 
            className="group relative bg-[#111] rounded-[2.5rem] overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer border border-white/5 hover:border-yellow-500/30 shadow-2xl"
            onClick={() => setView(game.type)}
          >
            {/* Visual Preview */}
            <div className="relative h-64 overflow-hidden">
              <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent"></div>
              
              {game.tag && (
                <div className="absolute top-6 left-6 gold-gradient text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-xl ring-4 ring-black/20">
                  {game.tag}
                </div>
              )}

              <div className="absolute bottom-6 left-8 right-8">
                <div className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.2em] mb-1">MEGA JACKPOT</div>
                <div className="text-4xl font-goldman text-white drop-shadow-lg">৳ {game.jackpot.toLocaleString()}</div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-2xl font-bold group-hover:text-yellow-500 transition-colors">{game.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-1 rounded-md font-bold uppercase">MIN: ৳{game.minBet}</span>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-md font-bold uppercase tracking-wider">Provably Fair</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-yellow-500/20 transform group-hover:rotate-6 transition-all duration-300">
                  <Play fill="black" size={28} />
                </div>
              </div>
            </div>

            {/* Interactive Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
