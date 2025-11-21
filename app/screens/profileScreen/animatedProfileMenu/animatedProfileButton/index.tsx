import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, Image, Pressable, StyleSheet } from "react-native";

interface Props {
  dynamicStyle: any; animatedIconScale: Animated.AnimatedInterpolation<string | number>;
  profilePhoto?: string; onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedProfileButton: React.FC<Props> = ({ dynamicStyle, animatedIconScale, profilePhoto, onPress }) => {
  return (
    <AnimatedPressable onPress={onPress}>
      <Animated.View style={[styles.button, dynamicStyle]}>
        <Animated.View style={[styles.profilePhotoContent, { transform: [{ scale: animatedIconScale }] }]}>
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 999,
                resizeMode: "cover",
              }}
            />
          ) : (
            <Feather style={{ padding: 3.8 }} name="user" color={Colors.light.highlightBackgroun_1} size={20} />

            //<MaterialIcons name="person" size={28} color={Colors.light.highlightBackgroun_1} />
          )}
        </Animated.View>
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: { justifyContent: "center", alignItems: "center", elevation: 6, backgroundColor: "transparent" },
  profilePhotoContent: { backgroundColor: Colors.light.background, borderRadius: 999 }
});

export default AnimatedProfileButton;
