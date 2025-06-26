import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ItemResultado = ({ item }) => {
    const { title, authors, imageLinks } = item.volumeInfo;  

    return (
        <View style={styles.container}>
            {imageLinks && imageLinks.thumbnail ? (
                <Image 
                    source={{ uri: imageLinks.thumbnail }}
                    style={styles.image}
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text>Sem imagem</Text>
                </View>
            )}

            <Text style={styles.title}>{title}</Text>
            {authors && authors.length > 0 && (
                <Text style={styles.authors}>Por: {authors.join(', ')}</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 75,
        marginRight: 10,
    },
    imagePlaceholder: {
        width: 50,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    authors: {
        fontSize: 14,
        color: '#555',
    },
});

export default item_lista;
