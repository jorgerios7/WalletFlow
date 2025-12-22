import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";

const BORDER_COLORS = ["#A7C7E7", "blue", "orange", "red"];

export function AnimatedBorderAvatar({ onPressing }: { onPressing: () => void }) {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const { preferences } = useContext(PreferencesContext);

  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let current = 0;

    const animate = () => {
      const next = Math.floor(Math.random() * BORDER_COLORS.length);

      Animated.timing(colorAnim, {
        toValue: next,
        duration: 8000,
        useNativeDriver: false,
      }).start(() => {
        current = next;
        animate();
      });
    };

    animate();
  }, []);

  const borderColor = colorAnim.interpolate({
    inputRange: BORDER_COLORS.map((_, i) => i),
    outputRange: BORDER_COLORS,
  });

  return (
    <AnimatedPressable
      onPress={onPressing}
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 74,
          height: 74,
          borderRadius: 37,
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <MaterialIcons name="person" size={65} color={Colors[preferences.theme.appearance].iconPrimary} />
      </View>
    </AnimatedPressable>
  );
}
