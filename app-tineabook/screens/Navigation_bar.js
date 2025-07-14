import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {Screen_Feed} from './Feed'
import {Screen_Search} from './*Search'
import {Screen_userProfile} from './*userProfile'

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pesquisa"
          component={Screen_Search}
        />

        <Stack.Screen
          name="Feed"
          component={Screen_Feed}
        />

        <Stack.Screen
          name="Pesquisa"
          component={Screen_Search}
        />
        
        <Stack.Screen
          name="Perfil do Usuário"
          component={Screen_userProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};