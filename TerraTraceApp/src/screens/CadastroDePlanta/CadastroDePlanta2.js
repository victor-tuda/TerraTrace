// Importando bibliotecas React
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal
} from 'react-native';

// Importando arquivos locais
import {createPlants} from '../../graphql/mutations';

// Importando bibliotecas AWS Amplify
import {API, graphqlOperation} from 'aws-amplify';

const initialFormState = {name: ''};

const CadastroDePlanta = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [formState, setFormState] = useState('');
  const [plants, setPlants] = useState([]);

  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChanges = () => {
    addPlant();
    closeModal();
  };


  async function addPlant() {
    try {
      if (!formState.name) return

      const plant = {...formState};
      setPlants([...plants, plant]);
      setFormState(initialFormState);
      console.log(plant)
      await API.graphql(graphqlOperation(createPlants, {input: plant}));
    } catch (err) {
      console.log('error creating plant:', err);
    }    
  }


  return (
    <View style={styles.container}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              onChangeText={value => setInput('name', value)}
              style={styles.input}
              value={formState.name}
              placeholder="Digite o nome da planta"
            />
            <Pressable style={styles.submitButton} onPress={handleChanges}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default CadastroDePlanta;

