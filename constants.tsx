
import React from 'react';
import { GameView, GameInfo } from './types';

export const ADMIN_PHONE = "01883308311";

export const GAMES: GameInfo[] = [
  {
    id: '1',
    name: 'Mega Jackpot Slots',
    image: 'https://images.unsplash.com/photo-1596838132731-dd9d5fd5d04d?auto=format&fit=crop&q=80&w=400',
    type: GameView.SLOTS,
    jackpot: 5000000,
    minBet: 10,
    tag: 'Popular'
  },
  {
    id: '6',
    name: 'Penalty Shootout',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400',
    type: GameView.PENALTY,
    jackpot: 4500000,
    minBet: 50,
    tag: 'New & Hot'
  },
  {
    id: '2',
    name: 'JekBall Crash',
    image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=400',
    type: GameView.CRASH,
    jackpot: 2500000,
    minBet: 20,
    tag: 'Trending'
  },
  {
    id: '7',
    name: 'Mega Tower',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    type: GameView.TOWER,
    jackpot: 8000000,
    minBet: 100,
    tag: 'Hard'
  },
  {
    id: '4',
    name: 'Plinko Balls',
    image: 'https://images.unsplash.com/photo-1611095773164-12323c6fbe36?auto=format&fit=crop&q=80&w=400',
    type: GameView.PLINKO,
    jackpot: 1500000,
    minBet: 10,
    tag: 'Easy'
  },
  {
    id: '5',
    name: 'Treasure Mines',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=400',
    type: GameView.MINES,
    jackpot: 3000000,
    minBet: 50,
    tag: 'Skill'
  }
];

export const SLOT_SYMBOLS = ['🍒', '🍋', '🔔', '💎', '7️⃣', '🎰', '🍀', '💰'];
