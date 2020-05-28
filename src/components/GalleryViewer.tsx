import React, { useLayoutEffect } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import InfiniteScrollView from "./InfiniteScrollView";
import { WebImage } from './WebResult';
import GalleryImage from './GalleryImage';

interface Props {
    images: WebImage[],
    onScrollBottom: Function
}

let imageWidth = 0;
let imageHeight = 0;

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

const bla = () => {
    imageWidth = window.innerWidth
    imageHeight = window.innerHeight
}

const GalleryViewer : React.FC<Props> = props => {

    window.addEventListener('resize',bla);
    const [width,height] = calculateImageDimensions()
    

    return (

        <InfiniteScrollView onBottomReached={props.onScrollBottom}>
            <View style={styles.imageContainer}>
                {props.images.map((image, idx) => <GalleryImage key={idx} url={image.url} width={imageWidth} height={imageHeight} />)}
            </View>
        </InfiniteScrollView>
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