import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import { avalicoesService } from '../../Features/Resenha/services/servicesAPI_Resenha'; // Ajuste o import para o seu serviço correto

const Home = () => {
  const [avaliacoes, setAvaliacoes] = useState([]); // Use apenas um estado para armazenar as avaliações
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função que carrega as avaliações da API
  const carregarResenha = () => {
    setLoading(true);
    setError(null);

    avalicoesService.getAvaliacoes()
      .then((dados) => {
        setAvaliacoes(dados); // Atualiza o estado com as avaliações recebidas
        setLoading(false);
      })
      .catch((erro) => {
        setError(erro.message || 'Erro ao carregar avaliações');
        setLoading(false);
      });
  };

  // Usando o `useFocusEffect` para chamar `carregarResenha` sempre que a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      carregarResenha(); // Carrega as resenhas cada vez que a tela recebe foco
    }, [])
  );

  const navigation = useNavigation();

  // Função para renderizar cada item da lista de avaliações
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
              defaultRating={item.estrelas} // Usando a propriedade correta para a classificação
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
          data={avaliacoes} // Usando o estado correto para a FlatList
          keyExtractor={(item) => item.id_livro.toString()} // Usando `id_livro` como chave
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

export default Home; // Ex Review Screen renomeado para Home para manter a consistência com o arquivo original
