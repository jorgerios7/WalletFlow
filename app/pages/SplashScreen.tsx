import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PreferencesContext } from '../context/PreferencesProvider';

const SplashScreen = () => {
  const { preferences } = useContext(PreferencesContext);

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: Colors[preferences.theme.appearance].background, marginTop: insets.top, marginBottom: insets.bottom }]}>
      <Text style={{ color: Colors[preferences.theme.appearance].textContrast, fontSize: Typography[preferences.fontSizeType].md.fontSize }}>Bem vindo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });

export default SplashScreen;