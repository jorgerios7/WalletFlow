import React from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import ProfilePhotoContainer from "./ProfilePhotoContainer";

interface Props {
  dynamicStyle: any;
  animatedIconScale: Animated.AnimatedInterpolation<string | number>;
  profilePhoto?: string;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MenuAnimated: React.FC<Props> = ({
  dynamicStyle,
  animatedIconScale,
  profilePhoto,
  onPress,
}) => {
  return (
    <AnimatedPressable onPress={onPress}>
      <Animated.View style={[styles.button, dynamicStyle]}>
        <ProfilePhotoContainer animatedIconScale={animatedIconScale} profilePhoto={profilePhoto} />
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    backgroundColor: "transparent",
  },
});

export default MenuAnimated;
