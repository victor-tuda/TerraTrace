import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createPlant} from './src/graphql/mutations';
import {listPlants} from './src/graphql/queries';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';

import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

// retrieves only the current value of 'user' from 'useAuthenticator'
const userSelector = (context) => [context.user]

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello! Click here to sign out!
      </Text>
    </Pressable>
  );
};

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

  async function fetchPlants() {
    try {
      const plantData = await API.graphql(graphqlOperation(listPlants));
      const plants = plantData.data.listPlants.items;
      setPlants(plants);
    } catch (err) {
      console.log('error fetching plants');
    }
  }

  async function addPlant() {
    try {
      if (!formState.name) return;
      const plant = {...formState};
      setPlants([...plants, plant]);
      setFormState(initialFormState);
      await API.graphql(graphqlOperation(createPlant, {input: plant}));
    } catch (err) {
      console.log('error creating plant:', err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SignOutButton />
        <TextInput
          onChangeText={value => setInput('name', value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <Pressable onPress={addPlant} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create plant</Text>
        </Pressable>
        {plants.map((plant, index) => (
          <View key={plant.id ? plant.id : index} style={styles.plant}>
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantDescription}>{plant.description}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default withAuthenticator(App);

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