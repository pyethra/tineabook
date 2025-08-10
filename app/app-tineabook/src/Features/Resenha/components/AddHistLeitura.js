// src/components/AddHistLeitura.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AddHistLeitura({ onPress }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>+ Adicionar Histórico de Leitura</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  texto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
