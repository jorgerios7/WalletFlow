import { ThemeContext } from '@/components/ThemeProvider';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const { theme, fontSizeType } = useContext(ThemeContext);

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme.appearance].accent, marginTop: insets.top, marginBottom: insets.bottom }]}>
      <Text style={{ color: Colors[theme.appearance].textContrast, fontSize: Typography[fontSizeType].md.fontSize }}>Bem vindo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' } });

export default SplashScreen;