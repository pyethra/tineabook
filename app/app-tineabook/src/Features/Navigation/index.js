// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import DetalhesResenha from '../Features/Resenha/screens/DetalhesResenha';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Minhas Resenhas' }} />
        <Stack.Screen name="DetalhesResenha" component={DetalhesResenha} options={{ }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
