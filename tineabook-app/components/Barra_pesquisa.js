import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

function Barra_pesquisa() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#888"
        accessibilityLabel="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 8,
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default Barra_pesquisa;
