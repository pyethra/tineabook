import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {avaliacaoEstrelas} from '../components/avaliacaoEstrelas'

const ExibirResenha = ({ route }) => {
  const { resenhaId } = route.params;
  const [resenha, setResenha] = useState(null);

  useEffect(() => {
    const carregarResenha = async () => {
      try {
        const storedReviews = await AsyncStorage.getItem('reviews');
        const reviews = storedReviews ? JSON.parse(storedReviews) : [];
        const resenhaEncontrada = reviews.find((r) => r.id === resenhaId);
        setResenha(resenhaEncontrada);
      } catch (error) {
        console.error('Erro ao carregar resenha:', error);
      }
    };

    carregarResenha();
  }, [resenhaId]);

  if (!resenha) {
    return (
      <View style={styles.container}>
        <Text>Carregando resenha...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: resenha.coverImage }} style={styles.image} />
      <Text style={styles.title}>{resenha.title}</Text>
      <Text style={styles.author}>{resenha.author}</Text>
      <avaliacaoEstrelas
        valor={resenha.rating}
        interativo={false}
        >
        </avaliacaoEstrelas>
      <Text style={styles.text}>{resenha.resenha}</Text>
    </View>
  );
};

export default ExibirResenha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 180,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});
