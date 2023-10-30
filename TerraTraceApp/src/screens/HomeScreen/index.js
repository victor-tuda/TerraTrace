import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'; // Importando TouchableOpacity
import ProgressBar from 'react-native-progress/Bar';



// Importando arquivos locais
import { listPlants } from '../../../src/graphql/queries';

// Importando bibliotecas AWS Amplify
import { API, Auth, graphqlOperation } from 'aws-amplify';

const Index = ({ user, route, navigation }) => { // Adicionando 'navigation' como uma prop
  const [plants, setPlants] = useState([]);
  const [username, setUsername] = useState('');

  // Função para buscar as plantas do usuário
  useEffect(() => {
    fetchPlants();
    fetchUserData();
  }, []);

  // Função para buscar as plantas
  async function fetchPlants() {
    try {
      const plantData = await API.graphql(graphqlOperation(listPlants));
      const plants = plantData.data.listPlants.items;
      setPlants(plants);
    } catch (err) {
      console.log('Error fetching plants', err);
    }
  }

  // Função para buscar o nome do usuário autenticado
  async function fetchUserData() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image source={require('../../../assets/User.png')} style={styles.userImage} />
            <Text style={styles.username}>Bem vindo {username}!</Text>
          </View>
          <Text style={styles.title}>Suas Plantas</Text>
          {plants.map((plant, index) => (
            <TouchableOpacity
              key={plant.id ? plant.id : index}
              style={styles.card}
              onPress={() => navigation.navigate('Dashboard')} // Navega para a página 'Dashboard' ao pressionar
            >
              <View style={styles.contentContainer}>
                <View style={styles.content}>
                  <Image source={require('../../../assets/logo.png')} style={styles.image} />
                </View>
                <View style={styles.content}>
                  <Text style={styles.plantName}>{plant.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/data.png')}
                      style={[styles.extraImage, { marginTop: 40 }]}
                    />
                    <Text style={{ marginRight: 5, marginTop: 45, marginLeft: 15 }}>2023</Text>
                  </View>
                </View>
                <View style={styles.content}>
                  <View style={[styles.progressBar, { marginTop: 20, width: 80 }]}>
                    <ProgressBar progress={plant.nivel} color="blue" width={80} height={10} />
                    <Image source={require('../../../assets/nivel.png')} style={styles.progressBarIconLarge} />
                  </View>
                  <View style={[styles.progressBar, { marginTop: 5, width: 80 }]}>
                    <ProgressBar progress={plant.luminosidade} color="orange" width={80} height={10} />
                    <Image source={require('../../../assets/luminosidade.png')} style={styles.progressBarIconLarge} />
                  </View>
                  <View style={[styles.progressBar, { marginTop: 5, width: 80 }]}>
                    <ProgressBar progress={plant.umidade} color="red" width={80} height={10} />
                    <Image source={require('../../../assets/umidade.png')} style={styles.progressBarIconLarge} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { width: 400, flex: 1, padding: 20, alignSelf: 'center' },
  scrollView: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  content: {
    flex: 1,
  },
  plantInfo: {
    justifyContent: 'center',
  },
  plantName: { fontSize: 20, fontWeight: 'bold', color: 'green' },
  image: { width: 70, height: 100, borderRadius: 10, marginBottom: 10 },
  progressBarContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarIconLarge: { width: 25, height: 25, marginRight: 2 },
  progressBarText: {
    marginBottom: 5,
  },
  extraImage: {
    width: 25,
    height: 25,
  },
  userImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40, // Distância entre o nome do usuário e o título "Suas plantas"
  },
});

export default Index;
