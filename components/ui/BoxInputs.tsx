import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ViewProps, useWindowDimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import TransitionView from "./TransitionView";

interface BoxInputsProps extends ViewProps {
  children: React.ReactNode;
}

export default function BoxInputs({ children, style, ...props }: BoxInputsProps) {
  const { width } = useWindowDimensions();

  const dynamicStyle = {
    width: width - 50,
    alignSelf: "center" as const,
  };

  return (
    <ThemedView darkColor="white" lightColor="black" style={styles.wrapper}>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <TransitionView
          style={StyleSheet.flatten([styles.content, dynamicStyle, style])}
          {...props}
        >
          {children}
        </TransitionView>
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "stretch",
  },
});
