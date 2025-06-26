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
import { AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';

import IconeVoltar from '../assets/chevron-left.png';

const verificaResenha = async (review) => {
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

return addResenha();