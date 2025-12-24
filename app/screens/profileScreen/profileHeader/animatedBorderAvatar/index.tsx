import { PreferencesContext } from "@/app/context/PreferencesProvider";
import { useUser } from "@/app/context/UserProvider";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef } from "react";
import { Animated, Image, Pressable, View } from "react-native";
import { styles } from "./styles";

const BORDER_COLORS = ["#A7C7E7", "blue", "orange", "red"];

export function AnimatedBorderAvatar({ onPressing }: { onPressing: () => void }) {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const { preferences } = useContext(PreferencesContext);
  const { profilePhotoUri, loadProfilePhoto } = useUser();

  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      const next = Math.floor(Math.random() * BORDER_COLORS.length);

      Animated.timing(colorAnim, {
        toValue: next,
        duration: 8000,
        useNativeDriver: false,
      }).start(() => {
        animate();
      });
    };

    animate();
  }, []);

  useEffect(() => {
    loadProfilePhoto();

  }, [profilePhotoUri]);

  const borderColor = colorAnim.interpolate({
    inputRange: BORDER_COLORS.map((_, i) => i),
    outputRange: BORDER_COLORS,
  });

  return (
    <AnimatedPressable
      onPress={onPressing}
      style={[
        styles.container,
        { borderColor: borderColor }
      ]}
    >
      <View
        style={styles.containerImage}
      >
        {profilePhotoUri ? (
          <Image
            source={{ uri: profilePhotoUri }}
            style={styles.image}
          />
        ) : (
          <MaterialIcons
            name="person"
            size={65}
            color={Colors[preferences.theme.appearance].iconPrimary}
          />
        )}
      </View>

    </AnimatedPressable>
  );
}
