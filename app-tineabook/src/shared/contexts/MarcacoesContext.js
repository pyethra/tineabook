import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MarcacoesContext = createContext();

export const MarcacoesProvider = ({ children }) => {
  const [marcacoes, setMarcacoes] = useState([]);

  useEffect(() => {
    const carregarMarcacoes = async () => {
      try {
        const marcacoesSalvas = await AsyncStorage.getItem('@marcacoes');
        if (marcacoesSalvas !== null) {
          setMarcacoes(JSON.parse(marcacoesSalvas));
        }
      } catch (e) {
        console.error('Erro ao carregar marcações:', e);
      }
    };
    carregarMarcacoes();
  }, []);

  const salvarMarcacoesNoAsyncStorage = async (novasMarcacoes) => {
    try {
      await AsyncStorage.setItem('@marcacoes', JSON.stringify(novasMarcacoes));
    } catch (e) {
      console.error('Erro ao salvar marcações:', e);
    }
  };

  const salvarMarcacao = (novaMarcacao) => {
    const novasMarcacoes = [...marcacoes, novaMarcacao];
    setMarcacoes(novasMarcacoes);
    salvarMarcacoesNoAsyncStorage(novasMarcacoes);
  };

  return (
    <MarcacoesContext.Provider value={{ marcacoes, salvarMarcacao }}>
      {children}
    </MarcacoesContext.Provider>
  );
};

