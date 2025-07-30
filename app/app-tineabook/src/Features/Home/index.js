import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const index_Home = () => {
  return (
    <View style={styles.container}>
      <Text>Olá, React Native com Expo!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,              // ocupa toda a tela
    justifyContent: 'center',  // centraliza verticalmente
    alignItems: 'center',      // centraliza horizontalmente
    backgroundColor: '#fff',
  },
});

export default index_Home;
