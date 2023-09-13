import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
//import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';
Auth.configure({
  // other configurations...
  // ...
  authenticationFlowType: 'USER_PASSWORD_AUTH' | 'USER_SRP_AUTH' | 'CUSTOM_AUTH',
})

// const {control,
// handleSubmit,
// formState: {erros},
// } = useForm;

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = async (username, password) => {
    //const response = await Auth.signIn(user, pass);
    try {
      const user = await Auth.signIn(username, password)
      navigation.navigate('Home');
      console.log('funcionou', user)
    } catch(error) {
      console.log('error sign in', error)
    }
    //console.log(data);
    
    // // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text="Sign In" pressionado={() => onSignInPressed(username, password)} />

        <CustomButton
          text="Forgot password?"
          pressionado={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
