import { Transactions } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const paymentStatus = (currentPayment: string) => {
    return currentPayment === "concluded" ? "Concluído" : "Pendente";
};

const renderType = (currentType: string) => {
    if (currentType === "income") return "Entrada";
    if (currentType === "expense") return "Saída";
    return "Lucro";
};

const renderImage = (type: string) => {
    if (type === "income") return "attach-money";
    if (type === "profit") return "trending-up";
    return "money-off";
};

export default function FinanceDetailsItem({ data, onPressingEditPayment, onPressingDelete, onPressingInfo }: {
    data: any; onPressingDelete: (id: string) => void; onPressingInfo: (selectedItem: Transactions) => void;
    onPressingEditPayment: (
        values: {
            transactionId: string, entryId: string, paymentType: string, paymentDate: string,
            paymentMethod: string, paymentBank: string, paymentBankCard: string
        }) => void;
}) {
    const translateX = useRef(new Animated.Value(0)).current;
    const [isOpen, setIsOpen] = useState(false);

    const handlePress = () => {
        if (isOpen) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsOpen(false));
        } else {
            Animated.timing(translateX, {
                toValue: -160,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsOpen(true));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.actionsContainer}>
                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingEditPayment(
                        {
                            transactionId: data.transactionId, entryId: data.entrieId, paymentType: data.payment,
                            paymentDate: data.paymentDate, paymentMethod: data.paymentMehod, paymentBank: data.paymentBank,
                            paymentBankCard: data.paymentBankCard
                        }
                    )}
                >
                    <MaterialIcons name="check-circle" size={24} color={Colors.light.highlightBackgroun_1} />
                </Pressable>

                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingDelete(data.entrieId)}
                >
                    <MaterialIcons name="delete" size={24} color={Colors.light.highlightBackgroun_1} />
                </Pressable>

                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingInfo(data)}
                >
                    <MaterialIcons name="info" size={24} color={Colors.light.highlightBackgroun_1} />
                </Pressable>
            </View>

            {/* Card animado */}
            <Animated.View style={[styles.card, { transform: [{ translateX }] }]}
            >
                <Pressable onPress={handlePress} style={styles.cardContent}>
                    <View style={styles.image}>
                        <MaterialIcons
                            name={renderImage(data.type)}
                            size={16}
                            color={Colors.light.background}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: "bold" }]}>
                            {renderType(data.type)}
                        </Text>
                        <Text style={styles.text}>Categoria: {data.category}</Text>
                        <Text style={styles.text}>Status: {paymentStatus(data.payment)}</Text>
                        <Text style={styles.text}>Data: {data.startDate}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>
                            R$ {data.value.toFixed(2)}
                        </Text>
                    </View>

                    <MaterialIcons
                        name={"chevron-right"}
                        size={24}
                        color={Colors.light.highlightBackgroun_1}
                    />
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    actionsContainer: {
        position: "absolute",
        right: 10,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 0,
        gap: 8,
    },
    actionButton: {
        width: 40,
        height: 60,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: Colors.light.background,
        borderRadius: 11,
        borderColor: Colors.light.shadow,
        borderWidth: 1,
        padding: 10,
        zIndex: 2,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.light.shadow,
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: Colors.light.highlightBackgroun_2,
    },
    textContainer: {
        width: "40%",
    },
    text: {
        marginEnd: 10,
    },
});
