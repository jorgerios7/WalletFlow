import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';
import ProfilePhotoUploader from './ProfilePhotoUploader';

interface Props {
  children?: React.ReactNode;
  collapseMenu: boolean;
  topPosition: number;
  rightPosition: number;
  closedSize: number;
  title: string;
  menuWidth: number;
  menuHeight: number;
  profilePhoto?: string;
}

const FloatingMenuButton: React.FC<Props> = ({
  topPosition,
  rightPosition,
  children,
  collapseMenu,
  closedSize,
  title,
  menuWidth,
  menuHeight,
  profilePhoto
}) => {

  const [expanded, setExpanded] = useState(false);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const smallIconSize = (closedSize / 30);

  const animatedMenuWidth = useRef(new Animated.Value(closedSize)).current;
  const animatedMenuHeight = useRef(new Animated.Value(closedSize)).current;

  const animatedGap = useRef(new Animated.Value(0)).current;

  const animatedContainerUserWidth = useRef(new Animated.Value(closedSize)).current;
  const animatedMainContentHeight = useRef(new Animated.Value(closedSize)).current;

  const animatedProfileButtonWidth = useRef(new Animated.Value(closedSize)).current;
  const animatedProfileButtonHeight = useRef(new Animated.Value(closedSize)).current;

  const animatedIconScale = useRef(new Animated.Value(smallIconSize)).current;

  const animatedButtonCloseWidth = useRef(new Animated.Value(0)).current;
  const animatedButtonCloseHeight = useRef(new Animated.Value(0)).current;

  const animatedPadding = useRef(new Animated.Value(0)).current;
  const animatedBackground = useRef(new Animated.Value(0)).current;

  const [showUploader, setShowUploader] = useState(false);

  const contentOpacity = animatedBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const dynamicProfileButtonStyle = {
    width: animatedProfileButtonWidth,
    height: animatedProfileButtonHeight,
  };

  const dynamicContainerStyle = {
    top: topPosition,
    right: rightPosition,
    padding: animatedPadding,
    borderRadius: closedSize / 2,
    width: animatedMenuWidth,
    height: animatedMenuHeight,
  };

  const dynamicMainContentStyle = {
    height: animatedMainContentHeight,
    padding: animatedPadding,
    gap: animatedGap
  }

  const dynamicButtonCloseStyle = {
    width: animatedButtonCloseWidth,
    height: animatedButtonCloseHeight,
  }

  useEffect(() => {
    if (collapseMenu) { animateMenu(false) }
  }, [collapseMenu]);

  const openMenu = () => {
    if (expanded) {
      setShowUploader(true);

      return;
    }

    animateMenu(true);
  };

  const closeMenu = () => {
    if (!expanded) return;

    animateMenu(false);
  };

  const animateMenu = (open: boolean) => {
    const targetValues = {
      MENU_WIDTH: open ? menuWidth : closedSize,
      MENU_HEIGHT: open ? menuHeight : closedSize,
      GAP: open ? 30 : 0,
      MAIN_CONTENT_WIDTH: open ? menuWidth - 20 : closedSize,
      MAIN_CONTENT_HEIGHT: open ? 340 : closedSize,
      PADDING: open ? 10 : 0,
      PROFILE_BUTTON_WIDTH: open ? 160 : closedSize,
      PROFILE_BUTTON_HEIGHT: open ? 160 : closedSize,
      ICON_SCALE: open ? 5 : smallIconSize,
      BUTTON_CLOSE_WIDTH: open ? 50 : 0,
      BUTTON_CLOSE_HEIGHT: open ? 50 : 0,
      OPACITY: open ? 1 : 0,
    };

    const durationValues = {
      FADE: open ? 500 : 40,
      EXPAND: open ? 100 : 150
    };

    Animated.parallel([
      Animated.timing(animatedMenuWidth, {
        toValue: targetValues.MENU_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedMenuHeight, {
        toValue: targetValues.MENU_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedGap, {
        toValue: targetValues.GAP,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedContainerUserWidth, {
        toValue: targetValues.MAIN_CONTENT_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedMainContentHeight, {
        toValue: targetValues.MAIN_CONTENT_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedProfileButtonWidth, {
        toValue: targetValues.PROFILE_BUTTON_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedProfileButtonHeight, {
        toValue: targetValues.PROFILE_BUTTON_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedIconScale, {
        toValue: targetValues.ICON_SCALE,
        duration: durationValues.EXPAND,
        useNativeDriver: true,
      }),
      Animated.timing(animatedButtonCloseWidth, {
        toValue: targetValues.BUTTON_CLOSE_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedButtonCloseHeight, {
        toValue: targetValues.BUTTON_CLOSE_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedPadding, {
        toValue: targetValues.PADDING,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBackground, {
        toValue: targetValues.OPACITY,
        duration: durationValues.FADE,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setExpanded(open);
    });
  };

  const ProfilePhotoContent = () => {
    return (
      <Animated.View style={[
        styles.profilePhotoContent,
        { transform: [{ scale: animatedIconScale }] }
      ]}>
        {profilePhoto ? (
          <Image
            source={{
              uri: profilePhoto
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 999,
              resizeMode: 'cover'
            }}
          />
        ) : (
          <MaterialIcons name="person" size={28} color={Colors.light.highlightBackgroun_1} />
        )}
      </Animated.View>
    );
  }

  const ProfileButtonContent = () => {
    return (
      <AnimatedPressable onPress={openMenu}>
        <Animated.View style={[styles.button, dynamicProfileButtonStyle]}>
          <ProfilePhotoContent />
        </Animated.View>
      </AnimatedPressable>
    );
  };

  const ButtonClose = () => {
    return (
      <AnimatedPressable
        style={[
          styles.buttonClose,
          dynamicButtonCloseStyle,
          { opacity: contentOpacity }
        ]}
        onPress={closeMenu}>
        <MaterialIcons
          style={{ top: 10 }}
          name={'close'}
          size={28}
          color={'white'}
        />
      </AnimatedPressable>
    );
  };

  const UserNameContent = () => {
    return (
      <Animated.Text
        style={{
          alignSelf: 'center',
          fontSize: 26,
          color: Colors.light.background,
          fontWeight: 'bold',
          opacity: contentOpacity
        }}
      >
        {title}
      </Animated.Text>
    );
  }

  const MainContent = () => {
    return (
      <Animated.View
        style={[
          styles.mainContent,
          dynamicMainContentStyle
        ]}>
        <ButtonClose />
        <ProfileButtonContent />
        <UserNameContent />
      </Animated.View>
    );
  };

  const ChildrenContent = () => {
    return (
      <Animated.View style={{
        opacity: contentOpacity,
      }}>
        {showUploader && (
          <ProfilePhotoUploader
            onDismiss={() => setShowUploader(false)}
          />
        )}
        {expanded && (children)}
      </Animated.View>
    );
  }

  const MenuContent = () => {
    return (
      <Animated.View
        style={[styles.container, dynamicContainerStyle]}
      >
        <MainContent />
        <ChildrenContent />
      </Animated.View>
    );
  };

  return (<MenuContent />);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.highlightBackgroun_1,
    position: 'absolute',
    zIndex: 100,
    gap: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: 'transparent'
  },
  mainContent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
  },
  profilePhotoContent: {
    backgroundColor: Colors.light.background,
    borderRadius: 999,
  },
  buttonClose: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  }
});

export default FloatingMenuButton;