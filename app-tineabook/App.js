import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Entypo, Feather } from '@expo/vector-icons';
import { MarcacoesProvider } from '../app-tineabook/screens/MarcacoesContext';
import {StyleSheet} from 'react-native';
import { Navigation_bar } from './screens/*Navigation_bar'
import { View } from 'react-native-web';

function App() {
  return (
    
    <View>
      <Text>Olá mundo</Text>
    </View>

  );
};


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

export default App;