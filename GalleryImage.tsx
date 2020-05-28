import React, { Component } from 'react';
import { Dimensions, PixelRatio, Text, Image, StyleSheet, View } from 'react-native'

import { FlickrPhoto } from './FlickrPhotoResult'


interface Props {
    photo: FlickrPhoto
}


const GalleryImage: React.FC<Props> = props => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    let imageWidth, imageHeight;
    
    if(screenHeight > screenWidth){
        imageWidth = screenWidth / 3;
        imageHeight = screenHeight / 4;
    }else{
        imageWidth = screenWidth / 4;
        imageHeight = screenHeight / 3;
    }


    return (
        <View >
            <Image
                style={{ width :imageWidth , height: imageHeight }}
                source={{ uri: props.photo.url }} />
        </View>)

};

var styles = StyleSheet.create({
    image: {
        flex: 1,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        resizeMode: "contain"
    }
})

export default GalleryImage