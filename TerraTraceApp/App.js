// Importando bibliotecas React
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Importando arquivos locais
import HomeScreen from './src/screens/HomeScreen';
import CadastroDePlanta from './src/screens/CadastroDePlanta';
import SignOut from './src/components/SignOut';

// Importando bibliotecas AWS Amplify
import { withAuthenticator} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

import { Ionicons } from '@expo/vector-icons';



// Configurando o Amplify
Amplify.configure(awsExports);

// retorna somente o atual valor de 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Sair') {
              iconName = focused ? 'exit' : 'exit-outline';
            }
           else if (route.name === 'Nova Planta') {
            iconName = focused ? 'add' : 'add-outline';
            }  


            return <Ionicons name={iconName} size={size} color={color} />;

          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              "display": "flex"
            },
            null
          ]
      })}
    >

      <Tab.Screen name="Sair" component={SignOut} />
      <Tab.Screen name="Nova Planta" component={CadastroDePlanta} />
      <Tab.Screen name="Home" component={HomeScreen} />

    </Tab.Navigator>

  </NavigationContainer>
  );
};

export default withAuthenticator(App);