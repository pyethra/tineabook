// ResultadoPesquisa.js
import React from 'react';
import { View, FlatList, Text } from 'react-native';

const lista_resultados = ({ books }) => {
    if (!books || books.length === 0) {
        return <Text>Sem resultados.</Text>;  // Caso não haja livros
    }

    return (
        <View>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.volumeInfo.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default lista_resultados;
