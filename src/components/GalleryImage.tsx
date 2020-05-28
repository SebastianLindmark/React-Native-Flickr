import React from 'react';
import { Image, View } from 'react-native'


interface Props {
    width: number,
    height: number,
    url: string
}


const GalleryImage: React.FC<Props> = props => {

    return (
        <Image
            style={{ width: props.width, height: props.height }}
            source={{ uri: props.url }} />
    )

};

export default GalleryImage