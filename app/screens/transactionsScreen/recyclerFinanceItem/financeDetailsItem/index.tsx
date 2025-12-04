import { ThemeType } from "@/app/types/appearance";
import { MixedTransactionEntry, Transactions, UpdateEntryValues } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function FinanceDetailsItem({ data, theme, dynamicBorder, onPressingEditPayment, onPressingDelete, onPressingInfo }: {
    data: Partial<MixedTransactionEntry>; theme: ThemeType; dynamicBorder: { isFirst: boolean, isLast: boolean },
    onPressingDelete: (id: { transaction: string, entry: string }, values: { paymentType: string, value: number }) => void;
    onPressingInfo: (list: Transactions) => void; onPressingEditPayment: (id: { transaction: string, entry: string }, values: UpdateEntryValues) => void;
}) {
    const translateX = useRef(new Animated.Value(0)).current;
    const [isOpen, setIsOpen] = useState(false);

    const handlePress = () => {
        if (isOpen) {
            Animated.timing(translateX, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setIsOpen(false));
        } else {
            Animated.timing(translateX, { toValue: -155, duration: 300, useNativeDriver: true }).start(() => setIsOpen(true));
        }
    };

    const DynamicBorders = {
        borderTopStartRadius: (dynamicBorder.isFirst ? 10 : 0), borderTopEndRadius: (dynamicBorder.isFirst ? 10 : 0),
        borderBottomStartRadius: (dynamicBorder.isLast ? 10 : 0), borderBottomEndRadius: (dynamicBorder.isLast ? 10 : 0)
    };

    return (
        <Animated.View style={{ marginHorizontal: 10, backgroundColor: Colors[theme].surfaceVariant, ...DynamicBorders }}>
            <View style={styles.actionsContainer}>
                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingEditPayment(
                        { transaction: data.transactionId as string, entry: data.entrieId as string },
                        {
                            paymentType: data.paymentType as string, paymentDate: data.paymentDate as string,
                            paymentMethod: data.paymentMethod as string, paymentBank: data.paymentBank as string,
                            paymentBankCard: data.paymentBankCard as string
                        }
                    )}
                >
                    <MaterialIcons
                        name={data.paymentType === "pending" ? "check-circle" : "edit"}
                        color={Colors[theme].iconPrimary} size={24}
                    />
                </Pressable>

                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingDelete(
                        { transaction: data.transactionId as string, entry: data.entrieId as string },
                        { paymentType: data.paymentType as string, value: data.value as number })
                    }
                >
                    <MaterialIcons name="delete" size={24} color={Colors[theme].iconPrimary} />
                </Pressable>

                <Pressable
                    style={[styles.actionButton, { backgroundColor: "transparent" }]}
                    onPress={() => onPressingInfo(data as MixedTransactionEntry)}
                >
                    <MaterialIcons name="info" size={24} color={Colors[theme].iconPrimary} />
                </Pressable>
            </View>

            <Animated.View style={[styles.card, { backgroundColor: Colors[theme].surface, transform: [{ translateX }], ...DynamicBorders }]}>
                <Pressable onPress={handlePress} style={styles.cardContent}>
                    <View style={[styles.image, { backgroundColor: Colors[theme].iconBackgroundPrimary }]}>
                        <MaterialIcons
                            name={data.type === "income" ? "attach-money" : "money-off"}
                            size={16}
                            color={Colors[theme].iconContrast}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.text, { color: Colors[theme].textPrimary, fontSize: 16, fontWeight: "bold" }]}>
                            {data.type === 'income' ? 'Entrada' : 'Saída'} {data.paymentType === "concluded" ? "concluída" : "pendente"}
                        </Text>
                        <Text style={[styles.text, { color: Colors[theme].textSecondary }]}>{data.category}</Text>
                    </View>

                    <View style={[styles.textContainer, { alignItems: "flex-end" }]}>
                        <Text style={[styles.text, { color: Colors[theme].textPrimary, fontWeight: "bold" }]}>
                            R$ {data.value?.toFixed(2)}
                        </Text>
                    </View>

                    <MaterialIcons
                        name={isOpen ? "chevron-right" : "chevron-left"}
                        size={24}
                        color={Colors[theme].iconPrimary}
                    />
                </Pressable>
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    actionsContainer: { position: "absolute", right: 10, top: 0, bottom: 0, flexDirection: "row", alignItems: "center", zIndex: 0, gap: 8 },
    actionButton: { width: 40, height: 60, justifyContent: "center", alignItems: "center" },
    card: { borderWidth: 0.5, borderColor: 'transparent', padding: 10, zIndex: 2 }, text: { marginEnd: 2 },
    cardContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, textContainer: { width: "40%", backgroundColor: 'transparent' },
    image: { width: 30, height: 30, justifyContent: "center", alignItems: "center", borderWidth: 0.5, borderRadius: 5 }
});
