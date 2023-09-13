import { Text, View, TextInput, Button, Alert } from "react-native"
import { useForm, Controller } from "react-hook-form"
import {API, graphqlOperation} from 'aws-amplify';
import {createPlants} from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

const CadastroDePlanta = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ 
    defaultValues: {
      name: "",
    },
  })

  const navigation = useNavigation();

  async function addPlant(data) {
    try {
      if (!data.name) return
      await API.graphql(graphqlOperation(createPlants, {input: data}));

    } catch (err) {
      console.log('error creating plant:', err);
    }    
  }

  const onSubmit = (data) => {
    addPlant(data);
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


      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default CadastroDePlanta;