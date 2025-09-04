export enum Type { income = 'income', expense = 'expense', profit = 'profit' }
export enum Payment { concluded = 'concluded', pending = 'pending' }

export interface Transactions {
  transactionId: string;
  category: string;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  startDate: string;
  payment: string;
  type: string;
  totalValue: number;
  description: string;
  method: string;
  accountId: string;
  isRecurrence: boolean;
  purpose: string;
  currentInstallment: number;
}

export interface Installments {
  title: string;
  category: string;
  method: string;
  cardId: string;
  purpose: string;
  type: string;
  createdBy: string;
  createdAt: string;
  startDate: string;
  totalValue: number;
}

export interface Parcels {
  currentInstallment: number;
  dueDate: string;
  value: number;
  payment: string;
}

