import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';
import EstrelasAvaliacao from '../components/avaliacaoEstrelas';


const ReviewScreen = () => {
  const [reviews, setReviews] = useState([]);
  const [retornoConsultaLivros, setRetornoConsultaLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idLivro, setIdLivro] = useState(true);
  const [idUsuario, setIdUsuario] = useState(true);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [estrelas, setEstrelas] = useState(null);
  const [textoResenha, setTextoResenha] = useState(null);

  const buscaAPI_Interna = async () => {
    try {
      const response = await fetch(
        `https://localhost:7228/api/avaliacao`
      );
      const infosLivro = await response.json();
      setRetornoConsultaLivros(infosLivro.items || []);

      const storedReviews = await AsyncStorage.getItem('reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      setReviews(reviews.reverse()); // Inverte a ordem para exibir as mais recentes primeiro
    } catch (error) {
      console.error('Erro ao carregar resenhas:', error);
    }
  };

  const buscaGoogleBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/{id}`
      );
      const infosLivro = await response.json();
      setRetornoConsultaLivros(infosLivro.items || []);

    {/*
      const storedReviews = await AsyncStorage.getItem('reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      setReviews(reviews.reverse()); // Inverte a ordem para exibir as mais recentes primeiro
    */}
      } catch (error) {
      console.error('Erro ao carregar resenhas:', error);
    } 
  };

  useFocusEffect(
    React.useCallback(() => {
      buscaAPI_Interna(); // Carrega as resenhas toda vez que a tela é focada
    }, [])
  );

  const renderReview = ({ item }) => (

    console.log('item', item),
    {/* Renderiza cada resenha com imagem, título, autor e texto 
    <View style={styles.reviewContainer}>
      <View style={styles.resenha}>
        <Image source={{ uri: item.coverImage }} style={styles.reviewThumbnail} />
        <View style={styles.livro}>
          <Text style={styles.reviewTitle}>{item.title}</Text>
          <Text style={styles.reviewAuthor}>{item.author}</Text>
          <Text style={styles.reviewText}>{item.resenha}</Text>
        </View>
      </View>
    </View>
    */}
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  resenha: {
    flexDirection: 'row',
  },
  livro: {
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  reviewContainer: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewAuthor: {
    fontSize: 16,
    color: '#555',
  },
  reviewThumbnail: {
    width: 50,
    height: 75,
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
  starContainer: {
    alignSelf: 'flex-start',
  },
});

export default ReviewScreen;