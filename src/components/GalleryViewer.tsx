import React, { ReactNode, ReactElement, useState } from 'react';
import { Platform, Dimensions, View, StyleSheet } from 'react-native';
import InfiniteScrollView from "./InfiniteScrollView";
import { WebImage } from './WebResult';
import GalleryImage from './GalleryImage';


interface Props {
    images: WebImage[],
    onScrollBottom: Function
}

const calculateImageDimensions = ({ width : screenWidth, height : screenHeight}: { width: number, height: number }) => {

    return screenHeight > screenWidth ?
        { imageWidth: screenWidth / 3, imageHeight: screenHeight / 4 } :
        { imageWidth: screenWidth / 4, imageHeight: screenHeight / 3 }
}

const getNumCols = ({ width : screenWidth , height : screenHeight}: { width: number, height: number }) => {
    return screenHeight > screenWidth ? 3 : 4;
}

const getScreenDimensions = () => {
    return Dimensions.get('window');
}

const GalleryViewer: React.FC<Props> = props => {

    const layoutDimensions = getScreenDimensions();
    const [screenDimensions, setSceenDimensions] = useState(layoutDimensions);
    const [columnCount, setColumnCount] = useState(getNumCols(layoutDimensions));


    const onLayoutHandle = () => {
        const screenDimensions = getScreenDimensions();
        setSceenDimensions(screenDimensions);
        setColumnCount(getNumCols(screenDimensions));
    }


    const galleryImageRenderer = (child: WebImage): ReactElement => {

        const { imageWidth, imageHeight } = calculateImageDimensions(screenDimensions);
        return <GalleryImage url={child.url} width={imageWidth} height={imageHeight} />
    }

    return (
        <View style={styles.container} onLayout={onLayoutHandle}>
            <InfiniteScrollView refreshOn={screenDimensions}
                numCols={columnCount}
                data={props.images}
                customRender={galleryImageRenderer}
                onBottomReached={props.onScrollBottom} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    }
});


export default GalleryViewer;