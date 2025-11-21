import { PersonalDataChange } from '@/app/types/User';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import AnimatedProfileButton from './animatedProfileButton';
import ProfilePhotoPickerModal from './profilePhotoPickerModal';
import TabButton from './TabButton';
import useExpandableMenuAnimation from './useExpandableMenuAnimation';

interface Props {
  collapseMenu: boolean; topPosition: number; rightPosition: number; profilePhoto?: string;
  closedSize: number; title: string; subtitle?: string; menuWidth: number; menuHeight: number;
  onEditingField: (value: PersonalDataChange) => void, onDataChange: (value: boolean) => void,
  onUpdating: (value: boolean) => void, onDismiss: (value: boolean) => void
}

const AnimatedProfileMenu: React.FC<Props> = ({
  topPosition, rightPosition, collapseMenu, closedSize, title, subtitle, menuWidth, menuHeight,
  profilePhoto, onEditingField, onDataChange, onUpdating, onDismiss
}) => {

  const {
    AnimatedPressableButton, isExpanded, toggleMenu, contentOpacity,

    menuWidthAnim, menuHeightAnim,

    contentGapAnim, userSectionWidthAnim, mainContentHeightAnim,

    profileButtonWidthAnim, profileButtonHeightAnim,

    profileIconScaleAnim,

    closeButtonWidthAnim, closeButtonHeightAnim,

    menuPaddingAnim,
  } = useExpandableMenuAnimation(closedSize, menuWidth, menuHeight);

  const [showUploader, setShowUploader] = useState(false);

  const dynamicProfileButtonStyle = { width: profileButtonWidthAnim, height: profileButtonHeightAnim };

  const dynamicContainerStyle = {
    top: topPosition, right: rightPosition, padding: menuPaddingAnim, borderRadius: closedSize / 2,
    width: menuWidthAnim, height: menuHeightAnim,
  };

  const dynamicMainContentStyle = {
    height: mainContentHeightAnim, padding: menuPaddingAnim, gap: contentGapAnim,
  };

  const dynamicButtonCloseStyle = { width: closeButtonWidthAnim, height: closeButtonHeightAnim };

  useEffect(() => {
    if (collapseMenu) toggleMenu(false);
  }, [collapseMenu]);

  const openMenu = () => {
    if (isExpanded) {
      setShowUploader(true);
      return;
    }
    toggleMenu(true);
  };

  const closeMenu = () => {
    if (!isExpanded) return;
    toggleMenu(false);
  };

  const ButtonClose = () => {
    return (
      <AnimatedPressableButton
        style={[styles.buttonClose, dynamicButtonCloseStyle, { opacity: contentOpacity }]}
        onPress={closeMenu}>
        <MaterialIcons
          style={{ top: 10 }}
          name={'close'}
          size={28}
          color={'white'}
        />
      </AnimatedPressableButton>
    );
  };

  const UserInformationContent = () => {
    return (
      <>
        <Animated.Text
          style={{
            alignSelf: 'center', fontSize: 26, color: Colors.light.background,
            fontWeight: 'bold', opacity: contentOpacity
          }}
        >
          {title}
        </Animated.Text>

        <Animated.Text
          style={{
            alignSelf: 'center', fontSize: 14, color: Colors.light.background,
            fontWeight: 'normal', opacity: contentOpacity, marginTop: -10
          }}
        >
          {subtitle}
        </Animated.Text>
      </>
    );
  };

  const MainContent = () => {
    return (
      <Animated.View
        style={[styles.mainContent, dynamicMainContentStyle]}>

        <ButtonClose />

        <AnimatedProfileButton
          dynamicStyle={dynamicProfileButtonStyle}
          animatedIconScale={profileIconScaleAnim}
          profilePhoto={profilePhoto}
          onPress={openMenu}
        />

        <UserInformationContent />

      </Animated.View>
    );
  };

  const ChildrenContent = () => {
    return (
      <Animated.View style={{ opacity: contentOpacity }}>
        {showUploader && (
          <ProfilePhotoPickerModal
            onDismiss={() => setShowUploader(false)}
          />
        )}
        {isExpanded && (
          <View style={{ width: '100%', gap: 5 }}>
            <TabButton
              text="Editar Nome"
              iconName="arrow-right"
              iconSize={24}
              fontSize={14}
              onPress={() => {
                onEditingField('ChangeName');
                onDataChange(true);
                onUpdating(true);
              }}
            />

            <TabButton
              text="Alterar Email"
              iconName="arrow-right"
              iconSize={24}
              fontSize={14}
              onPress={() => {
                onEditingField('ChangeEmail');
                onDataChange(true);
                onUpdating(true);
              }}
            />

            <TabButton
              text="Mudar Senha"
              iconName="arrow-right"
              iconSize={24}
              fontSize={14}
              onPress={() => {
                onEditingField('ChangePassword');
                onDataChange(true);
                onUpdating(true);
              }}
            />

            <TabButton
              onPress={() => onDismiss(true)}
              text="Sair"
              iconName="exit-to-app"
              iconSize={24}
              fontSize={14}
            />

            <TabButton
              onPress={() => onDismiss(false)}
              text="Excluir conta"
              isHighlightText
              fontSize={14}
              borderBottomColor="transparent"
            />
          </View>
        )}
      </Animated.View>
    );
  };

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

export default AnimatedProfileMenu;
