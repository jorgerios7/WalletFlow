export enum FinanceType {
  FINANCIAL_INCOME = 1,
  FINANCIAL_PROFIT = 2,
  FINANCIAL_PENDING = 3,
}

export enum PaymentStatus {
  Paid = 0,
  NotPaid = 1
}

interface Finance {
  id: string;
  category: string;
  dueDate: string;
  packageID: string;
  startDate: string;
  isPaid: PaymentStatus;
  type: FinanceType;
  value: number;
  description: string;
  method: string;
  isRecurrence: boolean;
}

export default Finance;
