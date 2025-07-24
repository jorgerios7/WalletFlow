import { db, storage } from '@/app/config/firebaseConfig';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Alert, Image, Modal, View } from 'react-native';
import CustomButton from './CustomButton';
import TextButton from './TextButton';

interface Props { onDismiss?: () => void }

const ProfilePhotoUploader: React.FC<Props> = ({ onDismiss }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      handleUpload(result.assets[0].uri);
    }
  };

  const handleUpload = async (uri: string) => {
    try {
      const uid = getAuth().currentUser?.uid;
      if (!uid) throw new Error('Usuário não autenticado');

      setUploading(true);

      const response = await fetch(uri);
      const blob = await response.blob();

      const fileRef = ref(storage, `users/${uid}/profile.jpg`);
      await uploadBytes(fileRef, blob);

      const downloadURL = await getDownloadURL(fileRef);
      await saveUserProfile(uid, downloadURL);

      Alert.alert('Sucesso', 'Foto enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Não foi possível fazer o upload da imagem.');
    } finally {
      setUploading(false);
    }
  };

  const saveUserProfile = async (uid: string, photoURL: string) => {
    const userRef = doc(db, 'users', uid);

    const data = {
      identification: {
        profilePhoto: photoURL,
      },
    };

    await setDoc(userRef, data, { merge: true });
  };

  return (
    <Modal visible={true} animationType="fade">
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: 300,
          padding: 20,
          borderRadius: 20,
          backgroundColor: Colors.light.background,
          alignItems: 'center',
          gap: 20
        }}>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          )}

          <CustomButton
            text={uploading ? 'Enviando...' : 'Selecionar nova foto de perfil'}
            onPress={() => !uploading ? pickImage() : null}
          />

          <TextButton
            text={'Cancelar'}
            onPress={onDismiss}
          />
        </View>
      </View>
    </Modal>

  );
};

export default ProfilePhotoUploader;

