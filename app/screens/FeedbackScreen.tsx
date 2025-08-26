import Header from "@/components/ui/Header";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    isVisible?: boolean,
    onNavigate: (locate: string) => void
}

export function FeedbackScreen({
    onNavigate
}: Props) {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    return (
        <View style={{
            width: width,
            height: height,
            marginTop: insets.top,
            marginBottom: insets.bottom,
            backgroundColor: 'transparent',
            alignItems: 'center'
        }}>
            <Header>
                <Pressable
                    style={{ padding: 10 }}
                    onPress={() => onNavigate('Tabs')} >
                    <MaterialIcons name="chevron-left" size={32} color={Colors.light.highlightBackgroun_1} />
                </Pressable>
                <Text style={{ alignSelf: 'center', fontSize: 22 }}>Feedback</Text>
            </Header>
        </View>
    );
}