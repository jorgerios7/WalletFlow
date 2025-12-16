import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { FontSizeLevel } from "@/app/types/preferences";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";

interface Props { value: FontSizeLevel; onChange: (value: FontSizeLevel) => void }

export default function FontSizeSelector({ value, onChange }: Props) {
    const { preferences } = useContext(PreferencesContext);

    return (
        <View style={styles.container}>
            <View style={styles.sliderRow}>
                <MaterialIcons
                    name="text-fields"
                    size={20}
                    color={Colors[preferences.theme.appearance].iconPrimary}
                />

                <View style={{ flex: 1, paddingVertical: 5 }}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={2}
                        step={1}
                        value={value}
                        onValueChange={(v) => onChange(v as FontSizeLevel)}
                        minimumTrackTintColor={Colors[preferences.theme.appearance].accent}
                        maximumTrackTintColor={Colors[preferences.theme.appearance].border}
                        thumbTintColor={Colors[preferences.theme.appearance].accent}
                    />

                    <View style={styles.dotsRow}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot, { backgroundColor: Colors[preferences.theme.appearance].border },
                                    index <= value && [styles.dotActive, {backgroundColor: Colors[preferences.theme.appearance].accent}]
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <MaterialIcons
                    name="text-fields"
                    size={28}
                    color={Colors[preferences.theme.appearance].iconPrimary}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    sliderRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    slider: {
        flex: 1,
        marginHorizontal: 10
    },
    dotsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginHorizontal: 24
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        opacity: 0.4,
    },
    dotActive: {
        opacity: 1
    },
});

