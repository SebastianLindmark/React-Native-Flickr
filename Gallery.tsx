import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native'

import GalleryImage from './GalleryImage';
import { FlickrPhotoResult } from './FlickrPhotoResult'
import ImageSource from './ImageSource';
import EndlessScrollView from './EndlessScrollView'

interface Props {
    imageSource: ImageSource,
    category: string
}

const initialState: FlickrPhotoResult = {
    page: 0,
    pages: 0,
    photo: []
}

const Gallery: React.FC<Props> = props => {

    const [flickrPhotos, setFlickrPhotos] = useState<FlickrPhotoResult>(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const isMounted = useRef(true);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error, [{ text: 'Ok' }]);
        }
    }, [error])

    useEffect(() => {
        fetchImages(props.category, flickrPhotos.page);
        return () => { isMounted.current = false };
    }, [props.imageSource])


    const fetchImages = (category: string, offset: number) => {

        setIsLoading(true);
        setError("");

        props.imageSource.fetchImages(category, offset).then(result => {
            if (isMounted.current) {

                setFlickrPhotos((prevState) => {
                    return {
                        ...prevState,
                        photo: prevState.photo.concat(result.photo),
                        page: result.page,
                        pages: result.pages
                    }
                });
            }

            setIsLoading(false);

        }).catch(err => {
            setError("Unable to fetch images");
            console.error(err);
        })
    };



    const onScrollBottom = () => {
        if (!isLoading) {
            fetchImages(props.category, flickrPhotos.page + 1);
        }
    }

    return (
        <EndlessScrollView onBottomReached={onScrollBottom}>
            <View style={styles.imageContainer}>
                {flickrPhotos.photo.map((photo, idx) => <GalleryImage key={idx} photo={photo} />)}
            </View>
        </EndlessScrollView>
    );

};

const styles = StyleSheet.create({

    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Gallery;