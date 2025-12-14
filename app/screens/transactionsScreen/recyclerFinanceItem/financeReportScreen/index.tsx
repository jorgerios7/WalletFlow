import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { MixedTransactionEntry } from "@/app/types/Finance";
import { BottomSheet } from "@/components/ui/sheet/BottomSheet";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const FinanceReportScreen = ({ data, isVisible, onClose }: { data: MixedTransactionEntry, isVisible: boolean, onClose: () => void }) => {
    if (!data) return null;

    const { preferences } = useContext(PreferencesContext);

    function Row({ label, value }: { label: string, value?: string | number }) {
        if (value === undefined || value === null || value === '') return null;

        const dynamicTextStyle = {
            fontSize: Typography[preferences.fontSizeType].md.fontSize,
            lineHeight: Typography[preferences.fontSizeType].md.lineHeight
        };

        return (
            <View style={styles.row}>
                <Text style={[styles.label, dynamicTextStyle, { color: Colors[preferences.theme.appearance].textSecondary }]}>{label}</Text>
                <Text style={[styles.value, dynamicTextStyle, { color: Colors[preferences.theme.appearance].textSecondary }]}>{String(value)}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <BottomSheet
                visible={isVisible}
                isFullHeight={true}
                isDragHandleVisible={false}
                onClose={onClose}
            >
                <View style={[styles.header, { backgroundColor: Colors[preferences.theme.appearance].background }]}>
                    <Text style={[styles.title, { color: Colors[preferences.theme.appearance].textPrimary }]}>Relatório Financeiro</Text>
                    <Text style={[styles.subtitle, { color: Colors[preferences.theme.appearance].textSecondary }]}>Emitido em: {new Date().toLocaleDateString()}</Text>
                </View>

                <View style={[styles.section, { backgroundColor: Colors[preferences.theme.appearance].background }]}>
                    <Text style={[styles.sectionTitle, { color: Colors[preferences.theme.appearance].textPrimary }]}>Detalhes da Transação</Text>

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
