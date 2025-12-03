import { ThemeType } from "@/app/types/appearance";
import { MixedTransactionEntry } from "@/app/types/Finance";
import { BottomSheet } from "@/components/ui/sheet/BottomSheet";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const FinanceReportScreen = ({ theme, data, isVisible, onClose }: { theme: ThemeType, data: MixedTransactionEntry, isVisible: boolean, onClose: () => void }) => {
    if (!data) return null;

    function Row({ label, value }: { label: string, value?: string | number }) {
    if (value === undefined || value === null || value === '') return null;

    return (
        <View style={styles.row}>
            <Text style={[styles.label, {color: Colors[theme].textSecondary}]}>{label}</Text>
            <Text style={[styles.value, {color: Colors[theme].textSecondary}]}>{String(value)}</Text>
        </View>
    );
}

    return (
        <SafeAreaView style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <BottomSheet
                visible={isVisible}
                theme={theme}
                isFullHeight={true}
                isDragHandleVisible={false}
                onClose={onClose}
            >
                <View style={[styles.header, { backgroundColor: Colors[theme].background }]}>
                    <Text style={[styles.title, { color: Colors[theme].textPrimary }]}>Relatório Financeiro</Text>
                    <Text style={[styles.subtitle, { color: Colors[theme].textSecondary }]}>Emitido em: {new Date().toLocaleDateString()}</Text>
                </View>

                <View style={[styles.section, { backgroundColor: Colors[theme].background }]}>
                    <Text style={[styles.sectionTitle, { color: Colors[theme].textPrimary }]}>Detalhes da Transação</Text>

                    <Row label={"Id da transação:"} value={data.transactionId} />

                    <Row label={"Categoria:"} value={data.category} />

                    <Row label={"Data de início:"} value={data.startDate} />

                    <Row label={"Data de vencimento:"} value={data.dueDate} />

                    <Row label={"Tipo:"} value={data.type} />

                    <Row label={"Parcela:"} value={`${data.entrieNumber} de ${data.totalEntries}`} />

                    <Row label={"Valor total:"} value={`R$ ${Number(data.totalValue).toFixed(2)}`} />

                    <Row label={"Descrição:"} value={data.description} />

                    {data.paymentType === 'concluded' && (<Text style={styles.sectionTitle}>Detalhes do pagamento</Text>)}

                    <Row label={"Pagamento:"} value={data.paymentType} />

                    <Row label={"Método de pagamento:"} value={data.paymentMethod} />

                    <Row label={"Banco:"} value={data.paymentBank} />

                    <Row label={"Cartão bancário:"} value={data.paymentBankCard} />

                    <Row label={"Data de pagamento:"} value={data.paymentDate} />

                    <Row label={"Valor da parcela:"} value={`R$ ${Number(data.value).toFixed(2)}`} />


                </View>
            </BottomSheet>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    header: { marginBottom: 20, borderBottomWidth: 1, paddingBottom: 10 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 }, subtitle: { fontSize: 12, color: "#666" },
    section: { marginBottom: 15 }, sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, color: "#333" },
    row: { flexDirection: "row", marginBottom: 5 }, label: { width: "40%", fontSize: 12, fontWeight: "bold" },
    value: { width: "60%", fontSize: 12 },
    footer: { marginTop: 30, fontSize: 10, textAlign: "center", color: "#999" }
});

export default FinanceReportScreen;
