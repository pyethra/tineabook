import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ResenhaCard from './ResenhaCard';

export default function ResenhasList({ resenhas, onToggleCurtida }) {
  return (
    <View style={styles.sessao}>
      <Text style={styles.tituloSessao}>Resenhas da galera</Text>
      <FlatList
        data={resenhas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ResenhaCard item={item} onToggleCurtida={onToggleCurtida} />
        )}
      />
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
});
