import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Text, View } from "react-native";

const InfoCard = ({ icon, label }: { icon: any; label: string }) => {
    const { preferences } = useContext(PreferencesContext);
    const theme = Colors[preferences.theme.appearance];
    const isDark = preferences.theme.appearance === "dark";

    return (
        <View
            style={{
                width: "30%",
                height: 80,
                borderRadius: 20,

                // vidro simples
                backgroundColor: isDark
                    ? "rgba(186, 186, 187, 0.08)"
                    : "rgba(160, 160, 162, 0.27)",

                // borda sutil
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.3)",

                // conteúdo
                alignItems: "center",
                justifyContent: "center",
                gap: 5,

                // elevação / sombra
                elevation: 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            }}
        >
            <MaterialIcons name={icon} size={30} color={theme.iconPrimary} />
            <Text style={{ color: theme.textPrimary, fontWeight: "500" }}>
                {label}
            </Text>
        </View>
    );
};

export default InfoCard;
