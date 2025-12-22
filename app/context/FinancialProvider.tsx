import { getAuth } from "firebase/auth";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import LoadTransactions from "../services/firebase/financeService/loadTransactions";
import {
    BalanceValues,
    DefaultFinancialBalance,
    MixedTransactionEntry
} from "../types/Finance";

interface FinancialContextData {
    loading: boolean;
    financialBalance: BalanceValues;
    entriesData: MixedTransactionEntry[] | null;
    group_id: string;
    setDate: React.Dispatch<React.SetStateAction<string | null>>;
    loadTransactions: () => Promise<void>;
    refresh: () => Promise<void>;
}

interface Props {
    groupId: string,
    children: ReactNode
}

const FinancialContext = createContext<FinancialContextData | undefined>(undefined);

export default function FinancialProvider({ groupId, children }: Props) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser?.uid) return null;

    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState<string | null>(null);
    const [financialBalance, setFinancialBalance] = useState(DefaultFinancialBalance);
    const [entriesData, setEntriesData] = useState<MixedTransactionEntry[] | null>(null);
    const group_id = groupId;

    const loadTransactions = useCallback(async () => {
        if (!groupId || !date) return;

        const data = await LoadTransactions(date, groupId, setLoading, setFinancialBalance);

        if (data) {
            setEntriesData(data);
        } else {
            setEntriesData([]);
        }
    }, [date, groupId]);

    useEffect(() => {
        loadTransactions();
    }, [date, loadTransactions]);

    const value = useMemo(() => ({
        loading,
        financialBalance,
        entriesData,
        group_id,
        setDate,
        loadTransactions,
        refresh: loadTransactions
    }), [
        loading,
        financialBalance,
        entriesData,
        setDate,
        loadTransactions
    ]);

    return (
        <FinancialContext.Provider value={value}>
            {children}
        </FinancialContext.Provider>
    );
}

export function useFinancial() {
    const context = useContext(FinancialContext);

    if (!context) {
        throw new Error("useFinancial deve ser usado dentro de FinancialProvider");
    }

    return context;
}
