import { BalanceValues, MixedTransactionEntry } from "@/app/types/Finance";

export default function Balance(values: MixedTransactionEntry[]) {
    type Totals = [
        [concludedIncome: number, pendingIncome: number],
        [concludedExpense: number, pendingExpense: number]
    ];

    const totals = [
        [0, 0],
        [0, 0]
    ] as Totals;

    for (const { type, paymentType, value = 0 } of values) {

        const verticalIndex = type === "income" ? 0 : 1;
        const horizontalIndex = paymentType === "concluded" ? 0 : 1;

        totals[verticalIndex][horizontalIndex] += value;
    }

    const [
        [concludedIncome, pendingIncome],
        [concludedExpense, pendingExpense]
    ] = totals as Totals;

    const totalIncome = (concludedIncome + pendingIncome);
    const totalExpense = (concludedExpense + pendingExpense);
    const totalSum = (concludedIncome + concludedExpense);

    const balance: BalanceValues = {
        totalIncomeBalance: totalIncome,
        totalExpenseBalance: totalExpense,
        totalConcludedIncomeBalance: concludedIncome,
        totalPendingIncomeBalance: pendingIncome,
        totalConcludedExpenseBalance: concludedExpense,
        totalPendingExpenseBalance: pendingExpense,
        totalConcludedSum: totalSum,
    };

    return balance;
}