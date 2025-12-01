import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

const MenuTabButton: React.FC<{
    onPress: () => void;
    name: string;
    iconName: keyof typeof MaterialIcons.glyphMap;
    iconSize?: number
}> = ({ onPress, name, iconName, iconSize }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                width: '100%',
                height: 50,
                gap: 20,
                backgroundColor: Colors.light.surface,
                flexDirection: 'row',
                padding: 10,
                borderBottomColor: Colors.light.border,
                borderBottomWidth: 0.5,
            }}>

            <MaterialIcons
                name={iconName}
                size={iconSize ? iconSize : 28}
                color={Colors.light.primary}
            />

            <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: 'bold' }}>
                {name}
            </Text>
        </Pressable>
    );
}

export default MenuTabButton;