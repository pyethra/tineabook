import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Entypo, Feather } from "@expo/vector-icons";

import Pesquisa from "./src/features/Pesquisa/screen/Pesquisa";
import Home from "./src/features/Estante-User/screen/Home";
import EstanteUser from "./src/features/Estante-User/screen/EstanteUser";
//import { DetalhesLivro } from "./src/features/Livro";
import { MarcacoesProvider } from "./src/shared/contexts/MarcacoesContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegação por abas
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "#121212",
        borderTopColor: "transparent",
      },
      tabBarActiveTintColor: "#FFF",
      tabBarInactiveTintColor: "#888",
      tabBarShowLabel: false,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather name="home" size={30} color={focused ? "#FFF" : "#888"} />
        ),
      }}
    />
    <Tab.Screen
      name="Pesquisa"
      component={Pesquisa}
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo
            name="magnifying-glass"
            size={30}
            color={focused ? "#FFF" : "#888"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Estante-User"
      component={EstanteUser}
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo name="archive" size={30} color={focused ? "#FFF" : "#888"} />
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
      name="DetalhesLivro"
      component={DetalhesLivro}
      options={{
        title: "Detalhes do Livro",
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
