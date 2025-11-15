import { RecurrenceType, TransactionType } from "@/app/types/Finance";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import StepScreen from "../../../stepScreen";

interface Props { isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void }
interface RecurrenceValuesProps { recurrenceType: RecurrenceType; totalEntries: number, purchasingMethod: string, purchaseBankCard: string, purchaseBank: string }

export default function RecurrenceStep(
    {
        isVisible, transactionType, values, onConfirm, onCancel, onSelect }:
        Props & { transactionType: TransactionType, values: RecurrenceValuesProps, onSelect: (values: RecurrenceValuesProps) => void }
) {
    if (!isVisible) return;

    const [selection, setSelection] = useState(
        {
            recurrenceType: values.recurrenceType, totalEntries: values.totalEntries, purchaseBankCard: values.purchaseBankCard,
            purchasingMethod: values.purchasingMethod, purchaseBank: values.purchaseBank
        }
    );

    function handleSelect() {
        const { recurrenceType, purchasingMethod, purchaseBankCard, purchaseBank, totalEntries } = selection;

        const isInstallment = recurrenceType === 'installment';

        const entries = isInstallment ? totalEntries : 0;

        const baseSelection = { recurrenceType, totalEntries: entries, purchasingMethod, purchaseBankCard: "", purchaseBank: "" };

        switch (purchasingMethod) {
            case 'Cartão de crédito': case 'Pix': onSelect({ ...baseSelection, purchaseBankCard, purchaseBank: isInstallment ? purchaseBank : "", totalEntries });
                break;

            case 'Boleto': onSelect({ ...baseSelection, purchaseBank });
                break;

            case 'Contrato direto': case 'Carnê': onSelect(baseSelection);
                break;

            default: console.warn("Método de compra desconhecido:", purchasingMethod);
        }
    }


    useEffect(() => { handleSelect() }, [selection]);

    return (
        <StepScreen
            isVisible={isVisible}
            onConfirm={() => {
                if (selection) {
                    onConfirm();
                } else {
                    Alert.alert('Campo vazio', 'Digite uma data para continuar');
                }
            }}
            onCancel={onCancel}
        >
            <DropdownSelect
                isVisible
                onOpeningDropdown="openAtBottom"
                placeholder={'Recorrência'}
                setSelection={selection.recurrenceType}
                list={['single', 'fixed', 'installment']}
                onSelect={(item) => { setSelection((prev) => ({ ...prev, recurrenceType: item as RecurrenceType })) }}
            />

            <DropdownSelect
                isVisible
                onOpeningDropdown="openAtBottom"
                placeholder={transactionType === 'expense' ? 'Método de compra' : 'Método de recebimento'}
                setSelection={selection.purchasingMethod}
                list={transactionType === 'expense'
                    ? ['Cartão de crédito', 'Boleto', 'Pix', 'Contrato direto', 'Carnê']
                    : ['Boleto', 'Carnê', 'Contrato direto', 'Dinheiro', 'Pix', 'Transferência bancária']}
                onSelect={(value) => setSelection((prev) => ({ ...prev, purchasingMethod: value as RecurrenceType }))}
            />

            <DropdownSelect
                isVisible={selection.purchasingMethod === 'Boleto' || selection.purchasingMethod === 'Pix'}
                onOpeningDropdown="openAtBottom"
                placeholder={'Instituição financeira'}
                setSelection={selection.purchaseBank}
                list={['Santander', 'Nubank', 'Inter']}
                onSelect={(value) => setSelection((prev) => ({ ...prev, purchaseBank: value as string }))}
            />

            <DropdownSelect
                isVisible={selection.recurrenceType === 'installment'}
                onOpeningDropdown="openAtBottom"
                placeholder={'Quantidade de parcelas'}
                setSelection={selection.totalEntries}
                list={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                onSelect={(value) => setSelection((prev) => ({ ...prev, totalEntries: value as number }))}
            />

            <DropdownSelect
                isVisible={selection.purchasingMethod === 'Cartão de crédito'}
                onOpeningDropdown="openAtBottom"
                placeholder={'Cartão bancário'}
                setSelection={selection.purchaseBankCard}
                list={['Master(5885)', 'Visa(8822)']}
                onSelect={(value) => setSelection((prev) => ({ ...prev, purchaseBankCard: value as string }))}
            />
        </StepScreen>
    );
}