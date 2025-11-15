export type TransactionType = "none" |'income' | 'expense';
export type PaymentType = "none" |"concluded" | "pending";
export type RecurrenceType = "none" | "single" | "fixed" | "installment";
export type RecurrenceFrequency = "none" |"daily"| "weekly"| "monthly"| "yearly";

//"single" (única)
//"fixed" (fixa (recorrente igual))
//"variable" (recorrente mas valor variável)
//"installment" (parcelada)
//"installment_dp" (parcelada com entrada)
//"scheduled" (recorrência programada)

export interface Transactions {
  transactionId: string; category: string; createdAt: string; createdBy: string; startDate: string; totalValue: number; description: string;
  totalEntries: number; recurrenceType: RecurrenceType; purchasingMethod: string; purchaseBankCard: string; purchaseBank: string;
}

export interface Entries {
  type: TransactionType; paymentType: PaymentType; entrieId: string; dueDate: string; value: number; paymentDate: string; paymentMethod: string;
  entrieNumber: number; paymentBankCard: string; paymentBank: string; recurrenceFrequency: RecurrenceFrequency
}

export interface MixedTransactionEntry extends Transactions, Entries { }

export interface UpdateEntryValues { paymentType: string, paymentDate: string, paymentMethod: string, paymentBank: string, paymentBankCard: string }

export interface BalanceValues {
  totalIncomeBalance: number; totalExpenseBalance: number; totalConcludedIncomeBalance: number; totalPendingIncomeBalance: number;
  totalConcludedExpenseBalance: number; totalPendingExpenseBalance: number; totalConcludedSum: number;
}

