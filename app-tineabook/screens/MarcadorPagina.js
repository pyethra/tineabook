import React, { useState, useEffect, useContext, useRef } from 'react';
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
  Keyboard,
  Pressable,
} from 'react-native';
import { MarcacoesContext } from './MarcacoesContext';
import { useFocusEffect } from '@react-navigation/native';
import IconeVoltar from '../assets/chevron-left.png';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';

const MarcadorPagina = () => {
  const { salvarMarcacao } = useContext(MarcacoesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pagesRead, setPagesRead] = useState('');
  const searchInputRef = useRef(null);
  const modalInputRef = useRef(null); // Referência para o campo de entrada no modal

  // Auto foco ao entrar na tela
  useFocusEffect(
    React.useCallback(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [])
  );

  // Auto foco no modal
  useEffect(() => {
    if (modalVisible && modalInputRef.current) {
      setTimeout(() => modalInputRef.current.focus(), 100); // Garantir que o modal já esteja montado
    }
  }, [modalVisible]);

  const calcularProgresso = () => {
    const total = Number(totalPages);
    const read = Number(pagesRead);

    if (isNaN(total) || isNaN(read) || total === 0) {
      return 0; // Se totalPages ou pagesRead não forem válidos, retorna 0%
    }

    const progresso = Math.min(read / total, 1); // Garantir que o progresso não exceda 100%
    return Math.floor(progresso * 100); // Multiplica por 100 e arredonda
  };

  const progressoPorcentagem = calcularProgresso();

  const handlePageInputChange = (text) => {
    const parsedValue = parseInt(text, 10);
    if (!isNaN(parsedValue) && parsedValue <= totalPages && parsedValue >= 0) {
      setPagesRead(parsedValue.toString());
    } else if (parsedValue > totalPages) {
      setPagesRead(totalPages.toString());
    } else {
      setPagesRead('');
    }
  };

  const openBookModal = (book) => {
    if (book && book.volumeInfo) {
      setSelectedBook(book);
      setModalVisible(true);
      setTotalPages(book.volumeInfo.pageCount || 1);
      setPagesRead('');
    }
  };

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

  useEffect(() => {
    if (searchTerm) {
      pesquisaLivros();
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  const handleSave = () => {
    if (selectedBook && selectedBook.volumeInfo) {
      const marcacao = {
        titulo: selectedBook.volumeInfo.title,
        autor: selectedBook.volumeInfo.authors?.[0] || 'Autor desconhecido',
        capa: selectedBook.volumeInfo.imageLinks?.thumbnail,
        porcentagem: progressoPorcentagem,
      };
      salvarMarcacao(marcacao);
      setModalVisible(false);
      setSearchTerm('');
      Keyboard.dismiss();
    }
  };

  const renderLivros = ({ item }) => (
    <TouchableOpacity
      onPress={() => openBookModal(item)}
      style={styles.bookContainerPesquisa}>
      <Image
        source={{
          uri: item?.volumeInfo?.imageLinks?.thumbnail || '', // Garantir que a URL da imagem seja uma string vazia se não existir
        }}
        style={styles.thumbnail}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.title}>
          {item?.volumeInfo?.title || 'Título não disponível'}
        </Text>
        <Text style={styles.author}>
          {item?.volumeInfo?.authors?.[0] || 'Autor desconhecido'}
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
                    uri: selectedBook?.volumeInfo?.imageLinks?.thumbnail,
                  }}
                  style={styles.largeThumbnail}
                />
                <View style={styles.infoLiv}>
                  <Text style={styles.selectedTitle}>
                    {selectedBook?.volumeInfo?.title || 'Título não disponível'}
                  </Text>
                  <Text style={styles.selectedAuthor}>
                    por{' '}
                    {selectedBook?.volumeInfo?.authors?.[0] ||
                      'Autor desconhecido'}
                  </Text>
                  <Text style={styles.totalPagesText}>
                    Total de Páginas: {totalPages}
                  </Text>
                </View>
              </View>

              <TextInput
                ref={modalInputRef} // Adicionando a referência
                placeholder="Páginas lidas"
                value={pagesRead}
                onChangeText={handlePageInputChange}
                style={styles.pageInput}
                keyboardType="numeric"
              />
              <View style={styles.barraProgresso}>
                <View>
                  <Progress.Bar
                    progress={calcularProgresso() / 100}
                    color={
                      progressoPorcentagem === 0
                        ? 'grey'
                        : progressoPorcentagem < 20
                        ? '#F44336'
                        : progressoPorcentagem < 75
                        ? '#FFEB3B'
                        : '#4CAF50'
                    }
                    width={240}
                    height={10}
                    unfilledColor="#ECECEC"
                    borderWidth={0}
                    style={{ marginTop: 8 }}
                  />
                </View>
                <Text style={styles.percentText}>{progressoPorcentagem}%</Text>
              </View>
                <Button title="Salvar" onPress={handleSave} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  totalPagesText: {
    marginLeft: 5,
    color: '#555',
    fontWeight: 'light',
  },
  botao: {
    width: 30,
    padding: 5,
  },
  tinyLogo: {
    width: 15,
    height: 15,
    left: -10,
    marginBottom: 5,
  },
  infoLiv: {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth:'100%'
  },
  infoLivro: {
    flexDirection: 'row',
    maxWidth: '80%',
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
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',         // Permite quebra de linha
    maxWidth: '100%',         // Garante que o texto ocupe no máximo a largura disponível
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
    backgroundColor: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',
    width: '100%',
  },
  modalContent: {
    margin: 20,
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  selectedTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginLeft: 5,
    flexShrink: 1,
    width: '100%',
    marginRight:10
  },
  selectedAuthor: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    marginLeft: 5,
    flexShrink: 1,
    width: '100%',
    marginRight:10
  },
  largeThumbnail: {
    width: 70,
    height: 100,
    justifyContent: 'center',
    marginBottom: 10,
  },
  barraProgresso: {
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop:-10
  },
  pageInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  percentText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default MarcadorPagina;
