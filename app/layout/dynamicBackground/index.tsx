import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { useColorScheme, View } from "react-native";

export default function DynamicBackground({ children, styles }: { children: ReactNode, styles?: any }) {
  const systemTheme = useColorScheme();

  const theme: "light" | "dark" = systemTheme === "dark" ? "dark" : "light";

  return (
    <View
      style={{
        flex: 1,backgroundColor: Colors[theme].insetsBackgroundColor, ...styles
      }}
    >
      {children}
    </View>
  );
}
