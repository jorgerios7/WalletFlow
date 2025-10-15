import { Transactions } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const paymentStatus = (currentPayment: string) => { return currentPayment === 'concluded' ? 'Concluído' : 'Pendente' };

const renderType = (currentType: string) => {
    if (currentType === 'income') {
        return 'Entrada';
    } else if (currentType === 'expense') {
        return 'Saída';
    } else {
        return 'Lucro';
    }
};

const renderImage = (type: string) => {
    if (type === 'income') {
        return 'attach-money'
    } else if (type === 'profit') {
        return 'trending-up'
    } else {
        return 'money-off'
    }
};

export default function FinanceDetailsItem(
    { data, onPress }:
        { data: any, onPress: (selectedItem: Transactions) => void }
) {
    return (
        <TouchableOpacity
            style={defaultStyles.container}
            onPress={() => onPress(data)}
        >
            <View style={defaultStyles.card}>
                <View style={defaultStyles.cardContent}>
                    <View style={defaultStyles.image}>
                        <MaterialIcons
                            name={renderImage(data.type)}
                            size={16}
                            color={Colors.light.background}
                        />
                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={[defaultStyles.text, { fontSize: 16, fontWeight: 'bold' }]}>
                            {renderType(data.type)}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Categoria: {data.category}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Status: {paymentStatus(data.payment)}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Data: {data.startDate}
                        </Text>
                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={[defaultStyles.text, { fontWeight: 'bold' }]}>
                            R$ {data.value.toFixed(2)}
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
