import React from 'react';
import { Rating } from 'react-native-ratings';

const EstrelasAvaliacao = ({
  valor = 0,
  interativo = false,
  tamanho = 24,
  onChange = () => {},
}) => {
  return (
    <Rating
      type="star"
      startingValue={valor}
      imageSize={tamanho}
      readonly={!interativo}
      fractions={1}
      onFinishRating={interativo ? onChange : undefined}
      tintColor="#fff" // cor de fundo se quiser customizar
      style={{ alignSelf: 'flex-start' }}
    />
  );
};

export default EstrelasAvaliacao;
