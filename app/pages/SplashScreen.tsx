import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <Text>Bem vindo!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default SplashScreen;