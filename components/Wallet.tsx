
import React, { useState } from 'react';
import { ADMIN_PHONE } from '../constants';
import { CheckCircle2, Copy, AlertTriangle, ShieldCheck, Smartphone, Clock } from 'lucide-react';

interface WalletProps {
  balance: number;
  onDeposit: (amount: number) => void;
}

const Wallet: React.FC<WalletProps> = ({ balance, onDeposit }) => {
  const [amount, setAmount] = useState<string>('');
  const [method, setMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [txId, setTxId] = useState('');
  const [step, setStep] = useState<'INFO' | 'SUCCESS'>('INFO');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId || !amount || Number(amount) <= 0) return alert("সঠিক এমাউন্ট এবং Transaction ID দিন");
    
    // As requested: balance will not change immediately here.
    // The request is submitted and the user is told to wait.
    setStep('SUCCESS');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ADMIN_PHONE);
    alert("Number copied to clipboard!");
  };

  if (step === 'SUCCESS') {
    return (
      <div className="max-w-md mx-auto glass-card p-12 rounded-3xl text-center animate-in zoom-in duration-300 border border-yellow-500/30">
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/10">
          <Clock size={40} className="text-yellow-500 animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white uppercase tracking-tight">অনুরোধ গ্রহণ করা হয়েছে</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          আপনার পেমেন্টটি ভেরিফিকেশন করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন, <span className="text-yellow-500 font-bold">১-৫ মিনিটের মধ্যে</span> আপনার একাউন্টে ব্যালেন্স যোগ করে দেওয়া হবে।
        </p>
        <button 
          onClick={() => { setStep('INFO'); setAmount(''); setTxId(''); }}
          className="w-full py-4 gold-gradient text-black font-black rounded-xl text-lg hover:scale-105 transition-all shadow-xl"
        >
          বুঝেছি
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      {/* aggressive balance display */}
      <div className="relative glass-card p-10 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-yellow-500/20 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShieldCheck size={200} />
        </div>
        
        <div className="z-10 text-center sm:text-left">
          <div className="text-gray-500 text-sm uppercase font-black tracking-widest flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span> My Total Balance
          </div>
          <div className="text-7xl sm:text-8xl font-goldman gold-text mt-4">
            ৳ {balance === 0 ? "00" : balance.toLocaleString()}
          </div>
        </div>

        <div className="mt-8 sm:mt-0 text-center sm:text-right z-10">
          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Player Tier</div>
          <div className="text-2xl font-black text-white mt-1">ELITE CHAMPION</div>
        </div>
      </div>

      {/* IMPORTANT NOTICE - Updated with 'Send Money' focus */}
      <div className="bg-red-500/5 border-2 border-dashed border-red-500/40 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center shrink-0">
          <AlertTriangle className="text-red-500" size={32} />
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-red-500 font-black uppercase mb-2 text-xl tracking-tight">ডিপোজিট নোটিশ (সবাই পড়ুন)</h4>
          <p className="text-gray-300 leading-relaxed text-sm">
            নিচে দেওয়া এজেন্ট নম্বরে অবশ্যই <span className="text-red-500 font-bold underline">Send Money</span> করতে হবে। ক্যাশ আউট বা মোবাইল রিচার্জ করলে ব্যালেন্স যোগ হবে না। টাকা পাঠানোর ১-৫ মিনিটের মধ্যে ট্রানজেকশন আইডি চেক করে আপনার ব্যালেন্স এড করে দেওয়া হবে।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Smartphone className="text-yellow-500" /> পেমেন্ট মেথড সিলেক্ট করুন
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {(['bKash', 'Nagad', 'Rocket'] as const).map(m => (
              <button 
                key={m}
                onClick={() => setMethod(m)}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${method === m ? 'bg-yellow-500/10 border-yellow-500 shadow-xl shadow-yellow-500/10 scale-[1.02]' : 'bg-black/40 border-white/5 hover:border-white/10'}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${m === 'bKash' ? 'bg-[#D12053]' : m === 'Nagad' ? 'bg-[#F7941D]' : 'bg-[#8C3391]'}`}>
                    {m[0]}
                  </div>
                  <div className="text-left">
                    <span className="font-black text-lg block">{m} Personal</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Send Money Only</span>
                  </div>
                </div>
                {method === m && <CheckCircle2 size={24} className="text-yellow-500" />}
              </button>
            ))}
          </div>

          <div className="p-8 bg-gradient-to-br from-black to-[#111] border border-white/5 rounded-[2rem] space-y-4">
            <div className="flex justify-between items-center text-xs font-black text-gray-500 uppercase tracking-widest">
              <span>এজেন্ট নম্বর</span>
              <span className="text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Active Now</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/10 group">
              <span className="text-3xl font-goldman tracking-[6px] group-hover:text-yellow-500 transition-colors">{ADMIN_PHONE}</span>
              <button onClick={copyToClipboard} className="p-3 bg-yellow-500 text-black rounded-xl hover:scale-110 active:scale-90 transition-all shadow-lg">
                <Copy size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Deposit Form */}
        <div className="bg-[#0f0f0f] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl"></div>
          
          <h3 className="text-2xl font-bold mb-8 uppercase tracking-tighter">পেমেন্ট কনফার্ম করুন</h3>
          <form onSubmit={handleDeposit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-1">টাকার পরিমাণ (Deposit Amount)</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-yellow-500 font-bold">৳</span>
                <input 
                  type="number" 
                  placeholder="৫০০"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-6 pl-12 outline-none focus:border-yellow-500 transition-all text-3xl font-goldman"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-gray-500 uppercase font-black tracking-widest ml-1">ট্রানজেকশন আইডি (TrxID)</label>
              <input 
                type="text" 
                placeholder="Ex: 9K3L8J2P"
                value={txId}
                onChange={(e) => setTxId(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/5 rounded-2xl p-6 outline-none focus:border-yellow-500 transition-all font-mono text-xl tracking-widest uppercase"
                required
              />
            </div>
            
            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-6 gold-gradient text-black font-black rounded-[1.5rem] text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
              >
                টাকা অ্যাড করুন
              </button>
              <div className="mt-6 flex items-center justify-center gap-3 text-gray-500 opacity-50">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">Verification Pending (1-5 min)</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
