import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet
} from 'react-native';

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  topPosition: number;
  rightPosition: number;
  buttonSize: number;
  buttonLabel: string;
  menuWidth: number
  menuHeight: number
}

const FloatingMenuButton: React.FC<Props> = ({
  topPosition,
  rightPosition,
  children,
  onPress,
  buttonSize,
  buttonLabel,
  menuWidth,
  menuHeight
}) => {

  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const smallIconSize = buttonSize / 30;

  const animatedMenuWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedMenuHeight = useRef(new Animated.Value(buttonSize)).current;

  const animatedContainerUserWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedContainerUserHeight = useRef(new Animated.Value(buttonSize)).current;

  const animatedProfilePhotoWidth = useRef(new Animated.Value(buttonSize)).current;
  const animatedProfilePhotoHeight = useRef(new Animated.Value(buttonSize)).current;
  const animatedIconScale = useRef(new Animated.Value(smallIconSize)).current;

  const animatedContainerHeaderWidth = useRef(new Animated.Value(0)).current;
  const animatedContainerHeaderHeight = useRef(new Animated.Value(0)).current;

  const animatedContainerPadding = useRef(new Animated.Value(0)).current;
  const animatedBackground = useRef(new Animated.Value(0)).current;

  const panY = useRef(new Animated.Value(0)).current;

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
    padding: animatedContainerPadding,
    backgroundColor: Colors.light.highlightBackgroun_1,
    borderRadius: buttonSize / 2,
    width: animatedMenuWidth,
    height: animatedMenuHeight,
  };

  const dynamicProfilePhotoContainerStyle = {
    height: animatedContainerUserHeight,
    borderRadius: buttonSize,
    padding: animatedContainerPadding
  }

  const dynamicContainerHeaderStyle = {
    width: animatedContainerHeaderWidth,
    height: animatedContainerHeaderHeight,
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
            toggleExpanded();
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

  const toggleExpanded = () => {
    const targetValues = {
      MENU_WIDTH: expanded ? buttonSize : menuWidth,
      MENU_HEIGHT: expanded ? buttonSize : menuHeight,
      CONTAINER_USER_WIDTH: expanded ? buttonSize : menuWidth - 20,
      CONTAINER_USER_HEIGHT: expanded ? buttonSize : 350,
      CONTAINER_PADDING: expanded ? 0 : 10,
      PROFILE_PHOTO_WIDTH: expanded ? buttonSize : 200,
      PROFILE_PHOTO_HEIGHT: expanded ? buttonSize : 200,
      ICON_SCALE: expanded ? smallIconSize : 5,
      CONTAINER_HEADER_WIDTH: expanded ? 0 : menuWidth - 40,
      CONTAINER_HEADER_HEIGHT: expanded ? 0 : 80,
      OPACITY: expanded ? 0 : 1,
    };

    const durationValues = {
      FADE: expanded ? 40 : 500,
      EXPAND: expanded ? 150 : 100
    }

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
        toValue: targetValues.CONTAINER_USER_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedContainerUserHeight, {
        toValue: targetValues.CONTAINER_USER_HEIGHT,
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
      Animated.timing(animatedContainerHeaderWidth, {
        toValue: targetValues.CONTAINER_HEADER_WIDTH,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedContainerHeaderHeight, {
        toValue: targetValues.CONTAINER_HEADER_HEIGHT,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedContainerPadding, {
        toValue: targetValues.CONTAINER_PADDING,
        duration: durationValues.EXPAND,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBackground, {
        toValue: targetValues.OPACITY,
        duration: durationValues.FADE,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setExpanded(!expanded);

    });
  };

  const ButtonContent = () => {
    return (
      <AnimatedPressable onPress={toggleExpanded}>
        <Animated.View style={[styles.button, dynamicButtonStyle]}>
          <Animated.View style={[
            styles.profilePhotoContent,
            { transform: [{ scale: animatedIconScale }] }]}>
            <MaterialIcons name="person" size={28} color={Colors.light.highlightBackgroun_1} />
          </Animated.View>
        </Animated.View>
      </AnimatedPressable>
    );
  }

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

  const ProfilePhotoContainer = () => {
    return (
      <Animated.View
        style={[
          styles.profilePhotoContainer,
          dynamicProfilePhotoContainerStyle
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
        {children}
      </Animated.View>
    );
  }

  const ButtonClose = () => {
    return (
      <Pressable
        style={styles.buttonClose}
        onPress={toggleExpanded}>
        <MaterialIcons
          name={'close'}
          size={28}
          color={'white'}
        />
      </Pressable>
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
        <ProfilePhotoContainer />
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
  profilePhotoContainer: {
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