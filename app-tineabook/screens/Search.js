/*import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { fetchPesquisa_API } from './fetchPesquisa_API'; // Importando a função
import { barra_pesquisa } from '../components/barra_pesquisa'

const Pesquisa = () => {
    const [searchTerm, setSearchTerm] = useState('');  // Termo de pesquisa
    const [books, setBooks] = useState([]);  // Livros retornados da API
    const [loading, setLoading] = useState(false);  // Indicador de carregamento

    // Função para lidar com a pesquisa
    const handleSearch = async () => {
        setLoading(true);  // Ativa o carregamento
        const fetchedBooks = await fetchPesquisa_API(searchTerm);  // Chama a função de fetch
        setBooks(fetchedBooks);  // Atualiza os livros com a resposta
        setLoading(false);  // Desativa o carregamento
    };

    return (
        <View>
            <barra_pesquisa onSearch={handleSearch} />

            <Button
                title="Buscar"
                onPress={handleSearch}  
            />

            {loading && <Text>Carregando...</Text>}


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

export default Pesquisa;
*/