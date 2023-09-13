// Importando bibliotecas React
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';

// Importando arquivos locais
import {createPlants} from './src/graphql/mutations';
import {listPlants} from './src/graphql/queries';
import SignOutButton  from './src/components/SignOutButton'
import PopupForm from './src/components/PopUpForm';

// Importando bibliotecas AWS Amplify
import {API, graphqlOperation} from 'aws-amplify';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { Button } from '@aws-amplify/ui-react-native/dist/primitives';

// Configurando o Amplify
Amplify.configure(awsExports);

// retorna somente o atual valor de 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const initialFormState = {name: ''};

const App = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }

  // Função de buscar as plantas do usuário
  async function fetchPlants() {
    try {
      const plantData = await API.graphql(graphqlOperation(listPlants));
      const plants = plantData.data.listPlants.items;
      setPlants(plants);
    } catch (err) {
      console.log('error fetching plants');
    }
  }

  // Função de cadastrar planta
  // Outras funções CRUD em src/graphql/mutations.js
  async function addPlant() {
    try {
      if (!formState.name) return;
      const plant = {...formState};
      setPlants([...plants, plant]);
      setFormState(initialFormState);
      await API.graphql(graphqlOperation(createPlants, {input: plant}));
    } catch (err) {
      console.log('error creating plant:', err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        
        
        {/* Retorna as plantas do usuário */}
        {plants.map((plant, index) => (
          <View key={plant.id ? plant.id : index} style={styles.plant}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantDescription}>{plant.description}</Text>
          </View>
        ))} 

        {/* Formulário para criar uma nova planta */}
        <TextInput
          onChangeText={value => setInput('name', value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />

        {/* Tentei criar um formulário, mas ainda não deu certo 
        Formulário em /components/PopUpForm.js*/}
        {/* <PopupForm/> */}
        
      
          {/* Botão de criar uma nova planta */}
        <Pressable onPress={addPlant} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create plant</Text>
        </Pressable>

          {/* Botão de SignOut */}
          <SignOutButton userSelector={userSelector}/>


      </View>
    </SafeAreaView>
  );
};

export default withAuthenticator(App);

// Parte de Design e CSS
const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  plant: {marginBottom: 15},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  plantName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});