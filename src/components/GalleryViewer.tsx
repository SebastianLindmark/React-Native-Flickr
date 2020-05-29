import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import InfiniteScrollView from "./InfiniteScrollView";
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
    return [width, height];
}

const useLayoutSize = () => {
    const [width, height] = calculateImageDimensions();
    const [imageSize, setImageSize] = useState({ width, height });

    const onLayout: any = useCallback((event: any) => {
        const [width, height] = calculateImageDimensions();
        setImageSize({ width, height });
    }, [])

    return [imageSize, onLayout];
}

const GalleryViewer: React.FC<Props> = props => {


    const [imageSize, onLayout] = useLayoutSize();

    return (

        <InfiniteScrollView onBottomReached={props.onScrollBottom}>
            <View onLayout={onLayout} style={styles.imageContainer}>
                {props.images.map((image, idx) => <GalleryImage key={idx} url={image.url} width={imageSize.width} height={imageSize.height} />)}
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