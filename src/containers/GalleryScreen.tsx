import React, { useState, useEffect, useRef } from 'react';
import { Alert, ActivityIndicator, View, StyleSheet } from 'react-native'

import { WebImageResult } from '../components/WebResult'
import ImageSource from '../network/ImageSource';
import GalleryViewer from '../components/GalleryViewer';
import { TimeoutError, InvalidApiKeyError } from '../errors/CustomErrors';

interface Props {
    imageSource: ImageSource,
    category: string
}

const initialState = new WebImageResult();

const GalleryScreen: React.FC<Props> = props => {

    const [imageResult, setImageResult] = useState<WebImageResult>(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const isMounted = useRef(true);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{ text: 'Ok' }]);
        }
    }, [error])

    useEffect(() => {
        fetchImages(props.category, imageResult.offset);
        return () => { isMounted.current = false };
    }, [props.category, props.imageSource])


    const fetchImages = (category: string, offset: number) => {

        setIsLoading(true);
        setError("");

        return props.imageSource.fetchImages(category, offset).then(result => {
            if (isMounted.current) {

                setImageResult((prevState: WebImageResult): WebImageResult => {
                    return {
                        ...prevState,
                        images: prevState.images.concat(result.images),
                        offset: result.offset
                    }
                });
            }

            setIsLoading(false);

        }).catch(err => {

            if (err instanceof TimeoutError || err instanceof InvalidApiKeyError) {
                setError(err.message);
            } else {
                setError("Unable to fetch images");
            }
        }).finally(() => setIsLoading(false));
    };


    const onScrollBottom = () => {
        if (!isLoading) {
            fetchImages(props.category, imageResult.offset + 1);
        }
    }

    return (

        <View>
            <View style={styles.centered}>
                {isLoading && (<ActivityIndicator size="large" />)}
            </View>
            <GalleryViewer images={imageResult.images} onScrollBottom={onScrollBottom} />
        </View>
    );

};


const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',

    }
})

export default GalleryScreen;