import { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export default function useExpandableMenuAnimation(
  closedSize: number,
  menuWidth: number,
  menuHeight: number
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const AnimatedPressableButton = Animated.createAnimatedComponent(Pressable);

  // Menu size
  const menuWidthAnim = useRef(new Animated.Value(closedSize)).current;
  const menuHeightAnim = useRef(new Animated.Value(closedSize)).current;

  // Internal layout
  const contentGapAnim = useRef(new Animated.Value(0)).current;
  const userSectionWidthAnim = useRef(new Animated.Value(closedSize)).current;
  const mainContentHeightAnim = useRef(new Animated.Value(closedSize)).current;

  const profileButtonWidthAnim = useRef(new Animated.Value(closedSize)).current;
  const profileButtonHeightAnim = useRef(new Animated.Value(closedSize)).current;

  const smallIconSize = closedSize / 30;
  const profileIconScaleAnim = useRef(new Animated.Value(smallIconSize)).current;

  // Close button
  const closeButtonWidthAnim = useRef(new Animated.Value(0)).current;
  const closeButtonHeightAnim = useRef(new Animated.Value(0)).current;

  // Layout padding + background
  const menuPaddingAnim = useRef(new Animated.Value(0)).current;
  const backgroundOpacityAnim = useRef(new Animated.Value(0)).current;

  const contentOpacity = backgroundOpacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleMenu = (open: boolean) => {
    const target = {
      width: open ? menuWidth : closedSize,
      height: open ? menuHeight : closedSize,
      gap: open ? 20 : 0,
      userWidth: open ? menuWidth - 20 : closedSize,
      contentHeight: open ? 340 : closedSize,
      padding: open ? 10 : 0,
      profileBtn: open ? 160 : closedSize,
      iconScale: open ? 5 : smallIconSize,
      closeBtn: open ? 50 : 0,
      opacity: open ? 1 : 0,
    };

    const duration = {
      fade: open ? 500 : 40,
      expand: open ? 100 : 150,
    };

    Animated.parallel([
      Animated.timing(menuWidthAnim, { toValue: target.width, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(menuHeightAnim, { toValue: target.height, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(contentGapAnim, { toValue: target.gap, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(userSectionWidthAnim, { toValue: target.userWidth, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(mainContentHeightAnim, { toValue: target.contentHeight, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(profileButtonWidthAnim, { toValue: target.profileBtn, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(profileButtonHeightAnim, { toValue: target.profileBtn, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(profileIconScaleAnim, { toValue: target.iconScale, duration: duration.expand, useNativeDriver: true }),
      Animated.timing(closeButtonWidthAnim, { toValue: target.closeBtn, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(closeButtonHeightAnim, { toValue: target.closeBtn, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(menuPaddingAnim, { toValue: target.padding, duration: duration.expand, useNativeDriver: false }),
      Animated.timing(backgroundOpacityAnim, { toValue: target.opacity, duration: duration.fade, useNativeDriver: false }),
    ]).start(() => setIsExpanded(open));
  };

  return {
    AnimatedPressableButton,
    isExpanded,
    toggleMenu,
    contentOpacity,

    // exported animations
    menuWidthAnim,
    menuHeightAnim,
    contentGapAnim,
    userSectionWidthAnim,
    mainContentHeightAnim,
    profileButtonWidthAnim,
    profileButtonHeightAnim,
    profileIconScaleAnim,
    closeButtonWidthAnim,
    closeButtonHeightAnim,
    menuPaddingAnim,
    backgroundOpacityAnim,
  };
}
