import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader({ mensagem }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6A1B9A" />
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  texto: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
});
