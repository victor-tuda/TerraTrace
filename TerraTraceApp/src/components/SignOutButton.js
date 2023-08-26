import React from "react";
import {Pressable, Text, StyleSheet} from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

const SignOutButton = ({userSelector}) => {
    const { user, signOut } = useAuthenticator(userSelector);
    return (
      <Pressable onPress={signOut} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          Hello! Click here to sign out!
        </Text>
      </Pressable>
    );
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      alignSelf: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 8,
    },
    buttonText: {color: 'white', padding: 16, fontSize: 18},
  });
  

export default SignOutButton;

