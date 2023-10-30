// Import from AWS
import { Storage } from "aws-amplify";

// Importações React
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Import from Local
import awsExports from '../../aws-exports';
import { addPlant } from '../../service/addPlant/addPlant';
import { uriToBlob } from '../../service/uriToBlob/uriToBlob';

const windowWidth = Dimensions.get("window").width;

const CadastroDePlanta = () => {
  const navigation = useNavigation(); // Variavel de navegação
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const {
    control,  // variavel de controle de estados dos campos do formulário
    handleSubmit, 
    formState: { errors },
  } = useForm({ 
    defaultValues: {   // Valores default do Formulário
      name: "",
      species: "",
      creationDate: "",
    },
  });

  // Função para buscar permissão de acesso à câmera nos dispositivos móveis
  useEffect(() => { 
    (async () => { 
      if (Constants.platform.ios) {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Desculpe, precisamos dessa permissão para continuar!");
        }
      }
    })();
  }, []);

  // Função para obter a imagem a partir da foto
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(result.assets[0]);
  };

  // Função para escolher uma imagem da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result.assets[0]);
  };

  // Lidar com a imagem obtida através da foto ou galeria
  const handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelado");
        return;
      } else {
        setPercentage(0);
        const blobFile = await uriToBlob(pickerResult.uri);  // Gerando o objeto blob a partir do caminho da imagem
        setBlob(blobFile);
        setImage(pickerResult.uri);  // Mostrando a imagem recebida pela foto ou galeria
      }
    } catch (e) {
      console.log(e);
      alert("Upload falhou");
    }
  };

  // Função para enviar a imagem para o armazenamento S3
  const uploadImage = async (filename, blobFile) => {
    return Storage.put(filename, blobFile, {
      level: "private",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };
  
  // Função para mostrar o carregamento da imagem para o S3
  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated);
  };

  // Função para atualizar o carregamento da imagem
  const updatePercentage = (number) => {
    setPercentage(number);
  };

  // Copiar a imagem para o clipboard - Talvez remova a função
  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("URL da imagem copiada");
  };

  // Função chamada ao enviar o formulário
  const onSubmit = async (data) => {
    const { name, species, creationDate } = data;

    const file = {  // estruturando o arquivo da imagem com configurações de ambiente da aws
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: `plants/${name}`,
    }

    addPlant({ name, species, creationDate }, file);   // enviando os dados do formulário + imagem para o DynamoDB

    await uploadImage(`plants/${name}.jpeg`, blob);   // enviando o arquivo de imagem para o S3
    
    
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastro de Planta</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
            <Image
              source={require('../../../assets/pasta.png')} // ícone de uma pasta para botão de carregar imagem galeria
              style={styles.icon}
            /> 
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
            <Image
              source={require('../../../assets/camera.png')}   // ícone de uma câmera para botão de carregar imagem galeria
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                placeholder="Nome da Planta"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.input, { borderColor: '#008000' }]}
              />
            </View>
          )}
        />
        <Text style={styles.label}>Espécie</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="species"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                placeholder="Espécie da Planta"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.input, { borderColor: '#008000' }]}
              />
            </View>
          )}
        />
        <Text style={styles.label}>Data</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          name="creationDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <TextInput
                placeholder="Data de Plantio"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.input, { borderColor: '#008000' }]}
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Criar Planta</Text>
      </TouchableOpacity>
    </View>
  );
};

// Configurações de  Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -170, // posição do título na tela
  },
  title: {   // Configuração da fonte 
    fontSize: 30,
    fontWeight: 'bold',
    color: '#008000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.8,
  
  },
  iconContainer: {
    padding: 50, // Tamanho do conteiner
    marginTop: 230,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 70,
    height: 70,
    alignItems: 'center', // Centraliza os itens horizontalmente
    justifyContent: 'center', // Centraliza os itens verticalmente
  },
  icon: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    width: windowWidth * 0.8,
    marginTop: 30,
    
  },
  label: {
    fontSize: 20,
    color: '#008000',
    fontWeight: 'bold',
    marginTop: 10

  },
  input: {
    borderWidth: 1,
    borderColor: "#008000",
    borderRadius: 4,
    padding: 10,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center", // Alinhamento ao centralizado
    marginBottom: 20,
  },
  button: {  // Configuração do botão
    backgroundColor: "#008000",
    width: 200,
    borderRadius: 4,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {  // Configuração do  texto botão
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold", // Estilo negrito
  },
});

export default CadastroDePlanta;
