import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import EndlessScrollView from "./EndlessScrollView";
import { WebImage } from './WebResult';
import GalleryImage from './GalleryImage';

interface Props {
    images: WebImage[],
    onScrollBottom: Function
}

const calculateImageDimensions = () => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    let width: number, height: number;

    if (screenHeight > screenWidth) {
        width = screenWidth / 3;
        height = screenHeight / 4;
    } else {
        width = screenWidth / 4;
        height = screenHeight / 3;
    }
    return [width,height];
}

const GalleryViewer = (props: Props) => {

    const [width,height] = calculateImageDimensions()
    
    return (

        <EndlessScrollView onBottomReached={props.onScrollBottom}>
            <View style={styles.imageContainer}>
                {props.images.map((image, idx) => <GalleryImage key={idx} url={image.url} width={width} height={height} />)}
            </View>
        </EndlessScrollView>
    )
}

const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});



export default GalleryViewer;