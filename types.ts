
export enum GameView {
  LOBBY = 'LOBBY',
  SLOTS = 'SLOTS',
  CRASH = 'CRASH',
  DICE = 'DICE',
  PLINKO = 'PLINKO',
  MINES = 'MINES',
  PENALTY = 'PENALTY',
  TOWER = 'TOWER',
  WALLET = 'WALLET',
  HISTORY = 'HISTORY'
}

export interface UserProfile {
  username: string;
  balance: number;
  vipLevel: number;
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW' | 'BET';
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  date: string;
  method?: string;
}

export interface GameInfo {
  id: string;
  name: string;
  image: string;
  type: GameView;
  jackpot: number;
  minBet: number;
  tag?: string;
}
