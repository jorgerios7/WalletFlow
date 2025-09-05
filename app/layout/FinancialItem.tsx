import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Payment, Transactions, Type } from "../types/Finance";

const paymentStatus = (currentPayment: string) => {
    return currentPayment === Payment.concluded ? 'Concluído' : 'Pendente'
};

const renderType = (currentType: string) => {
    if (currentType === Type.income) {
        return 'Entrada';
    } else if (currentType === Type.expense) {
        return 'Saída';
    } else {
        return 'Lucro';
    }
};


const renderImage = (type: string) => {
    if (type === Type.income) {
        return 'attach-money'
    } else if (type === Type.profit) {
        return 'trending-up'
    } else {
        return 'money-off'
    }
};

export default function FinancialItem(
    { item, onPress }
        :
        {
            item: Transactions,
            onPress: (selectedItem: Transactions) => void
        }
) {
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
                        <Text style={[defaultStyles.text, { fontSize: 16, fontWeight: 'bold' }]}>
                            {renderType(item.type)}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Categoria: {item.category}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Status: {paymentStatus(item.payment)}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Data: {item.startDate}
                        </Text>

                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={[defaultStyles.text, { fontWeight: 'bold' }]}>
                            R$ {item.totalValue.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

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
