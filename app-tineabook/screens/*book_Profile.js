import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const livroId = 'miq7zwEACAAJ';
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
      const resposta = await axios.get(`https://www.googleapis.com/books/v1/volumes/${livroId}`);
      const info = resposta.data.volumeInfo;

      const livroFormatado = {
        titulo: info.title,
        autor: info.authors?.[0] || 'Autor desconhecido',
        generos: info.categories || ['Gênero não informado'],
        sinopse: info.description || 'Nenhuma sinopse disponível.',
        capa: info.imageLinks?.thumbnail || 'https://via.placeholder.com/100x150.png?text=Sem+Capa',
      };

      const removerTagsHTML = (texto) => texto.replace(/<[^>]*>/g, '');
      livroFormatado.sinopse = removerTagsHTML(livroFormatado.sinopse);

      try {
        const wiki = await axios.get(
          `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(livroFormatado.titulo)}`
        );
        if (wiki.data.extract) {
          livroFormatado.sinopse = wiki.data.extract;
        }
      } catch {
        console.warn('Sinopse alternativa não encontrada na Wikipédia.');
      }

      setLivro(livroFormatado);
      setPersonagens(await buscarPersonagens());

      setResenhas([
        {
          id: 1,
          usuario: 'Ana Clara',
          conteudo: 'Um clássico encantador, me lembra minha infância!',
          nota: 5,
          curtidas: 42,
          curtida: false,
        },
        {
          id: 2,
          usuario: 'Carlos Eduardo',
          conteudo: 'Criativo, doido e mágico! Releitura obrigatória.',
          nota: 4,
          curtidas: 30,
          curtida: false,
        },
      ]);
    } catch (erro) {
      console.error('Erro ao carregar dados do livro:', erro.message);
    } finally {
      setCarregando(false);
    }
  };

  const buscarPersonagens = async () => {
    return [
      { id: 1, nome: 'Alice' },
      { id: 2, nome: 'Chapeleiro Maluco' },
      { id: 3, nome: 'Rainha de Copas' },
      { id: 4, nome: 'Coelho Branco' },
      { id: 5, nome: 'Gato de Cheshire' },
      { id: 6, nome: 'Lebre de Março' },
      { id: 7, nome: 'Lagarta Azul' },
      { id: 8, nome: 'Tweedledee' },
      { id: 9, nome: 'Tweedledum' },
      { id: 10, nome: 'Valete de Copas' },
    ];
  };

  const alternarCurtidaPersonagem = (id) => {
    setPersonagensCurtidos((anteriores) =>
      anteriores.includes(id)
        ? anteriores.filter((p) => p !== id)
        : [...anteriores, id]
    );
  };

  const alternarCurtidaResenha = (id) => {
    setResenhas((anteriores) =>
      anteriores.map((resenha) =>
        resenha.id === id
          ? {
              ...resenha,
              curtida: !resenha.curtida,
              curtidas: resenha.curtida ? resenha.curtidas - 1 : resenha.curtidas + 1,
            }
          : resenha
      )
    );
  };

  const alternarMostrarTodos = () => setMostrarTodos((estado) => !estado);

  const renderResenha = ({ item }) => (
    <View style={styles.cartaoResenha}>
      <View style={styles.cabecalhoResenha}>
        <Image
          source={{ uri: `https://ui-avatars.com/api/?name=${item.usuario}&background=random` }}
          style={styles.fotoUsuario}
        />
        <Text style={styles.nomeUsuario}>{item.usuario} comentou:</Text>
      </View>
      <Text style={styles.textoResenha}>{item.conteudo}</Text>
      <View style={styles.avaliacao}>
        {[...Array(5)].map((_, i) => (
          <Text key={i} style={styles.estrela}>{i < item.nota ? '⭐' : '☆'}</Text>
        ))}
        <TouchableOpacity onPress={() => alternarCurtidaResenha(item.id)}>
          <Text style={[styles.coracaoPequeno, item.curtida && styles.coracaoAtivo]}>
            {item.curtida ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.qtdCurtidas}>{item.curtidas} curtidas</Text>
      </View>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color="#6A1B9A" />
        <Text style={styles.textoCarregando}>Carregando o livro, segura aí...</Text>
      </View>
    );
  }

  if (!livro) {
    return (
      <View style={styles.carregandoContainer}>
        <Text style={styles.erroTexto}>Ops! Não conseguimos carregar o livro.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.faixaCabecalho}>
        <Text style={styles.tituloCabecalho}></Text>
      </View>

      <View style={styles.cabecalho}>
        <Image source={{ uri: livro.capa }} style={styles.capa} />
        <View style={styles.info}>
          <Text style={styles.titulo}>{livro.titulo}</Text>
          <Text style={styles.autor}>Autor: <Text style={styles.nomeAutor}>{livro.autor}</Text></Text>
          <Text style={styles.genero}>Gênero: {livro.generos.join(', ')}</Text>
        </View>
      </View>

      <View style={styles.sessao}>
        <Text style={styles.tituloSessao}>Sinopse</Text>
        <Text style={styles.sinopse}>{livro.sinopse}</Text>
      </View>

      <View style={styles.sessao}>
        <Text style={styles.tituloSessao}>Personagens</Text>
        <FlatList
          data={personagens.slice(0, mostrarTodos ? personagens.length : 8)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.linhaPersonagem}
          renderItem={({ item }) => (
            <View style={styles.cartaoPersonagem}>
              <View style={styles.personagemLinha}>
                <Text style={styles.nomePersonagem}>{item.nome}</Text>
                <TouchableOpacity onPress={() => alternarCurtidaPersonagem(item.id)}>
                  <Text style={[styles.coracao, personagensCurtidos.includes(item.id) && styles.coracaoAtivo]}>
                    {personagensCurtidos.includes(item.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={
            personagens.length > 8 && (
              <TouchableOpacity onPress={alternarMostrarTodos}>
                <Text style={styles.botaoMostrar}>
                  {mostrarTodos ? 'Mostrar menos' : 'Ver todos os personagens'}
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>

      <View style={styles.sessao}>
        <Text style={styles.tituloSessao}>Resenhas da galera</Text>
        <FlatList
          data={resenhas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderResenha}
        />
      </View>
    </ScrollView>
  );
}

const larguraCard = (Dimensions.get('window').width - 64) / 3;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  faixaCabecalho: {
    height: 60,
    backgroundColor: '#D1B28F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 3,
  },
  tituloCabecalho: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  erroTexto: {
    fontSize: 16,
    color: '#B00020',
  },
  cabecalho: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    padding: 12,
  },
  capa: {
    width: 110,
    height: 165,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 8,
  },
  autor: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  nomeAutor: {
    fontWeight: '600',
    color: '#333',
  },
  genero: {
    fontSize: 14,
    color: '#777',
  },
  sessao: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  tituloSessao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 10,
  },
  sinopse: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  linhaPersonagem: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cartaoPersonagem: {
    backgroundColor: '#F3E5F5',
    borderRadius: 10,
    padding: 12,
    width: larguraCard,
    margin: 5,
  },
  personagemLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomePersonagem: {
    fontSize: 14,
    color: '#4A148C',
    fontWeight: '600',
  },
  coracao: {
    fontSize: 18,
    marginLeft: 8,
  },
  coracaoAtivo: {
    color: '#D50000',
  },
  botaoMostrar: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  cartaoResenha: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  cabecalhoResenha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  fotoUsuario: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  nomeUsuario: {
    fontWeight: 'bold',
    color: '#333',
  },
  textoResenha: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
  },
  avaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estrela: {
    fontSize: 16,
    marginRight: 2,
    color: '#FFD700',
  },
  coracaoPequeno: {
    fontSize: 16,
    marginLeft: 12,
  },
  qtdCurtidas: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666',
  },
});
