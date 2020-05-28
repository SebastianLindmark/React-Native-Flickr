import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GalleryImage from './GalleryImage';
import Gallery from './Gallery';

import {FlickrPhotoResult, FlickrPhoto} from './FlickrPhotoResult'

import FlickrImageSource from './FlickrImageSource'



export default function App() {

    return (
    <View style={styles.container}>

        <Gallery category={'dogs'} imageSource ={FlickrImageSource}  /> 

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
