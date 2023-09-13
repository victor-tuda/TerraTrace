// Importando bibliotecas React
import React from 'react';

// Importando arquivos locais
import HomeScreen from './src/screens/HomeScreen';

// Importando bibliotecas AWS Amplify
import { withAuthenticator} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';

// Configurando o Amplify
Amplify.configure(awsExports);

// retorna somente o atual valor de 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const App = () => {
  return (
  <HomeScreen user={userSelector}></HomeScreen>
  );
};

export default withAuthenticator(App);