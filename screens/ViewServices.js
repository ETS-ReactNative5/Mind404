import * as React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native'

const ViewServicesScreen = ({ navigation, route }) => { 
    return(
    <ImageBackground
        source={ require('../assets/GrubberBackground.png')}
        resizeMode='cover' style={styles.backgroundImage}>
            <Text> view services screen </Text>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
});

export default ViewServicesScreen