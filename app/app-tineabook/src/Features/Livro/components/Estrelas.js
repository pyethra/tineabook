import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Rating } from "react-native-ratings";

const Estrelas = () => {
  const [ValorEstrela, setValorEstrela] = useState(initialState);
  const [StatusRead, setStatusRead] = useState();

  setStatusRead = false;

  return (
    <View style={styles.Avaliar}>
      <Rating
        showRating
        type="star"
        fractions={1}
        startingValue={0}
        readonly={StatusRead}
        imageSize={40}
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avaliar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  autor: {
    fontSize: 16,
  },
  ano: {
    fontSize: 14,
    color: "#555",
  },
});

export default Estrelas;
