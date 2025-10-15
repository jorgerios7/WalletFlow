import { BottomSheet } from "@/components/ui/sheet/BottomSheet";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function Row({ label, value }: { label: string, value: string | number | undefined }) {
    if (!value || undefined || value === 0) return null;

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const FinanceReportScreen = ({ data, isVisible, onClose }: { data: any, isVisible: boolean, onClose: () => void }) => {
    return (
        <SafeAreaView style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <BottomSheet
                visible={isVisible}
                isFullHeight={true}
                isDragHandleVisible={false}
                onClose={onClose}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório Financeiro</Text>
                    <Text style={styles.subtitle}>Emitido em: {new Date().toLocaleDateString()}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalhes da Transação</Text>

                    <Row label={"Id da transação:"} value={data?.transactionId} />

                    <Row label={"Data de início:"} value={data?.startDate} />

                    <Row label={"Tipo:"} value={data?.type} />

                    <Row label={"Parcela:"} value={`${data?.entrieNumber} de ${data?.totalEntries}`} />

                    <Row label={"Valor total:"} value={`R$ ${Number(data?.totalValue).toFixed(2)}`} />

                    <Row label={"Descrição:"} value={data?.description} />

                    <Row label={"Categoria:"} value={data?.category} />

                    <Row label={"Data de vencimento:"} value={data?.dueDate} />

                    <Row label={"Pagamento:"} value={data?.payment} />

                    <Row label={"Método de pagamento:"} value={data?.method} />

                    <Row label={"Data de pagamento:"} value={data?.paymentDate} />

                    <Row label={"Valor da parcela:"} value={`R$ ${Number(data?.value).toFixed(2)}`} />
                </View>
            </BottomSheet>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: "Arial" }, header: { marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 }, subtitle: { fontSize: 12, color: "#666" },
    section: { marginBottom: 15 }, sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8, color: "#333" },
    row: { flexDirection: "row", marginBottom: 5 }, label: { width: "40%", fontSize: 12, fontWeight: "bold" },
    value: { width: "60%", fontSize: 12 }, paid: { color: "#4CAF50" }, unpaid: { color: "#F44336" },
    footer: { marginTop: 30, fontSize: 10, textAlign: "center", color: "#999" }
});

export default FinanceReportScreen;
