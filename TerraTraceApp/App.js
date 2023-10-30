// Importando bibliotecas React
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';



// Importando arquivos locais
import HomeScreen from './src/screens/HomeScreen';
import CadastroDePlanta from './src/screens/CadastroDePlanta';
import SignOut from './src/components/SignOut';
import Index from './src/screens/HomeScreen/index'
import Dashboard from './src/screens/Dashboard/Dashboard'; // Importe a página Dashboard




// Importando bibliotecas AWS Amplify
import { withAuthenticator} from '@aws-amplify/ui-react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './src/aws-exports';
import config from './src/aws-exports';

import { Ionicons } from '@expo/vector-icons';



// Configurando o Amplify
Amplify.configure(awsExports);
Auth.configure({...config, authenticationFlowType: "USER_PASSWORD_AUTH"});

Amplify.Logger.LOG_LEVEL = "DEBUG"

// retorna somente o atual valor de 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { // Adiciona os ícones dos botões
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Sair') {
              iconName = focused ? 'exit' : 'exit-outline';
            }
           else if (route.name === 'Criar Planta') {
            iconName = focused ? 'add' : 'add-outline';
            }  


            return <Ionicons name={iconName} size={size} color={color} />;

          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              "display": "flex"
            },
            null
          ],
          headerShown: false, // Oculta os títulos das páginas
      })}
    >

      <Tab.Screen name="Sair" component={SignOut} />
      <Tab.Screen name="Criar Planta" component={CadastroDePlanta} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      
      

    </Tab.Navigator>

  </NavigationContainer>
  );
};
export default withAuthenticator(App);