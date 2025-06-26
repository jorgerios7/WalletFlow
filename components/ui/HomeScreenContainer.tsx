import { Colors } from "@/constants/Colors";
import { StyleSheet, View, ViewProps } from "react-native";

interface HomeScreenContainerProps extends ViewProps {
  children?: React.ReactNode;
}

export default function HomeScreenContainer({ children, style, ...props }: HomeScreenContainerProps) {
  return (
    <View
      style={[styles.screen, style]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
    width: '100%', // Garante largura total
    height: '100%', // Garante altura total
    top: 0,
    left: 0,
  },
});
