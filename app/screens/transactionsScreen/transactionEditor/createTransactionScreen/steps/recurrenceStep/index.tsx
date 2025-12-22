import { RecurrenceFrequency, RecurrenceProps, RecurrenceType, TransactionType } from "@/app/types/Finance";
import DropdownSelect from "@/components/ui/dropdowns/dropdownSelect";
import { useEffect, useState } from "react";
import StepScreen from "../../../stepScreen";

interface Props {
    transactionType: TransactionType, values: RecurrenceProps, onSelect: (values: RecurrenceProps) => void,
    isVisible: boolean; onBack?: () => void; onConfirm: () => void; onCancel: () => void
}

export default function RecurrenceStep({ isVisible, transactionType, values, onConfirm, onCancel, onSelect }: Props) {
    if (!isVisible) return;

    const [selection, setSelection] = useState<RecurrenceProps>({
        recurrenceType: values.recurrenceType, recurrenceFrequency: values.recurrenceFrequency, totalEntries: values.totalEntries,
        purchaseBankCard: values.purchaseBankCard, purchasingMethod: values.purchasingMethod, purchaseBank: values.purchaseBank,
    });

    function handleSelect() {
        const {
            recurrenceType,
            recurrenceFrequency,
            purchasingMethod,
            purchaseBankCard,
            purchaseBank,
            totalEntries
        } = selection;

        const isInstallment = recurrenceType === 'installment';
        const entries = isInstallment ? totalEntries : 0;

        const baseSelection = {
            recurrenceType,
            recurrenceFrequency,
            totalEntries: entries,
            purchasingMethod,
            purchaseBankCard: "",
            purchaseBank: ""
        };

        switch (purchasingMethod) {
            case 'Cartão de crédito': case 'Pix': onSelect(
                {
                    ...baseSelection, purchaseBankCard, purchaseBank: (isInstallment ? purchaseBank : ""),
                    totalEntries: (isInstallment ? totalEntries : 0), recurrenceFrequency: (isInstallment ? recurrenceFrequency : "none")
                }
            );
                break;

            case 'Boleto': onSelect({ ...baseSelection, purchaseBank });
                break;

            case 'Contrato direto': case 'Carnê': onSelect(baseSelection);
                break;

            default: console.warn("Método de compra desconhecido:", purchasingMethod);
        }
    }

    function handleInstallmentNumbers() {
        switch (selection.recurrenceFrequency) {
            case "weekly":
                return Array.from({ length: 7 }, (_, i) => i + 1);

            case "monthly":
                return Array.from({ length: 12 }, (_, i) => i + 1);

            case "daily":
                return Array.from({ length: 30 }, (_, i) => i + 1);

            default:
                return [];
        }
    }

    useEffect(() => { handleSelect() }, [selection]);

    return (
        <StepScreen
            isVisible={isVisible}
            onConfirm={onConfirm}
            onCancel={onCancel}
        >
            <DropdownSelect
                isVisible
                onOpeningDropdown="openAtBottom"
                placeholder={'Tipo'}
                setSelection={selection.recurrenceType === "none" ? "" : selection.recurrenceType}
                list={['single', 'fixed', 'installment']}
                onSelect={(item) => { setSelection((prev) => ({ ...prev, recurrenceType: item as RecurrenceType })) }}
            />

            <DropdownSelect
                isVisible={selection.recurrenceType === "installment"}
                onOpeningDropdown="openAtBottom"
                placeholder={'Frequência'}
                setSelection={selection.recurrenceFrequency === "none" ? "" : selection.recurrenceFrequency}
                list={["daily", "weekly", "monthly"]}
                onSelect={(item) => { setSelection((prev) => ({ ...prev, recurrenceFrequency: item as RecurrenceFrequency })) }}
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
                list={handleInstallmentNumbers()}
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