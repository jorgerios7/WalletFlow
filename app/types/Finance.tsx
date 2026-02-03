export type TransactionType = "none" | 'income' | 'expense';
export type PaymentType = "none" | "concluded" | "pending";
export type RecurrenceType = "none" | "single" | "fixed" | "installment";
export type RecurrenceFrequency = "none" | "daily" | "weekly" | "monthly";
export type TransactionCreationSteps = 'recurrence' | 'category' | 'startDate' | 'dueDate' | 'totalValue' | 'description' | 'paymentConcluded' | 'final';
export type UpdatePaymentSteps = 'paymentType' | 'paymentDate' | 'paymentMethod' | 'paymentValue' | 'final';


//"single" (única)
//"fixed" (fixa (recorrente igual))
//"variable" (recorrente mas valor variável)
//"installment" (parcelada)
//"installment_dp" (parcelada com entrada)
//"scheduled" (recorrência programada)

export interface Transactions {
  transactionId: string; category: string; createdAt: string; createdBy: string; startDate: string; totalValue: number;
  description: string; totalEntries: number; recurrenceType: RecurrenceType; purchasingMethod: string; purchaseBankCard: string;
  purchaseBank: string; recurrenceFrequency: RecurrenceFrequency
}

export const DefTransCreationValues = {
  transactionId: "", createdBy: "", createdAt: new Date().toISOString(), startDate: "", category: "", description: "",
  recurrenceType: "none" as RecurrenceType, totalEntries: 0, totalValue: 0, purchasingMethod: "", purchaseBankCard: "",
  purchaseBank: "", recurrenceFrequency: "none" as RecurrenceFrequency
}

export interface Entries {
  type: TransactionType; paymentType: PaymentType; entrieId: string; dueDate: string; value: number;
  paymentDate: string; paymentMethod: string; entrieNumber: number; paymentBankCard: string; paymentBank: string;
}

export interface EntryCreationProps {
  paymentType: PaymentType, entrieId: string, entrieNumber: number, dueDate: string, value: number
}

export const DefTransCreationEntryValues = {
  paymentType: "pending" as PaymentType, entrieId: "", entrieNumber: 0, dueDate: "", value: 0,
}

export interface MixedTransactionEntry extends Transactions, Entries { }

export interface UpdateEntryProps {
  paymentType: string, paymentDate: string, paymentMethod: string, paymentBank: string, paymentBankCard: string, value: number
}

export const DefaultUpdateEntryValues = {
  paymentType: "", paymentDate: "", paymentMethod: "", paymentBank: "", paymentBankCard: "", value: 0
}

export interface UpdateIdsProps {
  transaction: string, entry: string
}

export interface RecurrenceProps {
  recurrenceType: RecurrenceType; recurrenceFrequency: RecurrenceFrequency, totalEntries: number, purchasingMethod: string,
  purchaseBankCard: string, purchaseBank: string
}

export interface BalanceValues {
  totalIncomeBalance: number; totalExpenseBalance: number; totalConcludedIncomeBalance: number; totalPendingIncomeBalance: number;
  totalConcludedExpenseBalance: number; totalPendingExpenseBalance: number; totalConcludedSum: number;
}

export interface DeleteEntryProps {
  ids: { transaction: string, entry: string }
}

export const DefaultFinancialBalance = {
  totalIncomeBalance: 0, totalExpenseBalance: 0, totalConcludedIncomeBalance: 0, totalPendingIncomeBalance: 0,
  totalConcludedExpenseBalance: 0, totalPendingExpenseBalance: 0, totalConcludedSum: 0
}

export const ConfirmationScreenValues = {
  isVisible: false,
  message: "",
  transactionId: "",
  entryId: ""
}

export const ReportScreenValues = {
  isVisible: false,
  data: null as Transactions | null
}

export const PaymentScreenValues = {
  isVisible: false,
  id: {
    transaction: "",
    entry: ""
  },
  values: {
    paymentType: "",
    paymentDate: "",
    paymentMethod: "",
    paymentBank: "",
    paymentBankCard: "", 
    value: 0,
  }
}