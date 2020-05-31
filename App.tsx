import React from 'react';
import { StyleSheet, StatusBar , View, Platform } from 'react-native';

import GalleryScreen from './src/containers/GalleryScreen';

import FlickrImageSource from './src/network/FlickrImageSource'


export default function App() {

    const height = Platform.OS === 'web' ? '100vh' : '100%'
    const containerStyle = {...styles.container, marginTop : StatusBar.currentHeight, height };


    return (
    <View style={containerStyle}>
        <GalleryScreen category={'dogs'} imageSource ={FlickrImageSource}  /> 
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
