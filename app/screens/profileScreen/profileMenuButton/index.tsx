import ProfilePhotoUploader from '@/components/ui/ProfilePhotoUploader';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet
} from 'react-native';
import MenuAnimated from './MenuAnimated';
import useAnimation from './useAnimation';

interface Props {
  children?: React.ReactNode;
  collapseMenu: boolean;
  topPosition: number;
  rightPosition: number;
  closedSize: number;
  title: string;
  subtitle?: string;
  menuWidth: number;
  menuHeight: number;
  profilePhoto?: string;
}

const ProfileMenuButton: React.FC<Props> = ({
  topPosition,
  rightPosition,
  children,
  collapseMenu,
  closedSize,
  title,
  subtitle,
  menuWidth,
  menuHeight,
  profilePhoto
}) => {

  const {
    AnimatedPressable,
    expanded,
    animateMenu,
    contentOpacity,
    animatedMenuWidth,
    animatedMenuHeight,
    animatedGap,
    animatedMainContentHeight,
    animatedProfileButtonWidth,
    animatedProfileButtonHeight,
    animatedIconScale,
    animatedButtonCloseWidth,
    animatedButtonCloseHeight,
    animatedPadding,
  } = useAnimation(closedSize, menuWidth, menuHeight);

  const [showUploader, setShowUploader] = useState(false);

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

  const UserInformationContent = () => {
    return (
      <>
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

        <Animated.Text
          style={{
            alignSelf: 'center',
            fontSize: 14,
            color: Colors.light.background,
            fontWeight: 'normal',
            opacity: contentOpacity,
            marginTop: -10
          }}
        >
          {subtitle}
        </Animated.Text>
      </>
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
        <MenuAnimated
          dynamicStyle={dynamicProfileButtonStyle}
          animatedIconScale={animatedIconScale}
          profilePhoto={profilePhoto}
          onPress={openMenu}
        />
        <UserInformationContent />
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
      <Animated.View style={[styles.container, dynamicContainerStyle]}>
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
  mainContent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonClose: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
  }
});

export default ProfileMenuButton;