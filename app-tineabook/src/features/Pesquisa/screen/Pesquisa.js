import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import pesquisaLivros from '../services/pesquisaLivros';

const Pesquisa = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const searchInputRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      const focusInput = () => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      };

      const timeout = setTimeout(focusInput, 100);

      return () => clearTimeout(timeout);
    }, [])
  );

  useEffect(() => {
    if (searchTerm) {
      buscarLivros();
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  const buscarLivros = async () => {
    try {
      const items = await pesquisaLivros(searchTerm);
      setBooks(items);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const renderLivros = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetalhesLivro', { livroId: item.id });
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Pesquisa;

