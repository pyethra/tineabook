import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ProgressBarAndroid,
} from 'react-native';
import { MarcacoesContext } from './MarcacoesContext';
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Marcacoes = () => {
  const { marcacoes } = useContext(MarcacoesContext);

  const marcacoesInversas = [...marcacoes].reverse();

  const renderMarcacao = ({ item }) => (
    <View style={styles.marcacaoContainer}>
      <Image source={{ uri: item.capa }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.author}>{item.autor}</Text>
        
        <View>
          <View style={styles.barraProgresso}>
            <Progress.Bar
              progress={item.porcentagem / 100}
              style={styles.barra}
              color={
                item.porcentagem == 0
                ? 'grey'
                :
                item.porcentagem< 20
                ? '#F44336'
                : item.porcentagem< 75
                ? '#FFEB3B'
                : '#4CAF50'
              }
              width={windowWidth*0.4}
              borderColor='#E0E4E8'
              height={8} 
              unfilledColor="#ECECEC"
              borderWidth={0}
            />
          </View>
          <Text style={styles.percentText}>{item.porcentagem}% completo</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={marcacoesInversas} // Utilizando a lista invertida
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMarcacao}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barraProgresso:{
    marginTop:5
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  marcacaoContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#F3F5F2',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  thumbnail: {
    width: '14%',
    height: '100%',
    borderRadius: 4,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  percentText: {
    fontSize: 11,
    marginTop:5,
    fontWeight:'bold'
  },
});

export default Marcacoes;
