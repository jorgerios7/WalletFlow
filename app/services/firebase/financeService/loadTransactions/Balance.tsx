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

    let totalIncome = 0;
    let totalExpense = 0;

    for (const { type, paymentType, value = 0 } of values) {
        const typeIndex = type === "income" ? 0 : 1;
        const payIndex = paymentType === "concluded" ? 0 : 1;

        if (typeIndex === 0) totalIncome += value;
        else totalExpense += value;

        totals[typeIndex][payIndex] += value;

        console.log("type: ", type);
        console.log("paymentType: ", paymentType);
        console.log("value: ", value);

        console.log("typeIndex: ", typeIndex);
        console.log("payIndex: ", payIndex);

        console.log("total: ", totals);

        console.log("---------------------------------------------------------------------------");
    }

    const [
        [concludedIncome, pendingIncome],
        [concludedExpense, pendingExpense]
    ] = totals as Totals;

    const totalSum = concludedIncome + concludedExpense;

    const balance: BalanceValues = {
        totalIncomeBalance: totalIncome, totalExpenseBalance: totalExpense,
        totalConcludedIncomeBalance: concludedIncome, totalPendingIncomeBalance: pendingIncome,
        totalConcludedExpenseBalance: concludedExpense, totalPendingExpenseBalance: pendingExpense,
        totalConcludedSum: totalSum,
    };

    return balance;
}