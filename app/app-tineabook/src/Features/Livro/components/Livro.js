// src/Livro/components/Livro.js

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Estrelas from "./Estrelas";

const Livro = ({ data }) => {
  if (!data) return null;

  // 👇 debug para inspecionar os dados que estão vindo
  console.log("📚 Dados do livro:", data);

  const { title, authors, thumbnail, estrelas, resenha } = data;

  return (
    <View style={styles.card}>
      {thumbnail && (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      )}
      <Text style={styles.titulo}>{title}</Text>
      <Text style={styles.autor}>{authors?.join(", ")}</Text>

      {estrelas !== undefined && <Estrelas rating={estrelas} />}

      {resenha && <Text style={styles.resenha}>{resenha}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  thumbnail: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  resenha: {
    marginTop: 8,
    fontStyle: "italic",
  },
});

export default Livro;
