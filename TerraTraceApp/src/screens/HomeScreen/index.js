// Importando bibliotecas React
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Image
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Importando arquivos locais
import {listPlants} from '../../../src/graphql/queries';

// Importando bibliotecas AWS Amplify
import {API, graphqlOperation, Storage, Auth } from 'aws-amplify';

const Index = ({user, route}) => {
  const [plants, setPlants] = useState([]);
  const [image, setImage] = useState(null);

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

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => {
        setImage(result)
        //console.log(result)
      })
      .catch((err) => console.log(err));
     
  };


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
            {/* <Image 
              source={ downloadImage(plants[index].file.key) } 
              style={{ width: 250, height: 250 }}
            /> */}
            
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