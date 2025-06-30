import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FinancialItem {
    uniqueId: string;
    category: string;
    dueDate: string;
    filterDueDate: string;
    filterStartDate: string;
    packageID: string;
    startDate: string;
    isPaid: boolean;
    studentName: string;
    isIncome: boolean;
    value: number;
}

interface ItemRecyclerProps {
    item: FinancialItem
    itemWidth: number,
    height: number,
}

const renderStatus = (status: boolean) => {
    return status ? 'Concluído' : 'Pendente';
}

const renderIsIncome = (y: boolean) => {
    return y ? 'Receita Financeira' : 'Pendência Financeira';
}

enum MarginScreen {
    MARGIN_HORIZONTAL = 40
}

const FinancialItem: React.FC<ItemRecyclerProps> = ({ item, itemWidth, height }) => {
    const isWeb = Platform.OS === "web";
    const dynamicWidth = isWeb ? itemWidth - 150 : itemWidth;

    return (
        <TouchableOpacity>
            <View style={[defaultStyles.card, { width: dynamicWidth, maxWidth: dynamicWidth - MarginScreen.MARGIN_HORIZONTAL }]}>

                <Text><Text style={defaultStyles.bold}>Estudante:</Text> {item.studentName}</Text>
                <Text><Text style={defaultStyles.bold}>Tipo:</Text> {renderIsIncome(item.isIncome)}</Text>
                <Text><Text style={defaultStyles.bold}>Categoria:</Text> {item.category}</Text>
                <Text><Text style={defaultStyles.bold}>Valor:</Text> R$ {item.value.toFixed(2)}</Text>
                <Text><Text style={defaultStyles.bold}>Status:</Text> {renderStatus(item.isPaid)}</Text>
                <Text><Text style={defaultStyles.bold}>Vencimento:</Text> {item.dueDate}</Text>

            </View>
        </TouchableOpacity>
    );
};

export default FinancialItem;

const defaultStyles = StyleSheet.create({

    card: {
        alignSelf: 'center',
        backgroundColor: Colors.light.background,
        padding: 16,
        marginBottom: 12,
        borderColor: Colors.light.shadow,
        borderWidth: 1
    },
    bold: {
        fontWeight: 'bold',
    },
});