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
  createdAt: string;
  createdBy: string;
  startDate: string;
  totalValue: number;
  description: string;
  totalEntries: number;
  recurrenceType: string;
  purchasingMethod: string;
  purchaseBankCard: string;
  purchasebank: string;
}

export interface Entries {
  type: string;
  paymentType: string;
  entrieId: string;
  dueDate: string;
  value: number;
  paymentDate: string;
  paymentMethod: string;
  entrieNumber: number;
  paymentBankCard: string;
  paymentBank: string;
}

export interface MixedTransactionEntry extends Transactions, Entries { }

export interface UpdateEntryValues {
  paymentType: string,
  paymentDate: string,
  paymentMethod: string,
  paymentBank: string,
  paymentBankCard: string
}

