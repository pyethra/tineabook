// src/screens/Home.js

import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import Livro from "../Livro/components/Livro";
import { getAvaliacao } from "../../Geral/API/callAPI_db";

const Home = () => {
  const [listaAvaliacao, setlistaAvaliacao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarLivros = async () => {
      try {
        const resultadoGetAvaliacao = await getAvaliacao();
        setlistaAvaliacao(resultadoGetAvaliacao);
      } catch (err) {
        console.error("Erro ao carregar livros:", err);
      } finally {
        setLoading(false);
      }
    };

    return carregarLivros();
  }, []);

  if ((loading = "true")) {
    return <ActivityIndicator size="large" color="#ff0000ff" />;
  }

  if (listaAvaliacao.length === 0) {
    return <Text>Não há livros cadastrados.</Text>;
  }

  return (
    <View>
      <FlatList
        data={listaAvaliacao}
        keyExtractor={(item) => item.id_avaliacao}
        renderItem={({ item }) => <Livro data={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default Home;
