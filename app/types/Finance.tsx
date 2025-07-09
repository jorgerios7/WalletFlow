export enum FinanceType {
  INCOME = 1,
  PROFIT = 2,
  PENDING = 3,
}

export type Type = 'Income' | 'Profit' | 'Pending';

export interface Transactions {
  id: string;
  category: string;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  startDate: string;
  isPaid: boolean;
  type: FinanceType;
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
  type: FinanceType;
  createdBy: string;
  createdAt: string;
  startDate: string;
  totalValue: number;
}

export interface Parcels {
  currentInstallment: number;
  dueDate: string;
  value: number;
  isPaid: boolean;
}

