import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Pesquisa from '../app-tineabook/screens/Pesquisa';
import ReviewsScreen from '../app-tineabook/screens/ReviewsScreen';
import MarcadorPagina from '../app-tineabook/screens/MarcadorPagina';
import Marcacoes from './screens/Marcacoes';
import { Entypo, Feather } from '@expo/vector-icons';
import { MarcacoesProvider } from '../app-tineabook/screens/MarcacoesContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={require('./assets/Vector.png')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Bem-vindo ao seu app de leitura!</Text>
      <Text style={styles.subtitle}>Descubra, marque e resenhe seus livros favoritos.</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.replace('MainApp')}
      >
        <Text style={styles.startButtonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const FeedStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Feed"
      component={Pesquisa}
      options={{
        headerTitle: () => (
          <Image
            source={require('./assets/Vector.png')}
            style={{ width: 100, height: 40 }}
          />
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen name="ReviewDetail" component={ReviewsScreen} />
  </Stack.Navigator>
);

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
    }}
  >
    <Tab.Screen
      name="Home"
      component={ReviewsScreen}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Feather name="home" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
    <Tab.Screen
      name="Pesquisa"
      component={Pesquisa}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Entypo name="magnifying-glass" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
    <Tab.Screen
      name="Marcador de Páginas"
      component={MarcadorPagina}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Entypo name="circle-with-plus" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
    <Tab.Screen
      name="Marcações"
      component={Marcacoes}
      options={{
        tabBarIcon: ({ color, focused }) => (
          <Entypo name="archive" size={30} color={focused ? '#FFF' : '#888'} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="MainApp" component={TabNavigator} />
  </Stack.Navigator>
);

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

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2C',
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    borderRadius:100
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#BBB',
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  startButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});
