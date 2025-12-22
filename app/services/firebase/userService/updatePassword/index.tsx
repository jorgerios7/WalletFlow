import { auth } from "@/app/config/firebaseConfig";
import { UpdatePasswordProps } from "@/app/types/User";
import { HandleErroMessage } from "@/components/ui/HandleErroMessage";
import ValidateEmptyFields from "@/components/ValidateEmptyFields";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Alert } from "react-native";

export default async function UpdatePassword(value: UpdatePasswordProps) {
  const user = auth.currentUser;
  if (!user || !user.email) return;

  const inputs = { cPassword: value.currentPassword, nPassword: value.newPassword, rNewPassword: value.repeatNewPassword }
  const labels = { cPassword: 'senha atual', nPassword: 'nova senha', rNewPassword: 'repetir nova senha' }

  const isEmpty = !value.currentPassword || !value.newPassword || !value.repeatNewPassword;
  const isNotTheSame = value.newPassword !== value.repeatNewPassword;

  if (isEmpty) {
    const msg = ValidateEmptyFields(inputs, labels);
    if (msg) {
      Alert.alert("Erro", msg);
      throw new Error(msg);
    }
    return;
  } else if (isNotTheSame) {
    const msg = `As senhas não coicidem. Certifique-se de que os campos nova senha e repetir senha sejam iguais.`
    Alert.alert('Erro', msg);
    throw new Error(msg);
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email, value.currentPassword
    );

    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, value.newPassword);

    Alert.alert("Sucesso", "Senha atualizada.");
  } catch (error: any) {
    const msg = HandleErroMessage(error.code);
    Alert.alert("Erro", msg);
    throw error;
  }
}