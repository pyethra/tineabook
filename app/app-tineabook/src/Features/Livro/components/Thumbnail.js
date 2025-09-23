import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Thumbnail = ({ title, authors, year }) => {
  return (
    <View style={styles.capa}>
      <Image source={this.props.Thumb}></Image>
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

export default Thumbnail;
