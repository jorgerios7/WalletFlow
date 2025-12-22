import { db, storage } from '@/app/config/firebaseConfig';
import { PreferencesContext } from '@/app/context/PreferencesProvider';
import CustomButton from '@/components/ui/CustomButton';
import TextButton from '@/components/ui/TextButton';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useContext, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, View } from 'react-native';

interface Props {
  isVisible: boolean;
  onDismiss?: () => void;
}

const ProfilePhotoPickerModal: React.FC<Props> = ({ isVisible, onDismiss }) => {
  const { preferences } = useContext(PreferencesContext);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = useCallback(async () => {
    if (uploading) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permissão negada',
        'É necessário permitir o acesso à galeria para selecionar uma imagem.'
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

    const uri = result.assets[0].uri;
    setImageUri(uri);
    await uploadProfilePhoto(uri);
  }, [uploading]);

  const uploadProfilePhoto = useCallback(async (uri: string) => {
    const uid = getAuth().currentUser?.uid;
    if (!uid) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      setUploading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const fileRef = ref(storage, `users/${uid}/profile.jpg`);
      await uploadBytes(fileRef, blob);

      const downloadURL = await getDownloadURL(fileRef);
      await saveUserProfile(uid, downloadURL);

      Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
      onDismiss?.();
    } catch (error) {
      console.error('[ProfilePhotoUpload]', error);
      Alert.alert(
        'Erro',
        'Não foi possível enviar a imagem. Tente novamente.'
      );
    } finally {
      setUploading(false);
    }
  }, [onDismiss]);

  const saveUserProfile = async (uid: string, photoURL: string) => {
    const userRef = doc(db, 'users', uid);

    await setDoc(
      userRef,
      {
        identification: {
          profilePhoto: photoURL,
        },
      },
      { merge: true }
    );
  };

  const themeColors = Colors[preferences.theme.appearance];

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: Colors[preferences.theme.appearance].surfaceVariant }]}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
            />
          )}

          <CustomButton
            text={uploading ? 'Enviando...' : 'Selecionar nova foto'}
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
