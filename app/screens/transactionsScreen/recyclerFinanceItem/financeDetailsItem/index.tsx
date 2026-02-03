import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { MixedTransactionEntry, Transactions, UpdateEntryProps } from "@/app/types/Finance";
import { Colors } from "@/constants/Colors";
import { Typography } from "@/constants/Typography";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
    data: Partial<MixedTransactionEntry>;
    dynamicBorder: { isFirst: boolean, isLast: boolean };
    onPressingDelete: (id: { transaction: string, entry: string }, values: { paymentType: string, value: number }) => void;
    onPressingInfo: (list: Transactions) => void;
    onPressingEditPayment: (id: { transaction: string, entry: string }, values: UpdateEntryProps) => void;
}

export default function FinanceDetailsItem({ data, dynamicBorder, onPressingEditPayment, onPressingDelete, onPressingInfo }: Props) {
    const { preferences } = useContext(PreferencesContext);

    const translateX = useRef(new Animated.Value(0)).current;

    const [isOpen, setIsOpen] = useState(false);

    const handlePress = () => {
        if (isOpen) {
            Animated.timing(
                translateX, {
                toValue: 0, duration: 300, useNativeDriver: true
            }).start(() => setIsOpen(false));
        } else {
            Animated.timing(
                translateX, {
                toValue: -155, duration: 300, useNativeDriver: true
            }).start(() => setIsOpen(true));
        }
    };

    const DynamicBorders = {
        borderTopStartRadius: (
            dynamicBorder.isFirst
                ? 10
                : 0
        ),
        borderTopEndRadius: (
            dynamicBorder.isFirst
                ? 10
                : 0
        ),
        borderBottomStartRadius: (
            dynamicBorder.isLast
                ? 10
                : 0
        ),
        borderBottomEndRadius: (
            dynamicBorder.isLast
                ? 10
                : 0
        )
    };

    return (
        <Animated.View
            style={{
                marginHorizontal: 10,
                backgroundColor: Colors[preferences.theme.appearance].surfaceVariant,
                ...DynamicBorders
            }}
        >
            <View
                style={styles.actionsContainer}
            >
                <Pressable
                    style={styles.actionButton}
                    onPress={() => onPressingEditPayment({
                        transaction: data.transactionId as string,
                        entry: data.entrieId as string
                    }, {
                        paymentType: data.paymentType as string,
                        paymentDate: data.paymentDate as string,
                        paymentMethod: data.paymentMethod as string,
                        paymentBank: data.paymentBank as string,
                        paymentBankCard: data.paymentBankCard as string, 
                        value: data.value as number
                    })}
                >
                    <MaterialIcons
                        name={
                            data.paymentType === "pending"
                                ? "check-circle"
                                : "edit"
                        }
                        color={Colors[preferences.theme.appearance].iconPrimary} size={24}
                    />
                </Pressable>

                <Pressable
                    style={styles.actionButton}
                    onPress={() => onPressingDelete({
                        transaction: data.transactionId as string,
                        entry: data.entrieId as string
                    }, {
                        paymentType: data.paymentType as string,
                        value: data.value as number
                    })}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors[preferences.theme.appearance].iconPrimary}
                    />
                </Pressable>

                <Pressable
                    style={styles.actionButton}
                    onPress={() => onPressingInfo(data as MixedTransactionEntry)}
                >
                    <MaterialIcons
                        name="info"
                        size={24}
                        color={Colors[preferences.theme.appearance].iconPrimary}
                    />
                </Pressable>
            </View>

            <Animated.View
                style={[
                    styles.card,
                    {
                        backgroundColor: Colors[preferences.theme.appearance].surface,
                        transform: [{ translateX }],
                        ...DynamicBorders
                    }
                ]}
            >
                <Pressable
                    onPress={handlePress}
                    style={styles.cardContent}
                >
                    <View
                        style={styles.image}
                    >
                        <View
                            style={{
                                width: 5,
                                height: 5,
                                borderRadius: 999,
                                backgroundColor:
                                    data.type === "income"
                                        ? Colors[preferences.theme.appearance].incomeColor
                                        : Colors[preferences.theme.appearance].expenseColor
                            }}
                        />
                    </View>

                    <View
                        style={styles.textContainer}
                    >
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontWeight: "400",
                                    color: Colors[preferences.theme.appearance].textPrimary, 
                                    fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                                    lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                                }
                            ]}
                        >
                            {
                                data.type === 'income'
                                    ? 'Entrada'
                                    : 'Saída'
                            } {
                                data.paymentType === "concluded"
                                    ? "concluída"
                                    : "pendente"
                            }
                        </Text>

                        <Text
                            style={[
                                styles.text,
                                {
                                    color: Colors[preferences.theme.appearance].textSecondary,
                                    fontSize: Typography[preferences.fontSizeType].xs.fontSize,
                                    lineHeight: Typography[preferences.fontSizeType].xs.lineHeight
                                }
                            ]}
                        >
                            {data.category}
                        </Text>

                    </View>

                    <View
                        style={[
                            styles.valueContainer,
                            { alignItems: "flex-end" }
                        ]}
                    >
                        <Text
                            style={[styles.text,
                            {
                                fontWeight: "400",
                                color: Colors[preferences.theme.appearance].textPrimary, 
                                fontSize: Typography[preferences.fontSizeType].sm.fontSize,
                                lineHeight: Typography[preferences.fontSizeType].sm.lineHeight
                            }
                            ]}
                        >
                            R$ {data.value?.toFixed(2)}
                        </Text>

                    </View>

                    <MaterialIcons
                        size={24}
                        color={Colors[preferences.theme.appearance].iconPrimary}
                        name={
                            isOpen
                                ? "chevron-right"
                                : "chevron-left"
                        }
                    />
                </Pressable>

            </Animated.View>

        </Animated.View>
    );
}