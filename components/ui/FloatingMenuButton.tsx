import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet
} from 'react-native';
import ProfilePhotoUploader from './ProfilePhotoUploader';

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  topPosition: number;
  rightPosition: number;
  buttonSize: number;
  buttonLabel: string;
  menuWidth: number;
  menuHeight: number;
  profilePhoto?: string;
}

const FloatingMenuButton: React.FC<Props> = ({
  topPosition,
  rightPosition,
  children,
  onPress,
  buttonSize,
  buttonLabel,
  menuWidth,
  menuHeight,
  profilePhoto
}) => {

  const [expanded, setExpanded] = useState(false);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const smallIconSize = buttonSize / 30;

  const animatedMenuWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedMenuHeight = useRef(new Animated.Value(buttonSize)).current;

  const animatedContainerUserWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedMainContentHeight = useRef(new Animated.Value(buttonSize)).current;

  const animatedProfilePhotoWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedProfilePhotoHeight = useRef(new Animated.Value(buttonSize)).current;
  const animatedIconScale = useRef(new Animated.Value(smallIconSize)).current;

  const animatedHeaderWidth = useRef(new Animated.Value(0)).current;
  const animatedHeaderHeight = useRef(new Animated.Value(0)).current;

  const animatedPadding = useRef(new Animated.Value(0)).current;
  const animatedBackground = useRef(new Animated.Value(0)).current;

  const panY = useRef(new Animated.Value(0)).current;

  const [showUploader, setShowUploader] = useState(false);

  const contentOpacity = animatedBackground.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const dynamicButtonStyle = {
    width: animatedProfilePhotoWidth,
    height: animatedProfilePhotoHeight,
  };

  const dynamicContainerStyle = {
    top: topPosition,
    right: rightPosition,
    padding: animatedPadding,
    backgroundColor: Colors.light.highlightBackgroun_1,
    borderRadius: buttonSize / 2,
    width: animatedMenuWidth,
    height: animatedMenuHeight,
  };

  const dynamicMainContentStyle = {
    height: animatedMainContentHeight,
    borderRadius: buttonSize,
    padding: animatedPadding
  }

  const dynamicContainerHeaderStyle = {
    width: animatedHeaderWidth,
    height: animatedHeaderHeight,
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => expanded,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Só ativa se for um movimento vertical para cima
        return gestureState.dy < -5 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: Animated.event(
        [null, { dy: panY }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50 && gestureState.vy < -0.5) {
          // Se o gesto foi rápido o suficiente para cima
          Animated.timing(panY, {
            toValue: -100,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            animateMenu(false);
            panY.setValue(0);
          });
        } else {
          // Retorna à posição original
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

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
      MENU_WIDTH: open ? menuWidth : buttonSize,
      MENU_HEIGHT: open ? menuHeight : buttonSize,
      MAIN_CONTENT_WIDTH: open ? menuWidth - 20 : buttonSize,
      MAIN_CONTENT_HEIGHT: open ? 350 : buttonSize,
      PADDING: open ? 10 : 0,
      PROFILE_PHOTO_WIDTH: open ? 200 : buttonSize,
      PROFILE_PHOTO_HEIGHT: open ? 200 : buttonSize,
      ICON_SCALE: open ? 5 : smallIconSize,
      HEADER_WIDTH: open ? menuWidth - 40 : 0,
      HEADER_HEIGHT: open ? 80 : 0,
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
      Animated.timing(animatedProfilePhotoWidth, {
        toValue: targetValues.PROFILE_PHOTO_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedProfilePhotoHeight, {
        toValue: targetValues.PROFILE_PHOTO_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedIconScale, {
        toValue: targetValues.ICON_SCALE,
        duration: durationValues.EXPAND,
        useNativeDriver: true,
      }),
      Animated.timing(animatedHeaderWidth, {
        toValue: targetValues.HEADER_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedHeaderHeight, {
        toValue: targetValues.HEADER_HEIGHT,
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
        {!profilePhoto ? (
          <Image
            source={{
              //uri: profilePhoto
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

  const ButtonContent = () => {
    return (
      <AnimatedPressable onPress={openMenu}>
        <Animated.View style={[styles.button, dynamicButtonStyle]}>
          <ProfilePhotoContent />
        </Animated.View>
      </AnimatedPressable>
    );
  };

  const ButtonClose = () => {
    return (
      <Pressable
        style={styles.buttonClose}
        onPress={closeMenu}>
        <MaterialIcons
          name={'close'}
          size={28}
          color={'white'}
        />
      </Pressable>
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
        {buttonLabel}
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
        <HeaderContent />
        <ButtonContent />
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
        {children}
      </Animated.View>
    );
  }

  const HeaderContent = () => {
    return (
      <Animated.View style={[
        styles.containerHeader,
        dynamicContainerHeaderStyle,
        { opacity: contentOpacity }
      ]}>
        <ButtonClose />
      </Animated.View>
    );
  }

  const MenuContent = () => {
    return (
      <Animated.View style={[styles.container, dynamicContainerStyle]}
        {...panResponder.panHandlers}
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
    position: 'absolute',
    zIndex: 100,
    gap: 10,
  },
  containerHeader: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 999,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 16,
    flexShrink: 1,
    flexWrap: 'nowrap',
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
    padding: 15,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    margin: 10,
    borderRadius: 20
  }
});

export default FloatingMenuButton;