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
  const [blob, setBlob] = useState(null);
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

  useEffect(() => { //
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

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(result.assets[0]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this.handleImagePicked(result.assets[0]);
  };

  handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelado");
        return;
      } else {
        setPercentage(0);
        const blobFile = await uriToBlob(pickerResult.uri);
        setBlob(blobFile);
        setImage(pickerResult.uri);
        //downloadImage(pickerResult.uri);
      }
    } catch (e) {
      console.log(e);
      alert("Upload falhou");
    }
  };

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
  

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated); // due to s3 put function scoped
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  downloadImage = (uri) => {
    Storage.get(uri)
      .then((result) => setImage(result))
      .catch((err) => console.log(err));
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  };



  const onSubmit = async (data) => {
    file = {
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: `plants/${data.name}`
    }
    addPlant(data, file);

    await uploadImage(`plants/${data.name}.jpeg`, blob);
    
    navigation.navigate('Home')
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