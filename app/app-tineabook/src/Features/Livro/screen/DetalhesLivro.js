import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

import LivroHeader from '../../Resenha/components/LivroHeader';
import Sinopse from '../../Resenha/components/Sinopse';
import PersonagensList from '../../Resenha/components/PersonagensList';
import ResenhasList from '../../Resenha/components/ResenhasList';
import Loader from '../../Resenha/components/Loader';
import AddResenhaBtn from '../../Resenha/components/AddResenhaBtn';
import AddHistLeitura from '../../Resenha/components/AddHistLeitura';
import { buscarLivroPorId } from '../services/livroService';

export default function DetalhesLivro({ route }) {
  const { livroId } = route.params;
  const [livro, setLivro] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [personagensCurtidos, setPersonagensCurtidos] = useState([]);
  const [resenhas, setResenhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    buscarDadosDoLivro();
  }, []);

  const buscarDadosDoLivro = async () => {
    try {
      const livroFormatado = await buscarLivroPorId(livroId);
      setLivro(livroFormatado);
      setPersonagens(await buscarPersonagens());
      setResenhas([
        { id: 1, usuario: 'Ana Clara', conteudo: 'Um clássico...', nota: 5, curtidas: 42, curtida: false },
        { id: 2, usuario: 'Carlos Eduardo', conteudo: 'Criativo...', nota: 4, curtidas: 30, curtida: false },
      ]);
    } catch (error) {
      console.error('Erro ao buscar dados do livro:', error);
    } finally {
      setCarregando(false);
    }
  };

  const buscarPersonagens = async () => [
    { id: 1, nome: 'Alice' },
    { id: 2, nome: 'Chapeleiro Maluco' },
    { id: 3, nome: 'Rainha de Copas' },
    { id: 4, nome: 'Coelho Branco' },
  ];

  const alternarCurtidaPersonagem = (id) => {
    setPersonagensCurtidos((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const alternarCurtidaResenha = (id) => {
    setResenhas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, curtida: !r.curtida, curtidas: r.curtida ? r.curtidas - 1 : r.curtidas + 1 } : r
      )
    );
  };

  if (carregando) return <Loader mensagem="Carregando o livro, segura aí..." />;
  if (!livro) return <Text>Erro ao carregar</Text>;

  return (
    <ScrollView 
      style={{ overflow: 'auto', height: '100vh' }}
      contentContainerStyle={{ padding: 10 }}
      keyboardShouldPersistTaps="handled"
    >
      <LivroHeader livro={livro} />
      <Sinopse texto={livro.sinopse} />
      <PersonagensList
        personagens={personagens}
        curtidos={personagensCurtidos}
        onToggleCurtida={alternarCurtidaPersonagem}
        mostrarTodos={mostrarTodos}
        onToggleMostrarTodos={() => setMostrarTodos((prev) => !prev)}
      />
      <ResenhasList resenhas={resenhas} onToggleCurtida={alternarCurtidaResenha} />
      <AddResenhaBtn onPress={() => console.log('Abrir formulário de resenha')} />
      <AddHistLeitura onPress={() => console.log('Abrir formulário de histórico de leitura')} />
    </ScrollView>
  );
}

