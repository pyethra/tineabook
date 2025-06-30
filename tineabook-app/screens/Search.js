import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { fetchPesquisa_API } from '../services/fetchPesquisa_API'; // Importando a função
import { Barra_pesquisa } from '../components/Barra_pesquisa'

const Pesquisa = () => {

    return (
        <View>            
            <Barra_pesquisa></Barra_pesquisa>
            <Button
                title="Buscar"
                onPress={handleSearch}  
            />
        </View>
    );
};

export default Pesquisa;
