import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import 'src/shared/api/callAPI_db.js';

const Home = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarResenha = () => {
    setLoading(true);
    setError(null);

    getAvaliacoes()
      .then((dados) => {
        setAvaliacoes(dados);
        setLoading(false);
      })
      .catch((erro) => {
        setError(erro.message || 'Erro ao carregar avaliações');
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarResenha();
    }, [])
  );

  const navigation = useNavigation();

  const renderReview = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ExibirResenha', { resenhaId: item.id })}>
      <View style={styles.reviewContainer}>
        <View style={styles.resenha}>
          <Image source={{ uri: item.coverImage }} style={styles.reviewThumbnail} />
          <View style={styles.livro}>
            <Text style={styles.reviewTitle}>{item.title}</Text>
            <Text style={styles.reviewAuthor}>{item.author}</Text>
            <AirbnbRating
              count={5}
              defaultRating={item.estrelas}
              size={20}
              showRating={false}
              isDisabled
              starContainerStyle={styles.starContainer}
            />
            <Text style={styles.reviewText} numberOfLines={2}>{item.resenha}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={avaliacoes}
          keyExtractor={(item) => item.id_livro.toString()}
          renderItem={renderReview}
        />
      )}
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

export default Home;

