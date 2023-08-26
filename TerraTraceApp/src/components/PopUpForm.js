import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, StyleSheet } from 'react-native';
import {createPlant} from '../../src/graphql/mutations';
import {listPlants} from '../../src/graphql/queries';

const PopupForm = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // Perform any actions you need with the inputValue
    console.log('Submitted value:', inputValue);
    closeModal();
  };

  // Migrar essa função para uma pasta de serviços
  // Visualizar em /src/graphql/mutations.js outras funções CRUD
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

  // Migrar essa função para uma pasta de serviços
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
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Cadastrar nova Planta</Text>
      </Pressable>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da planta"
              onChangeText={value => setInputValue('name', value)}
              value={inputValue}
            />
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
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

export default PopupForm;

