
import React from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

interface HistoryProps {
  transactions: Transaction[];
}

const BettingHistory: React.FC<HistoryProps> = ({ transactions }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <button className="text-yellow-500 text-sm hover:underline">Download PDF</button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-20 text-center">
            <Clock size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No transactions yet. Start playing!</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Type</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase hidden sm:table-cell">Date</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase text-right">Method</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold rounded">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {tx.type === 'DEPOSIT' ? (
                        <ArrowDownRight size={16} className="text-green-400" />
                      ) : (
                        <ArrowUpRight size={16} className="text-red-400" />
                      )}
                      <span className="font-bold">{tx.type}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={tx.type === 'DEPOSIT' ? 'text-green-400' : 'text-white'}>
                      {tx.type === 'DEPOSIT' ? '+' : '-'} ৳{tx.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm hidden sm:table-cell">{tx.date}</td>
                  <td className="p-4 text-right text-gray-300">{tx.method || 'System'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BettingHistory;
