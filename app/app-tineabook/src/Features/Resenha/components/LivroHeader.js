import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LivroHeader({ livro }) { //tela responsável por por exibir capa, título, autor e gênero.
  return (
    <View style={styles.cabecalho}>
      <Image source={{ uri: livro.capa }} style={styles.capa} />
      <View style={styles.info}>
        <Text style={styles.titulo}>{livro.titulo}</Text>
        <Text style={styles.autor}>
          Autor: <Text style={styles.nomeAutor}>{livro.autor}</Text>
        </Text>
        <Text style={styles.genero}>Gênero: {livro.generos.join(', ')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    padding: 12,
  },
  capa: {
    width: 110,
    height: 165,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },
  autor: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  nomeAutor: {
    fontWeight: '600',
    color: '#333',
  },
  genero: {
    fontSize: 14,
    color: '#777',
  },
});
