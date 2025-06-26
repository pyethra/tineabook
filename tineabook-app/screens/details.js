import React from 'react';
import { View, Text, Button } from 'react-native';

const Details = ({ navigation }) => {
  return (
    <View>
      <Text>Você está na tela de Detalhes!</Text>
      <Button
        title="Voltar para Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Details;
