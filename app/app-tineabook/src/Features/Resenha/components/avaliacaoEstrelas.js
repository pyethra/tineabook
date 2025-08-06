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
      ratingColor='#f8ec7fff'
      imageSize={tamanho}
      readonly={!interativo}
      fractions={2}
      onFinishRating={interativo ? onChange : undefined}
      onSwipeRating={interativo ? onChange : undefined}
      tintColor="green" // cor de fundo se quiser customizar
      style={{ alignSelf: 'flex-start' }}
    />
  );
};

export default EstrelasAvaliacao;
