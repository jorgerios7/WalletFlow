import { StyleSheet, Text, View } from "react-native";
import { FinanceType, Transactions } from "../types/Finance";

interface Props {
    data?: Transactions
}

const typeLabels: Record<FinanceType, string> = {
    [FinanceType.INCOME]: 'Entrada',
    [FinanceType.PROFIT]: 'Lucro',
    [FinanceType.PENDING]: 'Saída',
};

const typeStatus = (status: boolean) => {
    return status ? 'Concluído' : 'Pendente'
};


const FinancialReportScreen = ({ data }: Props) => {
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

                <View style={styles.row}>
                    <Text style={styles.label}>ID da Transação:</Text>
                    <Text style={styles.value}>{data?.id || "N/A"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Data de Início:</Text>
                    <Text style={styles.value}>
                        {data?.startDate || "N/A"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.value}>
                        {typeof data?.type === "number" ? typeLabels[data.type] : "N/A"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Descrição:</Text>
                    <Text style={styles.value}>
                        {data?.description || "N/A"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Categoria:</Text>
                    <Text style={styles.value}>{data?.category || "N/A"}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Data de Vencimento:</Text>
                    <Text style={styles.value}>
                        {data?.dueDate || "N/A"}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>
                        {data?.isPaid ? typeStatus(data.isPaid) : "N/A"}
                    </Text>
                </View>

                {data?.isPaid && (
                    <View style={styles.row}>
                        <Text style={styles.label}>Método de Pagamento:</Text>
                        <Text style={styles.value}>
                            {data?.method || "N/A"}
                        </Text>
                    </View>
                )}

                <View style={styles.row}>
                    <Text style={styles.label}>Valor:</Text>
                    <Text style={styles.value}>
                        {data?.totalValue
                            ? `R$ ${Number(data.totalValue).toFixed(2)}`
                            : "N/A"}
                    </Text>
                </View>


            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
                <Text>Gerado por Sistema Financeiro • Contato: suporte@empresa.com</Text>
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

export default FinancialReportScreen;
