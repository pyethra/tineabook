import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

import IconeVoltar from '../../../assets/chevron-left.png'; 

const Pesquisa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [resenha, setResenha] = useState('');
  const [rating, setRating] = useState(0);
  const searchInputRef = useRef(null);

  // Garante que o teclado será exibido ao entrar na tela
  useFocusEffect(
    React.useCallback(() => {
      const focusInput = () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      };

      // Delay para garantir que o foco seja aplicado corretamente
      const timeout = setTimeout(focusInput, 100);

      return () => clearTimeout(timeout);
    }, [])
  );

  useEffect(() => {
    if (searchTerm) {
      pesquisaLivros();
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  const pesquisaLivros = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const salvarResenha = async (review) => {
    try {
      const storedReviews = await AsyncStorage.getItem('reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      await AsyncStorage.setItem(
        'reviews',
        JSON.stringify([...reviews, review])
      );
    } catch (error) {
      console.error('Erro ao salvar resenhas:', error);
    }
  };

  const addResenha = () => {
    if (!selectedBook) return;
    const novaResenha = {
      id: Date.now(),
      title: selectedBook.volumeInfo.title,
      author: selectedBook.volumeInfo.authors?.[0] || 'Autor desconhecido',
      coverImage: selectedBook.volumeInfo.imageLinks?.thumbnail,
      resenha,
      rating,
    };
    salvarResenha(novaResenha);
    setModalVisible(false);
    setSelectedBook(null);
    setResenha('');
    setRating(0);
    setSearchTerm(''); // Limpa o campo de pesquisa após enviar a resenha
    Keyboard.dismiss(); // Fecha o teclado
  };

  const renderLivros = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedBook(item);
        setModalVisible(true);
      }}
      style={styles.bookContainerPesquisa}>
      <Image
        source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
        style={styles.thumbnail}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text style={styles.author}>
          por {item.volumeInfo.authors?.[0] || 'Autor desconhecido'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={searchInputRef}
        placeholder="Buscar livro..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderLivros}
        style={styles.bookList}
      />

      {selectedBook && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.botao}>
                <Image style={styles.tinyLogo} source={IconeVoltar} />
              </Pressable>
              <View style={styles.infoLivro}>
                <Image
                  source={{
                    uri: selectedBook.volumeInfo.imageLinks?.thumbnail,
                  }}
                  style={styles.largeThumbnail}
                />
                <View style={styles.infoLiv}>
                  <Text style={styles.selectedTitle}>
                    {selectedBook.volumeInfo.title}
                  </Text>
                  <Text style={styles.selectedAuthor}>
                    por{' '}
                    {selectedBook.volumeInfo.authors?.[0] ||
                      'Autor desconhecido'}
                  </Text>
                </View>
              </View>
              <View>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={30}
                  startingValue={rating}
                  onFinishRating={(val) => setRating(val)}
                  style={{ marginVertical: 10 }}
                />
              </View>
              <TextInput
                placeholder="Escreva sua resenha"
                value={resenha}
                onChangeText={setResenha}
                style={[styles.input, styles.reviewInput]}
                multiline
              />
              <Button title="Enviar Resenha" onPress={addResenha} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: 30,
    padding: 5,
  },
  tinyLogo: {
    width: 15,
    height: 15,
    left:-10,
    marginBottom: 5,
  },
  infoLiv: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoLivro: {
    flexDirection: 'row',
    maxWidth: 195,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  bookContainerPesquisa: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  bookInfo: {
    marginLeft: 10,
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 75,
    borderRadius: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginLeft: 5,
  },
  selectedAuthor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    marginLeft: 5,
  },
  largeThumbnail: {
    width: 100,
    height: 150,
    justifyContent: 'center',
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top',
    marginVertical: 10,
  },
  starContainer: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor:'green',
  },
});

export default Pesquisa;