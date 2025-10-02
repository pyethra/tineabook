// src/screens/Home.js

import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import Livro from "../Livro/components/Livro";
import { fetchLivro } from "../../Geral/API/fetchLivro";
import { getHist } from "../../Geral/API/apiDB"; // consulta banco

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        // 1. busca histórico do usuário no banco
        const hist = await getAvaliacao();
        // avaliação deve retornar algo como [{ id_livro: "hkEKEAAAQBAJ", status: "lido", ... }, {...}]

        // 2. busca detalhes de cada livro na Google Books API
        const promises = hist.map((dbItem) => fetchLivro(dbItem.id_livro));
        const data = await Promise.all(promises);

        // 3. junta infos do banco + Google (mergeLivroData já faz isso dentro do fetchLivro)
        setLivros(data);
      } catch (err) {
        console.error("Erro ao carregar livros:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarLivros();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (livros.length === 0) {
    return <Text>Não há livros cadastrados.</Text>;
  }

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Livro data={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default Home;
