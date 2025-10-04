
export enum Type { income = 'income', expense = 'expense', profit = 'profit' }
export enum Payment { concluded = 'concluded', pending = 'pending' }

export type RecurrenceType = 'single' | 'fixed' | 'installment' | 'variable' | 'installment_dp' | 'scheduled';

//"single" (única)
//"fixed" (fixa (recorrente igual))
//"variable" (recorrente mas valor variável)
//"installment" (parcelada)
//"installment_dp" (parcelada com entrada)
//"scheduled" (recorrência programada)

export interface Transactions {
  transactionId: string;
  category: string;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  startDate: string;
  paymentDate: string;
  payment: string;
  type: string;
  totalValue: number;
  description: string;
  installmentNumber: number;
  method: string;
  accountId: string;
  recurrenceType: string;
}

{/** export interface Installments {
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
}*/}

export interface Installment {
  currentInstallment: number;
  dueDate: string;
  value: number;
  payment: string;
}

