import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AddScreen = () => (
  <View style={styles.container}>
    <Text>Add New Item</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AddScreen;