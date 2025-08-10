import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Sinopse({ texto }) { //tela responsável apenas o texto da sinopse.
  return (
    <View style={styles.sessao}>
      <Text style={styles.tituloSessao}>Sinopse</Text>
      <Text style={styles.sinopse}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sessao: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  tituloSessao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
