import * as React from 'react';
import { SafeAreaView, Text, StyleSheet, ImageBackground, TextInput } from 'react-native'

const LoginScreen = ({ navigation, route }) => { 
  const[text,onChangeText] = React.useState("text");
  const[number,onChangeNumber] = React.useState(null);
    return (
    <ImageBackground
      source={ require('../assets/GrubberBackground.png')}
      resizeMode='cover' style={styles.backgroundImage}>
      <Text style = {styles.BiggerText}> Please enter your email and password.</Text>

      <SafeAreaView>
        <TextInput
        style = {styles.input}
        onChangeText = {onChangeText}
        placeholder="email"
      />
      <TextInput
      style = {styles.input}
      onChangeText = {onChangeNumber}
      value = {number}
      placeholder="password"
      />
    </SafeAreaView>
    </ImageBackground>


    );
};

const styles = StyleSheet.create({
  BiggerText:{
    fontSize: 20,
  },
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    input: {
      height: -200,
      margin: 10,
      borderWidth: 4,
      padding: 20,
    }
});

export default LoginScreen