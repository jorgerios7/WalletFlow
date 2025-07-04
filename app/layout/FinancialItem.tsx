import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Finance, { FinanceType, PaymentStatus } from "../types/Finance";

interface ItemRecyclerProps {
    item: Finance,
    onPress: (selectedItem: Finance) => void;
};

const typeStatus: Record<PaymentStatus, string> = {
  [PaymentStatus.Paid]: 'Concluído',
  [PaymentStatus.NotPaid]: 'Pendente',
};

const typeLabels: Record<FinanceType, string> = {
  [FinanceType.FINANCIAL_INCOME]: 'Entrada',
  [FinanceType.FINANCIAL_PROFIT]: 'Lucro',
  [FinanceType.FINANCIAL_PENDING]: 'Saída',
};

const renderImage = (type: number) => {
    if (type === 1) {
        return 'monetization-on'
    } else if (type === 2) {
        return 'trending-up'
    } else {
        return 'remove-circle'
    }
};

const FinancialItem: React.FC<ItemRecyclerProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={defaultStyles.container}
            onPress={() => onPress?.(item)}
        >
            <View style={defaultStyles.card}>
                <View style={defaultStyles.cardContent}>
                    <View style={defaultStyles.image}>
                        <MaterialIcons
                            name={renderImage(item.type)}
                            size={16}
                            color={Colors.light.background}
                        />
                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={[defaultStyles.text, {fontSize: 16 ,fontWeight: 'bold'}]}>
                            {typeLabels[item.type] ?? 'Invalid type'}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Categoria: {item.category}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Status: {typeStatus[item.isPaid] ?? 'Invalid type'}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Data: {item.startDate}
                        </Text>

                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={[defaultStyles.text, { fontWeight: 'bold' }]}>
                            R$ {item.value.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default FinancialItem;

const defaultStyles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    card: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 11,
        borderColor: Colors.light.shadow,
        borderWidth: 1,
    },
    cardContent: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        marginEnd: 10,
    },
    textContainer: {
        width: '40%',
    },
    image: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.light.shadow,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: Colors.light.highlightBackgroun_2,
    }
});
