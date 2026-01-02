import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

interface HeaderProps {
    theme: any;
    isDragHandleVisible: boolean;
    onClose: () => void;
}

const Header = React.memo(
    ({ theme, isDragHandleVisible, onClose }: HeaderProps) => {
        if (isDragHandleVisible) {
            return (
                <Pressable
                    style={[
                        styles.dragHandle,
                        { backgroundColor: theme.surfaceVariant },
                    ]}
                />
            );
        }

        return (
            <View
                style={[
                    styles.buttonReturnHeader,
                    {
                        backgroundColor: theme.background,
                        borderBottomColor: theme.border,
                    },
                ]}
            >
                <TouchableOpacity
                    style={[
                        styles.buttonReturn,
                        { backgroundColor: theme.background },
                    ]}
                    onPress={onClose}
                >
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={theme.iconPrimary}
                    />
                </TouchableOpacity>
            </View>
        );
    }
);

export default Header;

const styles = StyleSheet.create({
   
    dragHandle: {
        width: 100,
        height: 10,
        borderRadius: 4,
        alignSelf: 'center',
        marginVertical: 10,
    },
    buttonReturnHeader: {
        width: '100%',
        borderBottomWidth: 0.5,
        marginBottom: 10,
    },
    buttonReturn: {
        width: 40,
        height: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
});
