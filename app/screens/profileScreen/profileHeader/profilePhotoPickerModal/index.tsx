import { PreferencesContext } from '@/app/context/PreferencesProvider';
import { useUser } from '@/app/context/UserProvider';
import { STORAGE_KEYS } from '@/app/storage/keys';
import CustomButton from '@/components/ui/CustomButton';
import TextButton from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Image, Modal, View } from 'react-native';
import { styles } from './styles';

interface Props {
  isVisible: boolean;
  onDismiss?: () => void;
}

const ProfilePhotoPickerModal: React.FC<Props> = ({ isVisible, onDismiss }) => {
  const { preferences } = useContext(PreferencesContext);
  const { profilePhotoUri, userId, loadProfilePhoto } = useUser();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function persistProfilePhoto(uri: string) {
    if (!userId) return;

    const { PROFILE_PHOTO_KEY } = STORAGE_KEYS(userId);
    await AsyncStorage.setItem(PROFILE_PHOTO_KEY, uri);
  }

  useEffect(() => {
    setImageUri(profilePhotoUri);
    loadProfilePhoto();
  }, [isVisible]);

  const pickImage = useCallback(async () => {
    if (loading) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permissão negada',
        'É necessário permitir o acesso à galeria.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.length) return;

    try {
      setLoading(true);

      const uri = result.assets[0].uri;
      await persistProfilePhoto(uri);

      setImageUri(uri);
      Alert.alert('Sucesso', 'Foto de perfil atualizada!');
      onDismiss?.();
    } catch (error) {
      console.error('[ProfilePhoto]', error);
      Alert.alert('Erro', 'Não foi possível salvar a foto.');
    } finally {
      setLoading(false);
    }
  }, [loading, onDismiss]);

  const themeColors = Colors[preferences.theme.appearance];

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View
          style={[
            styles.container,
            { backgroundColor: themeColors.surfaceVariant },
          ]}
        >
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}

          <CustomButton
            text={loading ? 'Salvando...' : 'Selecionar nova foto'}
            onPress={pickImage}
          />

          <TextButton
            text="Cancelar"
            onPress={onDismiss}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePhotoPickerModal;
