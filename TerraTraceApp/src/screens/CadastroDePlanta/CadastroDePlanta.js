// Import from AWS
import { Auth, Storage, Amplify } from "aws-amplify";

// Import from React
import { Text, View, TextInput, Button, Alert, Image, Platform, StyleSheet } from "react-native"
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useNavigation } from '@react-navigation/native';

// Imports from expo
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

// Import from Local
import { addPlant } from '../../service/addPlant/addPlant'
import {uriToBlob} from '../../service/uriToBlob/uriToBlob'
import awsExports from '../../aws-exports'

// TODO:


const CadastroDePlanta = () => {
  const navigation = useNavigation(); // Variavel de navegação

  const [image, setImage] = useState(null); // variaveis de imagem
  const [blob, setBlob] = useState(null); // variaveis que geram o objeto Blob
  const [percentage, setPercentage] = useState(0); // variaveis de perncentual

  const {
    control, // variavel de controle de estados dos campos do formulário
    handleSubmit, 
    formState: { errors },
  } = useForm({ 
    defaultValues: { // Valores default do Formulário
      name: "",
    },
  })

  // Solicitar permissão de acesso a câmera para celulares
  useEffect(() => { 
    (async () => { 
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Desculpe, mas nós precisamos dessa permissão para prosseguir!");
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

    this.handleImagePicked(result.assets[0]);
  };

  // Função para obter a imagem a partir da galeria
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this.handleImagePicked(result.assets[0]);
  };

  // Lidar com a imagem obtida através da foto ou galeria
  handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelado");
        return;
      } else {
        setPercentage(0);
        const blobFile = await uriToBlob(pickerResult.uri); // Gerando o objeto blob a partir do caminho da imagem
        setBlob(blobFile);
        setImage(pickerResult.uri); // Mostrando a imagem recebida pela foto ou galeria
      }
    } catch (e) {
      console.log(e);
      alert("Upload falhou");
    }
  };

  // Função para enviar a imagem ao Storage S3
  uploadImage = async (filename, blobFile) => {
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
  
  // Função para mostrar o loading da imagem ao S3
  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated);
  };

  // Função para atualizar o loading de envio da imagem ao S3
  const updatePercentage = (number) => {
    setPercentage(number);
  };

  // Copiar a imagem para o clipboard - Talvez remova a função
  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("URL da imagem copiada");
  };


  // Função chamada ao realizar o envio do formulário
  const onSubmit = async (data) => {
    file = { // estruturando o arquivo da imagem com configurações de ambiente da aws
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: `plants/${data.name}`
    }

    addPlant(data, file); // enviando os dados do formulário + imagem para o DynamoDB

    await uploadImage(`plants/${data.name}.jpeg`, blob); // enviando o arquivo de imagem para o S3
    
    navigation.navigate('Home') // retornar para a página Home
  }

  return (
      <View>
        <Controller
          control={control}
          rules={{ required: true,}}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            placeholder="Nome da Planta"
            onBlur={onBlur}
            onChangeText={onChange} value={value}/>
          )}
          
        />
        {errors.name && <Text>Esse campo é obrigatório</Text>}

        
        {percentage !== 0 && <Text style={styles.percentage}>{percentage}%</Text>}
        {image && (
            <View>
              <Text style={styles.result} onPress={copyToClipboard}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 250, height: 250 }}
                />
              </Text>
              <Text style={styles.info}>Segure a imagem para copiar a url</Text>
            </View>
          )}
    
          <Button onPress={pickImage} title="Selecionei uma imagem da galeria" />
          <Button onPress={takePhoto} title="Tirar uma foto" />

          <Button title="Criar planta" onPress={handleSubmit(onSubmit)} />
        </View>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    marginHorizontal: 15,
  },
  percentage: {
    marginBottom: 10,
  },
  result: {
    paddingTop: 5,
  },
  info: {
    textAlign: "center",
    marginBottom: 20,
  },
})

export default CadastroDePlanta;