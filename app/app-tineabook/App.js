import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Entypo, Feather } from '@expo/vector-icons';

import Pesquisa from './src/Features/Pesquisa';
import Home from './src/Geral/screens/Home';
import Estante_Pessoal from './src/Geral/screens/Estante_pessoal';
import ExibirResenha from './src/Features/Resenha/screens/exibirResenha';
import { MarcacoesProvider } from './src/Geral/screens/Marcacoes_Context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegação por abas
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#121212',
        borderTopColor: 'transparent',
      },
      tabBarActiveTintColor: '#FFF',
      tabBarInactiveTintColor: '#888',
      tabBarShowLabel: false,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather name="home" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
    <Tab.Screen
      name="Pesquisa"
      component={Pesquisa}
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo name="magnifying-glass" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
    <Tab.Screen
      name="Estante_Pessoal"
      component={Estante_Pessoal}
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo name="archive" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Stack principal que engloba as tabs + tela de detalhes
const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen
      name="MainApp"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ExibirResenha"
      component={ExibirResenha}
      options={{
        headerShown: true,
        title: 'Detalhes da Resenha',
      }}
    />
  </Stack.Navigator>
);

// App principal
const App = () => {
  return (
    <MarcacoesProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </MarcacoesProvider>
  );
};

export default App;
