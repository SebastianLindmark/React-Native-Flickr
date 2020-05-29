import React, { useLayoutEffect, useState, useCallback } from 'react';
import {Platform, Dimensions, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import InfiniteScrollView from "./InfiniteScrollView";
import { WebImage } from './WebResult';
import GalleryImage from './GalleryImage';
import useLayoutChange from '../containers/useLayoutChange'


interface Props {
    images: WebImage[],
    onScrollBottom: Function
}

const getScreenDimensions = () => {
    return Dimensions.get('window');
}

const calculateImageDimensions = (screenWidth: number, screenHeight: number) => {

    return screenHeight > screenWidth ? 
        { imageWidth: screenWidth / 3, imageHeight: screenHeight / 4 } :
        { imageWidth: screenWidth / 4, imageHeight: screenHeight / 3 }
}


const calculateDeviceImageDimensions = (layoutWidth : number, layoutHeight : number) => {
    if(Platform.OS !== 'web'){
        return calculateImageDimensions(layoutWidth, layoutHeight);
    }else{
        const screenDimensions = getScreenDimensions();
        return calculateImageDimensions(screenDimensions.width,screenDimensions.height);
    }  
}

const GalleryViewer: React.FC<Props> = props => {

    const [layoutDimensions, onLayoutChange] = useLayoutChange(getScreenDimensions());
    const {imageWidth, imageHeight} = calculateDeviceImageDimensions(layoutDimensions.width, layoutDimensions.height);

    return (

        <View onLayout={onLayoutChange}>
            <InfiniteScrollView onBottomReached={props.onScrollBottom}>
                <View style={styles.imageContainer}>
                    {props.images.map((image, idx) => <GalleryImage key={idx} url={image.url} width={imageWidth} height={imageHeight} />)}
                </View>
            </InfiniteScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default GalleryViewer;