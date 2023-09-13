import { Auth } from 'aws-amplify';

const SignOut = () => {
  async function signOut() {
    try {
      await Auth.signOut({global:  true});
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  signOut();
    // return (
    //   <Pressable onPress={signOut} style={styles.buttonContainer}>
    //     <Text style={styles.buttonText}>
    //       Hello! Click here to sign out!
    //     </Text>
    //   </Pressable>
    // );
  }

  // const styles = StyleSheet.create({
  //   buttonContainer: {
  //     alignSelf: 'center',
  //     backgroundColor: 'black',
  //     paddingHorizontal: 8,
  //   },
  //   buttonText: {color: 'white', padding: 16, fontSize: 18},
  // });
  

export default SignOut;

