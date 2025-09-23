import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Heart from './heart'
import { State } from 'react-native-gesture-handler';

export default function ResenhaCard({ item, onToggleCurtida }) {

  const Curtida =()=> {
    const [curtida, setCurtida] = useState();
  }

  return (
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
        <TouchableOpacity onPress={() => onToggleCurtida(item.id)}>
          <Text style={[styles.coracaoPequeno, item.curtida && styles.coracaoAtivo]}>
            {item.curtida ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.qtdCurtidas}>{item.curtidas} curtidas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  coracaoAtivo: {
    color: '#D50000',
  },
  qtdCurtidas: {
    marginLeft: 8,
    fontSize: 13,
    color: '#666',
  },
});
