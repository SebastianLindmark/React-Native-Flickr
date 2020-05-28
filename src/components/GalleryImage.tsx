import React from 'react';
import { Image, StyleSheet, View } from 'react-native'


interface Props {
    width : number,
    height : number,
    url : string
}


const GalleryImage: React.FC<Props> = props => {
    
    return (
        <View >
            <Image
                style={{ width :props.width , height: props.height }}
                source={{ uri: props.url }} />
        </View>)

};

var styles = StyleSheet.create({
    image: {
        flex: 1,
        width: Math.random() * 100 + 50, //IMPLEMENT HERE
        height: Math.random() * 100 + 50,
        resizeMode: "contain"
    }
})

export default GalleryImage