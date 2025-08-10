import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const larguraCard = (Dimensions.get('window').width - 64) / 3; //tela responsável por gerenciar listas e curtidas de personagens.

export default function PersonagensList({ personagens, curtidos, onToggleCurtida, mostrarTodos, onToggleMostrarTodos }) {
  return (
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
              <TouchableOpacity onPress={() => onToggleCurtida(item.id)}>
                <Text style={[styles.coracao, curtidos.includes(item.id) && styles.coracaoAtivo]}>
                  {curtidos.includes(item.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          personagens.length > 8 && (
            <TouchableOpacity onPress={onToggleMostrarTodos}>
              <Text style={styles.botaoMostrar}>
                {mostrarTodos ? 'Mostrar menos' : 'Ver todos os personagens'}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
