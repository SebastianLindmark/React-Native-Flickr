import React, { ReactElement, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import InfiniteList from "../components/InfiniteList";
import { WebImage } from '../components/WebResult';
import GalleryImage from '../components/GalleryImage';


interface Props {
    images: WebImage[],
    onScrollBottom: Function
}

const calculateImageDimensions = ({ width : screenWidth, height : screenHeight}: { width: number, height: number }) => {

    return screenHeight > screenWidth ?
        { imageWidth: screenWidth / 3, imageHeight: screenHeight / 4 } :
        { imageWidth: screenWidth / 4, imageHeight: screenHeight / 3 }
}

const calculateGalleryColumns = ({ width : screenWidth , height : screenHeight}: { width: number, height: number }) => {
    return screenHeight > screenWidth ? 3 : 4;
}

const getScreenDimensions = () => {
    return Dimensions.get('window');
}

const GalleryViewer: React.FC<Props> = props => {

    const [screenDimensions, setScreenDimensions] = useState(getScreenDimensions());

    const onLayoutHandle = () => {
        setScreenDimensions(getScreenDimensions());
    }

    const galleryImageRenderer = (child: WebImage): ReactElement => {

        const { imageWidth, imageHeight } = calculateImageDimensions(screenDimensions);
        return <GalleryImage url={child.url} width={imageWidth} height={imageHeight} />
    }

    return (
        <View style={styles.container} onLayout={onLayoutHandle}>
            <InfiniteList 
                refreshOn={screenDimensions}
                data={props.images}
                numCols={calculateGalleryColumns(screenDimensions)}
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