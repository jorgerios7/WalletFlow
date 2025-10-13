import { Installment, Transactions } from "@/app/types/Finance";
import { StyleSheet, Text, View } from "react-native";

interface Props { transaction: Transactions, installment: Installment };

function Row({ label, value }: { label: string, value: string | number | undefined }) {
    if (!value || undefined || value === 0) return null;

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const FinanceReportScreen = ({ transaction, installment }: Props) => {
    return (
        <View>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Relatório Financeiro</Text>
                <Text style={styles.subtitle}>Emitido em: {new Date().toLocaleDateString()}</Text>
            </View>

            {/* Dados da Transação */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Detalhes da Transação</Text>

                <Row label={"Id da transação:"} value={transaction?.transactionId} />

                <Row label={"Data de início:"} value={transaction?.startDate} />

                <Row label={"Tipo:"} value={transaction?.type} />

                <Row label={"Parcela:"} value={`${installment?.installmentNumber} de ${transaction?.installmentTotalNumber}`} />

                <Row label={"Valor total:"} value={`R$ ${Number(transaction?.totalValue).toFixed(2)}`} />

                <Row label={"Descrição:"} value={transaction?.description} />

                <Row label={"Categoria:"} value={transaction?.category} />

                <Row label={"Data de vencimento:"} value={installment?.dueDate} />

                <Row label={"Pagamento:"} value={installment?.payment} />

                <Row label={"Método de pagamento:"} value={installment?.method} />
                
                <Row label={"Data de pagamento:"} value={installment?.paymentDate} />

                

                <Row label={"Valor da parcela:"} value={`R$ ${Number(installment?.value).toFixed(2)}`} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Arial",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: "#666",
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        marginBottom: 5,
    },
    label: {
        width: "40%",
        fontSize: 12,
        fontWeight: "bold",
    },
    value: {
        width: "60%",
        fontSize: 12,
    },
    paid: {
        color: "#4CAF50",
    },
    unpaid: {
        color: "#F44336",
    },
    footer: {
        marginTop: 30,
        fontSize: 10,
        textAlign: "center",
        color: "#999",
    },
});

export default FinanceReportScreen;
