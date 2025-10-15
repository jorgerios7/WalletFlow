export type TransactionType = 'income' | 'expense' | 'profit';
export type PaymentType = 'concluded' | 'pending';
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
  totalValue: number;
  description: string;
  totalEntries: number;
  recurrenceType: string;
}

export interface Entries {
  type: string;
  entrieId: string;
  dueDate: string;
  value: number;
  payment: string;
  paymentDate: string;
  method: string;
  entrieNumber: number;
}

