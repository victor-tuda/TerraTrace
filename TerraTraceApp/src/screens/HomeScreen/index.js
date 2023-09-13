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
import { useFocusEffect } from '@react-navigation/native';

// Importando arquivos locais
import {listPlants} from '../../../src/graphql/queries';

// Importando bibliotecas AWS Amplify
import {API, graphqlOperation} from 'aws-amplify';

const Index = ({user, route}) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const updatePlantsList = React.useCallback(() => {
    fetchPlants();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (updatePlantsList) {
        updatePlantsList();
      }
    }, [updatePlantsList])
  );


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

      </View>
    </SafeAreaView>
  );
};

export default Index;


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