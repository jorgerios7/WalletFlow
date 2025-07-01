import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Finance from "../types/Finance";

interface ItemRecyclerProps {
    item: Finance,
    onPress: (selectedItem: Finance) => void;
}

const renderStatus = (status: boolean) => {
    return status ? 'Concluído' : 'Pendente';
};

const renderIsIncome = (y: boolean) => {
    return y ? 'Receita Financeira' : 'Pendência Financeira';
};

const renderImage = (isIncome: boolean) => {
    return isIncome ? 'add' : 'remove';
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
                            name={renderImage(item.isIncome)}
                            size={16}
                            color={Colors.light.background}
                        />
                    </View>

                    <View style={defaultStyles.textContainer}>
                        <Text style={defaultStyles.text}>
                            {renderIsIncome(item.isIncome)}
                        </Text>
                        <Text style={defaultStyles.text}>
                            Status: {renderStatus(item.isPaid)}
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
        width: '35%',
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
