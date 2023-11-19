import React, { useEffect, useState } from 'react';
import { Dimensions,Image,StyleSheet,Text,TextInput,TouchableOpacity,View,ScrollView,} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';

import awsExports from '../../aws-exports';
import { addPlant } from '../../service/addPlant/addPlant';
import { uriToBlob } from '../../service/uriToBlob/uriToBlob';
import { Storage } from 'aws-amplify';

const windowWidth = Dimensions.get('window').width;

const CadastroDePlanta = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      species: '',
      creationDate: '',
      waterLevel: '',
      luminosity: '',
      temperature: '',
    },
  });

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== 'granted' ||
          cameraStatus.status !== 'granted'
        ) {
          alert('Desculpe, precisamos dessa permissão para continuar!');
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(result.assets[0]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    handleImagePicked(result.assets[0]);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert('Upload cancelado');
        return;
      } else {
        setPercentage(0);
        const blobFile = await uriToBlob(pickerResult.uri);
        setBlob(blobFile);
        setImage(pickerResult.uri);
      }
    } catch (e) {
      console.log(e);
      alert('Upload falhou');
    }
  };

  const uploadImage = async (filename, blobFile) => {
    return Storage.put(filename, blobFile, {
      level: 'private',
      contentType: 'image/jpeg',
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
    updatePercentage(calculated);
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  const copyToClipboard = () => {
    Clipboard.setString(image);
    alert('URL da imagem copiada');
  };

  const onSubmit = async (data) => {
    const { name, species, creationDate, waterLevel, luminosity, temperature } =
      data;

    const file = {
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      key: `plants/${name}`,
    };

    addPlant(
      { name, species, creationDate, waterLevel, luminosity, temperature },
      file
    );

    await uploadImage(`plants/${name}.jpeg`, blob);

    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cadastro de Planta</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Image
                source={require('../../../assets/pasta.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
              <Image
                source={require('../../../assets/camera.png')}
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
          <Text style={styles.label}>Nível de Água</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            name="waterLevel"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  placeholder="Nível de Água"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, { borderColor: '#008000' }]}
                />
              </View>
            )}
          />
          <Text style={styles.label}>Luminosidade</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            name="luminosity"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  placeholder="Luminosidade"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={[styles.input, { borderColor: '#008000' }]}
                />
              </View>
            )}
          />
          <Text style={styles.label}>Temperatura</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            name="temperature"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <TextInput
                  placeholder="Temperatura"
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -170,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#008000',
    marginTop: 55,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.8,
  },
  iconContainer: {
    padding: 50,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#008000',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    backgroundColor: '#008000',
    width: 200,
    borderRadius: 4,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CadastroDePlanta;
